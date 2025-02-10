// MyShiftCalendar.tsx

import { useState, useEffect } from "react";
import { DutyBadgeKor } from "../atoms/DutyBadgeKor";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

interface MyShiftCalendarProps {
	onDateSelect: (date: Date) => void;
	selectedDate: Date | null;
	dutyData: {
		year: number;
		month: number;
		prevShifts: string;
		nextShifts: string;
		shifts: string;
	} | null;
	onMonthChange?: (year: number, month: number) => void;
}

const MyShiftCalendar = ({
	onDateSelect,
	selectedDate: externalSelectedDate,
	dutyData,
	onMonthChange,
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

	const handlePrevMonth = async () => {
		const newDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() - 1,
		);
		try {
			await onMonthChange?.(newDate.getFullYear(), newDate.getMonth() + 1);
			setCurrentDate(newDate);
		} catch (error) {
			console.error("Failed to fetch duty data:", error);
		}
	};

	const handleNextMonth = async () => {
		const newDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() + 1,
		);
		try {
			await onMonthChange?.(newDate.getFullYear(), newDate.getMonth() + 1);
			setCurrentDate(newDate);
		} catch (error) {
			console.error("Failed to fetch duty data:", error);
		}
	};

	// 실제 근무 데이터로부터 듀티 가져오기
	const getDutyFromShifts = (
		date: Date,
		day: number,
	): "day" | "evening" | "night" | "off" | null => {
		if (!dutyData) return null;

		const currentMonth = currentDate.getMonth() + 1;
		const targetMonth = date.getMonth() + 1;
		const prevMonthLastDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			0,
		).getDate();

		let shift: string | undefined;
		if (targetMonth < currentMonth) {
			// 이전 달의 마지막 주
			const index = day - (prevMonthLastDate - dutyData.prevShifts.length);
			shift = dutyData.prevShifts[index];
		} else if (targetMonth > currentMonth) {
			// 다음 달의 첫 주
			// day가 1부터 시작하므로 인덱스 조정이 필요 없음
			shift = dutyData.nextShifts[day - 1];
			// 다음 달의 첫 주차만 표시하도록 제한
			if (day > dutyData.nextShifts.length) {
				return null;
			}
		} else {
			// 현재 달
			shift = dutyData.shifts[day - 1];
		}

		// shift가 undefined이거나 'X'인 경우 null 반환
		if (!shift || shift === "X") return null;

		const dutyMap: Record<string, "day" | "evening" | "night" | "off" | null> =
			{
				D: "day",
				E: "evening",
				N: "night",
				O: "off",
				X: null,
			};

		return dutyMap[shift] || null;
	};

	// getFixedDuty 함수를 getDutyFromShifts로 교체
	useEffect(() => {
		if (dutyData) {
			setCurrentDate(new Date(dutyData.year, dutyData.month - 1));
		}
	}, [dutyData?.year, dutyData?.month]);

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
								onDateSelect(newDate);
							}}
							className={`
								min-h-[80px] lg:min-h-[120px] 
								p-2 lg:p-3 
								relative bg-gray-50 cursor-pointer hover:bg-gray-100
								${
									externalSelectedDate &&
									externalSelectedDate.getDate() === day &&
									externalSelectedDate.getMonth() === currentDate.getMonth() - 1
										? "ring-2 ring-primary ring-inset"
										: ""
								}
							`}
						>
							<span className="text-base-muted text-xs lg:text-sm absolute top-1 lg:top-2 left-1 lg:left-2">
								{day}
							</span>
							{getDutyFromShifts(
								new Date(
									currentDate.getFullYear(),
									currentDate.getMonth() - 1,
									day,
								),
								day,
							) && (
								<div className="absolute bottom-0.5 right-0.5 scale-[0.45] lg:scale-75">
									<DutyBadgeKor
										type={
											getDutyFromShifts(
												new Date(
													currentDate.getFullYear(),
													currentDate.getMonth() - 1,
													day,
												),
												day,
											)!
										}
										size="xs"
									/>
								</div>
							)}
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
								onDateSelect(newDate);
							}}
							className={`
								min-h-[80px] lg:min-h-[120px] 
								p-2 lg:p-3 
								relative cursor-pointer hover:bg-gray-50
								${
									externalSelectedDate &&
									externalSelectedDate.getDate() === day &&
									externalSelectedDate.getMonth() === currentDate.getMonth()
										? "ring-2 ring-primary ring-inset"
										: ""
								}
							`}
						>
							<span className="text-base-foreground text-xs lg:text-sm absolute top-1 lg:top-2 left-1 lg:left-2">
								{day}
							</span>
							{getDutyFromShifts(
								new Date(
									currentDate.getFullYear(),
									currentDate.getMonth(),
									day,
								),
								day,
							) && (
								<div className="absolute bottom-0.5 right-0.5 scale-[0.45] lg:scale-75">
									<DutyBadgeKor
										type={
											getDutyFromShifts(
												new Date(
													currentDate.getFullYear(),
													currentDate.getMonth(),
													day,
												),
												day,
											)!
										}
										size="xs"
									/>
								</div>
							)}
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
								onDateSelect(newDate);
							}}
							className={`
								min-h-[80px] lg:min-h-[120px] 
								p-2 lg:p-3 
								relative bg-gray-50 cursor-pointer hover:bg-gray-100
								${
									externalSelectedDate &&
									externalSelectedDate.getDate() === day &&
									externalSelectedDate.getMonth() === currentDate.getMonth() + 1
										? "ring-2 ring-primary ring-inset"
										: ""
								}
							`}
						>
							<span className="text-base-muted text-xs lg:text-sm absolute top-1 lg:top-2 left-1 lg:left-2">
								{day}
							</span>
							{getDutyFromShifts(
								new Date(
									currentDate.getFullYear(),
									currentDate.getMonth() + 1,
									day,
								),
								day,
							) && (
								<div className="absolute bottom-0.5 right-0.5 scale-[0.45] lg:scale-75">
									<DutyBadgeKor
										type={
											getDutyFromShifts(
												new Date(
													currentDate.getFullYear(),
													currentDate.getMonth() + 1,
													day,
												),
												day,
											)!
										}
										size="xs"
									/>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MyShiftCalendar;
