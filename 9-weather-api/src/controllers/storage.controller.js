import express from 'express';

import { saveKeyValue, TOKEN_DICTIONARY } from "../services/storage.service.js";

const storageRouter = express.Router();

storageRouter.use(express.json());

storageRouter.post('/city', async (req, res) => {
    console.log(req.body);

    const { city } = req.body;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        res.status(200).json({ message: 'City saved successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

export default storageRouter;