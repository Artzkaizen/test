import { SidebarTrigger } from "./components/ui/sidebar";

import { CustomSidebar } from "./components/sidebar";
import { useEffect, useState } from "react";
import { CourseInfo } from "./types/course";
import VideoPlayer from "./components/video-player";
import CourseTabs from "./components/course-tabs";
// import VideoPlayer from "./components/video-player";
// import CourseTabs from "./components/course-tabs";

export interface Course {
	records: CourseInfo[];
	user: {
		id: string;
		roles: string[];
	};
}
declare global {
	interface Window {
		sk: string;

		course: Course;
	}
}

window.course = {
	user: {
		id: "10",
		roles: ["editingteacher"],
	},
	records: [
		{
			record_id: "14",
			data_id: "8",
			course_module_id: "1732",
			datum: "1723593600",
			lernfeld: "Bereitstellen von Netzwerken",
			tagesinhalte:
				'<p dir="ltr" style="text-align:left;">Hier steht, was in dieser Session besprochen wurde.</p><ul dir="ltr"><li style="text-align:left;">Thema</li><li style="text-align:left;">Thema</li><li style="text-align:left;">Übersicht<br /></li></ul>',
			tafelbild: "/2233/mod_data/content/75/TS4_Series_-_User_Guide_-_v1.7.pdf",
			präsentation: "/2233/mod_data/content/78/TS12Sub_-_User_Guide_-_v1.5.pdf",
			group_id: "29",
			group_name: "080802",
			recording_ids: ["10361ff58ca1008425f0ad6e8a82c85b0f52715e-1723613790047"],
		},
		{
			record_id: "18",
			data_id: "8",
			course_module_id: "1732",
			datum: "1727136000",
			lernfeld: "Übertragungsmedien",
			tagesinhalte:
				'<p dir="ltr" style="text-align:left;">Inhalt eine ....<br /></p>',
			tafelbild: "/2233/mod_data/content/91/SQQ10-080801.pdf",
			präsentation: null,
			group_id: "28",
			group_name: "080801",
			recording_ids: [
				"8309e2af2865f2e2d275877e469a7ced45ea1878-1727189961553",
				"8309e2af2865f2e2d275877e469a7ced45ea1878-1727191005087",
				"10361ff58ca1008425f0ad6e8a82c85b0f52715e-1727191060310",
			],
		},
		{
			record_id: "19",
			data_id: "8",
			course_module_id: "1732",
			datum: "1727136000",
			lernfeld: "Bereitstellen von Netzwerken",
			tagesinhalte: '<p dir="ltr" style="text-align:left;">Blablbl <br /></p>',
			tafelbild: "/2233/mod_data/content/96/SQQ10 – Gruppe 080802.pdf",
			präsentation: "/2233/mod_data/content/98/SQQ10 – Gruppe 080802 Präsi.pdf",
			group_id: "29",
			group_name: "080802",
			recording_ids: [
				"8309e2af2865f2e2d275877e469a7ced45ea1878-1727189961553",
				"8309e2af2865f2e2d275877e469a7ced45ea1878-1727191005087",
				"10361ff58ca1008425f0ad6e8a82c85b0f52715e-1727191060310",
			],
		},
		{
			record_id: "21",
			data_id: "8",
			course_module_id: "1732",
			datum: "1728432000",
			lernfeld: "{mlang en}Network Basics{mlang} {mlang de}Grundlagen{mlang}",
			tagesinhalte:
				'<p dir="ltr" style="text-align:left;">Video von Neuseeland</p><p dir="ltr" style="text-align:left;"><a href="https://www.youtube.com/watch?v=vtxVK3sbZ0o" target="_blank" rel="noreferrer noopener">Link zu Youtube</a><br /></p>',
			tafelbild: "null",
			präsentation: null,
			group_id: "29",
			group_name: "080802",
			recording_ids: ["10361ff58ca1008425f0ad6e8a82c85b0f52715e-1728497433138"],
		},
	],
};

const Header = () => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			style={{ width: "calc(100% - 20rem)" }}
			className={`flex items-center z-50 py-1 fixed justify-between transition-colors duration-300 ${
				scrolled ? "bg-secondary/90" : "bg-transparent"
			}`}
		>
			<SidebarTrigger />
			{"{email}"}
		</header>
	);
};

function App() {
	const [currentTopic, setCurrentTopic] = useState<CourseInfo | null>(null);
	const [currentVideo, setCurrentVideo] = useState<string | null>(null);

	const handleTopicChange = (
		topic: CourseInfo | null,
		video: string | null
	) => {
		setCurrentTopic(topic);
		setCurrentVideo(video);
	};

	return (
		<main className="flex relative w-full transition-all duration-300 ease-in-out">
			<nav className="w-80 fixed top-0 z-50 overflow-auto">
				<CustomSidebar
					onClick={handleTopicChange}
					currentTopic={currentTopic}
					course={window.course ?? null}
				/>
			</nav>
			<section className="w-full ml-80">
				<Header />
				<div className="flex-1 rounded-md  p-2 mt-10 overflow-clip">
					{currentTopic ? (
						<CourseComponent topic={currentTopic} videoURL={currentVideo} />
					) : (
						<div>Select a topic</div>
					)}
				</div>
			</section>
		</main>
	);
}

function CourseComponent({
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
					<VideoPlayer
						topic={topic}
						src={`https://vroom.b-trend.media/presentation/${videoURL}/video/webcams.webm`}
					/>
				)
			) : (
				<div className="bg-red-200 w-full">Select a video</div>
			)}
			<CourseTabs topic={topic} />
		</section>
	);
}

export default App;
