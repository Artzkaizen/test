import { canDelete, cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import lang from "@/lib/lang.json";

export function CustomPopover({
  data,
  record,
  callbackurl,
  classname,
}: {
  callbackurl?: string;
  classname?: string;
  record: string;
  data: string;
}) {
  const editUrl = (data: string, record: string) => {
    const string = import.meta.env.VITE_PUBLIC_MOODLE_EDIT_URL;
    return (
      string
        ?.replace("base", data)
        .replace("record", record)
        .replace("dbsk", window.sk) + callbackurl
    );
  };

  const deleteUrl = import.meta.env.VITE_PUBLIC_MOODLE_DELETE_URL.replace(
    "dbsk",
    window.sk
  ).replace("record", record);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentLang: "de" | "en" = (window as any).M.cfg.language || "de";
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className={cn("absolute right-0 top-0 z-50 opacity-0", classname)}
      >
        <Button
          variant="outline"
          className="border-0 bg-transparent p-1 shadow-none"
        >
          <DotsHorizontalIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col gap-1 p-1">
        <Button variant="ghost" asChild>
          <a href={editUrl(data, record) ?? ""}>
            {lang[currentLang].editTopicText}
          </a>
        </Button>
        {canDelete(window.course?.user.roles ?? []) && (
          <Button variant="ghost" asChild>
            <a href={deleteUrl}>{lang[currentLang].deleteTopicText} </a>
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
}
