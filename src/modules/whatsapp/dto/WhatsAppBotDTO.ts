export interface IncomingMessage {
  id: string; // ID único da mensagem
  viewed: boolean; // Indica se a mensagem foi visualizada
  body: string; // Conteúdo da mensagem (texto, legenda, etc.)
  type: string; // Tipo da mensagem (ex.: "chat", "list", etc.)
  timestamp: number; // Timestamp da mensagem
  notifyName?: string; // Nome para notificação (se disponível)
  from: string; // ID do remetente
  to: string; // ID do destinatário
  author: string; // Autor da mensagem
  ack: number; // Status de entrega da mensagem
  isNewMsg: boolean; // Indica se é uma nova mensagem
  isFromTemplate: boolean; // Indica se a mensagem foi gerada a partir de um template
  text: string;
  // Botões dinâmicos (quando o bot fornece opções via botões)
  dynamicReplyButtons?: Array<{
    buttonId: string;
    buttonText: {
      displayText: string;
    };
    type?: number;
  }>;

  // Botões já formatados (exemplo: [{ id: '1', text: 'Atualizar dados' }, ...])
  buttons?: Array<{
    id: string;
    text: string;
  }>;

  // Estrutura de mensagem do tipo lista
  list?: {
    title: string;           // Título da lista
    description: string;     // Descrição da lista
    buttonText: string;      // Texto do botão que abre a lista
    listType?: number;       // Tipo da lista (se houver)
    sections: Array<{
      title: string;
      rows: Array<{
        id: string;
        title: string;
        description?: string;
      }>;
    }>;
  };

  isGroupMsg: boolean; // Indica se a mensagem é de grupo
  isMedia: boolean;    // Indica se a mensagem contém mídia

  // Informações do chat
  chat?: {
    id: string;           // ID do chat
    isGroup: boolean;     // Indica se é um chat em grupo
    formattedTitle: string; // Título formatado do chat
    pic?: string;         // URL da imagem do contato ou do grupo
  };

  // Informações do remetente
  sender?: {
    id: string;       // ID do remetente
    name: string;     // Nome do remetente
    pushname: string; // Nome usado para notificação
    type: string;     // Tipo (ex.: "in", "out")
    isBusiness: boolean; // Indica se é uma conta de negócios
    verifiedName?: string; // Nome verificado (se disponível)
  };
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