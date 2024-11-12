import { Menu, X } from "lucide-react";

import { useEffect, useState } from "react";
import { CourseComponent } from "./components/course-tabs";
import SideBar from "./components/custom-sidebar";
import { VideoTabs } from "./components/video-player";
import { CourseInfo } from "./types/course";

export interface Course {
	records: CourseInfo[];
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
	}
}

function App() {
	const [course, setCourse] = useState<Course | null>(null);
	const [currentTopic, setCurrentTopic] = useState<CourseInfo | null>(null);

	const [currentVideo, setCurrentVideo] = useState<string | null>(null);

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

	useEffect(() => {
		if (window.course) {
			setCourse({
				...window.course,
				records: window.course.records.filter(
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

	if (Object.keys(window.course.user.groups).length <= 0 && !isSuperUser) {
		return <div>Keine Gruppen gefunden</div>;
	}

	return (
		<div className="flex min-h-screen">
			<SideBar
				isOpen={isOpen}
				onClick={handleTopicChange}
				currentTopic={currentTopic}
				course={course}
			/>

			{/* Main content */}
			<main
				className={`flex-1 transition-all duration-300 border-l-2 overflow-auto ${
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

						<div className="min-h-10 mr-2">
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
					{currentTopic ? (
						<CourseComponent topic={currentTopic} videoURL={currentVideo} />
					) : (
						<div>Wählen Sie ein Thema</div>
					)}
				</div>
			</main>
		</div>
	);
}

export default App;
