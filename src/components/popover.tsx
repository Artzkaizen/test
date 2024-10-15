import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export function CustomPopover({
	data,
	record,
	classname,
}: {
	classname?: string;
	record: string;
	data: string;
}) {
	const editUrl = (data: string, record: string) => {
		const string = import.meta.env.VITE_PUBLIC_MOODLE_EDIT_URL;
		return string?.replace("base", data).replace("record", record);
	};

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
			</PopoverContent>
		</Popover>
	);
}
