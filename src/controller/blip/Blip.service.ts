import axios from 'axios';
import { DeleteContextDTO, GetContextDTO, ResetContextDTO } from './Blip.dto';
import logger from '../../config/logger';

export default class BlipService {
  constructor() {}

  async deleteContext(data: DeleteContextDTO): Promise<string | undefined> {
    const { userId, varName, authorize } = data;
    const headers = { Authorization: authorize, 'Content-Type': 'application/json' };
    const contact = this.formatUserId(userId);
    const body = JSON.stringify({
      id: '438d3232-8858-4f19-8987-7e530d00326b',
      to: 'postmaster@msging.net',
      method: 'DELETE',
      uri: `/contexts/${contact}/${varName}`,
    });
    try {
      const response = await axios.post('https://safra.http.msging.net/commands', body, {
        headers,
      });
      const responseData =
        typeof response.data === 'string'
          ? JSON.parse(response.data)
          : response.data;
      if (!responseData) {
        logger.error(contact + ' - ' + varName + ' - Empty response');
        return;
      }
      const { status } = responseData;
      logger.info(status + ' - ' + contact + ' - ' + varName);
      return status;
    } catch (error: any) {
      logger.error(error.message + ' - ' + contact + ' - ' + varName);
      throw error;
    }
  }

  async getContext(data: GetContextDTO): Promise<any[]> {
    const { userId, authorize } = data;
    const headers = { Authorization: authorize, 'Content-Type': 'application/json' };
    const contact = this.formatUserId(userId);
    const body = JSON.stringify({
      id: '438d3232-8858-4f19-8987-7e530d00326b',
      to: 'postmaster@msging.net',
      method: 'GET',
      uri: `/contexts/${contact}`,
    });
    try {
      const response = await axios.post('https://safra.http.msging.net/commands', body, {
        headers,
      });
      const responseData =
        typeof response.data === 'string'
          ? JSON.parse(response.data)
          : response.data;
      const { resource, status } = responseData;
      logger.info('auth: ' + authorize);
      logger.info(status + ' - ' + contact);
      if (status === 'success') {
        return resource.items || [];
      }
      return [];
    } catch (error) {
      logger.error(error);
      return [];
    }
  }

  async deleteContextWithIncrementalDelay(data: DeleteContextDTO): Promise<string | undefined> {
    let delayMs = 50;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        return await this.deleteContext(data);
      } catch (error) {
        if (attempt < 2) {
          await this.delay(delayMs);
          delayMs = Math.min(delayMs + 50, 150);
        } else {
          throw error;
        }
      }
    }
  }

  async resetContext(
    data: ResetContextDTO
  ): Promise<{ success: boolean; message: string }> {
    try {
      const { phone, authorize } = data;
      const contact = this.formatUserId(phone);
      const contexts = await this.getContext({ userId: contact, authorize });
      for (const context of contexts) {
        await this.deleteContextWithIncrementalDelay({ userId: contact, varName: context, authorize });
      }
      return { success: true, message: 'Contexts deleted successfully' };
    } catch (e) {
      return { success: false, message: 'Error deleting contexts' };
    }
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  formatUserId(userId: string): string {
    const digits = userId.replace(/\D/g, '');
    const regex = /^(\d{2})(\d{2})(\d{9})$/;
    if (!regex.test(digits)) {
      throw new Error('Invalid phone number format');
    }
    return `${digits}@wa.gw.msging.net`;
  }
}