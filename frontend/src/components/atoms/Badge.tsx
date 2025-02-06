// Badge.tsx

import React from "react";

interface BadgeProps {
	type: "admin" | "worker";
	className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, className }) => {
	const getStyles = () => {
		switch (type) {
			case "admin":
				return {
					bg: "bg-primary-bg",
					text: "text-primary-dark",
					label: "관리자",
				};
			case "worker":
				return {
					bg: "bg-base-muted",
					text: "text-base-foreground",
					label: "근무자",
				};
			default:
				return {
					bg: "bg-base-muted",
					text: "text-base-foreground",
					label: "근무자",
				};
		}
	};

	const styles = getStyles();

	return (
		<div
			className={`
        ${styles.bg} ${styles.text}
        px-3 py-1 rounded-lg
        text-sm font-medium
        ${className || ""}
      `}
		>
			{styles.label}
		</div>
	);
};
