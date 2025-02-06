// DutyBadgeEng.tsx

interface DutyBadgeEngProps {
	type: "D" | "E" | "N" | "O" | "All" | "default";
	size?: "sm" | "md" | "lg";
	isSelected?: boolean;
	onClick?: () => void;
	variant?: "filled" | "outline";
}

const DutyBadgeEng = ({
	type,
	size = "md",
	isSelected = false,
	onClick,
	variant = "filled",
}: DutyBadgeEngProps) => {
	const sizeClasses = {
		sm: "w-6 h-6 text-base",
		md: "w-8 h-8 text-lg",
		lg: "w-10 h-10 text-xl",
	};

	const badgeStyles = {
		filled: {
			D: "bg-duty-day text-white",
			E: "bg-duty-evening text-white",
			N: "bg-duty-night text-white",
			O: "bg-duty-off text-white",
			All: "bg-base-foreground text-white",
			default: "bg-base-muted text-white font-bold",
		},
		outline: {
			D: "bg-white text-duty-day border-2 border-duty-day",
			E: "bg-white text-duty-evening border-2 border-duty-evening",
			N: "bg-white text-duty-night border-2 border-duty-night",
			O: "bg-white text-duty-off border-2 border-duty-off",
			All: "bg-white text-base-foreground border-2 border-base-foreground",
			default: "bg-white text-base-muted border-2 border-base-muted font-bold",
		},
	};

	return (
		<div
			onClick={onClick}
			className={`
        ${sizeClasses[size]}
        ${badgeStyles[variant][type]}
        flex items-center justify-center
        rounded-[9px] font-medium
        ${isSelected ? "ring-2 ring-offset-2 ring-primary" : ""}
        ${onClick ? "cursor-pointer" : ""}
      `}
		>
			{type === "default" ? "-" : type}
		</div>
	);
};

export default DutyBadgeEng;
