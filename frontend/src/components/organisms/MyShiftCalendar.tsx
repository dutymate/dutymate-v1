// MyShiftCalendar.tsx

import { useState } from "react";
import { DutyBadgeKor } from "../atoms/DutyBadgeKor";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

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

interface DayModalProps {
	isOpen: boolean;
	onClose: () => void;
	date: Date | null;
	duty: "day" | "evening" | "night" | "off";
}

const DayModal = ({ isOpen, onClose, date, duty }: DayModalProps) => {
	if (!isOpen || !date) return null;

	const handlePrevDay = () => {
		const newDate = new Date(date);
		newDate.setDate(date.getDate() - 1);
		// TODO: 이전 날짜의 듀티 정보를 가져와서 업데이트
	};

	const handleNextDay = () => {
		const newDate = new Date(date);
		newDate.setDate(date.getDate() + 1);
		// TODO: 다음 날짜의 듀티 정보를 가져와서 업데이트
	};

	const formatMonth = (month: number) => {
		return month < 10 ? `0${month}` : month;
	};

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	// 듀티별 간호사 데이터
	const nurses = [
		...Array(3).fill({ name: "김간호", year: "5년차", duty: "day" }),
		...Array(2).fill({ name: "김간호", year: "5년차", duty: "evening" }),
		...Array(2).fill({ name: "김간호", year: "5년차", duty: "night" }),
		...Array(3).fill({ name: "김간호", year: "5년차", duty: "off" }),
	];

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
			onClick={handleBackdropClick}
		>
			<div className="bg-white rounded-[1.154rem] p-6 w-[400px] relative">
				{/* 날짜와 근무 타입 */}
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

				{/* 구분선 */}
				<div className="border-t border-gray-900 mb-2" />

				{/* 근무자 목록 */}
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

				{/* 하단 구분선 */}
				<div className="border-t border-gray-900 mt-2" />

				{/* 추가 컴포넌트를 위한 공간 */}
				<div className="h-4" />
			</div>
		</div>
	);
};

const MyShiftCalendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedDuty, setSelectedDuty] = useState<
		"day" | "evening" | "night" | "off"
	>("day");

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

	// 랜덤 듀티 생성 함수
	const getRandomDuty = () => {
		const duties = ["day", "evening", "night", "off"] as const;
		return duties[Math.floor(Math.random() * duties.length)];
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

	const handleDayClick = (day: number, isCurrentMonth: boolean) => {
		const clickedDate = new Date(
			currentDate.getFullYear(),
			isCurrentMonth
				? currentDate.getMonth()
				: currentDate.getMonth() + (isCurrentMonth ? 0 : 1),
			day,
		);
		setSelectedDate(clickedDate);
		setSelectedDuty(getRandomDuty()); // 실제로는 해당 날짜의 실제 듀티를 가져와야 합니다
		setIsModalOpen(true);
	};

	return (
		<div className="bg-white rounded-lg p-2 shadow-sm w-[750px]">
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
						onClick={() => handleDayClick(day, false)}
						className={`min-h-[120px] p-3 relative bg-gray-50 cursor-pointer hover:bg-gray-100
                            ${
															selectedDate &&
															selectedDate.getDate() === day &&
															selectedDate.getMonth() ===
																currentDate.getMonth() - 1
																? "ring-2 ring-primary ring-inset"
																: ""
														}`}
					>
						<span className="text-base-muted text-sm absolute top-2 left-2">
							{day}
						</span>
						<div className="absolute bottom-0.5 right-0.5 scale-75">
							<DutyBadgeKor type={getRandomDuty()} size="xs" />
						</div>
					</div>
				))}

				{/* 현재 달 날짜 */}
				{currentMonthDays.map((day) => (
					<div
						key={day}
						onClick={() => handleDayClick(day, true)}
						className={`min-h-[120px] p-3 relative cursor-pointer hover:bg-gray-50
                            ${
															selectedDate &&
															selectedDate.getDate() === day &&
															selectedDate.getMonth() === currentDate.getMonth()
																? "ring-2 ring-primary ring-inset"
																: ""
														}`}
					>
						<span className="text-base-foreground text-sm absolute top-2 left-2">
							{day}
						</span>
						<div className="absolute bottom-0.5 right-0.5 scale-75">
							<DutyBadgeKor type={getRandomDuty()} size="xs" />
						</div>
					</div>
				))}

				{/* 다음 달 날짜 */}
				{nextMonthDays.map((day) => (
					<div
						key={`next-${day}`}
						onClick={() => handleDayClick(day, false)}
						className={`min-h-[120px] p-3 relative bg-gray-50 cursor-pointer hover:bg-gray-100
                            ${
															selectedDate &&
															selectedDate.getDate() === day &&
															selectedDate.getMonth() ===
																currentDate.getMonth() + 1
																? "ring-2 ring-primary ring-inset"
																: ""
														}`}
					>
						<span className="text-base-muted text-sm absolute top-2 left-2">
							{day}
						</span>
						<div className="absolute bottom-1 right-1 scale-75">
							<DutyBadgeKor type={getRandomDuty()} size="xs" />
						</div>
					</div>
				))}
			</div>

			{/* 모달 */}
			<DayModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				date={selectedDate}
				duty={selectedDuty}
			/>
		</div>
	);
};

export default MyShiftCalendar;
