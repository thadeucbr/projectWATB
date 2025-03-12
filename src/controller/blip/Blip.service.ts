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
      const data =
        typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
      if (!data) {
        logger.error(contact + ' - ' + varName + ' - Empty response');
        return;
      }
      const { status } = data;
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
      const data =
        typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
      const { resource, status } = data;
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

   delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async resetContext(
    data: ResetContextDTO
  ): Promise<{ success: boolean; message: string }> {
    try {
      const { phone, authorize } = data;
      const contact = this.formatUserId(phone);
      const contexts = await this.getContext({ userId: contact, authorize });
      for (const context of contexts) {
        await this.deleteContext({ userId: contact, varName: context, authorize });
        await this.delay(250);
      }
      return { success: true, message: 'Contexts deleted successfully' };
    } catch (e) {
      return { success: false, message: 'Error deleting contexts' };
    }
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
