import { useEffect, useState } from "react";
import DutyBadgeEng from "../atoms/DutyBadgeEng";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import ReqShiftModal from "./ReqShiftModal";
import { dutyService } from "../../services/dutyService"; //실제 API 호출에 필요한 axios import
import { toast } from "react-toastify";
// import mockData from "../../services/response-json/duty/GetApiDutyWard.json"; // 임시 데이터 import

interface DutyMember {
	memberId: number;
	name: string;
	shifts: string;
}

interface DutyInfo {
	id: string;
	year: number;
	month: number;
	duty: DutyMember[];
}

interface WardDuty {
	id: string;
	year: number;
	month: number;
	duty: {
		memberId: number;
		name: string;
		shifts: string;
	}[];
}

const TeamShiftTable = () => {
	const [wardDuty, setWardDuty] = useState<WardDuty | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isReqModalOpen, setIsReqModalOpen] = useState(false);
	const [currentDate, setCurrentDate] = useState(() => {
		const now = new Date();
		return {
			year: now.getFullYear(),
			month: now.getMonth() + 1,
		};
	});

	useEffect(() => {
		const fetchWardDuty = async () => {
			try {
				const data = await dutyService.getWardDuty(
					currentDate.year,
					currentDate.month,
				);
				setWardDuty(data);
			} catch (error) {
				console.error("병동 근무표 조회 실패:", error);
				toast.error("병동 근무표를 불러오는데 실패했습니다");
			} finally {
				setIsLoading(false);
			}
		};

		fetchWardDuty();
	}, [currentDate]);

	if (isLoading) {
		return <div>로딩 중...</div>;
	}

	if (!wardDuty) return null;

	// 해당 월의 실제 일수 계산
	const daysInMonth = new Date(wardDuty.year, wardDuty.month, 0).getDate();
	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

	// 주말 체크 함수 추가
	const isWeekend = (year: number, month: number, day: number) => {
		const date = new Date(year, month - 1, day);
		return date.getDay() === 0 || date.getDay() === 6;
	};

	const handlePrevMonth = () => {
		setCurrentDate((prev) => {
			if (prev.month === 1) {
				return { year: prev.year - 1, month: 12 };
			}
			return { year: prev.year, month: prev.month - 1 };
		});
	};

	const handleNextMonth = () => {
		setCurrentDate((prev) => {
			if (prev.month === 12) {
				return { year: prev.year + 1, month: 1 };
			}
			return { year: prev.year, month: prev.month + 1 };
		});
	};

	return (
		<div className="bg-white rounded-[0.92375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] p-6">
			<div className="flex flex-col sm:flex-row items-center justify-between mb-4">
				<div className="w-[180px] hidden sm:block">{/* 왼쪽 여백 공간 */}</div>
				<div className="flex items-center gap-4 sm:gap-14 mb-4 sm:mb-0">
					<Icon
						name="left"
						size={24}
						className="cursor-pointer text-gray-300 hover:text-gray-400"
						onClick={handlePrevMonth}
					/>
					<div className="text-[0.9rem] lg:text-lg font-medium whitespace-nowrap">
						{wardDuty.year}년 {wardDuty.month}월
					</div>
					<Icon
						name="right"
						size={24}
						className="cursor-pointer text-gray-300 hover:text-gray-400"
						onClick={handleNextMonth}
					/>
				</div>
				<div className="flex gap-2 w-full sm:w-[180px] justify-center sm:justify-end shrink-0">
					<Button
						text-size="lg"
						size="sm"
						color="primary"
						className="whitespace-nowrap px-3"
						onClick={() => setIsReqModalOpen(true)}
					>
						근무 요청
					</Button>
					<Button
						text-size="lg"
						size="sm"
						color="off"
						className="whitespace-nowrap px-3"
						onClick={() => console.log("다운로드")}
					>
						다운로드
					</Button>
				</div>
			</div>
			<div className="overflow-x-auto relative max-w-full md:max-w-none -mx-6 md:mx-0 px-6 md:px-0">
				<table className="min-w-full w-[800px] md:w-full border-separate border-spacing-0">
					<thead>
						<tr className="bg-gray-50">
							<th className="px-4 py-2 min-w-[80px] sticky left-0 bg-white z-20 before:absolute before:content-[''] before:top-0 before:left-[-9999px] before:bottom-0 before:w-[9999px] before:bg-white">
								<span className="text-gray-50"></span>
							</th>
							{days.map((day) => (
								<th
									key={day}
									className={`px-2 py-2 min-w-[40px] ${
										isWeekend(wardDuty.year, wardDuty.month, day)
											? "text-red-500"
											: ""
									} font-normal`}
								>
									{day}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{wardDuty.duty.map((member) => (
							<tr key={member.memberId} className="border-b border-gray-100">
								<td
									className={`pl-2 pr-2 py-2 font-medium sticky left-0 bg-white z-20 before:absolute before:content-[''] before:top-0 before:left-[-9999px] before:bottom-0 before:w-[9999px] before:bg-white text-center ${
										member.name.length > 3 ? "text-xs" : "text-sm"
									}`}
								>
									<div className="bg-gray-50 rounded-lg px-2 py-0.5 relative">
										{member.name}
									</div>
								</td>
								{member.shifts.split("").map((shift, index) => (
									<td key={index} className="px-2 py-1.5 text-center">
										<DutyBadgeEng
											type={
												(shift === "X" ? "default" : shift) as
													| "D"
													| "E"
													| "N"
													| "O"
													| "default"
											}
											variant="letter"
											size="sm"
										/>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{isReqModalOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
					onClick={() => setIsReqModalOpen(false)}
				>
					<div onClick={(e) => e.stopPropagation()}>
						<ReqShiftModal onClose={() => setIsReqModalOpen(false)} />
					</div>
				</div>
			)}
		</div>
	);
};

export default TeamShiftTable;
