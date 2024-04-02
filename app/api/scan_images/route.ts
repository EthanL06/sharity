import { NextResponse } from "next/server";
import vision from "@google-cloud/vision";
import { google } from "@google-cloud/vision/build/protos/protos";

export async function POST(request: Request) {
  const credential = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY as string, "base64")
      .toString()
      .replace(/\n/g, ""),
  );

  const client = new vision.ImageAnnotatorClient({
    projectId: credential.project_id,
    credentials: {
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
  });

  const { files } = await request.json();

  const promises = files.map(async (file: string) => {
    const image = file.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(image, "base64");

    const [result] = await client.labelDetection(buffer);
    const detections = result.labelAnnotations;

    console.log("Labels:");
    if (detections) {
      detections.forEach((label) => console.log(label));
    }

    return detections;
  });

  const results = (await Promise.all(
    promises,
  )) as google.cloud.vision.v1.IEntityAnnotation[][];

  return NextResponse.json({ labels: results });
}
