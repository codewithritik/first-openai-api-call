// index.js
require('dotenv').config();
const { OpenAI } = require('openai');
const readlineSync = require('readline-sync');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const systemPrompt = "You are a helpful assistant.";
  const userPrompt = readlineSync.question("Enter your question: ");

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const reply = response.choices[0].message.content;
    const usage = response.usage;

    console.log("\n🤖 Assistant's Response:");
    console.log(reply);
    console.log("\n📊 Token Usage:");
    console.log(`Prompt tokens: ${usage.prompt_tokens}`);
    console.log(`Completion tokens: ${usage.completion_tokens}`);
    console.log(`Total tokens: ${usage.total_tokens}`);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

main();
