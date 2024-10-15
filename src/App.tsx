import { SidebarLayout, SidebarTrigger } from "./components/ui/sidebar";

import { AppSidebar } from "./components/app-sidebar";
import { useEffect, useState } from "react";
import { CourseInfo } from "./types/course";
import VideoPlayer from "./components/video-player";
import CourseTabs from "./components/course-tabs";

declare global {
	interface Window {
		records: Array<CourseInfo>;
	}
}
window.records = [
	{
		record_id: "13",
		data_id: "8",
		course_module_id: "1732",
		datum: "1723420800",
		lernfeld: "\u00dcbertragungsmedien##Bereitstellen von Netzwerken",
		tagesinhalte:
			'<p dir="ltr" style="text-align:left;">Hier kommt eine Liste mit Themen, die heute gelaufen sind.</p><ul dir="ltr"><li style="text-align:left;">Thema 1</li><li style="text-align:left;">Thema 2</li><li style="text-align:left;">Themen\u00fcberleitung<br /></li></ul>',
		tafelbild: "/2233/mod_data/content/69/Montag.pdf",
		"pr\u00e4sentation": null,
		group_id: null,
		group_name: null,
		recording_id: null,
	},
	{
		record_id: "14",
		data_id: "8",
		course_module_id: "1732",
		datum: "1723593600",
		lernfeld: "Bereitstellen von Netzwerken",
		tagesinhalte:
			'<p dir="ltr" style="text-align:left;">Hier steht, was in dieser Session besprochen wurde.</p><ul dir="ltr"><li style="text-align:left;">Thema</li><li style="text-align:left;">Thema</li><li style="text-align:left;">\u00dcbersicht<br /></li></ul>',
		tafelbild: "/2233/mod_data/content/75/TS4_Series_-_User_Guide_-_v1.7.pdf",
		"pr\u00e4sentation":
			"/2233/mod_data/content/78/TS12Sub_-_User_Guide_-_v1.5.pdf",
		group_id: "29",
		group_name: "080802",
		recording_id: "10361ff58ca1008425f0ad6e8a82c85b0f52715e-1723613790047",
	},
	{
		record_id: "18",
		data_id: "8",
		course_module_id: "1732",
		datum: "1727136000",
		lernfeld: "\u00dcbertragungsmedien",
		tagesinhalte:
			'<p dir="ltr" style="text-align:left;">Inhalt eine ....<br /></p>',
		tafelbild: "/2233/mod_data/content/91/SQQ10-080801.pdf",
		"pr\u00e4sentation": null,
		group_id: "28",
		group_name: "080801",
		recording_id: "10361ff58ca1008425f0ad6e8a82c85b0f52715e-1727191060310",
	},
	{
		record_id: "19",
		data_id: "8",
		course_module_id: "1732",
		datum: "1727136000",
		lernfeld: "Bereitstellen von Netzwerken",
		tagesinhalte: '<p dir="ltr" style="text-align:left;">Blablbl <br /></p>',
		tafelbild: "/2233/mod_data/content/96/SQQ10 \u2013 Gruppe 080802.pdf",
		"pr\u00e4sentation":
			"/2233/mod_data/content/98/SQQ10 \u2013 Gruppe 080802 Pr\u00e4si.pdf",
		group_id: "29",
		group_name: "080802",
		recording_id: "10361ff58ca1008425f0ad6e8a82c85b0f52715e-1727191060310",
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
		"pr\u00e4sentation": null,
		group_id: "29",
		group_name: "080802",
		recording_id: "10361ff58ca1008425f0ad6e8a82c85b0f52715e-1728497433138",
	},
];

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
			className={`flex items-center z-50 py-1 fixed w-full justify-between transition-colors duration-300 ${
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

	const handleTopicChange = (topic: CourseInfo) => setCurrentTopic(topic);
	return (
		<section className="relative">
			<SidebarLayout defaultOpen>
				<AppSidebar
					topics={window.records ?? []}
					onClick={handleTopicChange}
					currentTopic={currentTopic}
				/>
				<main className="flex relative flex-col w-full transition-all duration-300 ease-in-out">
					<Header />
					<div className="flex-1 h-full w-full rounded-md p-2 mt-10">
						{currentTopic ? (
							<CourseComponent topic={currentTopic} />
						) : (
							<div>Select a topic</div>
						)}
					</div>
				</main>
			</SidebarLayout>
		</section>
	);
}

function CourseComponent({ topic }: { topic: CourseInfo }) {
	return (
		<section className="w-full h-full">
			{topic?.recording_id && (
				<VideoPlayer
					topic={topic}
					src={`https://vroom.b-trend.media/presentation/${topic.recording_id}/video/webcams.webm`}
				/>
			)}
			<CourseTabs topic={topic} />
		</section>
	);
}

export default App;
