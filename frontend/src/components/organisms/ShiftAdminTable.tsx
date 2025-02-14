// ShiftAdminTable.tsx

import RuleEditModal from "./RuleEditModal";
import DutyBadgeEng from "../atoms/DutyBadgeEng";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import { ProgressChecker } from "../atoms/ProgressChecker";
import { useState, useRef, useEffect, useCallback } from "react";
import { dutyService } from "../../services/dutyService";
import { toast } from "react-toastify";
import useShiftStore from "../../store/shiftStore";
import FaultLayer from "../atoms/FaultLayer";
import { toPng } from "html-to-image";

const THROTTLE_DELAY = 1000; // 1초
let lastUpdateTime = 0;

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
	onUpdate: (year: number, month: number, historyIdx?: number) => Promise<void>;
	issues: {
		name: string;
		startDate: number;
		endDate: number;
		endDateShift: string;
		message: string;
	}[];
}

const getMaxAllowedMonth = () => {
	const today = new Date();
	const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
	return {
		year: nextMonth.getFullYear(),
		month: nextMonth.getMonth() + 1,
	};
};

const ShiftAdminTable = ({
	dutyData,
	// invalidCnt,
	year,
	month,
	onUpdate,
	issues,
}: ShiftAdminTableProps) => {
	const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const ruleButtonRef = useRef<HTMLButtonElement>(null);
	const tableRef = useRef<HTMLDivElement>(null);

	const selectedCell = useShiftStore((state) => state.selectedCell);
	const setSelectedCell = useShiftStore((state) => state.setSelectedCell);
	const updateShift = useShiftStore((state) => state.updateShift);
	const setNurseGrades = useShiftStore((state) => state.setNurseGrades);

	// Add hover state management at component level
	const [hoveredCell, setHoveredCell] = useState<{
		row: number;
		day: number;
	} | null>(null);

	// 근무표 데이터 변환
	const nurses = dutyData.map((nurse) => nurse.name);
	const duties = dutyData.map((nurse) => nurse.shifts.split(""));
	const prevShifts = dutyData.map((nurse) => nurse.prevShifts.split(""));

	// 근무 변경 핸들러
	const handleShiftChange = useCallback(
		async (
			nurseIndex: number,
			dayIndex: number,
			shift: "D" | "E" | "N" | "O" | "X",
		) => {
			const now = Date.now();
			if (now - lastUpdateTime < THROTTLE_DELAY) {
				toast.warning("잠시 후 다시 시도해주세요", {
					position: "top-center",
					autoClose: 1000,
				});
				return;
			}

			const nurse = dutyData[nurseIndex];
			const shifts = nurse.shifts.split("");
			const currentShift = shifts[dayIndex];

			try {
				lastUpdateTime = now;
				await updateShift({
					year,
					month,
					memberId: nurse.memberId,
					name: nurse.name,
					dayIndex,
					before: currentShift,
					after: shift,
				});
			} catch (error) {
				toast.error("근무 수정에 실패했습니다.");
			}
		},
		[dutyData, year, month, updateShift],
	);

	// 현재 달의 일수 계산
	const daysInMonth = new Date(year, month, 0).getDate();

	// 키보드 이벤트 핸들러
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!selectedCell) return;
			const { row, col } = selectedCell;

			switch (e.key) {
				case "ArrowRight":
					if (col < daysInMonth - 1) {
						setSelectedCell({ row, col: col + 1 });
					} else if (row < nurses.length - 1) {
						// 마지막 열에서 다음 행의 첫 열로 이동
						setSelectedCell({ row: row + 1, col: 0 });
					}
					break;
				case "ArrowLeft":
					if (col > 0) {
						setSelectedCell({ row, col: col - 1 });
					} else if (row > 0) {
						// 첫 열에서 이전 행의 마지막 열로 이동
						setSelectedCell({ row: row - 1, col: daysInMonth - 1 });
					}
					break;
				case "ArrowUp":
					if (row > 0) {
						setSelectedCell({ row: row - 1, col });
					}
					break;
				case "ArrowDown":
					if (row < nurses.length - 1) {
						setSelectedCell({ row: row + 1, col });
					}
					break;
				case "Delete":
					handleShiftChange(row, col, "X");
					break;
				case "Backspace":
					handleShiftChange(row, col, "X");
					if (col > 0) {
						setSelectedCell({ row, col: col - 1 });
					} else if (row > 0) {
						// 첫 열에서 이전 행의 마지막 열로 이동
						setSelectedCell({ row: row - 1, col: daysInMonth - 1 });
					}
					break;
			}
		};

		const handleKeyPress = (e: KeyboardEvent) => {
			if (!selectedCell) return;

			const { row, col } = selectedCell;
			if (col >= 0 && col < daysInMonth) {
				const key = e.key.toUpperCase();
				// Add Korean character support
				const validKeys = [
					"D",
					"E",
					"N",
					"O",
					"X",
					"ㅇ",
					"ㄷ",
					"ㅜ",
					"ㅐ",
					"ㅊ",
				];
				const keyMap: { [key: string]: "D" | "E" | "N" | "O" | "X" } = {
					ㅇ: "D", // Korean character for D
					ㄷ: "E", // Korean character for E
					ㅜ: "N", // Korean character for N
					ㅐ: "O", // Korean character for O
					ㅊ: "X", // Korean character for X
				};

				if (validKeys.includes(key)) {
					const shiftKey = keyMap[key] || key; // Map Korean key to English if needed
					handleShiftChange(row, col, shiftKey as "D" | "E" | "N" | "O" | "X");

					// 다음 셀로 이동
					if (col < daysInMonth - 1) {
						setSelectedCell({ row, col: col + 1 });
					} else if (row < nurses.length - 1) {
						// 마지막 열에서 다음 행의 첫 열로 이동
						setSelectedCell({ row: row + 1, col: 0 });
					}
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keypress", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keypress", handleKeyPress);
		};
	}, [selectedCell, nurses.length, daysInMonth, handleShiftChange]);

	// 셀 클릭 핸들러 (선택만 하고 변경은 하지 않음)
	const handleCellClick = (row: number, col: number) => {
		setSelectedCell({ row, col });
	};

	// 이전 달로 이동
	const handlePrevMonth = async () => {
		const newYear = month === 1 ? year - 1 : year;
		const newMonth = month === 1 ? 12 : month - 1;

		try {
			setIsLoading(true);
			// URL 쿼리 파라미터 업데이트
			const url = new URL(window.location.href);
			url.searchParams.set("year", newYear.toString());
			url.searchParams.set("month", newMonth.toString());
			window.history.pushState({}, "", url.toString());

			await onUpdate(newYear, newMonth);
		} catch (error) {
			toast.error("근무표 조회에 실패했습니다.");
		} finally {
			setIsLoading(false);
		}
	};

	// 다음 달로 이동
	const handleNextMonth = async () => {
		const maxAllowed = getMaxAllowedMonth();

		// Calculate next month (수정된 로직)
		const nextMonth = month === 12 ? 1 : month + 1;
		const nextYear = month === 12 ? year + 1 : year;

		// Check if next month exceeds the limit
		if (
			nextYear > maxAllowed.year ||
			(nextYear === maxAllowed.year && nextMonth > maxAllowed.month)
		) {
			toast.warning("다음 달까지만 조회할 수 있습니다.", {
				position: "top-center",
				autoClose: 2000,
			});
			return;
		}

		try {
			setIsLoading(true);
			// URL 쿼리 파라미터 업데이트
			const url = new URL(window.location.href);
			url.searchParams.set("year", nextYear.toString());
			url.searchParams.set("month", nextMonth.toString());
			window.history.pushState({}, "", url.toString());

			await onUpdate(nextYear, nextMonth);
		} catch (error) {
			toast.error("근무표 조회에 실패했습니다.");
		} finally {
			setIsLoading(false);
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

		const baseHighlight = "transition-all duration-100";

		// 선택된 셀 자체의 하이라이트
		if (row === selectedCell.row && col === selectedCell.col) {
			return `${baseHighlight} bg-duty-off-bg ring-2 ring-primary ring-offset-2 z-[0]`;
		}

		// 같은 행 하이라이트 (이름과 이전 근무 포함)
		if (row === selectedCell.row) {
			// 이름 열
			if (col === -2) return `${baseHighlight} bg-duty-off-bg rounded-l-lg`;
			// 이전 근무 열
			if (col === -1) return `${baseHighlight} bg-duty-off-bg`;
			// 일반 근무 열
			if (col >= 0 && col < 31) {
				if (col === 0) return `${baseHighlight} bg-duty-off-bg`;
				return `${baseHighlight} bg-duty-off-bg`;
			}
			// 통계 열
			if (col >= 31) {
				if (col === 34) return `${baseHighlight} bg-duty-off-bg rounded-r-lg`;
				return `${baseHighlight} bg-duty-off-bg`;
			}
		}

		// 같은 열 하이라이트
		if (selectedCell.col === col) {
			if (row === 0) return `${baseHighlight} bg-duty-off-bg rounded-t-lg`;
			if (row === nurses.length - 1) return `${baseHighlight} bg-duty-off-bg`;
			return `${baseHighlight} bg-duty-off-bg`;
		}

		return "";
	};

	// 완성도 계산
	const calculateProgress = () => {
		const totalCells = nurses.length * daysInMonth;
		const filledCells = duties.reduce(
			(acc, nurseRow) => acc + nurseRow.filter((duty) => duty !== "X").length,
			0,
		);

		// 이슈당 해당하는 일수 계산
		const issueCnt = issues.reduce((acc, issue) => {
			return acc + (issue.endDate - issue.startDate + 1);
		}, 0);

		// 완성도 = (채워진 셀 - 이슈 셀) / 전체 셀 * 100
		const progress = ((filledCells - issueCnt) / totalCells) * 100;

		// 음수가 나올 경우 0으로 처리하고, 소수점 반올림
		return Math.max(0, Math.round(progress));
	};

	// 자동생성 핸들러 수정
	const handleAutoCreate = async () => {
		// 총 간호사 수 확인
		if (nurses.length < 10) {
			const confirmed = window.confirm(
				"해당 기능 최소 인원은 10명입니다. 임시 간호사를 추가해주세요.",
			);
			if (confirmed) {
				window.location.href = "/ward-admin";
			}
			return;
		}

		try {
			// 자동생성 중임을 알림
			const loadingToast = toast.loading("자동생성 중입니다...", {
				position: "top-center",
			});

			// API 호출
			const data = await dutyService.autoCreateDuty(year, month);

			// 받아온 데이터로 직접 상태 업데이트
			useShiftStore.getState().setDutyInfo(data);

			// onUpdate 함수 호출하여 화면 갱신
			await onUpdate(year, month);

			// 성공 알림
			toast.update(loadingToast, {
				render: "자동생성에 성공했습니다",
				type: "success",
				isLoading: false,
				autoClose: 1500,
			});
		} catch (error) {
			// 실패 알림
			toast.error("자동생성에 실패했습니다", {
				position: "top-center",
				autoClose: 1500,
			});
		}
	};

	// // 위반 사항 체크 함수 추가
	// const getViolation = (nurseIndex: number, dayIndex: number) => {
	// 	const nurseName = nurses[nurseIndex];
	// 	return issues.find(
	// 		(issue) =>
	// 			issue.name === nurseName &&
	// 			dayIndex + 1 >= issue.startDate &&
	// 			dayIndex + 1 <= issue.endDate,
	// 	);
	// };

	// 해당 월의 기본 OFF 일수 계산 (주말/공휴일)
	const getDefaultOffDays = (year: number, month: number) => {
		const pairs = getWeekendAndHolidayPairs(year, month);
		// 각 쌍의 날짜 수를 계산하여 합산
		return pairs.reduce((total, [start, end]) => {
			return total + (end - start + 1);
		}, 0);
	};

	// 근무표 다운로드 기능
	const handleDownloadWardSchedule = async () => {
		const tableElement = tableRef.current?.querySelector(".duty-table-content");
		if (!tableElement) return;

		try {
			const dataUrl = await toPng(tableElement as HTMLElement, {
				quality: 1.0,
				pixelRatio: 2,
				width: tableElement.scrollWidth + 14.5, // 여백 추가
				height: tableElement.scrollHeight + 5, // 여백 추가
				backgroundColor: "#FFFFFF",
				style: {
					borderCollapse: "collapse",
				},
			});

			const link = document.createElement("a");
			link.download = `듀티표_${year}년_${month}월.png`;
			link.href = dataUrl;
			link.click();

			toast.success("듀티표가 다운로드되었습니다.");
		} catch (error) {
			console.error("Download error:", error);
			toast.error("듀티표 다운로드에 실패했습니다.");
		}
	};

	// URL 쿼리 파라미터로부터 초기 데이터 로드
	useEffect(() => {
		const url = new URL(window.location.href);
		const urlYear = url.searchParams.get("year");
		const urlMonth = url.searchParams.get("month");

		// URL에 year, month가 없을 때만 현재 값으로 설정
		if (!urlYear || !urlMonth) {
			url.searchParams.set("year", year.toString());
			url.searchParams.set("month", month.toString());
			window.history.replaceState({}, "", url.toString());
		}
	}, []); // 컴포넌트 마운트 시 한 번만 실행


	// 듀티표 초기화하기
	const handleResetDuty = () =>{
		const confirm = window.confirm("듀티표와 히스토리 데이터가 초기화 됩니다. 듀티표를 초기화하시겠습니까?")
		if(confirm){
			
		}
		return;
	}


	return (
		<div
			className="bg-white rounded-[0.92375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] p-6"
			ref={tableRef}
		>
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
									{getDefaultOffDays(year, month)}
								</span>
								<span className="text-foreground">일</span>
							</div>
							<div>
							<button
									className="flex items-center gap-1 text-gray-400 hover:text-gray-600 px-2 py-1 rounded-md hover:bg-gray-100"
									onClick={() => handleResetDuty()}
								>
									<Icon name="reset" size={16} />
									<span className="text-sm whitespace-nowrap">초기화</span>
								</button>
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
							onClick={handleDownloadWardSchedule}
						>
							다운로드
						</Button>
					</div>
				</div>
			</div>

			{/* 근무표, 통계, 완성도를 하나의 상자로 통합 */}
			<div className="bg-white rounded-xl p-2 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
				{isLoading ? (
					<div className="flex justify-center items-center h-[400px]">
						<div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
					</div>
				) : (
					<div className="relative">
						<div className="overflow-x-auto">
							<div className="min-w-[800px] duty-table-content">
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
											<tr
												key={i}
												className="h-8 border-b border-gray-200 group"
											>
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
																	isSelected={false}
																/>
															</div>
														))}
													</div>
												</td>
												{Array.from({ length: daysInMonth }, (_, dayIndex) => {
													const violations = issues.filter(
														(issue) =>
															issue.name === nurses[i] &&
															dayIndex + 1 >= issue.startDate &&
															dayIndex + 1 <= issue.endDate,
													);
													const isAnyViolationStart = violations.some(
														(v) => dayIndex + 1 === v.startDate,
													);
													const isHovered =
														hoveredCell?.row === i &&
														hoveredCell?.day === dayIndex;

													return (
														<td
															key={dayIndex}
															onClick={() => handleCellClick(i, dayIndex)}
															className={`p-0 text-center border-r border-gray-200 relative ${isHighlighted(i, dayIndex)}`}
															onMouseEnter={() =>
																setHoveredCell({ row: i, day: dayIndex })
															}
															onMouseLeave={() => setHoveredCell(null)}
														>
															<div
																className="flex items-center justify-center cursor-pointer relative outline-none"
																tabIndex={0}
																role="button"
																onClick={() => handleCellClick(i, dayIndex)}
																aria-label={`${nurses[i]}의 ${dayIndex + 1}일 근무`}
																style={{
																	WebkitTapHighlightColor: "transparent",
																}}
															>
																{isAnyViolationStart && (
																	<FaultLayer
																		key={`violations-${dayIndex + 1}`}
																		startDate={dayIndex + 1}
																		endDate={Math.max(
																			...violations
																				.filter(
																					(v) => v.startDate === dayIndex + 1,
																				)
																				.map((v) => v.endDate),
																		)}
																		messages={violations
																			.filter(
																				(v) => v.startDate === dayIndex + 1,
																			)
																			.map((v) => v.message)}
																		total={violations.length}
																		className={isHovered ? "opacity-90" : ""}
																	/>
																)}
																<div className="relative z-[2]">
																	<div className="scale-[0.95]">
																		<DutyBadgeEng
																			type={
																				duties[i][dayIndex] as
																					| "D"
																					| "E"
																					| "N"
																					| "O"
																					| "X"
																			}
																			size="sm"
																			isSelected={
																				selectedCell?.row === i &&
																				selectedCell?.col === dayIndex
																			}
																		/>
																	</div>
																</div>
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
																selectedCell?.col === j ? "bg-duty-off-bg" : ""
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
				)}
			</div>

			{/* 규칙 편집 모달 */}
			{isRuleModalOpen && (
				<RuleEditModal
					onClose={() => setIsRuleModalOpen(false)}
					buttonRef={ruleButtonRef}
				/>
			)}
		</div>
	);
};

export default ShiftAdminTable;
