import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { lookup } from "mime-types";

export const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".webp",
  ".ico",
  ".tif",
  ".tiff",
  ".raw",
  ".tga",
];

export default async function convert(
  ffmpeg: FFmpeg,
  file: File,
  format: string
) {
  const from = file.name;
  const to = `${file.name.split(".")[0]}${format}`;

  ffmpeg.writeFile(from, await fetchFile(file));

  await ffmpeg.exec(["-i", from, to]);
  const data = (await ffmpeg.readFile(to)) as Uint8Array;
  const mimeType = lookup(format) || "application/octet-stream";
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = to;

  document.body.appendChild(a);
  a.click();

  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
