// ApprovalBtn.tsx

import React from "react";

interface ApprovalBtnProps {
	selectedIndex: number;
	onChange: (index: number) => void;
}

export const ApprovalBtn: React.FC<ApprovalBtnProps> = ({
	selectedIndex,
	onChange,
}) => {
	const options = [{ text: "승인" }, { text: "거절" }];

	const getButtonStyle = (isSelected: boolean, index: number) => {
		return isSelected
			? `bg-base-white border ${index === 0 ? "border-duty-day text-duty-day" : "border-duty-evening text-duty-evening"}`
			: "bg-transparent border border-transparent text-base-foreground";
	};

	const getHoverStyle = (isSelected: boolean, index: number) => {
		return isSelected
			? `${index === 0 ? "text-duty-day-dark border-duty-day-dark" : "text-duty-evening-dark border-duty-evening-dark"}`
			: "bg-base-muted";
	};

	return (
		<div className="flex bg-base-muted-30 rounded-lg p-1 w-fit text-xs">
			{options.map((option, index) => {
				const isSelected = selectedIndex === index;
				return (
					<button
						key={index}
						className={`
              flex-1
              px-3 py-1.5
              rounded-md
              ${getButtonStyle(isSelected, index)}
              cursor-pointer
              transition-all duration-300
              text-xs
              flex items-center justify-center gap-2
              hover:${getHoverStyle(isSelected, index)}
              min-w-[48px]
            `}
						onClick={() => onChange(index)}
					>
						{option.text}
					</button>
				);
			})}
		</div>
	);
};
