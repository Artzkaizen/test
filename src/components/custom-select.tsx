import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
	label?: string;

	group: string;
	onSelectChange: (value: string) => void;
	className?: string;
	placeholder: string;
}
export default function CustomSelect({
	group,
	onSelectChange,
	className,
	placeholder,
}: CustomSelectProps) {
	const uniqueGroups = Array.from(
		new Map(
			window.records
				.filter((item) => item.group_id && item.group_name)
				.map((item) => [
					item.group_id,
					{ group_id: item.group_id, group_name: item.group_name },
				])
		).values()
	);

	return (
		<Select defaultValue={group} onValueChange={onSelectChange}>
			<SelectTrigger className={cn("w-[180px]", className)}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{/* {label && <SelectLabel>{label}</SelectLabel>} */}
					<SelectItem value="all">Alle Teilnehmer/innen</SelectItem>
					{uniqueGroups.map(
						(item) =>
							item.group_id && (
								<SelectItem key={item.group_id} value={item.group_name ?? ""}>
									{item.group_name}
								</SelectItem>
							)
					)}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
