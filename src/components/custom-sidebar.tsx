import { Course } from "@/App";
import { cn, parseMlangString } from "@/lib/utils";
import { CourseInfo } from "@/types/course";
import { useState } from "react";
import CustomSelect from "./custom-select";
import { CustomPopover } from "./popover";
import { Button } from "./ui/button";
import { SidebarContent, SidebarItem } from "./ui/sidebar";

interface SideBarProps {
	isOpen: boolean;
	onClick: (topic: CourseInfo | null, videoUrl: string | null) => void;
	course: Course | null;
	currentTopic: CourseInfo | null;
}

const SideBar = ({ course, isOpen, onClick, currentTopic }: SideBarProps) => {
	const callbackurl = `&backto=${new URLSearchParams(
		location.href
	).toString()}`;
	const [group, setGroup] = useState("all");

	return (
		<aside
			className={`absolute top-0 left-0 h-screen bg-white transition-all duration-200 ease-in-out break-before-auto overflow-auto ${
				isOpen ? "w-80" : "w-0"
			}`}
		>
			<header className="flex items-center min-h-14 justify-between border-bottom-2 px-2 p-1 border-b-2 sticky top-0 left-0 z-50 bg-primary-foreground/10 overflow-auto">
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
			</header>
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
										{parseMlangString(topic.lernfeld, "de")}
										<span className="block text-sm">{formatDate}</span>
									</Button>
									{!window.course.user.roles.includes("student") && (
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
				{!window.course.user.roles.includes("student") && (
					<SidebarItem>
						<Button asChild>
							<a
								href={`${
									location.origin
								}${import.meta.env.VITE_PUBLIC_MOODLE_ADD_URL?.replace(
									"module",
									course?.records[0].course_module_id ?? ""
								)}${callbackurl}`}
							>
								Add
							</a>
						</Button>
					</SidebarItem>
				)}
			</SidebarContent>
		</aside>
	);
};

export default SideBar;
