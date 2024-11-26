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

// window.course = {
//   user: {
//     id: "10",
//     groups: [],
//     roles: ["manager"],
//   },
//   records: [
//     {
//       record_id: "14",
//       data_id: "8",
//       course_module_id: "1732",
//       datum: "1723593600",
//       lernfeld: "Bereitstellen von Netzwerken",
//       tagesinhalte:
//         '<p dir="ltr" style="text-align:left;">Hier steht, was in dieser Session besprochen wurde.</p><ul dir="ltr"><li style="text-align:left;">Thema</li><li style="text-align:left;">Thema</li><li style="text-align:left;">Übersicht<br /></li></ul>',
//       tafelbild: "/2233/mod_data/content/75/TS4_Series_-_User_Guide_-_v1.7.pdf",
//       präsentation: "/2233/mod_data/content/78/TS12Sub_-_User_Guide_-_v1.5.pdf",
//       group_id: "29",
//       group_name: "080802",
//       recording_ids: ["10361ff58ca1008425f0ad6e8a82c85b0f52715e-1723613790047"],
//     },
//     {
//       record_id: "18",
//       data_id: "8",
//       course_module_id: "1732",
//       datum: "1727136000",
//       lernfeld: "Übertragungsmedien",
//       tagesinhalte:
//         '<p dir="ltr" style="text-align:left;">Inhalt eine ....<br /></p>',
//       tafelbild: "/2233/mod_data/content/91/SQQ10-080801.pdf",
//       präsentation: null,
//       group_id: "28",
//       group_name: "080801",
//       recording_ids: [
//         "8309e2af2865f2e2d275877e469a7ced45ea1878-1727189961553",
//         "8309e2af2865f2e2d275877e469a7ced45ea1878-1727191005087",
//         "10361ff58ca1008425f0ad6e8a82c85b0f52715e-1727191060310",
//       ],
//     },
//     {
//       record_id: "19",
//       data_id: "8",
//       course_module_id: "1732",
//       datum: "1727136000",
//       lernfeld: "Bereitstellen von Netzwerken",
//       tagesinhalte: '<p dir="ltr" style="text-align:left;">Blablbl <br /></p>',
//       tafelbild: "/2233/mod_data/content/96/SQQ10 – Gruppe 080802.pdf",
//       präsentation: "/2233/mod_data/content/98/SQQ10 – Gruppe 080802 Präsi.pdf",
//       group_id: "29",
//       group_name: "080802",
//       recording_ids: [
//         "8309e2af2865f2e2d275877e469a7ced45ea1878-1727189961553",
//         "8309e2af2865f2e2d275877e469a7ced45ea1878-1727191005087",
//         "10361ff58ca1008425f0ad6e8a82c85b0f52715e-1727191060310",
//       ],
//     },
//     {
//       record_id: "21",
//       data_id: "8",
//       course_module_id: "1732",
//       datum: "1728432000",
//       lernfeld: "{mlang en}Network Basics{mlang} {mlang de}Grundlagen{mlang}",
//       tagesinhalte:
//         '<p dir="ltr" style="text-align:left;">Video von Neuseeland</p><p dir="ltr" style="text-align:left;"><a href="https://www.youtube.com/watch?v=vtxVK3sbZ0o" target="_blank" rel="noreferrer noopener">Link zu Youtube</a><br /></p>',
//       tafelbild: "null",
//       präsentation: null,
//       group_id: "29",
//       group_name: "080802",
//       recording_ids: ["10361ff58ca1008425f0ad6e8a82c85b0f52715e-1728497433138"],
//     },
//   ],
// };

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
