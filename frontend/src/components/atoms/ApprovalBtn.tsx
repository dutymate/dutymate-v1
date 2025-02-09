import React from "react";

interface ApprovalBtnProps {
	onApprove: () => void;
	onReject: () => void;
	onHold: () => void;
	currentStatus: "승인" | "거절" | "대기";
}

export const ApprovalBtn: React.FC<ApprovalBtnProps> = ({
	onApprove,
	onReject,
	onHold,
	currentStatus,
}) => {
	const getButtonStyle = (type: "approve" | "deny" | "hold") => {
		const isActive =
			(type === "approve" && currentStatus === "승인") ||
			(type === "deny" && currentStatus === "거절") ||
			(type === "hold" && currentStatus === "대기");

		switch (type) {
			case "approve":
				return isActive
					? "bg-duty-day-bg text-duty-day font-bold"
					: "bg-base-muted text-white hover:bg-duty-day-bg hover:text-duty-day";
			case "deny":
				return isActive
					? "bg-duty-evening-bg text-duty-evening font-bold"
					: "bg-base-muted text-white hover:bg-duty-evening-bg hover:text-duty-evening";
			case "hold":
				return isActive
					? "bg-duty-off-bg text-duty-off font-bold"
					: "bg-base-muted text-white hover:bg-duty-off-bg hover:text-duty-off";
		}
	};

	return (
		<div className="inline-flex rounded-[9px] overflow-hidden">
			<button
				onClick={onApprove}
				disabled={currentStatus === "승인"}
				className={`px-4 py-2 ${getButtonStyle("approve")} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
			>
				승인
			</button>
			<button
				onClick={onHold}
				disabled={currentStatus === "대기"}
				className={`px-4 py-2 ${getButtonStyle("hold")} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
			>
				대기
			</button>
			<button
				onClick={onReject}
				disabled={currentStatus === "거절"}
				className={`px-4 py-2 ${getButtonStyle("deny")} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
			>
				거절
			</button>
		</div>
	);
};
