import { Button, Row } from '@open-wa/wa-automate/dist/api/model/button';

export interface SendMessageDTO {
  to: string;
  message: string;
}

export interface InteractiveTypeDTO {
  name: string,
  displayText: string,
  url: string
}
export interface IncomingMessageDTO {
  from: string;
  body: {
    text: string;
    buttonText: string | null;
    options: Array<Row> | Array<Button> | Array<InteractiveTypeDTO> |null;
  };
  timestamp: number;
  type: 'text' | 'button' | 'list' | 'interactive';
}