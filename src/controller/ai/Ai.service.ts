import { AiAnalysis, AiMessage } from './Ai.dto';

export default class AiService {
  constructor() {}

  async fetchGtpResponse(parameters: AiMessage): Promise<AiAnalysis> {
    const { messages, model = 'gpt-4o-mini', temperature = 0.7 } = parameters;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.OPENAI_API_KEY || '',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch analysis');
    }
    const data = await response.json();
    const outputText = data.choices[0].message.content;
    const analysisData: AiAnalysis = JSON.parse(outputText);
    return analysisData;
  }
}
