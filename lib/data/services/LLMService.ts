import { Analysis } from "@/types/analysis";
import {
  BedrockAgentRuntimeClient,
  InvokeFlowCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";

const client = new BedrockAgentRuntimeClient({
  region: "eu-west-2",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});

export async function invokeModel(
  targetText: string,
): Promise<Analysis> {
  const command = new InvokeFlowCommand({
    flowIdentifier: "arn:aws:bedrock:eu-west-2:558099092121:flow/X1744H1HB2",
    flowAliasIdentifier:
      "arn:aws:bedrock:eu-west-2:558099092121:flow/X1744H1HB2/alias/2YOS49BDTF",
    inputs: [
      {
        content: { document: targetText },
        nodeName: "FlowInputNode",
        nodeOutputName: "document",
      },
    ],
  });

  const response = await client.send(command);

  let finalOutput: string | null = null;

  for await (const event of response.responseStream) {
    if (event.flowOutputEvent) {
      console.log("Flow output:", event.flowOutputEvent.content.document);
      finalOutput = event.flowOutputEvent.content.document;
    }
    if (event.flowCompletionEvent) {
      console.log(
        "Flow completed:",
        event.flowCompletionEvent.completionReason
      );
    }
    if (event.flowErrorEvent) {
      console.error("Flow error:", event.flowErrorEvent.errorMessage);
    }
  }

  let processedFinalOutput: string | null = finalOutput;
  // remove comments
  if(finalOutput && finalOutput.length > 10) {
    processedFinalOutput = finalOutput?.substring(8, (finalOutput.length - 3));
    console.log(finalOutput);
  }

  console.log(processedFinalOutput);

  let analysis: Analysis = JSON.parse(processedFinalOutput) as Analysis;

  return analysis;
}
