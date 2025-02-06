import React from "react";

interface ToggleButtonProps {
	options: Array<{
		text: string;
		icon?: string;
	}>;
	selectedIndex: number;
	onChange: (index: number) => void;
	variant?: "gender" | "nurse" | "request" | "default";
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
	options,
	selectedIndex,
	onChange,
	variant = "default",
}) => {
	const getButtonStyle = (isSelected: boolean) => {
		return isSelected
			? "bg-base-white border border-primary text-primary"
			: "bg-transparent border border-transparent text-base-foreground";
	};

	const getHoverStyle = (isSelected: boolean) => {
		return isSelected
			? "hover:text-primary-dark hover:border-primary-dark"
			: "hover:bg-base-muted";
	};

	return (
		<div className="flex bg-base-muted-30 rounded-lg p-1 w-full max-w-[25rem]">
			{options.map((option, index) => {
				const isSelected = selectedIndex === index;
				return (
					<button
						key={index}
						className={[
							"flex-1",
							variant === "request" ? "p-4" : "p-3",
							"rounded-md",
							getButtonStyle(isSelected),
							"cursor-pointer",
							"transition-all",
							"duration-300",
							variant === "request" ? "text-base" : "text-sm",
							"flex",
							"items-center",
							"justify-center",
							"gap-2",
							getHoverStyle(isSelected),
						].join(" ")}
						onClick={() => onChange(index)}
					>
						{option.icon && (
							<span
								className={`${variant === "gender" ? "text-base" : "text-sm"}`}
							>
								{option.icon}
							</span>
						)}
						{option.text}
					</button>
				);
			})}
		</div>
	);
};

export { ToggleButton };
