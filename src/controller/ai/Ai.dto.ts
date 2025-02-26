export interface AiRating {
  category: string;
  score: number;
  justification: string;
}

export interface AiAnalysis {
  ratings: AiRating[];
  suggestions: string[];
}

export interface AiMessage {
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[]
  model: 'gpt-4o-mini';
  temperature: number;
}