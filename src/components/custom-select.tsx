import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { canAddEdit, cn } from "@/lib/utils";
import lang from "@/lib/lang.json";

const canEdit = canAddEdit(window.course?.user.roles ?? []);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const currentLang: "de" | "en" = (window as any).M.cfg.language || "de";
interface CustomSelectProps {
  label?: string;

  group: string;
  onSelectChange: (value: string) => void;
  className?: string;
  placeholder: string;
}

export default function CustomSelect({
  group,
  onSelectChange,
  className,
  placeholder,
}: CustomSelectProps) {
  const isSuperUser =
    window.course &&
    (window.course.user.roles.includes("mitarbeiter") ||
      window.course.user.roles.includes("manager"));
  const uniqueGroups = Array.from(
    new Map(
      window.course.records
        .filter((item) =>
          item.group_id && item.group_name && isSuperUser
            ? true
            : window.course.user.groups[item.group_id ?? ""]
        )
        .map((item) => [
          item.group_id,
          { group_id: item.group_id, group_name: item.group_name },
        ])
    ).values()
  );
  const hasMultipleGroups = !(uniqueGroups.length <= 1);

  return (
    <>
      {(hasMultipleGroups || canEdit) && (
        <Select defaultValue={group} onValueChange={onSelectChange}>
          <SelectTrigger className={cn("w-[180px]", className)}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">
                {lang[currentLang].groupDrownTitle}{" "}
              </SelectItem>
              {uniqueGroups.map(
                (item) =>
                  item.group_id && (
                    <SelectItem
                      key={item.group_id}
                      value={item.group_name ?? ""}
                    >
                      {item.group_name}
                    </SelectItem>
                  )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </>
  );
}
