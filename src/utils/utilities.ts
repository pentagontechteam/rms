import { format } from "date-fns";
import { Message } from "../types/Message";

const colors = ["#C5BD1B", "#B28B50", "#9747FF", "#E43A6E"];

export function getColorFromInitials(initials: string) {
	if (!initials) return colors[0];

	const firstChar = initials[0].toUpperCase();
	const charCode = firstChar.charCodeAt(0);
	const colorIndex = charCode % colors.length;
	return colors[colorIndex];
}

const tagColors = [
	"bg-active-calendar",
	"bg-primary-button-green",
	"bg-primary-button-yellow",
];

export function getTagColorFromName(name: string) {
	if (!name) return tagColors[0];

	const firstChar = name[0].toUpperCase();
	const charCode = firstChar.charCodeAt(0);
	const colorIndex = charCode % tagColors.length;
	return tagColors[colorIndex];
}

const tagIcons = ["notes.svg", "folder.svg", "chat.svg"];

export function getIconFromTag(tag: string) {
	if (!tag) return tagIcons[0];

	const firstChar = tag[0].toUpperCase();
	const charCode = firstChar.charCodeAt(0);
	const iconIndex = charCode % tagIcons.length;
	return tagIcons[iconIndex];
}

export function formatText(role: string) {
	return role.charAt(0).toUpperCase() + role.substring(1).toLowerCase();
}

export const groupMessagesByDate = (messages: Message[]) => {
	const groups: { date: string; items: Message[] }[] = [];

	// ensure chronological ascending (oldest → newest)
	const sorted = [...messages].sort(
		(a, b) =>
			new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
	);

	sorted.forEach((msg) => {
		const label = format(new Date(msg.created_at), "EEEE, MMMM d");
		const bucket = groups.find((g) => g.date === label);
		if (bucket) {
			bucket.items.push(msg);
		} else {
			groups.push({ date: label, items: [msg] });
		}
	});

	return groups;
};

export const getIconFromType = (type: string): string => {
	const lower = type.toLowerCase();

	if (lower.includes("pdf")) return "/icons/pdf.svg";
	if (lower.includes("word") || lower.includes("doc")) return "/icons/doc.svg";
	if (lower.includes("excel") || lower.includes("sheet"))
		return "/icons/xlsx.svg";
	if (lower.includes("powerpoint") || lower.includes("ppt"))
		return "/icons/ppt.svg";
	if (lower.includes("csv")) return "/icons/csv.svg";
	if (lower.includes("image")) return "/icons/image.svg";

	// default generic file icon
	return "/icons/file.svg";
};
