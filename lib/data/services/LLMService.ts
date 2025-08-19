import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: "eu-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function invokeModel(
  systemPrompt: string,
  humanPrompt: string,
  targetText: string,
  maxTokens: number = 1000,
  model: string = "anthropic.claude-3-sonnet-20240229-v1:0",
): Promise<string> {
  const command = new InvokeModelCommand({
    modelId: model,
    body: JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: maxTokens,
      system: systemPrompt, // Separate system field
      messages: [
        {
          role: "user",
          content: `${humanPrompt}: ${targetText}`,
        },
      ],
    }),
    contentType: "application/json",
    accept: "application/json",
  });

  const response = await client.send(command);
  const processedResponse = new TextDecoder().decode(response.body);

  console.log(processedResponse);
  return JSON.parse(processedResponse).content[0].text;
}
