import React from "react";

type ButtonSize = "xs" | "sm" | "md" | "lg";
type ButtonWidth = "short" | "long";
type ButtonColor = "primary" | "evening" | "night" | "day" | "off" | "muted";

interface ButtonProps {
	size?: ButtonSize;
	width?: ButtonWidth;
	color?: ButtonColor;
	children: React.ReactNode;
	onClick?: () => void;
	fullWidth?: boolean;
	disabled?: boolean;
	className?: string;
	type?: "button" | "submit" | "reset";
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: `h-[1.5rem] sm:h-[2rem] 
      rounded-[4px] px-2 py-0.5 
      text-[0.75rem] sm:text-sm`, // 모바일: 12px, 데스크톱: 14px

  sm: `h-[1.75rem] sm:h-[1.9rem] 
      rounded-[6px] px-2.5 py-1 
      text-sm sm:text-base`, // 모바일: 14px, 데스크톱: 16px

  md: `h-[2rem] sm:h-[3rem] 
      rounded-[8px] px-3 py-1.5 
      text-base sm:text-lg`, // 모바일: 16px, 데스크톱: 18px

  lg: `h-[2.5rem] sm:h-[3.5rem] 
      rounded-[10px] px-3.5 py-2 
      text-lg sm:text-xl`, // 모바일: 18px, 데스크톱: 20px
};

const widthStyles: Record<ButtonWidth, Record<ButtonSize, string>> = {
	// Short 버튼: sm 사이즈 기준으로 xs는 조금 작게, md는 조금 크게
	short: {
		xs: "w-[4.5rem]", // 60px
		sm: "w-[4.375rem] sm:w-[7rem]", // 모바일: 70px, 데스크톱: 112px
		md: "w-[4.6875rem] sm:w-[7.5rem]", // 모바일: 75px, 데스크톱: 120px
		lg: "w-[5rem] sm:w-[8rem]", // 모바일: 80px, 데스크톱: 128px
	},
	// Long 버튼: sm 사이즈 기준으로 xs는 조금 작게, md는 조금 크게
	long: {
		xs: "w-[12rem]", // 160px
		sm: "w-[11.25rem] sm:w-[20.625rem]", // 모바일: 180px, 데스크톱: 330px
		md: "w-[11.75rem] sm:w-[21.875rem]", // 모바일: 188px, 데스크톱: 350px
		lg: "w-[12.5rem] sm:w-[23.125rem]", // 모바일: 200px, 데스크톱: 370px
	},
};

const colorStyles: Record<
	ButtonColor,
	{ active: string; hover: string; pressed: string }
> = {
	primary: {
		active: "bg-primary-bg text-primary",
		hover: "hover:bg-primary hover:text-white",
		pressed: "active:bg-primary-dark active:text-white",
	},
	evening: {
		active: "bg-duty-evening-bg text-duty-evening",
		hover: "hover:bg-duty-evening hover:text-white",
		pressed: "active:bg-duty-evening-dark active:text-white",
	},
	night: {
		active: "bg-duty-night-bg text-duty-night",
		hover: "hover:bg-duty-night hover:text-white",
		pressed: "active:bg-duty-night-dark active:text-white",
	},
	day: {
		active: "bg-duty-day-bg text-duty-day",
		hover: "hover:bg-duty-day hover:text-white",
		pressed: "active:bg-duty-day-dark active:text-white",
	},
	off: {
		active: "bg-duty-off-bg text-duty-off",
		hover: "hover:bg-duty-off hover:text-white",
		pressed: "active:bg-duty-off-dark active:text-white",
	},
	muted: {
		active: "bg-base-muted-30 text-base-muted",
		hover: "hover:bg-base-muted hover:text-white",
		pressed: "active:bg-base-foreground active:text-white",
	},
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			size = "md",
			width = "short",
			color = "primary",
			children,
			onClick,
			fullWidth,
			disabled,
			className,
			type = "button",
		},
		ref,
	) => {
		return (
			<button
				ref={ref}
				type={type}
				onClick={onClick}
				disabled={disabled}
				className={`
        ${sizeStyles[size]} 
        ${fullWidth ? "w-full" : widthStyles[width][size]}
        ${
					disabled
						? "bg-base-muted text-white cursor-not-allowed"
						: `${colorStyles[color].active} ${colorStyles[color].hover} ${colorStyles[color].pressed}`
				}
        font-semibold 
        shadow-xs 
        focus-visible:outline-2 
        focus-visible:outline-offset-2 
        focus-visible:outline-indigo-600
        flex items-center justify-center
        transition-colors
        ${className || ""}
      `}
			>
				{children}
			</button>
		);
	},
);

export type { ButtonProps, ButtonSize, ButtonWidth, ButtonColor };
