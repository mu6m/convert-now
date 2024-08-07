"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import convert from "@/util/convert";
import loadFFmpeg from "@/util/load-ffmpeg";
import { Fileitem, Fileupload } from "@/components/upload";
import { Loader2Icon } from "lucide-react";

export default function Comp() {
  const [files, setFiles] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-white shadow-xl rounded-lg flex flex-col items-center p-10 gap-4">
      <Fileupload setFiles={setFiles} files={files} />
      <div className="px-2 flex flex-col gap-4">
        {files.map((item: any, index: number) => {
          return (
            <Fileitem
              key={index}
              item={item}
              setFiles={setFiles}
              index={index}
            />
          );
        })}
      </div>
      {files.length > 0 && (
        <Button
          variant={"default"}
          className="max-w-xl w-full mx-auto mt-6"
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            try {
              const ffmpeg = await loadFFmpeg();
              for (const item of files) {
                await convert(ffmpeg, item.file, item.format);
              }
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>Convert</>
          )}
        </Button>
      )}
    </div>
  );
}
