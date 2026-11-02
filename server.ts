import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  formatWhatsAppPhoneNumber,
  createSubscriberWhatsAppMessage,
  createOrderWhatsAppMessage,
  createWhatsAppDirectUrl,
} from './src/utils/whatsappNotification.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory store for recent WhatsApp alert events for admin observability
interface WhatsAppLogEntry {
  id: string;
  timestamp: string;
  type: 'subscriber' | 'order' | 'test';
  email: string;
  recipientPhone: string;
  messageText: string;
  status: 'sent_cloud_api' | 'sent_callmebot' | 'ready_direct_url';
  whatsappUrl: string;
}

const recentWhatsAppLogs: WhatsAppLogEntry[] = [];

// API: Send or format WhatsApp notification when someone enters their email or places an order
app.post('/api/notify-whatsapp', async (req, res) => {
  try {
    const { email, source, phone, orderNumber, total, customerName, targetPhone } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required for notification.' });
    }

    const recipient = targetPhone || process.env.WHATSAPP_PHONE_NUMBER || '+201000000000';
    const formattedRecipient = formatWhatsAppPhoneNumber(recipient);

    let messageText = '';
    let notificationType: 'subscriber' | 'order' | 'test' = 'subscriber';

    if (orderNumber) {
      notificationType = 'order';
      messageText = createOrderWhatsAppMessage(
        orderNumber,
        customerName || 'Valued Customer',
        email,
        phone || 'Not provided',
        total || '0 EGP',
        'Egypt',
        1
      );
    } else {
      notificationType = 'subscriber';
      messageText = createSubscriberWhatsAppMessage(email, new Date().toISOString(), source || 'Storefront Drop Signup');
    }

    const directWhatsAppUrl = createWhatsAppDirectUrl(recipient, messageText);
    let dispatchStatus: 'sent_cloud_api' | 'sent_callmebot' | 'ready_direct_url' = 'ready_direct_url';
    let gatewayResponse: any = null;

    // 1. Meta WhatsApp Cloud API (if configured)
    if (process.env.WHATSAPP_API_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID && formattedRecipient) {
      try {
        const metaRes = await fetch(
          `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              recipient_type: 'individual',
              to: formattedRecipient,
              type: 'text',
              text: { preview_url: false, body: messageText },
            }),
          }
        );
        gatewayResponse = await metaRes.json();
        if (metaRes.ok) {
          dispatchStatus = 'sent_cloud_api';
        }
      } catch (metaErr) {
        console.warn('Meta WhatsApp Cloud API dispatch error:', metaErr);
      }
    }

    // 2. CallMeBot Gateway fallback (if configured)
    if (dispatchStatus === 'ready_direct_url' && process.env.CALLMEBOT_API_KEY && formattedRecipient) {
      try {
        const cmbUrl = `https://api.callmebot.com/whatsapp.php?phone=${formattedRecipient}&text=${encodeURIComponent(messageText)}&apikey=${process.env.CALLMEBOT_API_KEY}`;
        const cmbRes = await fetch(cmbUrl);
        if (cmbRes.ok) {
          dispatchStatus = 'sent_callmebot';
        }
      } catch (cmbErr) {
        console.warn('CallMeBot gateway error:', cmbErr);
      }
    }

    const logEntry: WhatsAppLogEntry = {
      id: `wlog-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      type: notificationType,
      email,
      recipientPhone: recipient,
      messageText,
      status: dispatchStatus,
      whatsappUrl: directWhatsAppUrl,
    };

    recentWhatsAppLogs.unshift(logEntry);
    if (recentWhatsAppLogs.length > 50) recentWhatsAppLogs.pop();

    return res.status(200).json({
      success: true,
      mode: dispatchStatus,
      whatsappUrl: directWhatsAppUrl,
      recipientPhone: recipient,
      formattedRecipient,
      messageText,
      gatewayResponse,
      log: logEntry,
    });
  } catch (error: any) {
    console.error('Failed to process WhatsApp notification:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal server error while processing notification',
    });
  }
});

// API: Get recent WhatsApp notifications log for Admin inspection
app.get('/api/whatsapp-logs', (_req, res) => {
  return res.json({
    configuredRecipient: process.env.WHATSAPP_PHONE_NUMBER || '+201000000000',
    hasMetaCredentials: Boolean(process.env.WHATSAPP_API_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID),
    hasCallMeBotCredentials: Boolean(process.env.CALLMEBOT_API_KEY),
    logs: recentWhatsAppLogs,
  });
});

// Frontend dev / static serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const viteServer = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(viteServer.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 MUSLIMS SHIRTS server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
