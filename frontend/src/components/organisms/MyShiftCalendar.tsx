// MyShiftCalendar.tsx

import { useState, useEffect } from "react";
import { DutyBadgeKor } from "../atoms/DutyBadgeKor";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

interface MyShiftCalendarProps {
	onDateSelect: (date: Date, duty: "day" | "evening" | "night" | "off") => void;
	selectedDate: Date | null;
}

const MyShiftCalendar = ({
	onDateSelect,
	selectedDate: externalSelectedDate,
}: MyShiftCalendarProps) => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // lg 브레이크포인트

	// 화면 크기 변경 감지
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handlePrevMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
		);
	};

	const handleNextMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
		);
	};

	// 날짜별 고정 듀티 생성 (월별로 동일한 패턴 유지)
	const getFixedDuty = (day: number) => {
		const duties = ["day", "evening", "night", "off"] as const;
		// 날짜를 4로 나눈 나머지를 인덱스로 사용하여 고정된 듀티 반환
		return duties[day % 4];
	};

	const firstDay = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1,
	);
	const lastDay = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0,
	);

	const prevMonthLastDay = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		0,
	);
	const prevMonthDays = [];
	for (let i = firstDay.getDay() - 1; i >= 0; i--) {
		prevMonthDays.push(prevMonthLastDay.getDate() - i);
	}

	const nextMonthDays = [];
	for (let i = 1; i <= 6 - lastDay.getDay(); i++) {
		nextMonthDays.push(i);
	}

	const currentMonthDays = Array.from(
		{ length: lastDay.getDate() },
		(_, i) => i + 1,
	);

	return (
		<div className={`${isMobile ? "" : "flex gap-8"}`}>
			<div
				className={`bg-white rounded-2xl p-2 shadow-sm ${isMobile ? "w-full" : "w-[750px]"}`}
			>
				{/* 달력 헤더 */}
				<div className="flex justify-center items-center gap-16 mb-6 pt-2">
					<button
						onClick={handlePrevMonth}
						className="text-base-muted hover:text-base-foreground"
					>
						<IoIosArrowBack className="w-6 h-6" />
					</button>
					<h2 className="text-base-foreground text-base font-medium">
						{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
					</h2>
					<button
						onClick={handleNextMonth}
						className="text-base-muted hover:text-base-foreground"
					>
						<IoIosArrowForward className="w-6 h-6" />
					</button>
				</div>

				{/* 요일 헤더 */}
				<div className="grid grid-cols-7 mb-1">
					{weekDays.map((day, index) => (
						<div
							key={day}
							className={`text-center text-sm font-medium ${
								index === 0
									? "text-duty-evening"
									: index === 6
										? "text-duty-night"
										: "text-base-foreground"
							}`}
						>
							{day}
						</div>
					))}
				</div>

				{/* 달력 그리드 */}
				<div className="grid grid-cols-7 divide-x divide-y divide-gray-100 border border-gray-100">
					{/* 이전 달 날짜 */}
					{prevMonthDays.map((day) => (
						<div
							key={`prev-${day}`}
							onClick={() => {
								const newDate = new Date(
									currentDate.getFullYear(),
									currentDate.getMonth() - 1,
									day,
								);
								onDateSelect(newDate, getFixedDuty(day));
							}}
							className={`min-h-[120px] p-3 relative bg-gray-50 cursor-pointer hover:bg-gray-100
								${
									externalSelectedDate &&
									externalSelectedDate.getDate() === day &&
									externalSelectedDate.getMonth() === currentDate.getMonth() - 1
										? "ring-2 ring-primary ring-inset"
										: ""
								}`}
						>
							<span className="text-base-muted text-sm absolute top-2 left-2">
								{day}
							</span>
							<div className="absolute bottom-0.5 right-0.5 scale-75">
								<DutyBadgeKor type={getFixedDuty(day)} size="xs" />
							</div>
						</div>
					))}

					{/* 현재 달 날짜 */}
					{currentMonthDays.map((day) => (
						<div
							key={day}
							onClick={() => {
								const newDate = new Date(
									currentDate.getFullYear(),
									currentDate.getMonth(),
									day,
								);
								onDateSelect(newDate, getFixedDuty(day));
							}}
							className={`min-h-[120px] p-3 relative cursor-pointer hover:bg-gray-50
								${
									externalSelectedDate &&
									externalSelectedDate.getDate() === day &&
									externalSelectedDate.getMonth() === currentDate.getMonth()
										? "ring-2 ring-primary ring-inset"
										: ""
								}`}
						>
							<span className="text-base-foreground text-sm absolute top-2 left-2">
								{day}
							</span>
							<div className="absolute bottom-0.5 right-0.5 scale-75">
								<DutyBadgeKor type={getFixedDuty(day)} size="xs" />
							</div>
						</div>
					))}

					{/* 다음 달 날짜 */}
					{nextMonthDays.map((day) => (
						<div
							key={`next-${day}`}
							onClick={() => {
								const newDate = new Date(
									currentDate.getFullYear(),
									currentDate.getMonth() + 1,
									day,
								);
								onDateSelect(newDate, getFixedDuty(day));
							}}
							className={`min-h-[120px] p-3 relative bg-gray-50 cursor-pointer hover:bg-gray-100
								${
									externalSelectedDate &&
									externalSelectedDate.getDate() === day &&
									externalSelectedDate.getMonth() === currentDate.getMonth() + 1
										? "ring-2 ring-primary ring-inset"
										: ""
								}`}
						>
							<span className="text-base-muted text-sm absolute top-2 left-2">
								{day}
							</span>
							<div className="absolute bottom-1 right-1 scale-75">
								<DutyBadgeKor type={getFixedDuty(day)} size="xs" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MyShiftCalendar;
