import { NextResponse } from "next/server";
import vision from "@google-cloud/vision";
import fs from "fs/promises";
import path from "path";

export async function GET(request: Request) {
  const credential = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY as string, "base64")
      .toString()
      .replace(/\n/g, ""),
  );

  console.log(credential);

  const client = new vision.ImageAnnotatorClient({
    projectId: credential.project_id,
    credentials: {
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
  });

  const image = await fs.readFile(
    path.join(process.cwd(), "public", "donations.jpg"),
  );

  const [result] = await client.labelDetection(image);
  console.log(result);
  const detections = result.textAnnotations;
  console.log("Text:");
  if (detections) {
    detections.forEach((text) => console.log(text));
  }

  return NextResponse.json({ labels: result.labelAnnotations });
}
