interface ButtonMessageDTO {
  id: string;
  text: string;
}

interface ListMessageDTO { 
  id: string;
  title: string;
  description?: string;
}
export interface SendMessageDTO {
  to: string;
  message: string;
}

export interface IncomingMessageDTO {
  from: string;
  body: {
    text: string;
    buttonText: string | null;
    options: Array<ButtonMessageDTO> | Array<ListMessageDTO> | null;
  };
  timestamp: number;
  type: 'text' | 'button' | 'list';
}