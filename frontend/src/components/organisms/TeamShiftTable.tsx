import { useEffect, useState } from "react";
//import axios from 'axios';
import DutyBadgeEng from "../atoms/DutyBadgeEng";
import { Button } from "../atoms/Button";
import { dutyService } from "../../services/dutyService"; //실제 API 호출에 필요한 axios import
// 임시 데이터 import
import mockData from "../../services/response-json/duty/GetApiDutyWard.json";

interface DutyMember {
	memberId: number;
	name: string;
	shifts: string;
}

interface DutyInfo {
	id: string; // _id에서 id로 변경
	year: number;
	month: number;
	duty: DutyMember[];
}

const TeamShiftTable = () => {
	const [dutyData, setDutyData] = useState<DutyInfo | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isReqModalOpen, setIsReqModalOpen] = useState(false);

	useEffect(() => {
		const fetchDutyData = async () => {
			try {
				// 실제 API 호출 (현재는 주석 처리)
				// const response = await dutyService.getWardDuty();
				// setDutyData(response);

				// 임시 데이터 사용
				setDutyData(mockData);
			} catch (err) {
				setError("근무표를 불러오는데 실패했습니다.");
			} finally {
				setLoading(false);
			}
		};

		fetchDutyData();
	}, []);

	if (loading) return <div>로딩중...</div>;
	if (error) return <div>{error}</div>;
	if (!dutyData) return null;

	// 해당 월의 실제 일수 계산
	const daysInMonth = new Date(dutyData.year, dutyData.month, 0).getDate();
	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

	return (
		<div className="bg-white rounded-[0.92375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] p-6">
			<div className="flex justify-between items-center mb-4">
				<div className="text-xl font-bold">
					{dutyData.year}년 {dutyData.month}월
				</div>
				<div className="flex gap-2">
					<Button
						text-size="lg"
						size="sm"
						color="primary"
						onClick={() => setIsReqModalOpen(true)}
					>
						근무 요청
					</Button>
					<Button
						text-size="lg"
						size="sm"
						color="off"
						onClick={() => console.log("다운로드")}
					>
						다운로드
					</Button>
				</div>
			</div>
			<div className="overflow-x-auto relative">
				<table className="min-w-full border-collapse">
					<thead>
						<tr className="bg-gray-50">
							<th className="border px-4 py-2 min-w-[100px] sticky left-0 bg-gray-50 z-10">
								이름
							</th>
							{days.map((day) => (
								<th key={day} className="border px-2 py-2 min-w-[40px]">
									{day}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{dutyData.duty.map((member) => (
							<tr key={member.memberId}>
								<td className="border px-4 py-2 font-medium sticky left-0 bg-white z-10">
									{member.name}
								</td>
								{member.shifts.split("").map((shift, index) => (
									<td key={index} className="border px-2 py-2 text-center">
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
						{/* ReqShiftModal will be placed here */}
						{/* <ReqShiftModal onClose={() => setIsReqModalOpen(false)} /> */}
					</div>
				</div>
			)}
		</div>
	);
};

export default TeamShiftTable;
