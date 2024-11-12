import { useState } from "react";
import parse from "html-react-parser";
import { CourseInfo } from "@/types/course";
import { cn, formatTime } from "@/lib/utils";
import VideoPlayer from "./video-player";

const tabs = [
	{ id: "tagesinhalte", label: "Tagesinhalte" },
	{ id: "tagesfolien", label: "Tagesfolien" },
	{ id: "präsentation", label: "Präsentation" },
	{ id: "transcript", label: "Transcript" },
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
					<VideoPlayer
						topic={topic}
						src={`https://vroom.b-trend.media/presentation/${videoURL}/video/webcams.webm`}
					/>
				)
			) : (
				<div className="font-bold w-full">Kein Video verfügbar</div>
			)}
			<CourseTabs topic={topic} />
		</section>
	);
}

export default function CourseTabs({ topic }: CourseTabsProps) {
	const [activeTab, setActiveTab] = useState("tagesinhalte");
	const [activeCueIndex] = useState(-1);

	const cues: Cue[] = [];

	return (
		<div className="mx-auto w-full">
			<div className="border-b border-gray-200">
				<nav className="-mb-px flex" aria-label="Tabs">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={cn(
								"w-full border-b-2 px-1 py-4 text-center text-sm font-medium",
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
				{activeTab === "transcript" && (
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
				)}

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
