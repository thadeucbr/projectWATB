import { Button, Row } from '@open-wa/wa-automate/dist/api/model/button';

export interface SendMessageDTO {
  to: string;
  message: string;
}

export interface IncomingMessageDTO {
  from: string;
  body: {
    text: string;
    buttonText: string | null;
    options: Array<Row> | Array<Button> | null;
  };
  timestamp: number;
  type: 'text' | 'button' | 'list';
}