// ShiftAdminTable.tsx

import DutyBadgeEng from "../atoms/DutyBadgeEng";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import { ProgressChecker } from "../atoms/ProgressChecker";
import React from "react";

// 월별 주말과 공휴일 계산 유틸리티 함수 수정
const getWeekendAndHolidayPairs = (year: number, month: number): number[][] => {
	const pairs: number[][] = [];

	// 1월의 경우 주말과 공휴일을 직접 지정
	if (month === 1) {
		pairs.push(
			[1, 2], // 첫째 주 주말
			[8, 9], // 둘째 주 주말
			[15, 16], // 셋째 주 주말
			[22, 23], // 넷째 주 주말
			[29, 30], // 설날 연휴
		);
	} else {
		// 다른 달의 경우 기존 로직 사용
		const daysInMonth = new Date(year, month, 0).getDate();
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(year, month - 1, day);
			const dayOfWeek = date.getDay();
			if (dayOfWeek === 6) {
				pairs.push([day, Math.min(day + 1, daysInMonth)]);
			}
		}
	}

	return pairs;
};

const ShiftAdminTable = () => {
	// 더미 간호사 데이터
	const nurses = [
		"김지민",
		"이서연",
		"박수진",
		"정예은",
		"최민지",
		"강지원",
		"윤서현",
		"임하은",
		"한소희",
		"신지아",
	];

	// 31일 x 10명의 근무 타입을 저장하는 상태
	const [duties, setDuties] = React.useState<
		Array<Array<"D" | "E" | "N" | "O" | "default">>
	>(Array(10).fill(Array(31).fill("default")));

	// 선택된 셀의 위치를 저장하는 상태
	const [selectedCell, setSelectedCell] = React.useState<{
		row: number;
		col: number;
	} | null>(null);

	// 현재 년도와 월을 상태로 관리
	const [currentYear] = React.useState(new Date().getFullYear());
	const [currentMonth] = React.useState(new Date().getMonth() + 1);

	// 주말과 공휴일 쌍 계산 (기존 weekendPairs를 대체)
	const holidayPairs = React.useMemo(
		() => getWeekendAndHolidayPairs(currentYear, currentMonth),
		[currentYear, currentMonth],
	);

	// duties 상태가 변경될 때 다음 셀로 이동하는 로직 추가
	React.useEffect(() => {
		if (!selectedCell) return;

		// 현재 행과 열
		const { row, col } = selectedCell;

		// 마지막 열이 아니면 다음 열로 이동
		if (col < 30) {
			setSelectedCell({ row, col: col + 1 });
		}
		// 마지막 열이면서 마지막 행이 아니면 다음 행의 첫 열로 이동
		else if (row < nurses.length - 1) {
			setSelectedCell({ row: row + 1, col: 0 });
		}
	}, [duties]); // duties가 변경될 때마다 실행

	// 키보드 이벤트 핸들러 (기존 코드)
	React.useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (!selectedCell) return;

			const key = e.key.toUpperCase();
			if (["D", "E", "N", "O"].includes(key)) {
				setDuties((prev) => {
					const newDuties = [...prev];
					newDuties[selectedCell.row] = [...newDuties[selectedCell.row]];
					newDuties[selectedCell.row][selectedCell.col] = key as
						| "D"
						| "E"
						| "N"
						| "O";
					return newDuties;
				});
			}
		};

		window.addEventListener("keypress", handleKeyPress);
		return () => window.removeEventListener("keypress", handleKeyPress);
	}, [selectedCell]);

	// 각 날짜별 근무 타입 카운트 계산
	const getDutyCounts = () => {
		const counts = Array(31)
			.fill(0)
			.map(() => ({
				D: 0,
				E: 0,
				N: 0,
				O: 0,
				total: 0,
			}));

		duties.forEach((nurseRow) => {
			nurseRow.forEach((duty, dayIndex) => {
				if (duty !== "default") {
					counts[dayIndex][duty]++;
					counts[dayIndex].total++;
				}
			});
		});

		return counts;
	};

	// 각 간호사별 근무 타입 카운트 계산 함수 추가
	const getNurseDutyCounts = (nurseIndex: number) => {
		const counts = {
			D: 0,
			E: 0,
			N: 0,
			O: 0,
		};

		duties[nurseIndex].forEach((duty) => {
			if (duty !== "default") {
				counts[duty]++;
			}
		});

		return counts;
	};

	const dutyCounts = getDutyCounts();

	// isWeekend 함수를 isHoliday로 변경
	const isHoliday = (day: number) => {
		return holidayPairs.some((pair) => day >= pair[0] && day <= pair[1]);
	};

	// 선택된 셀의 행과 열을 하이라이트하는 함수 추가
	const isHighlighted = (row: number, col: number) => {
		if (!selectedCell) return false;

		// 선택된 행의 모든 셀
		if (selectedCell.row === row) {
			if (col === -2) return "bg-[#FEF6F2] rounded-l-lg"; // 이름 열
			if (col === -1) return "bg-[#FEF6F2]"; // 전달근무 열
			if (col >= 0 && col < 31) {
				// 날짜 열들
				if (col === 0) return "bg-[#FEF6F2] rounded-l-lg";
				return "bg-[#FEF6F2]";
			}
			if (col >= 31) {
				// 통계 열들
				if (col === 34) return "bg-[#FEF6F2] rounded-r-lg"; // 마지막 통계 열
				return "bg-[#FEF6F2]";
			}
		}

		// 선택된 열
		if (selectedCell.col === col) {
			if (row === 0) return "bg-[#FEF6F2] rounded-t-lg"; // 첫 번째 행
			if (row === nurses.length - 1) return "bg-[#FEF6F2] rounded-b-lg"; // 마지막 행
			return "bg-[#FEF6F2]";
		}

		return "";
	};

	return (
		<>
			{/* 월 선택 및 버튼 영역 */}
			<div className="bg-white rounded-xl py-0.5 px-2 shadow-[0_4px_12px_rgba(0,0,0,0.1)] -mb-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						{/* 월 선택 영역 */}
						<div className="flex items-center gap-2">
							<Icon
								name="left"
								size={14}
								className="cursor-pointer text-gray-300"
							/>
							<span className="text-[12px] sm:text-base font-medium">1월</span>
							<Icon
								name="right"
								size={14}
								className="cursor-pointer text-gray-300"
							/>
							<span className="text-[11px] sm:text-xs text-gray-400 ml-1">
								기본 OFF{" "}
								<span className="text-[12px] sm:text-sm font-bold text-black">
									10
								</span>
								<span className="text-gray-400">일</span>
							</span>
						</div>
					</div>
					{/* 버튼 영역 */}
					<div className="flex gap-0.5 sm:gap-1">
						<Button
							text-size="xs"
							size="xs"
							color="primary"
							className="py-0.5 px-1.5 sm:py-1 sm:px-2"
						>
							규칙 편집
						</Button>
						<Button
							text-size="xs"
							size="xs"
							color="evening"
							className="py-0.5 px-1.5 sm:py-1 sm:px-2"
						>
							자동 생성
						</Button>
						<Button
							text-size="xs"
							size="xs"
							color="off"
							className="py-0.5 px-1.5 sm:py-1 sm:px-2"
						>
							다운로드
						</Button>
					</div>
				</div>
			</div>

			{/* 근무표, 통계, 완성도를 하나의 상자로 통합 */}
			<div className="bg-white rounded-xl p-2 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
				<div className="relative">
					<div className="overflow-x-auto">
						<div className="min-w-[800px]">
							<table className="relative w-full border-collapse z-10">
								<thead>
									<tr className="text-[10px] text-gray-600 border-b border-gray-200">
										<th className="p-0 text-center w-[90px] sm:w-24 border-r border-gray-200">
											<span className="block text-[10px] sm:text-xs px-0.5">
												이름
											</span>
										</th>
										<th className="p-0 text-center w-[90px] sm:w-24 border-r border-gray-200">
											<span className="block text-[10px] sm:text-xs px-0.5">
												전달근무
											</span>
										</th>
										{Array.from({ length: 31 }, (_, i) => {
											const day = i + 1;
											return (
												<th
													key={i}
													className={`p-0 text-center w-8 border-r border-gray-200 ${
														isHoliday(day) ? "text-red-500" : ""
													}`}
												>
													{day}
												</th>
											);
										})}
										<th className="p-0 text-center w-5 border-r border-gray-200">
											<div className="flex items-center justify-center">
												<div className="scale-[0.65]">
													<DutyBadgeEng type="D" size="sm" variant="filled" />
												</div>
											</div>
										</th>
										<th className="p-0 text-center w-5 border-r border-gray-200">
											<div className="flex items-center justify-center">
												<div className="scale-[0.65]">
													<DutyBadgeEng type="E" size="sm" variant="filled" />
												</div>
											</div>
										</th>
										<th className="p-0 text-center w-5 border-r border-gray-200">
											<div className="flex items-center justify-center">
												<div className="scale-[0.65]">
													<DutyBadgeEng type="N" size="sm" variant="filled" />
												</div>
											</div>
										</th>
										<th className="p-0 text-center w-5 border-r border-gray-200">
											<div className="flex items-center justify-center">
												<div className="scale-[0.65]">
													<DutyBadgeEng type="O" size="sm" variant="filled" />
												</div>
											</div>
										</th>
									</tr>
								</thead>
								<tbody>
									{nurses.map((name, i) => (
										<tr
											key={i}
											className="text-[10px] border-b border-gray-200"
										>
											<td
												className={`p-0 text-center border-r border-gray-200 ${isHighlighted(i, -2)}`}
											>
												<span className="block text-[10px] sm:text-xs px-1 whitespace-nowrap overflow-hidden text-ellipsis">
													{name}
												</span>
											</td>
											<td
												className={`p-0 border-r border-gray-200 ${isHighlighted(i, -1)}`}
											>
												<div className="flex justify-center -space-x-2">
													<div className="scale-50">
														<DutyBadgeEng type="D" size="sm" variant="filled" />
													</div>
													<div className="scale-50">
														<DutyBadgeEng type="E" size="sm" variant="filled" />
													</div>
													<div className="scale-50">
														<DutyBadgeEng type="N" size="sm" variant="filled" />
													</div>
													<div className="scale-50">
														<DutyBadgeEng type="O" size="sm" variant="filled" />
													</div>
												</div>
											</td>
											{Array.from({ length: 31 }, (_, j) => (
												<td
													key={j}
													className={`p-0 text-center border-r border-gray-200 ${isHighlighted(i, j)}`}
												>
													<div
														className="flex items-center justify-center cursor-pointer"
														onClick={() => setSelectedCell({ row: i, col: j })}
													>
														<div className="scale-[0.65]">
															<DutyBadgeEng
																type={duties[i][j]}
																size="sm"
																variant="filled"
															/>
														</div>
													</div>
												</td>
											))}
											<td
												className={`p-0 text-center border-r border-gray-200 ${isHighlighted(i, 31)}`}
											>
												{getNurseDutyCounts(i).D}
											</td>
											<td
												className={`p-0 text-center border-r border-gray-200 ${isHighlighted(i, 32)}`}
											>
												{getNurseDutyCounts(i).E}
											</td>
											<td
												className={`p-0 text-center border-r border-gray-200 ${isHighlighted(i, 33)}`}
											>
												{getNurseDutyCounts(i).N}
											</td>
											<td
												className={`p-0 text-center border-r border-gray-200 ${isHighlighted(i, 34)}`}
											>
												{getNurseDutyCounts(i).O}
											</td>
										</tr>
									))}
								</tbody>
								{/* 통계 행들을 같은 테이블에 직접 추가 */}
								<tbody>
									{["DAY", "EVENING", "NIGHT", "OFF", "TOTAL"].map(
										(text, i) => (
											<tr
												key={`empty-${i}`}
												className="text-[10px] h-6 border-b border-gray-200"
											>
												<td
													colSpan={2}
													className={`p-0 font-bold text-[11px] border-r border-gray-200 ${
														i === 0
															? "text-[#318F3D]"
															: i === 1
																? "text-[#E55656]"
																: i === 2
																	? "text-[#532FC8]"
																	: i === 3
																		? "text-[#726F5A]"
																		: "text-black"
													}`}
												>
													<div className="flex items-center justify-center">
														{text}
													</div>
												</td>
												{Array.from({ length: 31 }, (_, j) => (
													<td
														key={j}
														className={`p-0 text-center text-[11px] border-r border-gray-200 ${
															selectedCell?.col === j ? "bg-[#FEF6F2]" : ""
														}`}
													>
														<div className="flex items-center justify-center h-6">
															{i === 0 && dutyCounts[j].D}
															{i === 1 && dutyCounts[j].E}
															{i === 2 && dutyCounts[j].N}
															{i === 3 && dutyCounts[j].O}
															{i === 4 && dutyCounts[j].total}
														</div>
													</td>
												))}
												{/* 각 행의 마지막 4개 열을 차지하는 셀 */}
												{i === 0 && (
													<td
														rowSpan={5}
														colSpan={4}
														className="p-0 border-r border-gray-200"
													>
														<div className="flex justify-center items-center h-full">
															<div className="scale-[0.85]">
																<ProgressChecker
																	value={75}
																	size={80}
																	strokeWidth={4}
																	showLabel={true}
																/>
															</div>
														</div>
													</td>
												)}
											</tr>
										),
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ShiftAdminTable;
