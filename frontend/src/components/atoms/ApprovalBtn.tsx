import React, { useState } from "react";

type ApprovalStatus = "approve" | "hold" | "deny";

interface ApprovalBtnProps {
	onChange?: (status: ApprovalStatus) => void;
	initialStatus?: ApprovalStatus;
}

export const ApprovalBtn: React.FC<ApprovalBtnProps> = ({
	onChange,
	initialStatus = "hold",
}) => {
	const [status, setStatus] = useState<ApprovalStatus>(initialStatus);

	const handleClick = (newStatus: ApprovalStatus) => {
		// If clicking the same button that's already active, switch to hold
		if (status === newStatus) {
			setStatus("hold");
			onChange?.("hold");
		} else {
			setStatus(newStatus);
			onChange?.(newStatus);
		}
	};

	const getButtonStyle = (buttonStatus: ApprovalStatus) => {
		const isActive = status === buttonStatus;

		switch (buttonStatus) {
			case "approve":
				return isActive
					? "bg-duty-day-bg text-duty-day font-bold"
					: "bg-base-muted text-white";
			case "deny":
				return isActive
					? "bg-duty-evening-bg text-duty-evening font-bold"
					: "bg-base-muted text-white";
			case "hold":
				return isActive
					? "bg-duty-off-bg text-duty-off font-bold"
					: "bg-base-muted text-white";
		}
	};

	return (
		<div className="inline-flex rounded-[9px] overflow-hidden">
			<button
				onClick={() => handleClick("approve")}
				className={`px-4 py-2 ${getButtonStyle("approve")} transition-colors`}
			>
				승인
			</button>
			<button
				onClick={() => handleClick("hold")}
				className={`px-4 py-2 ${getButtonStyle("hold")} transition-colors`}
			>
				대기
			</button>
			<button
				onClick={() => handleClick("deny")}
				className={`px-4 py-2 ${getButtonStyle("deny")} transition-colors`}
			>
				거절
			</button>
		</div>
	);
};
