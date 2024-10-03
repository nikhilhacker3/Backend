const express = require('express');
const Groq = require('groq-sdk');
const app = express();
const port = process.env.PORT || 3000;  // Port set dynamically by Railway

const groq = new Groq();

app.use(express.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: userMessage }],
      model: "llama-3.1-70b-versatile",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    });

    const botResponse = chatCompletion.choices[0]?.message?.content || 'Sorry, I could not process that.';

    res.json({ reply: botResponse });
  } catch (error) {
    console.error('Error:', error);
    res.json({ reply: 'There was an error processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
