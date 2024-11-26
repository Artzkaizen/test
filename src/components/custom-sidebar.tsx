import { Course } from "@/App";
import { canAddEdit, cn, parseMlangString } from "@/lib/utils";
import { CourseInfo } from "@/types/course";
import { PropsWithChildren, useState } from "react";
import CustomSelect from "./custom-select";
import { CustomPopover } from "./popover";
import { Button } from "./ui/button";
import { SidebarContent, SidebarItem } from "./ui/sidebar";
import lang from "@/lib/lang.json";
interface SideBarProps {
  isOpen: boolean;
  onClick: (topic: CourseInfo | null, videoUrl: string | null) => void;
  course: Course | null;
  currentTopic: CourseInfo | null;
}

const canEdit = canAddEdit(window.course?.user.roles ?? []);
const parseMulitpleTitles = (title: string) => title.split("##");

const SideBar = ({ course, isOpen, onClick, currentTopic }: SideBarProps) => {
  const callbackurl = `&backto=${new URLSearchParams(
    location.href
  ).toString()}`;
  const [group, setGroup] = useState("all");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentLang: "de" | "en" = (window as any).M.cfg.language || "de";

  if (!course?.records.length) {
    return (
      <SideBarWrapper
        isOpen={isOpen}
        group={group}
        setGroup={setGroup}
        onClick={onClick}
      >
        <SidebarItem className="py-2">
          {!canEdit ? (
            <p>{lang[currentLang].noTopic} </p>
          ) : (
            <Button asChild>
              <a
                href={`${
                  location.origin
                }${import.meta.env.VITE_PUBLIC_MOODLE_ADD_URL?.replace(
                  "module",
                  window?.course?.module.id ?? ""
                )}${callbackurl}`}
              >
                {lang[currentLang].addTopicText}
              </a>
            </Button>
          )}
        </SidebarItem>
      </SideBarWrapper>
    );
  }
  return (
    <SideBarWrapper
      isOpen={isOpen}
      group={group}
      setGroup={setGroup}
      onClick={onClick}
    >
      <SidebarContent className="p-2 oveflow-auto">
        {course?.records
          .filter(
            (topic) =>
              topic.lernfeld !== null &&
              (group === "all" || topic.group_name === group)
          )
          .map((topic) => {
            const formatDate = topic.datum
              ? new Date(Number(topic.datum) * 1000).toLocaleDateString("de-DE")
              : new Date().toLocaleDateString("de-DE");
            const lernfeld = parseMulitpleTitles(
              parseMlangString(topic.lernfeld, "de")
            );
            return (
              <SidebarItem key={topic.record_id} className="p-0">
                <div
                  className={cn(
                    "relative group hover:bg-primary/10 transition-all rounded duration-300 group-hover:block",
                    {
                      "bg-primary/10 *:font-semibold border-l-4 border-primary":
                        topic.record_id === currentTopic?.record_id,
                    }
                  )}
                >
                  <Button
                    onClick={() => onClick(topic, topic.recording_ids[0])}
                    variant="ghost"
                    className={cn(
                      "text-start flex h-fit flex-col w-full text-balance font-medium px-0 pl-1 items-start justify-start border-primary hover:bg-transparent break-words"
                    )}
                  >
                    {lernfeld.map((thema, index) => (
                      <span key={thema + index}>{thema} </span>
                    ))}
                    <span className="block text-sm">{formatDate}</span>
                  </Button>
                  {canEdit && (
                    <CustomPopover
                      classname="group-hover:opacity-100"
                      record={topic.record_id}
                      data={topic.data_id}
                      callbackurl={callbackurl}
                    />
                  )}
                </div>
              </SidebarItem>
            );
          })}
        {canEdit && (
          <SidebarItem>
            <Button asChild>
              <a
                href={`${
                  location.origin
                }${import.meta.env.VITE_PUBLIC_MOODLE_ADD_URL?.replace(
                  "module",
                  course.module.id ?? ""
                )}${callbackurl}`}
              >
                {lang[currentLang].addTopicText}
              </a>
            </Button>
          </SidebarItem>
        )}
      </SidebarContent>
    </SideBarWrapper>
  );
};

interface SideBarWrapperProps extends PropsWithChildren {
  isOpen: boolean;
  group: string;
  setGroup: React.Dispatch<React.SetStateAction<string>>;
  onClick: (topic: CourseInfo | null, videoUrl: string | null) => void;
}

const SideBarWrapper = ({
  children,
  isOpen,
  group,
  onClick,
  setGroup,
}: SideBarWrapperProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentLang: "de" | "en" = (window as any).M.cfg.language || "de";
  return (
    <aside
      className={`absolute top-0 left-0 h-screen bg-white transition-all duration-200 ease-in-out break-before-auto overflow-auto ${
        isOpen ? "w-80" : "w-0"
      }`}
    >
      <header className="flex items-center min-h-14 justify-between border-bottom px-2 p-1 border-b-2 sticky top-0 left-0 z-50 bg-primary-foreground/10 overflow-auto">
        <span className="font-bold">{lang[currentLang].overviewTitle}</span>
        <CustomSelect
          group={group}
          onSelectChange={(value: string) => {
            setGroup(value);
            onClick(null, null);
          }}
          className="w-fit ml-auto"
          label={"Alle Teilnehmer/innen"}
          placeholder={"Getrennte Gruppen"}
        />
      </header>
      {children}
    </aside>
  );
};

export default SideBar;
