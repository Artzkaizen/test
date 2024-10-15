import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarItem,
} from "@/components/ui/sidebar";
import { cn, parseMlangString } from "@/lib/utils";
import { CourseInfo } from "@/types/course";
import { CustomPopover } from "./popover";
import CustomSelect from "./custom-select";
import { useState } from "react";

export function AppSidebar({
	topics,
	onClick,
	currentTopic,
}: {
	topics: CourseInfo[];
	currentTopic: CourseInfo | null;
	onClick: (topic: CourseInfo) => void;
}) {
	const [group, setGroup] = useState("all");
	return (
		<Sidebar className="oveflow-hidden break-before-auto">
			<SidebarHeader>
				<span className="font-bold">Übersicht</span>
				<CustomSelect
					group={group}
					onSelectChange={(value: string) => setGroup(value)}
					className="w-fit ml-auto"
					label={"Alle Teilnehmer/innen"}
					placeholder={"Getrennte Gruppen"}
				/>
			</SidebarHeader>
			<SidebarContent>
				{topics
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
							<SidebarItem key={topic.record_id}>
								<Button
									onClick={() => onClick(topic)}
									variant="ghost"
									className={cn(
										"group relative *:text-start flex h-fit flex-col items-start justify-start rounded border-primary transition-all duration-300 group-hover:block *:text-foreground",
										{
											"bg-primary/10 *:font-semibold border-l-4 border-primary":
												topic.record_id === currentTopic?.record_id,
										}
									)}
								>
									<span className="w-64 overflow-hidden text-clip text-balance font-medium">
										{parseMlangString(topic.lernfeld, "de")}
									</span>
									<span className="block text-sm">{formatDate}</span>
									<CustomPopover
										classname="group-hover:opacity-100"
										record={topic.record_id}
										data={topic.data_id}
									/>
								</Button>
							</SidebarItem>
						);
					})}
				<SidebarItem>
					<Button>
						<a
							href={`${import.meta.env.VITE_PUBLIC_MOODLE_ADD_URL?.replace(
								"module",
								topics[0].course_module_id
							)}`}
						>
							Add
						</a>
					</Button>
				</SidebarItem>
			</SidebarContent>
		</Sidebar>
	);
}
