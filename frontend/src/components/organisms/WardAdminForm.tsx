import { useState } from "react";
import { SmallSearchInput } from "../atoms/Input";
import { SortButton, FilterButton } from "../atoms/SubButton";
import { Icon } from "../atoms/Icon";
import { FaUserCircle } from "react-icons/fa";
import DutyBadgeEng from "../atoms/DutyBadgeEng";

const WardAdminForm = () => {
	const [selectedNurses, setSelectedNurses] = useState<string[]>([]);
	const [openSkillDropdown, setOpenSkillDropdown] = useState<number | null>(
		null,
	);
	const [nurseSkills, setNurseSkills] = useState<
		Array<{ icon: "high" | "mid" | "low"; label: string } | null>
	>(Array(8).fill(null));
	const [selectedDuties, setSelectedDuties] = useState<Array<Set<string>>>(
		Array(8)
			.fill(null)
			.map(() => new Set()),
	);

	const skillOptions = [
		{ icon: "high" as const, label: "상급" },
		{ icon: "mid" as const, label: "중급" },
		{ icon: "low" as const, label: "초급" },
	];

	const handleSkillChange = (
		index: number,
		skill: (typeof skillOptions)[number],
	) => {
		const newSkills = [...nurseSkills];
		newSkills[index] = skill;
		setNurseSkills(newSkills);
		setOpenSkillDropdown(null);
	};

	const handleDutyClick = (index: number, duty: "D" | "E" | "N" | "All") => {
		const newSelectedDuties = [...selectedDuties];
		const nurseDuties = new Set<string>();

		if (nurseDuties.has(duty)) {
			nurseDuties.delete(duty);
		} else {
			nurseDuties.clear();
			nurseDuties.add(duty);
		}

		newSelectedDuties[index] = nurseDuties;
		setSelectedDuties(newSelectedDuties);
	};

	return (
		<div className="w-full">
			<div className="bg-white rounded-[1.154375rem] p-4">
				{/* 상단 정보 영역 */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
					{/* 병동 정보 */}
					<div className="bg-white rounded-xl p-2.5 col-span-1 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
						<h3 className="text-[0.95rem] text-gray-600 mb-1 font-medium">
							병동 정보
						</h3>
						<p className="font-semibold border border-gray-300 rounded-md px-3 py-1 text-center">
							분당서울대학교병원 | 7B 병동
						</p>
					</div>

					{/* 병동 인원 */}
					<div className="bg-white rounded-xl p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
						<h3 className="text-[0.95rem] text-gray-600 mb-1 font-medium">
							병동 인원
						</h3>
						<p className="font-semibold border border-gray-300 rounded-md px-3 py-1 text-center">
							6명
						</p>
					</div>

					{/* 병동 코드 */}
					<div className="bg-white rounded-xl p-2.5 col-span-1 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
						<div className="flex items-center gap-2 mb-1">
							<h3 className="text-[0.95rem] text-gray-600 font-medium">
								병동 코드
							</h3>
							<Icon
								name="copy"
								size={18}
								className="text-gray-500 cursor-pointer"
							/>
						</div>
						<p className="font-semibold border border-gray-300 rounded-md px-3 py-1 text-center">
							PY11X9
						</p>
					</div>

					{/* 입장 관리 */}
					<div className="bg-white rounded-xl p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
						<div className="flex items-center gap-2 mb-1">
							<h3 className="text-[0.95rem] text-gray-600 font-medium">
								입장 관리
							</h3>
							<Icon name="door" size={18} className="text-gray-500" />
						</div>
						<p className="font-semibold border border-gray-300 rounded-md px-3 py-1 text-center">
							1명 대기
						</p>
					</div>
				</div>

				{/* 검색 및 필터 영역 */}
				<div className="mb-3">
					<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-0">
						<h2 className="text-lg font-semibold">간호사 관리</h2>
						<div className="flex items-center gap-2 w-full lg:w-auto">
							<div className="flex-1 lg:flex-initial">
								<SmallSearchInput
									id="search-nurse"
									name="searchNurse"
									placeholder="이름으로 검색하기"
								/>
							</div>
							<div className="flex gap-2 flex-shrink-0">
								<SortButton label="정렬" onClick={() => {}} />
								<FilterButton label="필터" onClick={() => {}} />
							</div>
						</div>
					</div>
				</div>

				{/* 간호사 목록 테이블 */}
				<div className="overflow-x-auto">
					<div className="flex flex-col gap-2 min-w-[900px]">
						{Array(8)
							.fill(0)
							.map((_, index) => (
								<div
									key={index}
									className="flex items-center p-2.5 bg-white rounded-[0.578125rem] border border-gray-200"
								>
									<input
										type="checkbox"
										className="mr-3 flex-shrink-0"
										onChange={(e) => {
											if (e.target.checked) {
												setSelectedNurses([
													...selectedNurses,
													`nurse-${index}`,
												]);
											} else {
												setSelectedNurses(
													selectedNurses.filter(
														(id) => id !== `nurse-${index}`,
													),
												);
											}
										}}
									/>

									<div className="flex items-center justify-between flex-1 min-w-0">
										<div className="flex items-center gap-2 min-w-[140px] flex-shrink-0">
											<FaUserCircle className="w-6 h-6 text-gray-500 flex-shrink-0" />
											<span className="font-medium truncate">
												채성아 간호사
											</span>
										</div>

										<span className="bg-gray-100 px-2 py-0.5 rounded text-sm min-w-[50px] text-center flex-shrink-0">
											근무자
										</span>

										<div className="flex items-center gap-1 min-w-[60px] flex-shrink-0">
											<Icon name="female" size={16} className="text-gray-500" />
											<span>여자</span>
										</div>

										<div className="flex items-center gap-1 min-w-[70px] flex-shrink-0">
											<Icon name="idCard" size={16} className="text-gray-500" />
											<span>10년차</span>
										</div>

										<div className="relative flex-shrink-0">
											<div
												className="flex items-center gap-1 min-w-[80px] cursor-pointer flex-shrink-0"
												onClick={() =>
													setOpenSkillDropdown(
														openSkillDropdown === index ? null : index,
													)
												}
											>
												<Icon
													name={nurseSkills[index]?.icon || "mid"}
													size={16}
													className="text-gray-500"
												/>
												<span>
													{nurseSkills[index]
														? nurseSkills[index]?.label
														: "숙련도"}{" "}
													<span className="text-xs relative -top-[1px]">▼</span>
												</span>
											</div>

											{/* 드롭다운 메뉴 */}
											{openSkillDropdown === index && (
												<div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg z-10 py-1 min-w-[100px]">
													{skillOptions.map((option) => (
														<div
															key={option.icon}
															className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
															onClick={() => handleSkillChange(index, option)}
														>
															<Icon
																name={option.icon}
																size={16}
																className="text-gray-500"
															/>
															<span>{option.label}</span>
														</div>
													))}
												</div>
											)}
										</div>

										<div className="flex gap-2 min-w-[120px] flex-shrink-0">
											{(["D", "E", "N", "All"] as const).map((duty) => (
												<DutyBadgeEng
													key={duty}
													type={duty}
													size="sm"
													variant={
														selectedDuties[index].has(duty)
															? "filled"
															: "outline"
													}
													onClick={() => handleDutyClick(index, duty)}
													isSelected={selectedDuties[index].has(duty)}
												/>
											))}
										</div>

										<input
											type="text"
											placeholder="메모를 남겨주세요"
											className="w-[180px] rounded px-3 py-1 text-sm -ml-4 placeholder:text-gray-300 text-gray-500"
										/>

										<div className="flex items-center gap-2">
											<Icon name="edit" size={18} className="cursor-pointer" />
											<Icon name="dots" size={18} className="cursor-pointer" />
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WardAdminForm;
