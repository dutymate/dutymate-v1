// ShiftAdminTable.tsx

import RuleEditModal from "./RuleEditModal";
import DutyBadgeEng from "../atoms/DutyBadgeEng";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import { ProgressChecker } from "../atoms/ProgressChecker";
import { useState, useRef, useEffect } from "react";
import { dutyService } from "../../services/dutyService";
import { toast } from "react-toastify";

// 월별 주말과 공휴일 계산 유틸리티 함수 수정
const getWeekendAndHolidayPairs = (year: number, month: number): number[][] => {
	const pairs: number[][] = [];

	// 다른 달의 경우 기존 로직 사용
	const daysInMonth = new Date(year, month, 0).getDate();
	for (let day = 1; day <= daysInMonth; day++) {
		const date = new Date(year, month - 1, day);
		const dayOfWeek = date.getDay();
		if (dayOfWeek === 6) {
			pairs.push([day, Math.min(day + 1, daysInMonth)]);
		}
	}

	return pairs;
};

interface ShiftAdminTableProps {
	dutyData: {
		memberId: number;
		name: string;
		role: "HN" | "RN";
		prevShifts: string;
		shifts: string;
	}[];
	invalidCnt: number;
	year: number;
	month: number;
	onUpdate: (year?: number, month?: number, historyIdx?: number) => void;
	issues: {
		name: string;
		startDate: number;
		endDate: number;
		endDateShift: string;
		message: string;
	}[];
}

