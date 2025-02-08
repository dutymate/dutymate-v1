import Sidebar from "../components/organisms/WSidebar";
import MSidebar from "../components/organisms/MSidebar";
import Title from "../components/atoms/Title";
import MyShiftCalendar from "../components/organisms/MyShiftCalendar";
import TodayShiftModal from "../components/organisms/TodayShiftModal";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";

const getFixedDuty = (day: number) => {
	const duties = ["day", "evening", "night", "off"] as const;
	return duties[day % 4];
};

const MyShift = () => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedDuty, setSelectedDuty] = useState<
		"day" | "evening" | "night" | "off"
	>("day");
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleDateSelect = (
		date: Date,
		duty: "day" | "evening" | "night" | "off",
	) => {
		setSelectedDate(date);
		setSelectedDuty(duty);
	};

	return (
		<div className="w-full h-screen flex flex-row bg-[#F4F4F4]">
			{/* 데스크톱 Sidebar */}
			<div className="hidden lg:block w-[238px] shrink-0">
				<Sidebar userType="head" />
			</div>

			{/* 모바일 Sidebar */}
			<MSidebar
				userType="head"
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
			/>

			{/* 메인 컨텐츠 영역 */}
			<div className="flex-1 min-w-0 lg:px-8 py-6 overflow-y-auto">
				{/* 모바일 메뉴 버튼 */}
				<button
					onClick={() => setIsSidebarOpen(true)}
					className="lg:hidden mb-4 p-2 hover:bg-gray-100 rounded-lg"
				>
					<IoMdMenu className="w-6 h-6 text-gray-600" />
				</button>

				<div className="mb-3">
					<Title title="나의 근무표" subtitle="나의 근무 일정을 확인해보세요" />
				</div>
				<div className="block lg:flex lg:gap-8">
					<MyShiftCalendar
						onDateSelect={handleDateSelect}
						selectedDate={selectedDate}
					/>
					{selectedDate && (
						<TodayShiftModal
							date={selectedDate}
							duty={selectedDuty}
							isMobile={window.innerWidth < 1024}
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
