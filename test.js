require('dotenv').config();
const https = require('https');

console.log("API Key:", process.env.OPENAI_API_KEY ? "API key is set" : "API key is not set");

const options = {
  hostname: 'api.openai.com',
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer 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`
  }
};

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log("Response body:", data);
  });
});

req.on('error', (error) => {
  console.error("Error:", error);
});

const payload = JSON.stringify({
  model: "gpt-3.5-turbo",
  messages: [{role: "user", content: "Hello, OpenAI!"}],
  temperature: 0.7
});

req.write(payload);
req.end();

console.log("Request sent, awaiting response...");