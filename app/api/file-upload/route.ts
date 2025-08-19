import { getSignedUrlForFile } from "@/lib/data/services/S3Service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get("fileName");
  const fileType = searchParams.get("fileType");

  if (!fileName || !fileType) {
    console.log("Missing fileName or fileType");
    return NextResponse.json(
      { error: "Missing fileName or fileType" },
      { status: 400 }
    );
  }

  // function to get signedURL
  const signedUrl = await getSignedUrlForFile(fileName, fileType);

  console.log(signedUrl);

  return NextResponse.json({ url: signedUrl });
}
