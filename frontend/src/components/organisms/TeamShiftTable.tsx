import { useEffect, useState } from "react";
//import axios from 'axios';
import DutyBadgeEng from "../atoms/DutyBadgeEng";

interface Duty {
	memberId: number;
	name: string;
	shifts: string;
}

interface DutyData {
	_id: string;
	year: number;
	month: number;
	duty: Duty[];
}

const TeamShiftTable = () => {
	const [dutyData, setDutyData] = useState<DutyData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchDutyData = async () => {
			try {
				// API 구현 전 임시 데이터
				const mockData: DutyData = {
					_id: "1",
					year: 2025,
					month: 1,
					duty: [
						{ memberId: 1, name: "김민지", shifts: "DDENNODDDENNODDDENNODD" },
						{ memberId: 2, name: "이서연", shifts: "EENNODDDEENNODDDEENNOD" },
						{ memberId: 3, name: "박지현", shifts: "NNODDDEENNODDDEENNODD" },
						{ memberId: 4, name: "최수아", shifts: "ODDDEENNODDDEENNODDDE" },
						{ memberId: 5, name: "정유진", shifts: "DDEENNODDDEENNODDDEEN" },
						{ memberId: 6, name: "한소희", shifts: "EENNODDDEENNODDDEENNO" },
						{ memberId: 7, name: "강다희", shifts: "NNODDDEENNODDDEENNOD" },
						{ memberId: 8, name: "윤서아", shifts: "ODDDEENNODDDEENNODDDE" },
						{ memberId: 9, name: "송지원", shifts: "DDEENNODDDEENNODDDEEN" },
						{ memberId: 10, name: "임하늘", shifts: "EENNODDDEENNODDDEENNO" },
					],
				};
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

	// 날짜 배열 생성 (1-31)
	const days = Array.from({ length: 31 }, (_, i) => i + 1);

	return (
		<div className="bg-white rounded-[0.92375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] p-6">
			<div className="text-xl font-bold mb-4">
				{dutyData.year}년 {dutyData.month}월
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
											type={shift as "D" | "E" | "N" | "O"}
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
		</div>
	);
};

export default TeamShiftTable;
