import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IMAGE_EXTENSIONS } from "@/util/convert";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Trash2, Paperclip } from "lucide-react";

const config = {
  maxFiles: 20,
  maxSize: 20 * 1024 * 1024,
};

export function Fileupload({ setFiles }: any) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const newFiles = Array.from(fileList).map((file) => ({
        file,
        format: IMAGE_EXTENSIONS[0],
      }));
      setFiles((prev: any) => [...prev, ...newFiles]);
    }
    event.target.value = "";
  };
  return (
    <div>
      <Label htmlFor="files">Files</Label>
      <Input
        className="file:hidden"
        id="files"
        type="file"
        accept={IMAGE_EXTENSIONS.join(",")}
        max={config.maxFiles}
        size={config.maxSize}
        onChange={handleFileChange}
        multiple
      />
      <p className="mt-1 text-sm text-gray-500" id="file_input_help">
        Images only (MAX. 20MB)
      </p>
    </div>
  );
}

export function Fileitem({ item, setFiles, index }: any) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
      <div>
        <p>{item.file.name}</p>
      </div>
      <div className="flex gap-2 items-start flex-col md:flex-row ">
        <Select
          value={item.format}
          onValueChange={(newFormat: any) => {
            setFiles((prevFiles: any) =>
              prevFiles.map((item: any, i: number) =>
                i === index ? { ...item, format: newFormat } : item
              )
            );
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Formats</SelectLabel>
              {IMAGE_EXTENSIONS.map((item) => {
                return (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          type="button"
          className="w-10 h-10"
          size={"icon"}
          variant={"outline"}
          onClick={() => {
            setFiles((prevFiles: any) =>
              prevFiles.filter((_: any, i: number) => i !== index)
            );
          }}
        >
          <span className="sr-only">remove item {item.file.name}</span>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}