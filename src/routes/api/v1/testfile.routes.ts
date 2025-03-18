import { Router } from 'express';
import TestFileController from '../../../controller/testFile/TestFile.controller';

const testFileRouter = Router();

testFileRouter.post('/testfiles', async (req, res) => {
  const controller = new TestFileController(req, res);
  await controller.createTestFile();
});

testFileRouter.get('/testfiles', async (req, res) => {
  const controller = new TestFileController(req, res);
  await controller.getTestFiles();
});

testFileRouter.get('/testfiles/:id', async (req, res) => {
  const controller = new TestFileController(req, res);
  await controller.getTestFile();
});

testFileRouter.put('/testfiles/:id', async (req, res) => {
  const controller = new TestFileController(req, res);
  await controller.updateTestFile();
});

testFileRouter.delete('/testfiles/:id', async (req, res) => {
  const controller = new TestFileController(req, res);
  await controller.deleteTestFile();
});

export default testFileRouter;