const ShiftAdminTable = ({
	dutyData,
	invalidCnt,
	year,
	month,
	onUpdate,
	issues,
}: ShiftAdminTableProps) => {
	const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
	const ruleButtonRef = useRef<HTMLButtonElement>(null);
	const [selectedCell, setSelectedCell] = useState<{
		row: number;
		col: number;
	} | null>(null);

	// 근무표 데이터 변환
	const nurses = dutyData.map((nurse) => nurse.name);
	const duties = dutyData.map((nurse) => nurse.shifts.split(""));
	const prevShifts = dutyData.map((nurse) => nurse.prevShifts.split(""));

	// 근무 변경 핸들러
	const handleShiftChange = async (
		nurseIndex: number,
		dayIndex: number,
		shift: "D" | "E" | "N" | "O" | "X",
	) => {
		const nurse = dutyData[nurseIndex];
		const shifts = nurse.shifts.split("");
		const currentShift = shifts[dayIndex];

		try {
			await dutyService.updateDuty({
				year,
				month,
				history: {
					memberId: nurse.memberId,
					name: nurse.name,
					before: currentShift,
					after: shift,
					modifiedDay: dayIndex + 1,
					isAutoCreated: false,
				},
			});

			// 업데이트 후 데이터 새로고침
			onUpdate();
		} catch (error) {
			console.error("Failed to update shift:", error);
		}
	};

	// 키보드 이벤트 핸들러
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (!selectedCell) return;

			const { row, col } = selectedCell;
			if (col >= 0 && col < 31) {
				const key = e.key.toUpperCase();
				if (["D", "E", "N", "O", "X"].includes(key)) {
					handleShiftChange(row, col, key as "D" | "E" | "N" | "O" | "X");

					// 다음 셀로 이동
					if (col < 30) {
						setSelectedCell({ row, col: col + 1 });
					} else if (row < nurses.length - 1) {
						setSelectedCell({ row: row + 1, col: 0 });
					}
				}
			}
		};

		window.addEventListener("keypress", handleKeyPress);
		return () => window.removeEventListener("keypress", handleKeyPress);
	}, [selectedCell]);

	// 셀 클릭 핸들러 (선택만 하고 변경은 하지 않음)
	const handleCellClick = (row: number, col: number) => {
		setSelectedCell({ row, col });
	};

	// 이전 달로 이동
	const handlePrevMonth = () => {
		if (month === 1) {
			onUpdate(year - 1, 12);
		} else {
			onUpdate(year, month - 1);
		}
	};

	// 다음 달로 이동
	const handleNextMonth = () => {
		if (month === 12) {
			onUpdate(year + 1, 1);
		} else {
			onUpdate(year, month + 1);
		}
	};

	// 날짜별 근무 통계 계산
	const dutyCounts = Array.from({ length: 31 }, (_, dayIndex) => {
		const counts = {
			D: 0,
			E: 0,
			N: 0,
			O: 0,
			total: 0,
		};

		duties.forEach((nurseShifts) => {
			const shift = nurseShifts[dayIndex];
			if (shift && shift !== "X") {
				counts[shift as keyof typeof counts]++;
				counts.total++;
			}
		});

		return counts;
	});

	// 간호사별 근무 통계 계산
	const getNurseDutyCounts = (nurseIndex: number) => {
		const counts = {
			D: 0,
			E: 0,
			N: 0,
			O: 0,
		};

		duties[nurseIndex].forEach((shift) => {
			if (shift && shift !== "X") {
				counts[shift as keyof typeof counts]++;
			}
		});

		return counts;
	};

	// 주말 및 공휴일 체크
	const isHoliday = (day: number) => {
		const weekendPairs = getWeekendAndHolidayPairs(year, month);
		return weekendPairs.some((pair) => day >= pair[0] && day <= pair[1]);
	};

	// 셀 하이라이트 로직
	const isHighlighted = (row: number, col: number) => {
		if (!selectedCell) return "";

		// 기존 하이라이트 로직 유지
		if (row === selectedCell.row) {
			if (col >= 0 && col < 31) {
				if (col === 0) return "bg-[#FFEEE5] rounded-l-lg";
				return "bg-[#FFEEE5]";
			}
			if (col >= 31) {
				if (col === 34) return "bg-[#FFEEE5] rounded-r-lg";
				return "bg-[#FFEEE5]";
			}
		}

		if (selectedCell.col === col) {
			if (row === 0) return "bg-[#FFEEE5] rounded-t-lg";
			if (row === nurses.length - 1) return "bg-[#FFEEE5] rounded-b-lg";
			return "bg-[#FFEEE5]";
		}

		return "";
	};

	// 완성도 계산
	const calculateProgress = () => {
		const totalCells = nurses.length * 31;
		const filledCells = duties.reduce(
			(acc, nurseRow) => acc + nurseRow.filter((duty) => duty !== "X").length,
			0,
		);
		return Math.round(((filledCells - invalidCnt) / totalCells) * 100);
	};

	// Calculate the number of days in the current month
	const daysInMonth = new Date(year, month, 0).getDate();

	// 자동생성 핸들러 수정
	const handleAutoCreate = async () => {
		try {
			// 자동생성 중임을 알림
			const loadingToast = toast.loading("자동생성 중입니다...", {
				position: "top-center",
			});

			// API 호출
			await dutyService.autoCreateDuty(year, month);

			// 성공 알림
			toast.update(loadingToast, {
				render: "자동생성에 성공했습니다",
				type: "success",
				isLoading: false,
				autoClose: 1500,
			});

			// 잠시 후 페이지 새로고침
			setTimeout(() => {
				window.location.href = "/shift-admin";
			}, 1500);
		} catch (error) {
			// 실패 알림
			toast.error("자동생성에 실패했습니다", {
				position: "top-center",
				autoClose: 1500,
			});

			// 잠시 후 페이지 새로고침
			setTimeout(() => {
				window.location.href = "/shift-admin";
			}, 1500);
		}
	};

	// 위반 사항 체크 함수 추가
	const getViolation = (nurseIndex: number, dayIndex: number) => {
		const nurseName = nurses[nurseIndex];
		return issues.find(
			(issue) =>
				issue.name === nurseName &&
				dayIndex + 1 >= issue.startDate &&
				dayIndex + 1 <= issue.endDate,
		);
	};

	return (
		<>
			{/* 월 선택 및 버튼 영역 */}
			<div className="bg-white rounded-xl py-2 px-2 mb-0.75">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<div className="flex ml-3 items-center gap-3">
							<Icon
								name="left"
								size={16}
								className="cursor-pointer text-gray-600 hover:text-gray-800"
								onClick={handlePrevMonth}
							/>
							<span className="text-lg font-medium">{month}월</span>
							<Icon
								name="right"
								size={16}
								className="cursor-pointer text-gray-600 hover:text-gray-800"
								onClick={handleNextMonth}
							/>
							<div className="flex items-center gap-2 ml-1">
								<span className="text-[11px] sm:text-xs text-gray-400">
									기본 OFF
								</span>
								<span className="text-[12px] sm:text-sm font-bold text-black">
									10
								</span>
								<span className="text-foreground">일</span>
							</div>
						</div>
					</div>
					{/* 버튼 영역 */}
					<div className="flex gap-1 sm:gap-2">
						<Button
							ref={ruleButtonRef}
							size="sm"
							color="primary"
							className="py-0.5 px-1.5 sm:py-1 sm:px-2"
							onClick={() => setIsRuleModalOpen(true)}
						>
							규칙 조회
						</Button>
						<Button
							text-size="sm"
							size="sm"
							color="evening"
							className="py-0.5 px-1.5 sm:py-1 sm:px-2"
							onClick={handleAutoCreate}
						>
							자동 생성
						</Button>
						<Button
							text-size="sm"
							size="sm"
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
									<tr className="text-xs text-gray-600 border-b border-gray-200">
										<th className="p-0 text-center w-[90px] sm:w-24 border-r border-gray-200">
											<span className="block text-xs sm:text-sm px-0.5">
												이름
											</span>
										</th>
										<th className="p-0 text-center w-[90px] sm:w-24 border-r border-gray-200">
											<span className="block text-xs sm:text-sm px-0.5">
												이전 근무
											</span>
										</th>
										{Array.from({ length: daysInMonth }, (_, i) => {
											const day = i + 1;
											return (
												<th
													key={i}
													className={`p-0 text-center w-10 border-r border-gray-200 ${
														isHoliday(day) ? "text-red-500" : ""
													}`}
												>
													{day}
												</th>
											);
										})}
										<th className="p-0 text-center w-7 border-r border-gray-200">
											<div className="flex items-center justify-center">
												<div className="scale-[0.65]">
													<DutyBadgeEng type="D" size="sm" variant="filled" />
												</div>
											</div>
										</th>
										<th className="p-0 text-center w-7 border-r border-gray-200">
											<div className="flex items-center justify-center">
												<div className="scale-[0.65]">
													<DutyBadgeEng type="E" size="sm" variant="filled" />
												</div>
											</div>
										</th>
										<th className="p-0 text-center w-7 border-r border-gray-200">
											<div className="flex items-center justify-center">
												<div className="scale-[0.65]">
													<DutyBadgeEng type="N" size="sm" variant="filled" />
												</div>
											</div>
										</th>
										<th className="p-0 text-center w-7 border-r border-gray-200">
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
										<tr key={i} className="h-8 border-b border-gray-200 group">
											<td
												className={`p-0 text-center border-r border-gray-200 ${isHighlighted(i, -2)}`}
											>
												<span className="block text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
													{name}
												</span>
											</td>
											<td
												className={`p-0 border-r border-gray-200 ${isHighlighted(i, -1)}`}
											>
												<div className="flex justify-center -space-x-1.5">
													{prevShifts[i].map((shift, index) => (
														<div key={index} className="scale-[0.65]">
															<DutyBadgeEng
																type={
																	shift as "X" | "D" | "E" | "N" | "O" | "ALL"
																}
																size="sm"
																variant="filled"
															/>
														</div>
													))}
												</div>
											</td>
											{Array.from({ length: daysInMonth }, (_, j) => {
												const violation = getViolation(i, j);
												const isViolationMiddle =
													violation &&
													j + 1 ===
														Math.floor(
															(violation.startDate + violation.endDate) / 2,
														);
												const isViolationCell =
													violation &&
													j + 1 >= violation.startDate &&
													j + 1 <= violation.endDate;

												return (
													<td
														key={j}
														className={`p-0 text-center border-r border-gray-200 relative ${isHighlighted(
															i,
															j,
														)} ${isViolationCell ? "group" : ""}`}
													>
														<div
															className="flex items-center justify-center cursor-pointer relative"
															onClick={() => handleCellClick(i, j)}
															tabIndex={0}
															role="button"
															aria-label={`${nurses[i]}의 ${j + 1}일 근무`}
														>
															{violation && (
																<div className="absolute -inset-y-1 inset-x-0 bg-red-500 opacity-30 rounded-md" />
															)}
															<div className="relative z-10">
																<div className="scale-[0.95]">
																	<DutyBadgeEng
																		type={
																			duties[i][j] as
																				| "X"
																				| "D"
																				| "E"
																				| "N"
																				| "O"
																				| "ALL"
																		}
																		size="sm"
																		variant="filled"
																	/>
																</div>
															</div>
															{isViolationMiddle && (
																<div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-600 text-xs p-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20">
																	{violation.message}
																</div>
															)}
														</div>
													</td>
												);
											})}
											<td
												className={`p-0 text-xs text-center border-r border-gray-200 ${isHighlighted(i, 31)}`}
											>
												{getNurseDutyCounts(i).D}
											</td>
											<td
												className={`p-0 text-xs text-center border-r border-gray-200 ${isHighlighted(i, 32)}`}
											>
												{getNurseDutyCounts(i).E}
											</td>
											<td
												className={`p-0 text-xs text-center border-r border-gray-200 ${isHighlighted(i, 33)}`}
											>
												{getNurseDutyCounts(i).N}
											</td>
											<td
												className={`p-0 text-xs text-center border-r border-gray-200 ${isHighlighted(i, 34)}`}
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
												{Array.from({ length: daysInMonth }, (_, j) => (
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
																	value={calculateProgress()}
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

			{/* 규칙 편집 모달 */}
			{isRuleModalOpen && (
				<RuleEditModal
					onClose={() => setIsRuleModalOpen(false)}
					buttonRef={ruleButtonRef}
				/>
			)}
		</>
	);
};

export default ShiftAdminTable;
