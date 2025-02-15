import { useEffect, useState, useRef } from "react";
import { ruleService } from "../../services/ruleService";
import { Button } from "../atoms/Button";
import { toast } from "react-toastify";

interface RuleEditModalProps {
	onClose: () => void;
	buttonRef: React.RefObject<HTMLButtonElement>;
}

interface WardRule {
	// 평일/주말 근무 개수
	wdayDCnt: number;
	wdayECnt: number;
	wdayNCnt: number;
	wendDCnt: number;
	wendECnt: number;
	wendNCnt: number;

	// 나이트 근무 규칙
	maxN: number;
	prioMaxN: number;
	minN: number;
	prioMinN: number;
	offCntAfterN: number;
	prioOffCntAfterN: number;

	// 연속 근무 규칙
	maxShift: number;
	prioMaxShift: number;
	offCntAfterMaxShift: number;
	prioOffCntAfterMaxShift: number;
}

const getFontWeight = (value: number) => {
	switch (value) {
		case 3:
			return "font-bold";
		case 2:
			return "font-medium";
		case 1:
			return "font-light";
		default:
			return "font-normal";
	}
};

const RuleEditModal = ({ onClose, buttonRef }: RuleEditModalProps) => {
	const [rules, setRules] = useState<WardRule | null>(null);
	// const [isSubmitting] = useState(false);
	// const [setIsSubmitting] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const modalRef = useRef<HTMLDivElement>(null);

	// 버튼 위치 기반으로 모달 위치 계산
	useEffect(() => {
		if (buttonRef.current && modalRef.current) {
			const buttonRect = buttonRef.current.getBoundingClientRect();
			const modalRect = modalRef.current.getBoundingClientRect();

			// 화면 하단 공간 체크
			const bottomSpace = window.innerHeight - buttonRect.bottom;
			const modalHeight = modalRect.height;

			modalRef.current.style.position = "fixed";

			// 모달이 화면 하단을 벗어나는 경우 위로 표시
			if (bottomSpace < modalHeight) {
				modalRef.current.style.top = `${buttonRect.top - modalHeight - 8}px`;
			} else {
				modalRef.current.style.top = `${buttonRect.bottom + 8}px`;
			}

			// 오른쪽 정렬, 모달의 오른쪽 끝이 버튼의 오른쪽 끝과 일치하도록 설정
			const rightPosition = buttonRect.right;
			modalRef.current.style.left = `${rightPosition - modalRect.width}px`;
		}
	}, [buttonRef]);

	// 외부 클릭 감지
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [onClose]);

	useEffect(() => {
		const fetchRules = async () => {
			try {
				setIsLoading(true);
				const data = await ruleService.getWardRules();
				setRules(data);
			} catch (error) {
				console.error("Failed to fetch rules:", error);
				toast.error("규칙을 불러오는데 실패했습니다");
			} finally {
				setIsLoading(false);
			}
		};
		fetchRules();
	}, []);

	const handleChange = (field: keyof WardRule, value: number) => {
		if (!rules) return;
		setRules((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				[field]: value,
			};
		});
	};

	// const handleSubmit = async () => {
	// 	if (!rules) return;

	// 	// TODO: API 연동 후 제거
	// 	toast.info("준비 중입니다.");
	// 	onClose();
	// 	return;

	// 	// setIsSubmitting(true);
	// 	// try {
	// 	//   await ruleService.updateWardRules(rules);
	// 	//   toast.success("규칙이 저장되었습니다");
	// 	//   onClose();
	// 	// } catch (error) {
	// 	//   console.error("Failed to update rules:", error);
	// 	//   toast.error("규칙 저장에 실패했습니다");
	// 	// } finally {
	// 	//   setIsSubmitting(false);
	// 	// }
	// };

	return (
		<div className="fixed inset-0 z-50" style={{ background: "transparent" }}>
			<div ref={modalRef} className="bg-white rounded-xl shadow-lg w-[360px]">
				{/* 헤더 */}
				<div className="flex rounded-t-xl justify-between bg-primary-bg items-center px-4 py-1 border-b">
					<h2 className="text-sm font-medium text-primary-dark">규칙 조회</h2>
					<button
						onClick={onClose}
						className="text-primary hover:text-primary/80"
					>
						<span className="text-lg">×</span>
					</button>
				</div>

				<div className="p-4">
					{isLoading ? (
						/* 스켈레톤 UI */
						<div className="space-y-2 animate-pulse">
							{[...Array(7)].map((_, index) => (
								<div
									key={index}
									className="flex items-center justify-between py-1.5 border-b"
								>
									<div className="h-4 bg-gray-200 rounded w-24"></div>
									<div className="flex items-center gap-1.5">
										<div className="h-6 bg-gray-200 rounded w-24"></div>
										<div className="h-6 bg-gray-200 rounded w-24"></div>
									</div>
								</div>
							))}
						</div>
					) : (
						rules && (
							<>
								{/* 각 규칙 행 */}
								<div className="space-y-2">
									{/* 자동 적용 규칙 안내 */}
									<div className="flex items-center justify-center gap-1 py-2 px-1 bg-gray-50 rounded font-bold text-xs text-primary">
										<span>ND, ED, DN, NOD 규칙은 자동 적용됩니다.</span>
									</div>

									{/* 평일 근무자 수 */}
									<div className="flex items-center justify-between py-1.5 border-b">
										<span className="text-sm text-foreground">
											평일 근무자 수
										</span>
										<div className="flex items-center gap-2">
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium text-duty-day">
													D
												</span>
												<select
													disabled
													value={rules.wdayDCnt}
													onChange={(e) =>
														handleChange("wdayDCnt", Number(e.target.value))
													}
													className="
                          appearance-none
                          border rounded
                          px-2 py-0.5
                          text-sm
                          bg-gray-50
                          w-12
                          text-foreground
                          text-center
                          cursor-pointer
                          hover:border-primary
                          focus:outline-none
                          focus:ring-1
                          focus:ring-primary
                          focus:border-primary
                        "
												>
													{[...Array(5)].map((_, i) => (
														<option
															key={i + 1}
															value={i + 1}
															className="
                              text-center 
                              bg-white 
                              hover:bg-primary-10
                              py-1
                            "
														>
															{i + 1}
														</option>
													))}
												</select>
											</div>
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium text-duty-evening">
													E
												</span>
												<select
													disabled
													value={rules.wdayECnt}
													onChange={(e) =>
														handleChange("wdayECnt", Number(e.target.value))
													}
													className="
                          appearance-none
                          border rounded
                          px-2 py-0.5
                          text-sm
                          bg-gray-50
                          w-12
                          text-foreground
                          text-center
                          cursor-pointer
                          hover:border-primary
                          focus:outline-none
                          focus:ring-1
                          focus:ring-primary
                          focus:border-primary
                        "
												>
													{[...Array(5)].map((_, i) => (
														<option
															key={i + 1}
															value={i + 1}
															className="text-center"
														>
															{i + 1}
														</option>
													))}
												</select>
											</div>
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium text-duty-night">
													N
												</span>
												<select
													disabled
													value={rules.wdayNCnt}
													onChange={(e) =>
														handleChange("wdayNCnt", Number(e.target.value))
													}
													className="
                          appearance-none
                          border rounded
                          px-2 py-0.5
                          text-sm
                          bg-gray-50
                          w-12
                          text-foreground
                          text-center
                          cursor-pointer
                          hover:border-primary
                          focus:outline-none
                          focus:ring-1
                          focus:ring-primary
                          focus:border-primary
                        "
												>
													{[...Array(5)].map((_, i) => (
														<option
															key={i + 1}
															value={i + 1}
															className="text-center"
														>
															{i + 1}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>

									{/* 주말 근무자 수 */}
									<div className="flex items-center justify-between py-1.5 border-b">
										<span className="text-sm text-foreground">
											주말 근무자 수
										</span>
										<div className="flex items-center gap-2">
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium text-duty-day">
													D
												</span>
												<select
													disabled
													value={rules.wendDCnt}
													onChange={(e) =>
														handleChange("wendDCnt", Number(e.target.value))
													}
													className="
                          appearance-none
                          border rounded
                          px-2 py-0.5
                          text-sm
                          bg-gray-50
                          w-12
                          text-foreground
                          text-center
                          cursor-pointer
                          hover:border-primary
                          focus:outline-none
                          focus:ring-1
                          focus:ring-primary
                          focus:border-primary
                        "
												>
													{[...Array(5)].map((_, i) => (
														<option
															key={i + 1}
															value={i + 1}
															className="text-center"
														>
															{i + 1}
														</option>
													))}
												</select>
											</div>
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium text-duty-evening">
													E
												</span>
												<select
													disabled
													value={rules.wendECnt}
													onChange={(e) =>
														handleChange("wendECnt", Number(e.target.value))
													}
													className="
                          appearance-none
                          border rounded
                          px-2 py-0.5
                          text-sm
                          bg-gray-50
                          w-12
                          text-foreground
                          text-center
                          cursor-pointer
                          hover:border-primary
                          focus:outline-none
                          focus:ring-1
                          focus:ring-primary
                          focus:border-primary
                        "
												>
													{[...Array(5)].map((_, i) => (
														<option
															key={i + 1}
															value={i + 1}
															className="text-center"
														>
															{i + 1}
														</option>
													))}
												</select>
											</div>
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium text-duty-night">
													N
												</span>
												<select
													disabled
													value={rules.wendNCnt}
													onChange={(e) =>
														handleChange("wendNCnt", Number(e.target.value))
													}
													className="
                          appearance-none
                          border rounded
                          px-2 py-0.5
                          text-sm
                          bg-gray-50
                          w-12
                          text-foreground
                          text-center
                          cursor-pointer
                          hover:border-primary
                          focus:outline-none
                          focus:ring-1
                          focus:ring-primary
                          focus:border-primary
                        "
												>
													{[...Array(5)].map((_, i) => (
														<option
															key={i + 1}
															value={i + 1}
															className="text-center"
														>
															{i + 1}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>

									{/* 연속 근무 수 최대 */}
									<div className="flex items-center justify-between py-1.5 border-b">
										<span className="text-sm text-foreground">
											연속 근무 수 최대
										</span>
										<div className="flex items-center gap-9">
											<div className="flex items-center gap-1.5">
												<select
													disabled
													value={rules.maxShift}
													onChange={(e) =>
														handleChange("maxShift", Number(e.target.value))
													}
													className="
                            appearance-none
                            border rounded
                            px-2 py-0.5
                            text-sm
                            bg-gray-50
                            w-10
                            text-center
                            cursor-pointer
                            hover:border-primary
                            focus:outline-none
                            focus:ring-1
                            focus:ring-primary
                            focus:border-primary
                        "
												>
													{[...Array(4)].map((_, i) => (
														<option
															key={i + 3}
															value={i + 3}
															className="text-center"
														>
															{i + 3}
														</option>
													))}
												</select>
												<span className="text-xs text-foreground">일 이하</span>
											</div>
											<select
												disabled
												value={rules.prioMaxShift}
												onChange={(e) =>
													handleChange("prioMaxShift", Number(e.target.value))
												}
												className={`
                        appearance-none
                        border rounded
                        px-2 py-0.5
                        text-xs
                        bg-gray-50
                        w-20
                        text-foreground
                        text-center
                        cursor-pointer
                        hover:border-primary
                        focus:outline-none
                        focus:ring-1
                        focus:ring-primary
                        focus:border-primary
                        ${getFontWeight(rules.prioMaxShift)}
                      `}
											>
												{[
													{ value: 3, label: "매우 중요", weight: "font-bold" },
													{ value: 2, label: "중요", weight: "font-medium" },
													{ value: 1, label: "보통", weight: "font-light" },
												].map((item) => (
													<option
														key={item.value}
														value={item.value}
														className={`text-center ${item.weight}`}
													>
														{item.label}
													</option>
												))}
											</select>
										</div>
									</div>

									{/* 나이트 연속 근무 수 최대 */}
									<div className="flex items-center justify-between py-1.5 border-b">
										<span className="text-sm text-foreground">
											나이트 연속 최대
										</span>
										<div className="flex items-center gap-1.5">
											<select
												disabled
												value={rules.maxN}
												onChange={(e) =>
													handleChange("maxN", Number(e.target.value))
												}
												className="
                        appearance-none
                        border rounded
                        px-2 py-0.5
                        text-sm
                        bg-gray-50
                        w-10
                        text-center
                        cursor-pointer
                        hover:border-primary
                        focus:outline-none
                        focus:ring-1
                        focus:ring-primary
                        focus:border-primary
                      "
											>
												{[...Array(5)].map((_, i) => (
													<option
														key={i + 2}
														value={i + 2}
														className="text-center"
													>
														{i + 2}
													</option>
												))}
											</select>
											<span className="text-xs text-foreground">일 이하</span>
											<select
												disabled
												value={rules.prioMaxN}
												onChange={(e) =>
													handleChange("prioMaxN", Number(e.target.value))
												}
												className={`                        appearance-none
                        border rounded
                        px-2 py-0.5
                        text-xs
                        bg-gray-50
                        w-20
                        text-foreground
                        text-center
                        cursor-pointer
                        hover:border-primary
                        focus:outline-none
                        focus:ring-1
                        focus:ring-primary
                        focus:border-primary
                        ${getFontWeight(rules.prioMaxN)}
                      `}
											>
												{[
													{ value: 3, label: "매우 중요", weight: "font-bold" },
													{ value: 2, label: "중요", weight: "font-medium" },
													{ value: 1, label: "보통", weight: "font-light" },
												].map((item) => (
													<option
														key={item.value}
														value={item.value}
														className={`text-center ${item.weight}`}
													>
														{item.label}
													</option>
												))}
											</select>
										</div>
									</div>

									{/* 나이트 연속 근무 수 최소 */}
									<div className="flex items-center justify-between py-1.5 border-b">
										<span className="text-sm text-foreground">
											나이트 연속 최소
										</span>
										<div className="flex items-center gap-1.5">
											<select
												disabled
												value={rules.minN}
												onChange={(e) =>
													handleChange("minN", Number(e.target.value))
												}
												className="
                        appearance-none
                        border rounded
                        px-2 py-0.5
                        text-sm
                        bg-gray-50
                        w-10
                        text-center
                        cursor-pointer
                        hover:border-primary
                        focus:outline-none
                        focus:ring-1
                        focus:ring-primary
                        focus:border-primary
                      "
											>
												{[...Array(5)].map((_, i) => (
													<option
														key={i + 1}
														value={i + 1}
														className="text-center"
													>
														{i + 1}
													</option>
												))}
											</select>
											<span className="text-xs text-foreground">일 이상</span>
											<select
												disabled
												value={rules.prioMinN}
												onChange={(e) =>
													handleChange("prioMinN", Number(e.target.value))
												}
												className={`
                        appearance-none
                        border rounded
                        px-2 py-0.5
                        text-xs
                        bg-gray-50
                        w-20
                        text-foreground
                        text-center
                        cursor-pointer
                        hover:border-primary
                        focus:outline-none
                        focus:ring-1
                        focus:ring-primary
                        focus:border-primary
                        ${getFontWeight(rules.prioMinN)}
                      `}
											>
												{[
													{ value: 3, label: "매우 중요", weight: "font-bold" },
													{ value: 2, label: "중요", weight: "font-medium" },
													{ value: 1, label: "보통", weight: "font-light" },
												].map((item) => (
													<option
														key={item.value}
														value={item.value}
														className={`text-center ${item.weight}`}
													>
														{item.label}
													</option>
												))}
											</select>
										</div>
									</div>
								</div>

								{/* 저장 버튼 */}
								{/* <div className="flex justify-end gap-1 mt-3">
									<Button
										size="xs"
										color="muted"
										onClick={onClose}
										disabled={isSubmitting}
									>
										취소
									</Button>
									<Button
										size="xs"
										color="primary"
										onClick={handleSubmit}
										disabled={isSubmitting}
									>
										{isSubmitting ? "저장 중..." : "저장"}
									</Button>
								</div> */}
							</>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default RuleEditModal;
