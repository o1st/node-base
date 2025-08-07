import express from 'express';

import { getKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import storageRouter from './controllers/storage.controller.js';
import weatherRouter from './controllers/weather.controller.js';

const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);

if (!token) {
    console.error('WEATHER_API_TOKEN is not set');
    process.exit(1);
}

const app = express();
const PORT = 8000;

app.use('/weather', weatherRouter);
app.use('/storage', storageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
