type ButtonSize = "sm" | "md" | "lg";
type ButtonWidth = "short" | "long";
type ButtonColor = "primary" | "evening" | "night" | "day";

interface ButtonProps {
	size?: ButtonSize;
	width?: ButtonWidth;
	color?: ButtonColor;
	children: React.ReactNode;
	onClick?: () => void;
	fullWidth?: boolean;
	disabled?: boolean;
}

const sizeStyles: Record<ButtonSize, string> = {
	sm: `h-[1.5625rem] sm:h-[2.5rem] 
      rounded-[9px] px-2 py-1 
      text-[0.6875rem] sm:text-xs`, // 모바일: 11px, 데스크톱: 12px
	md: `h-[1.5625rem] sm:h-[2.5rem] 
      rounded-[9px] px-2 py-1 
      text-xs sm:text-sm`, // 모바일: 12px, 데스크톱: 14px
	lg: `h-[1.875rem] sm:h-[3rem] 
      rounded-[9px] px-2.5 py-1.5 
      text-xs sm:text-sm`, // 모바일: 12px, 데스크톱: 14px
};

const widthStyles: Record<ButtonWidth, Record<ButtonSize, string>> = {
	// Short 버튼: sm 사이즈 기준으로 xs는 조금 작게, md는 조금 크게
	short: {
		sm: "w-[4.375rem] sm:w-[7rem]", // 모바일: 70px, 데스크톱: 112px
		md: "w-[4.6875rem] sm:w-[7.5rem]", // 모바일: 75px, 데스크톱: 120px
		lg: "w-[5rem] sm:w-[8rem]", // 모바일: 80px, 데스크톱: 128px
	},
	// Long 버튼: sm 사이즈 기준으로 xs는 조금 작게, md는 조금 크게
	long: {
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
};

export function Button({
	size = "md",
	width = "short",
	color = "primary",
	children,
	onClick,
	fullWidth,
	disabled,
}: ButtonProps) {
	return (
		<button
			type="button"
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
      `}
		>
			{children}
		</button>
	);
}

export type { ButtonProps, ButtonSize, ButtonWidth, ButtonColor };
