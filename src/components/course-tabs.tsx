import { useState } from "react";
import parse from "html-react-parser";
import { CourseInfo } from "@/types/course";
import { cn } from "@/lib/utils";
// import VideoPlayer from "./video-player";
import lang from "@/lib/lang.json";
// import VideoPlayer from "./video-player";

window.M = {
  yui: {
    loader: {
      modules: {},
    },
    galleryversion: "2010.04.21-21-51",
  },
  pageloadstarttime: "2024-12-05T12:39:20.081Z",
  cfg: {
    wwwroot: "https://b-trend.digital",
    homeurl: {},
    sesskey: "GPuID4tskw",
    sessiontimeout: "28800",
    sessiontimeoutwarning: "1200",
    themerev: "1733229561",
    slasharguments: 1,
    theme: "space",
    iconsystemmodule: "core/icon_system_fontawesome",
    jsrev: "1733229561",
    admin: "admin",
    svgicons: true,
    usertimezone: "Europa/Berlin",
    language: "de",
    courseId: 18,
    courseContextId: 2077,
    contextid: 2633,
    contextInstanceId: 2117,
    langrev: 1733333137,
    templaterev: "1733229561",
    siteId: 1,
  },
  util: {
    pending_js: [],
    complete_js: [
      "init",
      "random67519ef7daaf07",
      "core/first",
      "filter_mathjaxloader/loader",
      "core/moodlenet/mutations",
      "core/reactive:registerInstance0",
      "core_courseformat/local/content/activity_header",
      "filter_generico/generico_amd",
      "theme_space/rui",
      "theme_space/backtotop",
      "core_block/edit",
      "theme_space/loader",
      "theme_space/loader:init",
      "core/notification",
      "core/log",
      "core/page_global",
      "core/utility",
      "core/storage_validation",
      "core/reactive:registerInstance1",
      "core/reactive:registerComponent2",
      "jq",
      "theme_space/drawers:open",
      "jq",
      "jq",
    ],
    help_popups: {},
  },
  str: {
    moodle: {
      lastmodified: "Zuletzt geändert",
      name: "Name",
      error: "Fehler",
      info: "Infos",
      yes: "Ja",
      no: "Nein",
      cancel: "Abbrechen",
      movecontent: "Verschieben {$a}",
      tocontent: "Zu '{$a}'",
      emptydragdropregion: "Leerer Bereich",
      confirm: "Bestätigen",
      areyousure: "Sind Sie sicher?",
      closebuttontitle: "Schließen",
      unknownerror: "Unbekannter Fehler",
      file: "Datei",
      url: "URL",
      collapseall: "Alles einklappen",
      expandall: "Alles aufklappen",
      changesmadereallygoaway:
        "Sie haben etwas verändert. Möchten Sie die Seite wirklich verlassen, ohne die Änderungen zu speichern?",
      addresourceoractivity: "Aktivität oder Material anlegen",
      upload: "Hochladen",
    },
    repository: {
      type: "Typ",
      size: "Größe",
      invalidjson: "Ungültiger JSON-Text",
      nofilesattached: "Keine Datei",
      filepicker: "Dateiauswahl",
      logout: "Abmelden",
      nofilesavailable: "Keine Dateien vorhanden",
      norepositoriesavailable:
        "Sie können hier zur Zeit keine Dateien hochladen.",
      fileexistsdialogheader: "Datei bereits vorhanden",
      fileexistsdialog_editor:
        "Eine Datei mit diesem Namen wurde bereits an den Text angehängt, den Sie gerade bearbeiten",
      fileexistsdialog_filemanager:
        "Eine Datei mit diesem Namen wurde bereits an den Text angehängt",
      renameto: "Nach '{$a}' umbenennen",
      referencesexist: "Es gibt {$a} Links zu dieser Datei.",
      select: "Wählen Sie",
    },
    admin: {
      confirmdeletecomments:
        "Möchten Sie die ausgewählten Kommentare wirklich löschen?",
      confirmation: "Bestätigung",
    },
    debug: {
      debuginfo: "Debug-Info",
      line: "Zeile",
      stacktrace: "Stack trace",
    },
    langconfig: {
      labelsep: ": ",
    },
    theme_space: {
      backtotopbutton: "Go to top",
    },
    core: {
      cancel: "Abbrechen",
      closebuttontitle: "Schließen",
      loading: "Laden ...",
      savechanges: "Änderungen speichern",
      movecoursesection: "Abschnitt verschieben",
      movecoursemodule: "Aktivität verschieben",
      confirm: "Bestätigen",
      delete: "Löschen",
      "moodlenet:sharetomoodlenet": "Freigeben für MoodleNet",
      "moodlenet:sharingto": "Teilen mit:",
      share: "Teilen",
    },
    core_form: {
      showless: "Weniger anzeigen ...",
      showmore: "Mehr anzeigen ...",
    },
    core_error: {
      dndmaxbytes:
        "Die Datei ist zu groß. Die maximal erlaubte Größe ist {$a->size}.",
      dndread: "Fehler beim Lesen der Datei",
      dndupload: "Fehler beim Hochladen der Datei",
      dndunkownfile: "Dieser Dateityp wird nicht unterstützt.",
    },
  },
  core_custom_menu: {},
  form: {},
  core: {
    notification: {},
    blockdraganddrop: {
      _isusingnewblocksmethod: true,
    },
    event: {
      FILTER_CONTENT_UPDATED: "filter-content-updated",
      EDITOR_CONTENT_RESTORED: "editor-content-restored",
      FORM_SUBMIT_AJAX: "form-submit-ajax",
    },
    globalEvents: {
      FORM_ERROR: "form_error",
      BLOCK_CONTENT_UPDATED: "block_content_updated",
    },
  },
  core_blocks: {},
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const currentLang: "de" | "en" = (window as any).M.cfg.language || "de";

const tabs = [
  {
    id: "tagesinhalte",
    label: currentLang === "de" ? "Tagesinhalte" : "Daily Content",
  },
  { id: "tagesfolien", label: currentLang === "de" ? "Tagesfolien" : "Slides" },
  {
    id: "präsentation",
    label: currentLang === "de" ? "Präsentation" : "Presentation",
  },
  {
    id: "chat",
    label: currentLang === "de" ? "Chat" : "Chat",
  },
  //   {
  //     id: "transcript",
  //     label: currentLang === "de" ? "Transkript" : "Transcript",
  //   },
];

export interface Cue {
  startTime: number;
  endTime: number;
  text: string;
}

interface CourseTabsProps {
  topic: CourseInfo;
}

export function CourseComponent({
  topic,
  videoURL,
}: {
  topic: CourseInfo;
  videoURL: string | null;
}) {
  return (
    <section className="w-full h-full">
      {videoURL ? (
        topic?.recording_ids?.includes(videoURL) && (
          // <VideoPlayer
          //   topic={topic}
          //   src={`https://vroom.b-trend.digital/presentation/${videoURL}/video/webcams.webm`}
          // />

          <iframe
            src={`https://vroom.b-trend.digital/recording/screenshare/${videoURL}`}
            className="mx-auto h-[75vh]  w-full"
          ></iframe>
        )
      ) : (
        <div className="font-bold w-full">{lang[currentLang].noVideo}</div>
      )}
      <CourseTabs topic={topic} />
    </section>
  );
}

export default function CourseTabs({ topic }: CourseTabsProps) {
  const [activeTab, setActiveTab] = useState("tagesinhalte");
  // const [activeCueIndex] = useState(-1);

  // const cues: Cue[] = [];

  return (
    <div className="mx-auto w-full">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full border-b border-left-color px-1 py-4 text-center text-sm font-medium",
                activeTab === tab.id
                  ? "border-primary/80 text-primary transition-all duration-300 ease-in-out"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              )}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="h-full w-full overflow-auto p-4">
        {activeTab === "tagesinhalte" && (
          <div className="h-[100vh]">{parse(topic?.tagesinhalte ?? "")}</div>
        )}
        {/* {activeTab === "transcript" && (
          <div className="h-[100vh]">
            <div>Transcript</div>
            <div className="space-y-4 w-full h-full">
              {cues.map((cue, index) => (
                <div
                  key={index}
                  className={`flex cursor-pointer ${
                    activeCueIndex === index ? "bg-blue-100" : ""
                  }`}
                >
                  <span className="w-12 flex-shrink-0 text-gray-500">
                    {formatTime(cue.startTime)}
                  </span>
                  <p className="flex-grow">{cue.text}</p>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {activeTab === "tagesfolien" && (
          <>
            {topic.tafelbild && topic.tafelbild !== "null" ? (
              <iframe
                className="w-full h-[100vh]"
                src={`/pluginfile.php/${topic.tafelbild}`}
              ></iframe>
            ) : (
              <div>Tafelbild content goes here</div>
            )}
          </>
        )}
        {activeTab === "präsentation" && (
          <>
            {topic.präsentation && topic.präsentation !== "null" ? (
              <iframe
                className="w-full h-[100vh]"
                src={`/pluginfile.php/${topic.präsentation}`}
              ></iframe>
            ) : (
              <div>Presentation content goes here</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
