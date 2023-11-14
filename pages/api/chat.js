import { OpenAIClient, AzureKeyCredential } from "@azure/openai"

export default async function handler(req, res) {

  const client = new OpenAIClient(
    process.env.AZURE_OPENAI_URI,
    new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY),
    {
      apiVersion: '2023-07-01-preview'
    }
  );

  const resp = await client.getChatCompletions(
    "yoshida-takafumi-gpt35t",
    [
      {
        role: 'user',
        content: req.body.message,
      }
    ]
  )

  res.status(200).json({ "response" : resp.choices[0].message.content })
}