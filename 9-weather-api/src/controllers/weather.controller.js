import express from 'express';
import { getWeather } from '../services/api.service.js';

const weatherRouter = express.Router();

weatherRouter.get('/', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const weather = await getWeather(city);
        res.json(weather);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

export default weatherRouter;