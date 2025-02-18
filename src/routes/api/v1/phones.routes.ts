import { Router } from 'express';

const phonesRouterV1 = Router();

phonesRouterV1.get('/phones', (req, res) => {
  try {
    const phones = JSON.parse(process.env.PHONE_LIST || '[]');
    res.json(phones);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
})

export default phonesRouterV1;