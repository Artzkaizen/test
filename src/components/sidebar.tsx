import { Course } from "@/App";
import { Button } from "@/components/ui/button";
import {
	SidebarContent,
	SidebarHeader,
	SidebarItem,
} from "@/components/ui/sidebar";
import { cn, parseMlangString } from "@/lib/utils";
import { CourseInfo } from "@/types/course";
import { useState } from "react";
import CustomSelect from "./custom-select";
import { CustomPopover } from "./popover";

export function CustomSidebar({
	course,
	onClick,
	currentTopic,
}: {
	course: Course | null;
	currentTopic: CourseInfo | null;
	onClick: (topic: CourseInfo | null, videoUrl: string | null) => void;
}) {
	const [group, setGroup] = useState("all");
	const [activeVideo, setActiveVideo] = useState<{
		url: string | null;
		id: string;
	} | null>(null);

	const handleVideoClick = (
		topic: CourseInfo | null,
		videoUrl: string | null,
		id: string
	) => {
		setActiveVideo({ url: videoUrl, id });
		onClick(topic, videoUrl);
	};

	return (
		<section className="break-before-auto border-r-2 overflow-auto">
			<SidebarHeader className="sticky top-0 left-0 z-50 bg-primary-foreground/10">
				<span className="font-bold">Übersicht</span>
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
			</SidebarHeader>
			<SidebarContent className="p-0 oveflow-auto ">
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
										onClick={() => onClick(topic, null)}
										variant="ghost"
										className={cn(
											"text-start flex h-fit flex-col w-full text-balance font-medium px-0 pl-1 items-start justify-start border-primary hover:bg-transparent break-words"
										)}
									>
										{parseMlangString(topic.lernfeld, "de")}
										<span className="block text-sm">{formatDate}</span>
									</Button>
									<CustomPopover
										classname="group-hover:opacity-100"
										record={topic.record_id}
										data={topic.data_id}
										user={course.user}
									/>
								</div>
								{topic.recording_ids && (
									<div>
										{topic.recording_ids?.map((videoUrl, idx) => (
											<Button
												key={videoUrl + idx}
												onClick={() =>
													handleVideoClick(
														topic,
														videoUrl ?? null,
														topic.record_id + idx
													)
												}
												variant="ghost"
												className={cn(
													"flex w-full flex-col ml-2 m-0 pt-0 mt-0  justify-start text-start items-start transition-all duration-300",
													{
														"*:font-semibold text-primary ":
															topic.record_id === currentTopic?.record_id &&
															activeVideo?.url === videoUrl &&
															activeVideo?.id === topic.record_id + idx,
													}
												)}
											>
												|---- Video Teil {idx + 1}
											</Button>
										))}
									</div>
								)}
							</SidebarItem>
						);
					})}
				<SidebarItem>
					<Button asChild>
						<a
							href={`${import.meta.env.VITE_PUBLIC_MOODLE_ADD_URL?.replace(
								"module",
								course?.records[0].course_module_id ?? ""
							)}`}
						>
							Add
						</a>
					</Button>
				</SidebarItem>
			</SidebarContent>
		</section>
	);
}
