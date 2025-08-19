import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getSignedUrlForFile(
  fileName: string,
  fileType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
  });

  return getSignedUrl(s3, command, { expiresIn: 120 });
}

async function streamToBuffer(stream: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on("data", (chunk: any) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

export async function getBufferedFile(uri: string): Promise<Buffer> {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: uri
  });

  console.log(uri);

  const output = await s3.send(command);

  if (!output.Body) {
    throw new Error(`S3 object not found: ${uri}`);
  }

  const bufferedFile = await streamToBuffer(output.Body as any);

  return bufferedFile;
}