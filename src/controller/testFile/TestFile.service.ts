import { ObjectId } from 'mongodb';
import { connectDB } from '../../config/mongoClient';
import { CreateTestFileDTO, UpdateTestFileDTO } from './TestFile.dto';

export default class TestFileService {
  private collectionName = 'testfiles';

  private async getCollection() {
    const db = await connectDB();
    return db.collection(this.collectionName);
  }

  async createTestFile(data: CreateTestFileDTO): Promise<any> {
    const collection = await this.getCollection();
    const result = await collection.insertOne({ content: data.content, createdAt: new Date(), updatedAt: new Date() });
    return await collection.findOne({ _id: result.insertedId });
  }

  async getTestFiles(): Promise<any[]> {
    const collection = await this.getCollection();
    return await collection.find().toArray();
  }

  async getTestFile(id: string): Promise<any | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  async updateTestFile(id: string, data: UpdateTestFileDTO): Promise<any | null> {
    const collection = await this.getCollection();
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { content: data.content, updatedAt: new Date() } });
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  async deleteTestFile(id: string): Promise<void> {
    const collection = await this.getCollection();
    await collection.deleteOne({ _id: new ObjectId(id) });
  }
}