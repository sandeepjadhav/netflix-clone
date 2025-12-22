import fs from "fs";
import path from "path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3, BUCKET_NAME } from "../config/minio.js";

export const uploadDirectory = async (localDir, remotePrefix) => {
  const files = fs.readdirSync(localDir);

  for (const file of files) {
    const fullPath = path.join(localDir, file);
    const remotePath = `${remotePrefix}/${file}`;

    if (fs.statSync(fullPath).isDirectory()) {
      await uploadDirectory(fullPath, remotePath);
    } else {
      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: remotePath,
          Body: fs.createReadStream(fullPath),
          ContentType: file.endsWith(".m3u8")
            ? "application/vnd.apple.mpegurl"
            : "video/mp2t",
        })
      );
    }
  }
};
