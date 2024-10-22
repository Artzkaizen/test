import { useState } from "react";
import parse from "html-react-parser";
import { CourseInfo } from "@/types/course";
import { cn, formatTime } from "@/lib/utils";

// import { useVideoStore } from "@/hooks/useVideoStore";
// import useFetchCues from "@/hooks/useFetchCues";

const tabs = [
	{ id: "tagesinhalte", label: "Tagesinhalte" },
	{ id: "tagesfolien", label: "Tagesfolien" },
	{ id: "präsentation", label: "Präsentation" },
	{ id: "discuss", label: "Discuss" },
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

export default function CourseTabs({ topic }: CourseTabsProps) {
	// const { currentTime } = useVideoStore();
	const [activeTab, setActiveTab] = useState("tagesinhalte");
	const [activeCueIndex] = useState(-1);

	// const cues = useFetchCues("/video.vtt", topic?.record_id ?? "");

	// const updateActiveCueIndex = () => {
	// 	const index = cues.data?.findIndex(
	// 		(cue) => currentTime >= cue.startTime && currentTime <= cue.endTime
	// 	);
	// 	setActiveCueIndex(index!);
	// };

	// useEffect(() => {
	// 	const index = cues.data?.findIndex(
	// 		(cue) => currentTime >= cue.startTime && currentTime <= cue.endTime
	// 	);
	// 	setActiveCueIndex(index!);
	// }, [currentTime, cues]);

	// if (!topic) {
	// 	return null;
	// }

	// useEffect(() => {
	// 	updateActiveCueIndex();
	// }, [currentTime, cues]);

	// if (!topic) {
	// 	return null;
	// }
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

			{activeTab === "tagesinhalte" && (
				<div>{parse(topic?.tagesinhalte ?? "")}</div>
			)}
			<div className="mt-4 h-[70vh] w-full overflow-auto p-4">
				{activeTab === "transcript" && (
					<div>
						<h2 className="text-lg font-semibold">Transcript</h2>
						<div className="space-y-4">
							{cues.map((cue, index) => (
								<div
									key={index}
									className={`flex cursor-pointer ${
										activeCueIndex === index ? "bg-blue-100" : ""
									}`}
									// onClick={() => onTranscriptClick(cue.startTime)}
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

				{activeTab === "tagesfolien" &&
					(topic.tafelbild ? (
						<iframe
							className="h-full w-full"
							src={`https://staging.b-trend.digital/pluginfile.php/${topic.tafelbild}`}
						></iframe>
					) : (
						<div className="h-[20vh] w-[50vw]">Tafelbild content goes here</div>
					))}
				{activeTab === "präsentation" &&
					(topic.präsentation ? (
						<iframe
							className="h-full w-full"
							src={`https://staging.b-trend.digital/pluginfile.php/${topic.präsentation}`}
						></iframe>
					) : (
						<div className="h-[20vh] w-[50vw]">
							Presentation content goes here
						</div>
					))}
				{activeTab === "discuss" && (
					<div className="h-[20vh] w-[50vw]">Discuss content goes here</div>
				)}
			</div>
		</div>
	);
}
