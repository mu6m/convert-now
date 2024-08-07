"use client";

import { useState } from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/file-upload";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import convert, { IMAGE_EXTENSIONS } from "@/util/convert";
import loadFFmpeg from "@/util/load-ffmpeg";

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        accepts images only
      </p>
    </>
  );
};

export default function FileUploaderTest() {
  const [files, setFiles] = useState<any | null>(null);

  const dropZoneConfig = {
    maxFiles: 100,
    maxSize: 1024 * 1024 * 20,
    multiple: true,
    accept: {
      "image/*": IMAGE_EXTENSIONS,
    },
  };
  console.log(files);
  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      dropzoneOptions={dropZoneConfig}
      className="bg-white rounded-lg p-6 shadow-xl"
    >
      <FileInput className="outline-dashed outline-1 outline-slate-600 shadow-md mb-8 mt-2">
        <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
          <FileSvgDraw />
        </div>
      </FileInput>
      <FileUploaderContent className="flex flex-col gap-8">
        {files &&
          files.length > 0 &&
          files.map((item: any, i: number) => (
            <FileUploaderItem
              files={files}
              setFormat={setFiles}
              key={item.file.name}
              index={i}
            >
              <Paperclip className="h-4 w-4 stroke-current" />
              <span>{item.file.name}</span>
            </FileUploaderItem>
          ))}
      </FileUploaderContent>
      {files && files.length > 0 && (
        <Button
          variant={"default"}
          className="max-w-xl w-full mx-auto mt-6"
          onClick={async () => {
            const ffmpeg = await loadFFmpeg();
            for (const item of files) {
              await convert(ffmpeg, item.file, item.format);
            }
          }}
        >
          Convert
        </Button>
      )}
    </FileUploader>
  );
}
