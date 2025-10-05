import { GoogleGenAI } from '@google/genai';

const geminiInstance = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export default geminiInstance;
