export interface IncomingMessage {
  from: string;
  body: string;
  timestamp: number;
}

export interface ConnectionStatus {
  authenticated: boolean;
  initialized: boolean;
  error: string | null;
}

export interface WhatsAppBotConfig {
  session: string;
  puppeteer: {
      headless: boolean;
  };
}