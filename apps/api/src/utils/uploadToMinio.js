import fs from "fs";
import path from "path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3, BUCKET_NAME } from "../config/minio.js";

export const uploadDirectory = async (localDir, remotePrefix) => {
  const entries = fs.readdirSync(localDir);

  for (const entry of entries) {
    const fullPath = path.join(localDir, entry);
    const key = `${remotePrefix}/${entry}`;

    if (fs.statSync(fullPath).isDirectory()) {
      await uploadDirectory(fullPath, key);
    } else {
      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
          Body: fs.createReadStream(fullPath),
          ContentType: entry.endsWith(".m3u8")
            ? "application/vnd.apple.mpegurl"
            : "video/mp2t",
        })
      );
    }
  }
};
