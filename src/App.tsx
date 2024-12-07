import { Menu, X } from "lucide-react";

import { useEffect, useState } from "react";
import { CourseComponent } from "./components/course-tabs";
import SideBar from "./components/custom-sidebar";
import { VideoTabs } from "./components/video-player";
import { CourseInfo } from "./types/course";

export interface CourseModule {
  id: string;
  course: string;
  module: string;
  instance: string;
  section: string;
  idnumber: string;
  added: string; // Unix timestamp, you might want to parse it to a Date object in the code
  score: string;
  indent: string;
  visible: string;
  visibleoncoursepage: string;
  visibleold: string;
  groupmode: string;
  groupingid: string;
  completion: string;
  completiongradeitemnumber: string | null; // It can be a string or null
  completionview: string;
  completionexpected: string;
  completionpassgrade: string;
  showdescription: string;
  availability: string | null; // It can be a string or null
  deletioninprogress: string;
  downloadcontent: string;
  lang: string;
}
export interface Course {
  records: CourseInfo[];
  module: CourseModule;
  user: {
    id: string;
    groups: {
      [key: string]: string;
    };
    roles: string[];
  };
}

declare global {
  interface Window {
    sk: string;

    course: Course;
    M: unknown;
  }
}

window.course = {
  user: {
    id: "10",
    roles: ["student"],
    groups: {
      "35": "070116",
      "36": "070117",
    },
  },
  records: [
    {
      record_id: "26",
      data_id: "19",
      course_module_id: "2195",
      datum: "1733356800",
      lernfeld: "Übertragungsmedien",
      tagesinhalte: "<p>Hier steht die Beschreibung von heute</p>",
      tafelbild: "/2772/mod_data/content/138/070117 Tagesfolie.pdf",
      präsentation: "/2772/mod_data/content/140/070117 Präsi.pdf",
      group_id: "36",
      group_name: "070117",
      recording_ids: [
        "f84b1d2a46b389d3e3bda1b2b7584d995d3a2405-1733376974473",
        "f84b1d2a46b389d3e3bda1b2b7584d995d3a2405-1733378282096",
        "f84b1d2a46b389d3e3bda1b2b7584d995d3a2405-1733379516806",
        "f84b1d2a46b389d3e3bda1b2b7584d995d3a2405-1733387204227",
        "f84b1d2a46b389d3e3bda1b2b7584d995d3a2405-1733387984119",
      ],
    },
    {
      record_id: "24",
      data_id: "19",
      course_module_id: "2195",
      datum: "1733270400",
      lernfeld: "Übertragungsmedien",
      tagesinhalte:
        "<p> - Themenpunkt 1</p>\r\n<p> - Themenpunkt 2</p>\r\n<p> - Themenpunkt 3</p>\r\n<p> - Themenpunkt 4</p>",
      tafelbild: "/2772/mod_data/content/128/070116 - Tagesfolie.pdf",
      präsentation: "/2772/mod_data/content/130/070116 - Präsi.pdf",
      group_id: "35",
      group_name: "070116",
      recording_ids: ["c2258062908821e4b78086c5a7c0ce6e4ef44512-1733316570833"],
    },
    {
      record_id: "25",
      data_id: "19",
      course_module_id: "2195",
      datum: "1733270400",
      lernfeld: "Netzwerksicherheit",
      tagesinhalte:
        "<p>_ Inhalt 1</p>\r\n<p>_ Inhalt 2</p>\r\n<p>_ inhalt 3</p>\r\n<p></p>",
      tafelbild: "/2772/mod_data/content/133/070117 Tagesfolie.pdf",
      präsentation: "/2772/mod_data/content/135/070117 Präsi.pdf",
      group_id: "36",
      group_name: "070117",
      recording_ids: ["f84b1d2a46b389d3e3bda1b2b7584d995d3a2405-1733317363416"],
    },
    {
      record_id: "11",
      data_id: "2",
      course_module_id: "2202",
      datum: "1722211200",
      lernfeld: "null",
      tagesinhalte: "null",
      tafelbild: "null",
      präsentation: "null",
      group_id: "null",
      group_name: "null",
      recording_ids: [],
    },
    {
      record_id: "2",
      data_id: "2",
      course_module_id: "2202",
      datum: "1721865600",
      lernfeld: "null",
      tagesinhalte: "null",
      tafelbild: "null",
      präsentation: "null",
      group_id: "null",
      group_name: "null",
      recording_ids: [],
    },
    {
      record_id: "9",
      data_id: "2",
      course_module_id: "2202",
      datum: "1716336000",
      lernfeld: "null",
      tagesinhalte: "null",
      tafelbild: "null",
      präsentation: "null",
      group_id: "null",
      group_name: "null",
      recording_ids: [],
    },
    {
      record_id: "12",
      data_id: "2",
      course_module_id: "2202",
      datum: "1715644800",
      lernfeld: "null",
      tagesinhalte: "null",
      tafelbild: "null",
      präsentation: "null",
      group_id: "null",
      group_name: "null",
      recording_ids: [],
    },
    {
      record_id: "10",
      data_id: "2",
      course_module_id: "2202",
      datum: "1709596800",
      lernfeld: "null",
      tagesinhalte: "null",
      tafelbild: "null",
      präsentation: "null",
      group_id: "null",
      group_name: "null",
      recording_ids: [],
    },
  ],
  module: {
    id: "2195",
    course: "45",
    module: "6",
    instance: "19",
    section: "318",
    idnumber: "menu_dailylogs_db",
    added: "1722275756",
    score: "0",
    indent: "0",
    visible: "1",
    visibleoncoursepage: "0",
    visibleold: "1",
    groupmode: "1",
    groupingid: "0",
    completion: "0",
    completiongradeitemnumber: null,
    completionview: "0",
    completionexpected: "0",
    completionpassgrade: "0",
    showdescription: "0",
    availability: null,
    deletioninprogress: "0",
    downloadcontent: "1",
    lang: "",
  },
};
function App() {
  const [course, setCourse] = useState<Course | null>(null);
  const [currentTopic, setCurrentTopic] = useState<CourseInfo | null>();

  const [currentVideo, setCurrentVideo] = useState<string | null>();
  const isSuperUser =
    window.course.user.roles.includes("mitarbeiter") ||
    window.course.user.roles.includes("manager");

  const handleTopicChange = (
    topic: CourseInfo | null,
    video: string | null
  ) => {
    setCurrentTopic(topic);
    setCurrentVideo(video);
  };
  const [isOpen, setIsOpen] = useState(true);

  const formatDate = (timestamp: string) => {
    const parsedDate = new Date(Number(timestamp) * 1000);
    return isNaN(parsedDate.getTime()) ? 0 : parsedDate.getTime();
  };

  useEffect(() => {
    if (window.course) {
      setCourse({
        ...window.course,
        records: window.course.records
          .sort((a, b) => formatDate(b.datum) - formatDate(a.datum))
          .filter(
            (c) =>
              (isSuperUser
                ? true
                : Object.prototype.hasOwnProperty.call(
                    window.course.user.groups,
                    c.group_id ?? ""
                  )) && c.lernfeld !== null
          ),
      });
    }
  }, [isSuperUser]);

  useEffect(() => {
    if (course?.records.length && course) {
      setCurrentTopic(course.records[0] ?? null);
      setCurrentVideo(course.records[0].recording_ids[0] ?? null);
    }
  }, [course]);

  return (
    <div className="flex min-h-screen">
      <SideBar
        isOpen={isOpen}
        onClick={handleTopicChange}
        currentTopic={currentTopic ?? null}
        course={course}
      />

      {/* Main content */}
      <main
        className={`flex-1 transition-all duration-300 border-l overflow-auto ${
          isOpen ? "ml-80" : "ml-0"
        }`}
      >
        {/* Fixed header with scroll effect */}
        <header
          className={`absolute right-0 z-50 bg-primary-foreground/10 transition-all h-14 duration-300 ${
            isOpen ? "left-80" : "left-0"
          }`}
        >
          <div className="flex justify-between items-center px-2 py-1 mr-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

            <div className="min-h-10 mr-1">
              {currentTopic && currentTopic.recording_ids.length > 1 && (
                <VideoTabs
                  onClick={handleTopicChange}
                  topic={currentTopic}
                  videoIds={currentTopic.recording_ids}
                  currentVideo={currentVideo ?? ""}
                />
              )}
            </div>
          </div>
        </header>

        {/* Main content area with padding for fixed header */}
        <div className="flex-1 w-full rounded-md mt-16 p-2">
          {currentTopic && (
            <CourseComponent
              topic={currentTopic}
              videoURL={currentVideo ?? null}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
