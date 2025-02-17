import { Message } from '@open-wa/wa-automate';

export enum CustomMessageTypes {
    TEXT = "chat",
    AUDIO = "audio",
    VOICE = "ptt",
    IMAGE = "image",
    VIDEO = "video",
    DOCUMENT = "document",
    STICKER = "sticker",
    LOCATION = "location",
    CONTACT_CARD = "vcard",
    CONTACT_CARD_MULTI = "multi_vcard",
    REVOKED = "revoked",
    ORDER = "order",
    BUTTONS_RESPONSE = "buttons_response",
    LIST_RESPONSE = "list_response",
    UNKNOWN = "unknown",
    LIST = 'list'
}

// Nova interface para mensagens, sem estender a interface Message
export interface CustomMessageDTO extends Omit<Message, 'type'> {
  type: CustomMessageTypes;
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
        executablePath?: string;
        args?: string[];
        useChrome: boolean;
    };
}
