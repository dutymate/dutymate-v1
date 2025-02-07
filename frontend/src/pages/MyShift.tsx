import Sidebar from "../components/organisms/WSidebar";
import Title from "../components/atoms/Title";
import MyShiftCalendar from "../components/organisms/MyShiftCalendar";
import TodayShiftModal from "../components/organisms/TodayShiftModal";
import { useState, useEffect } from "react";

const getFixedDuty = (day: number) => {
	const duties = ["day", "evening", "night", "off"] as const;
	return duties[day % 4];
};

const MyShift = () => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedDuty, setSelectedDuty] = useState<
		"day" | "evening" | "night" | "off"
	>("day");
	const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleDateSelect = (
		date: Date,
		duty: "day" | "evening" | "night" | "off",
	) => {
		setSelectedDate(date);
		setSelectedDuty(duty);
	};

	return (
		<div className="w-full h-screen flex flex-row bg-[#F4F4F4]">
			{/* Sidebar 영역 - userType prop 전달 */}
			<div className="w-[238px] shrink-0">
				<Sidebar userType="head" /> {/* 또는 userType="staff" */}
			</div>

			{/* 메인 컨텐츠 영역 */}
			<div className="flex-1 min-w-0 px-8 py-6">
				<div className="mb-3">
					<Title
						title="나의 근무표 보기"
						subtitle="나의 근무 일정을 확인해보세요"
					/>
				</div>
				<div className={`${isMobile ? "" : "flex gap-8"}`}>
					<MyShiftCalendar
						onDateSelect={handleDateSelect}
						selectedDate={selectedDate}
					/>
					{selectedDate && (
						<TodayShiftModal
							date={selectedDate}
							duty={selectedDuty}
							isMobile={isMobile}
							onClose={() => setSelectedDate(null)}
							onDateChange={(newDate) => {
								setSelectedDate(newDate);
								setSelectedDuty(getFixedDuty(newDate.getDate()));
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default MyShift;
