import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { lookup } from "mime-types";

export const FILE_EXTENSIONS = {
  image: [
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
  ],
  video: [
    ".mp4",
    ".m4v",
    ".mp4v",
    ".avi",
    ".mov",
    ".wmv",
    ".mkv",
    ".flv",
    ".ogv",
    ".webm",
    ".h264",
    ".264",
    ".hevc",
    ".265",
  ],
  audio: [".mp3", ".wav", ".ogg", ".aac", ".wma", ".flac", ".m4a"],
};

export function findFileType(format: string) {
  for (const [key, extensions] of Object.entries(FILE_EXTENSIONS)) {
    if (extensions.includes(format)) {
      return { key, extensions };
    }
  }
  return null;
}

export default async function convert(
  ffmpeg: FFmpeg,
  file: File,
  format: string
) {
  const from = file.name;
  const to = `${file.name.split(".")[0]}${format}`;

  ffmpeg.writeFile(from, await fetchFile(file));

  await ffmpeg.exec(["-i", from, to]);
  console.log(to);
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
