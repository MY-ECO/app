import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/api/eco-ai", async (req, res) => {
  const userPrompt = req.body.prompt;

  const systemPrompt = `
You are ECO-AI v1, an economic decision-support system for developing countries.
You provide analytical, neutral, and policy-oriented responses.
You do NOT provide legal or financial advice.
You align with IMF and World Bank analytical frameworks.
Always highlight assumptions and uncertainty.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.3
    })
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
});

app.listen(3000, () => {
  console.log("ECO-AI backend running on http://localhost:3000");
});
