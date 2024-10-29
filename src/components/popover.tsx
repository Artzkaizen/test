import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export function CustomPopover({
	user,
	data,
	record,
	classname,
}: {
	user: {
		id: string;
		roles: string[];
	};
	classname?: string;
	record: string;
	data: string;
}) {
	const editUrl = (data: string, record: string) => {
		const string = import.meta.env.VITE_PUBLIC_MOODLE_EDIT_URL;
		return string
			?.replace("base", data)
			.replace("record", record)
			.replace("dbsk", window.sk);
	};

	const deleteUrl = import.meta.env.VITE_PUBLIC_MOODLE_DELETE_URL.replace(
		"dbsk",
		window.sk
	);

	return (
		<Popover>
			<PopoverTrigger
				asChild
				className={cn("absolute right-0 top-0 z-50 opacity-0", classname)}
			>
				<Button
					variant="outline"
					className="border-0 bg-transparent p-1 shadow-none"
				>
					<DotsHorizontalIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="flex w-fit flex-col gap-1 p-1">
				<Button variant="ghost" asChild>
					<a href={editUrl(data, record) ?? ""}>Edit</a>
				</Button>
				{user.roles.includes("editingteacher") && (
					<Button variant="ghost" asChild>
						<a href={deleteUrl}>Delete</a>
					</Button>
				)}
			</PopoverContent>
		</Popover>
	);
}

// window.course = {
// 	user: {
// 		id: "10",
// 		roles: ["editingteacher"],
// 	},
// 	records: [
// 		{
// 			record_id: "14",
// 			data_id: "8",
// 			course_module_id: "1732",
// 			datum: "1723593600",
// 			lernfeld: "Bereitstellen von Netzwerken",
// 			tagesinhalte:
// 				'<p dir="ltr" style="text-align:left;">Hier steht, was in dieser Session besprochen wurde.</p><ul dir="ltr"><li style="text-align:left;">Thema</li><li style="text-align:left;">Thema</li><li style="text-align:left;">Übersicht<br /></li></ul>',
// 			tafelbild: "/2233/mod_data/content/75/TS4_Series_-_User_Guide_-_v1.7.pdf",
// 			präsentation: "/2233/mod_data/content/78/TS12Sub_-_User_Guide_-_v1.5.pdf",
// 			group_id: "29",
// 			group_name: "080802",
// 			recording_ids: ["10361ff58ca1008425f0ad6e8a82c85b0f52715e-1723613790047"],
// 		},
// 		{
// 			record_id: "18",
// 			data_id: "8",
// 			course_module_id: "1732",
// 			datum: "1727136000",
// 			lernfeld: "Übertragungsmedien",
// 			tagesinhalte:
// 				'<p dir="ltr" style="text-align:left;">Inhalt eine ....<br /></p>',
// 			tafelbild: "/2233/mod_data/content/91/SQQ10-080801.pdf",
// 			präsentation: null,
// 			group_id: "28",
// 			group_name: "080801",
// 			recording_ids: [
// 				"8309e2af2865f2e2d275877e469a7ced45ea1878-1727189961553",
// 				"8309e2af2865f2e2d275877e469a7ced45ea1878-1727191005087",
// 				"10361ff58ca1008425f0ad6e8a82c85b0f52715e-1727191060310",
// 			],
// 		},
// 		{
// 			record_id: "19",
// 			data_id: "8",
// 			course_module_id: "1732",
// 			datum: "1727136000",
// 			lernfeld: "Bereitstellen von Netzwerken",
// 			tagesinhalte: '<p dir="ltr" style="text-align:left;">Blablbl <br /></p>',
// 			tafelbild: "/2233/mod_data/content/96/SQQ10 – Gruppe 080802.pdf",
// 			präsentation: "/2233/mod_data/content/98/SQQ10 – Gruppe 080802 Präsi.pdf",
// 			group_id: "29",
// 			group_name: "080802",
// 			recording_ids: [
// 				"8309e2af2865f2e2d275877e469a7ced45ea1878-1727189961553",
// 				"8309e2af2865f2e2d275877e469a7ced45ea1878-1727191005087",
// 				"10361ff58ca1008425f0ad6e8a82c85b0f52715e-1727191060310",
// 			],
// 		},
// 		{
// 			record_id: "21",
// 			data_id: "8",
// 			course_module_id: "1732",
// 			datum: "1728432000",
// 			lernfeld: "{mlang en}Network Basics{mlang} {mlang de}Grundlagen{mlang}",
// 			tagesinhalte:
// 				'<p dir="ltr" style="text-align:left;">Video von Neuseeland</p><p dir="ltr" style="text-align:left;"><a href="https://www.youtube.com/watch?v=vtxVK3sbZ0o" target="_blank" rel="noreferrer noopener">Link zu Youtube</a><br /></p>',
// 			tafelbild: null,
// 			präsentation: null,
// 			group_id: "29",
// 			group_name: "080802",
// 			recording_ids: ["10361ff58ca1008425f0ad6e8a82c85b0f52715e-1728497433138"],
// 		},
// 	],
// };
