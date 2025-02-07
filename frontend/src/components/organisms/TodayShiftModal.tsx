// TodayShiftModal.tsx

import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { DutyBadgeKor } from "../atoms/DutyBadgeKor";

// 상수를 컴포넌트 외부로 이동
const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;
type WeekDay = (typeof weekDays)[number];

// 한글 요일 매핑
const koreanWeekDays: Record<WeekDay, string> = {
	SUN: "일요일",
	MON: "월요일",
	TUE: "화요일",
	WED: "수요일",
	THU: "목요일",
	FRI: "금요일",
	SAT: "토요일",
};

interface TodayShiftModalProps {
	date: Date | null;
	duty: "day" | "evening" | "night" | "off";
	isMobile: boolean;
	onClose?: () => void;
	onDateChange: (newDate: Date) => void;
}

const TodayShiftModal = ({
	date,
	duty,
	isMobile,
	onClose,
	onDateChange,
}: TodayShiftModalProps) => {
	if (!date) return null;

	const formatMonth = (month: number) => {
		return month < 10 ? `0${month}` : month;
	};

	// 듀티별 간호사 데이터
	const nurses = [
		...Array(3).fill({ name: "김간호", year: "5년차", duty: "day" }),
		...Array(2).fill({ name: "김간호", year: "5년차", duty: "evening" }),
		...Array(2).fill({ name: "김간호", year: "5년차", duty: "night" }),
		...Array(3).fill({ name: "김간호", year: "5년차", duty: "off" }),
	];

	const handlePrevDay = () => {
		const newDate = new Date(date);
		newDate.setDate(date.getDate() - 1);
		onDateChange(newDate);
	};

	const handleNextDay = () => {
		const newDate = new Date(date);
		newDate.setDate(date.getDate() + 1);
		onDateChange(newDate);
	};

	const modalContent = (
		<div className="bg-white rounded-2xl p-6 w-[400px] shadow-sm">
			<div className="text-center mb-4">
				<div className="flex items-center justify-center gap-16 mb-2">
					<button onClick={handlePrevDay}>
						<IoChevronBack className="w-6 h-6 text-base-muted hover:text-gray-600" />
					</button>
					<h3 className="text-base-foreground text-lg font-medium">
						{formatMonth(date.getMonth() + 1)}월 {date.getDate()}일{" "}
						{koreanWeekDays[weekDays[date.getDay()]]}
					</h3>
					<button onClick={handleNextDay}>
						<IoChevronForward className="w-6 h-6 text-base-muted hover:text-gray-600" />
					</button>
				</div>
				<div className="inline-block">
					<p className="text-base-foreground text-base mb-2">
						오늘의 근무 일정은{" "}
						<span className={`text-duty-${duty} font-medium`}>
							{duty.toUpperCase()}
						</span>{" "}
						입니다!
					</p>
					<div className={`h-1 bg-duty-${duty}-bg w-full`} />
				</div>
			</div>

			<div className="border-t border-gray-900 mb-2" />

			<div className="space-y-0.5">
				{nurses.map((nurse, index) => (
					<div
						key={index}
						className="flex items-center justify-between py-[2px]"
					>
						<div className="flex items-center gap-2 flex-1">
							<span className="text-base-foreground w-16">{nurse.name}</span>
							<span className="text-base-foreground text-center flex-1">
								{nurse.year}
							</span>
						</div>
						<DutyBadgeKor type={nurse.duty} size="xs" />
					</div>
				))}
			</div>

			<div className="border-t border-gray-900 mt-2" />
			<div className="h-4" />
		</div>
	);

	if (isMobile) {
		return (
			<div
				className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
				onClick={(e) => {
					if (e.target === e.currentTarget && onClose) {
						onClose();
					}
				}}
			>
				{modalContent}
			</div>
		);
	}

	return modalContent;
};

export default TodayShiftModal;
