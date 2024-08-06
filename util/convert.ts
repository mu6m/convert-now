import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export default async function convert(ffmpeg: FFmpeg, { from, to, file }: any) {
  ffmpeg.writeFile(from, await fetchFile(file));

  await ffmpeg.exec(["-i", from, to]);

  const data = (await ffmpeg.readFile(to)) as any;
  const blob = new Blob([data], { type: file_type.split("/")[0] });
  const url = URL.createObjectURL(blob);
  return url;
}
