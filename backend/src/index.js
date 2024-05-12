import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const PORT = process.env.PORT || 3000;

app.post('/chat', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",  // Make sure to use a valid model
            prompt: prompt,
            max_tokens: 1
        });
        res.json({ message: response.choices[0].text });
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        res.status(500).send('Failed to communicate with OpenAI API');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
