import { Request, Response } from 'express';
import TestFileService from './TestFile.service';
import logger from '../../config/logger';
import { CreateTestFileDTO, UpdateTestFileDTO, DeleteTestFileDTO } from './TestFile.dto';

export default class TestFileController {
  private req: Request;
  private res: Response;
  private service: TestFileService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.service = new TestFileService();
  }

  async createTestFile(): Promise<void> {
    try {
      const payload = this.req.body as CreateTestFileDTO;
      if (!payload || !payload.content) {
        this.res.status(400).json({ success: false, message: 'content is required' });
        return;
      }
      const result = await this.service.createTestFile(payload);
      this.res.status(201).json(result);
    } catch (error: any) {
      logger.error(error.message);
      this.res.status(500).json({ success: false, message: error.message });
    }
  }

  async getTestFiles(): Promise<void> {
    try {
      const result = await this.service.getTestFiles();
      this.res.json(result);
    } catch (error: any) {
      logger.error(error.message);
      this.res.status(500).json({ success: false, message: error.message });
    }
  }

  async getTestFile(): Promise<void> {
    try {
      const { id } = this.req.params;
      if (!id) {
        this.res.status(400).json({ success: false, message: 'id is required' });
        return;
      }
      const result = await this.service.getTestFile(id);
      if (!result) {
        this.res.status(404).json({ success: false, message: 'Not found' });
        return;
      }
      this.res.json(result);
    } catch (error: any) {
      logger.error(error.message);
      this.res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateTestFile(): Promise<void> {
    try {
      const { id } = this.req.params;
      const payload = this.req.body as UpdateTestFileDTO;
      if (!id || !payload || !payload.content) {
        this.res.status(400).json({ success: false, message: 'id and content are required' });
        return;
      }
      const result = await this.service.updateTestFile(id, payload);
      if (!result) {
        this.res.status(404).json({ success: false, message: 'Not found' });
        return;
      }
      this.res.json(result);
    } catch (error: any) {
      logger.error(error.message);
      this.res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteTestFile(): Promise<void> {
    try {
      const { id } = this.req.params;
      if (!id) {
        this.res.status(400).json({ success: false, message: 'id is required' });
        return;
      }
      await this.service.deleteTestFile(id);
      this.res.status(204).send();
    } catch (error: any) {
      logger.error(error.message);
      this.res.status(500).json({ success: false, message: error.message });
    }
  }
}