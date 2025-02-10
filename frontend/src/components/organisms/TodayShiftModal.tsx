// TodayShiftModal.tsx

import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { DutyBadgeKor } from "../atoms/DutyBadgeKor";
import { convertDutyType } from "../../utils/dutyUtils";

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
	dutyData: {
		myShift: "D" | "E" | "N" | "O";
		otherShifts: {
			grade: number;
			name: string;
			shift: "D" | "E" | "N" | "O";
		}[];
	};
	isMobile: boolean;
	onClose?: () => void;
	onDateChange: (newDate: Date) => void;
	loading?: boolean;
}

const TodayShiftModal = ({
	date,
	duty,
	dutyData,
	isMobile,
	onClose,
	onDateChange,
	loading = false,
}: TodayShiftModalProps) => {
	if (!date) return null;

	const formatMonth = (month: number) => {
		return month < 10 ? `0${month}` : month;
	};

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
		<div className="bg-white rounded-2xl p-6 w-full max-w-[400px] shadow-sm">
			{loading ? (
				<div className="flex justify-center items-center h-[300px]">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
				</div>
			) : !dutyData ? (
				<div className="text-center py-8">
					<p className="text-base-muted">해당 날짜의 근무 정보가 없습니다.</p>
					<button
						onClick={onClose}
						className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
					>
						닫기
					</button>
				</div>
			) : (
				<>
					<div className="sticky top-0 bg-white pb-4">
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
					</div>

					<div className="max-h-[400px] overflow-y-auto">
						<div className="space-y-0.5">
							{dutyData.otherShifts
								.sort((a, b) => b.grade - a.grade)
								.map((nurse, index) => (
									<div
										key={index}
										className="flex items-center justify-between py-[2px]"
									>
										<div className="flex items-center gap-2 flex-1 min-w-0">
											<span
												className="text-base-foreground w-24 truncate text-sm"
												title={nurse.name}
											>
												{nurse.name}
											</span>
											<span className="text-base-foreground text-center flex-1 text-sm whitespace-nowrap">
												{nurse.grade}년차
											</span>
										</div>
										<DutyBadgeKor
											type={convertDutyType(nurse.shift)}
											size="xs"
										/>
									</div>
								))}
						</div>
					</div>
				</>
			)}
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
