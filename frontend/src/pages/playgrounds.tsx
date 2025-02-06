import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import {
	Input,
	EmailInput,
	PasswordInput,
	NumberInput,
	DateInput,
	TextArea,
	SearchInput,
} from "@/components/atoms/Input";
import { WardCodeInput } from "@/components/atoms/WardCodeInput";
import { Icon } from "@/components/atoms/Icon";
import { CheckBox } from "@/components/atoms/CheckBox";
import { SortButton, FilterButton } from "@/components/atoms/SubButton";
import { ToggleButton } from "@/components/atoms/ToggleButton";
import { Dropdown } from "@/components/atoms/Dropdown";
import { ApprovalBtn } from "@/components/atoms/ApprovalBtn";
import { Badge } from "@/components/atoms/Badge";
import { ProgressChecker } from "@/components/atoms/ProgressChecker";

const Playgrounds: React.FC = () => {
	const [genderIndex, setGenderIndex] = useState(0);
	const [nurseIndex, setNurseIndex] = useState(0);
	const [requestIndex, setRequestIndex] = useState(0);
	const [approvalIndex, setApprovalIndex] = useState(0);
	const [selectedNumber, setSelectedNumber] = useState<number | null>(0);
	const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
	const [selectedAuthority, setSelectedAuthority] = useState<string | null>(
		null,
	);
	const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

	return (
		<div className="p-8 font-pretendard bg-base-background">
			<h1 className="text-3xl font-black mb-8">Component Playgrounds</h1>
			{/* Atoms Section */}
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Atoms</h2>

				{/* Progress Checker */}
				<div className="mb-8">
					<h3 className="text-xl font-semibold mb-4">Progress Checker</h3>
					<div className="flex flex-wrap gap-8">
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-4">
								Default (90%)
							</h4>
							<ProgressChecker value={90} />
						</div>
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-4">
								Custom Size (50%)
							</h4>
							<ProgressChecker value={50} size={80} strokeWidth={6} />
						</div>
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-4">
								Without Label (75%)
							</h4>
							<ProgressChecker value={75} showLabel={false} />
						</div>
					</div>
				</div>

				{/* Badges */}
				<div className="mb-8">
					<h3 className="text-xl font-semibold mb-4">Badges</h3>
					<div className="flex flex-wrap gap-4">
						<Badge type="admin" />
						<Badge type="worker" />
					</div>
				</div>

				{/* Buttons */}
				<div className="mb-8">
					<h3 className="text-xl font-semibold mb-4">Buttons</h3>
					<div className="space-y-8">
						{/* Button Colors */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-2">
								Button Colors
							</h4>
							<div className="flex flex-col space-y-4">
								{/* Primary Buttons */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Primary Button
									</h5>
									<div className="flex flex-wrap gap-4">
										<Button color="primary">Active</Button>
										<Button color="primary" disabled>
											Disabled
										</Button>
									</div>
								</div>

								{/* Evening Buttons */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Evening Button
									</h5>
									<div className="flex flex-wrap gap-4">
										<Button color="evening">Active</Button>
										<Button color="evening" disabled>
											Disabled
										</Button>
									</div>
								</div>

								{/* Night Buttons */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Night Button
									</h5>
									<div className="flex flex-wrap gap-4">
										<Button color="night">Active</Button>
										<Button color="night" disabled>
											Disabled
										</Button>
									</div>
								</div>

								{/* Day Buttons */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Day Button
									</h5>
									<div className="flex flex-wrap gap-4">
										<Button color="day">Active</Button>
										<Button color="day" disabled>
											Disabled
										</Button>
									</div>
								</div>
							</div>
						</div>

						{/* Short Buttons */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-2">
								Short Buttons (SM: 70/112px, MD: 75/120px, LG: 80/128px)
							</h4>
							<p className="text-xs text-base-muted mb-4">
								Text Size - SM: 11px/12px, MD/LG: 12px/14px
							</p>
							<div className="flex flex-col space-y-4">
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										SM Size
									</h5>
									<Button size="sm" width="short">
										Button
									</Button>
								</div>
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										MD Size
									</h5>
									<Button size="md" width="short">
										Button
									</Button>
								</div>
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										LG Size
									</h5>
									<Button size="lg" width="short">
										Button
									</Button>
								</div>
							</div>
						</div>

						{/* Long Buttons */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-2">
								Long Buttons (SM: 180/330px, MD: 188/350px, LG: 200/370px)
							</h4>
							<p className="text-xs text-base-muted mb-4">
								Text Size - SM: 11px/12px, MD/LG: 12px/14px
							</p>
							<div className="flex flex-col space-y-4">
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										SM Size
									</h5>
									<Button size="sm" width="long">
										Longer Button
									</Button>
								</div>
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										MD Size
									</h5>
									<Button size="md" width="long">
										Longer Button
									</Button>
								</div>
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										LG Size
									</h5>
									<Button size="lg" width="long">
										Longer Button
									</Button>
								</div>
							</div>
						</div>

						{/* Full Width Button */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-2">
								Full Width Button
							</h4>
							<Button size="md" fullWidth>
								Full Width Button
							</Button>
						</div>

						{/* Sub Buttons */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-2">
								Sub Buttons
							</h4>
							<div className="flex flex-col space-y-4">
								{/* Sort Buttons */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Sort Button
									</h5>
									<div className="flex flex-wrap gap-4">
										<SortButton
											label="정렬"
											onClick={() => console.log("Sort clicked")}
										/>
										<SortButton
											label="정렬 활성화"
											active
											onClick={() => console.log("Active sort clicked")}
										/>
										<SortButton label="정렬 비활성화" disabled />
									</div>
								</div>

								{/* Filter Buttons */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Filter Button
									</h5>
									<div className="flex flex-wrap gap-4">
										<FilterButton
											label="필터"
											onClick={() => console.log("Filter clicked")}
										/>
										<FilterButton
											label="필터 활성화"
											active
											onClick={() => console.log("Active filter clicked")}
										/>
										<FilterButton label="필터 비활성화" disabled />
									</div>
								</div>
							</div>
						</div>

						{/* Toggle Buttons */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-2">
								Toggle Buttons
							</h4>
							<div className="flex flex-col space-y-4">
								{/* Gender Toggle */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Gender Toggle
									</h5>
									<ToggleButton
										options={[
											{ icon: "♀", text: "여자" },
											{ icon: "♂", text: "남자" },
										]}
										selectedIndex={genderIndex}
										onChange={(index: number) => setGenderIndex(index)}
										variant="gender"
									/>
								</div>

								{/* Nurse Toggle */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Nurse Toggle
									</h5>
									<ToggleButton
										options={[{ text: "평간호사" }, { text: "수간호사" }]}
										selectedIndex={nurseIndex}
										onChange={(index: number) => setNurseIndex(index)}
										variant="nurse"
									/>
								</div>

								{/* Request Toggle */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Request Toggle
									</h5>
									<ToggleButton
										options={[
											{ text: "근무 요청하기" },
											{ text: "요청 내역 확인하기" },
										]}
										selectedIndex={requestIndex}
										onChange={(index: number) => setRequestIndex(index)}
										variant="request"
									/>
								</div>

								{/* Approval Toggle */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Approval Toggle
									</h5>
									<ApprovalBtn
										selectedIndex={approvalIndex}
										onChange={(index: number) => setApprovalIndex(index)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Inputs */}
				<div className="mb-8">
					<h3 className="text-xl font-semibold mb-4">Inputs</h3>
					<div className="space-y-8">
						{/* Basic Input */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-4">
								Basic Input
							</h4>
							<Input
								id="basic-input"
								name="basic"
								label="기본 입력"
								placeholder="텍스트를 입력해주세요"
								helpText="기본적인 텍스트 입력 필드입니다"
							/>
						</div>

						{/* Email Input */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-4">
								Email Input
							</h4>
							<div className="space-y-4">
								<EmailInput
									id="email-input"
									name="email"
									label="이메일"
									placeholder="you@example.com"
									helpText="업무용 이메일을 입력해주세요"
								/>
								<EmailInput
									id="email-input-error"
									name="email-error"
									label="이메일 (에러)"
									error="올바른 이메일 형식이 아닙니다"
									defaultValue="invalid-email"
								/>
								<EmailInput
									id="email-input-disabled"
									name="email-disabled"
									label="이메일 (비활성화)"
									disabled
									defaultValue="disabled@example.com"
								/>
							</div>
						</div>

						{/* Password Input */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-4">
								Password Input
							</h4>
							<div className="space-y-4">
								<PasswordInput
									id="password-input"
									name="password"
									label="비밀번호"
									helpText="8자 이상 입력해주세요"
								/>
								<PasswordInput
									id="password-input-error"
									name="password-error"
									label="비밀번호 (에러)"
									error="비밀번호는 8자 이상이어야 합니다"
								/>
							</div>
						</div>

						{/* Number Input */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-4">
								Number Input
							</h4>
							<div className="space-y-4">
								<NumberInput
									id="experience-input"
									name="experience"
									label="간호사 연차"
									min={0}
									max={50}
									helpText="연차를 숫자로 입력해주세요"
								/>
								<NumberInput
									id="experience-input-error"
									name="experience-error"
									label="간호사 연차 (에러)"
									min={0}
									max={50}
									error="0-50 사이의 숫자를 입력해주세요"
									defaultValue="99"
								/>
								<NumberInput
									id="experience-input-optional"
									name="experience-optional"
									label="간호사 연차 (선택)"
									min={0}
									max={50}
									optional
								/>
							</div>
						</div>

						{/* Date Input */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-4">
								Date Input
							</h4>
							<div className="space-y-4">
								<DateInput
									id="work-date-input"
									name="workDate"
									label="근무 날짜"
									helpText="근무 시작일을 선택해주세요"
								/>
								<DateInput
									id="work-date-input-error"
									name="workDate-error"
									label="근무 날짜 (에러)"
									error="시작일은 오늘 이후여야 합니다"
								/>
								<DateInput
									id="work-date-input-disabled"
									name="workDate-disabled"
									label="근무 날짜 (비활성화)"
									disabled
									defaultValue="2024-03-01"
								/>
							</div>
						</div>

						{/* Text Area */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-4">
								Text Area
							</h4>
							<div className="space-y-4">
								<TextArea
									id="memo-input"
									name="memo"
									label="메모"
									placeholder="추가 내용을 입력해주세요"
									rows={4}
									helpText="필요한 내용을 자유롭게 입력해주세요"
								/>
								<TextArea
									id="memo-input-error"
									name="memo-error"
									label="메모 (에러)"
									rows={4}
									error="메모는 최소 10자 이상이어야 합니다"
									defaultValue="짧은메모"
								/>
								<TextArea
									id="memo-input-disabled"
									name="memo-disabled"
									label="메모 (비활성화)"
									rows={4}
									disabled
									defaultValue="이 메모는 수정할 수 없습니다"
								/>
								<TextArea
									id="memo-input-optional"
									name="memo-optional"
									label="메모 (선택)"
									rows={4}
									optional
									placeholder="선택적으로 입력 가능합니다"
								/>
							</div>
						</div>

						{/* Search Input */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-4">
								Search Input
							</h4>
							<div className="space-y-4">
								<SearchInput
									id="search-input"
									name="search"
									placeholder="이름으로 검색하기"
								/>
								<SearchInput
									id="search-input-disabled"
									name="search-disabled"
									placeholder="이름으로 검색하기"
									disabled
								/>
							</div>
						</div>

						{/* Checkbox Input */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-4">
								Checkbox Input
							</h4>
							<div className="space-y-4">
								<CheckBox
									id="checkbox-basic"
									name="checkbox-basic"
									label="기본 체크박스"
									onChange={(checked) =>
										console.log("Checkbox changed:", checked)
									}
								/>
								<CheckBox
									id="checkbox-checked"
									name="checkbox-checked"
									label="체크된 상태"
									checked={true}
								/>
								<CheckBox
									id="checkbox-disabled"
									name="checkbox-disabled"
									label="비활성화 상태"
									disabled
								/>
							</div>
						</div>

						{/* Dropdowns */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-4">
								Dropdowns
							</h4>
							<div className="space-y-4 max-w-xs">
								{/* Number Dropdown */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Number Dropdown
									</h5>
									<Dropdown
										variant="number"
										value={selectedNumber}
										onChange={(value) => setSelectedNumber(value as number)}
										label="0"
									/>
								</div>

								{/* Priority Dropdown */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Priority Dropdown
									</h5>
									<Dropdown
										variant="priority"
										value={selectedPriority}
										onChange={(value) => setSelectedPriority(value as string)}
										label="중요도"
									/>
								</div>

								{/* Authority Dropdown */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Authority Dropdown (3-Dot Menu)
									</h5>
									<Dropdown
										variant="authority"
										value={selectedAuthority}
										onChange={(value) => setSelectedAuthority(value as string)}
										label="권한"
									/>
								</div>

								{/* Skill Dropdown */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Skill Dropdown
									</h5>
									<Dropdown
										variant="skill"
										value={selectedSkill}
										onChange={(value) => setSelectedSkill(value as string)}
										label="숙련도"
									/>
								</div>

								{/* Disabled Dropdown */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Disabled Dropdown
									</h5>
									<Dropdown
										variant="number"
										value={0}
										onChange={() => {}}
										label="비활성화 상태"
										disabled
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Organisms Section */}
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Organisms</h2>
			</section>

			{/* Templates Section */}
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Templates</h2>
			</section>

			{/* Font Weight Showcase */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold mb-6">Font Weight Showcase</h2>
				<div className="space-y-4">
					<p className="text-lg font-black">Black (900) - 가장 두꺼운 텍스트</p>
					<p className="text-lg font-bold">Bold (700) - 굵은 텍스트</p>
					<p className="text-lg font-semibold">
						SemiBold (600) - 중간 굵은 텍스트
					</p>
					<p className="text-lg font-medium">Medium (500) - 중간 텍스트</p>
					<p className="text-lg font-normal">Regular (400) - 기본 텍스트</p>
					<p className="text-lg font-light">Light (300) - 얇은 텍스트</p>
					<p className="text-lg font-extralight">
						ExtraLight (200) - 매우 얇은 텍스트
					</p>
					<p className="text-lg font-thin">Thin (100) - 가장 얇은 텍스트</p>
				</div>
			</section>

			{/* Color System */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold mb-6">Color System</h2>

				{/* Primary Colors */}
				<div className="mb-8">
					<h3 className="text-xl font-semibold mb-4">Primary Colors</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="space-y-2">
							<div className="h-20 w-20 bg-primary rounded-lg"></div>
							<p className="text-sm">Primary</p>
							<p className="text-xs text-base-muted">#F5A281</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-primary-dark rounded-lg"></div>
							<p className="text-sm">Primary Dark</p>
							<p className="text-xs text-base-muted">#F37C4C</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-primary-bg rounded-lg"></div>
							<p className="text-sm">Primary BG</p>
							<p className="text-xs text-base-muted">#FCE3D9</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-primary-10 rounded-lg border"></div>
							<p className="text-sm">Primary 10</p>
							<p className="text-xs text-base-muted">#FEF6F2</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-primary-20 rounded-lg"></div>
							<p className="text-sm">Primary 20</p>
							<p className="text-xs text-base-muted">#FFE6DC</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-primary-30 rounded-lg"></div>
							<p className="text-sm">Primary 30</p>
							<p className="text-xs text-base-muted">#FACDB8</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-primary-40 rounded-lg"></div>
							<p className="text-sm">Primary 40</p>
							<p className="text-xs text-base-muted">#F8BEA7</p>
						</div>
					</div>
				</div>

				{/* Duty Colors */}
				<div className="mb-8">
					<h3 className="text-xl font-semibold mb-4">Duty Status Colors</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{/* Day Duty */}
						<div className="space-y-4">
							<div>
								<div className="h-20 w-20 bg-duty-day rounded-lg"></div>
								<p className="text-sm mt-2">Day</p>
								<p className="text-xs text-base-muted">#61A86A</p>
							</div>
							<div>
								<div className="h-20 w-20 bg-duty-day-dark rounded-lg"></div>
								<p className="text-sm mt-2">Day Dark</p>
								<p className="text-xs text-base-muted">#318F3D</p>
							</div>
							<div>
								<div className="h-20 w-20 bg-duty-day-bg rounded-lg"></div>
								<p className="text-sm mt-2">Day BG</p>
								<p className="text-xs text-base-muted">#D0E5D2</p>
							</div>
						</div>

						{/* Evening Duty */}
						<div className="space-y-4">
							<div>
								<div className="h-20 w-20 bg-duty-evening rounded-lg"></div>
								<p className="text-sm mt-2">Evening</p>
								<p className="text-xs text-base-muted">#F68585</p>
							</div>
							<div>
								<div className="h-20 w-20 bg-duty-evening-dark rounded-lg"></div>
								<p className="text-sm mt-2">Evening Dark</p>
								<p className="text-xs text-base-muted">#E55656</p>
							</div>
							<div>
								<div className="h-20 w-20 bg-duty-evening-bg rounded-lg"></div>
								<p className="text-sm mt-2">Evening BG</p>
								<p className="text-xs text-base-muted">#FCDADA</p>
							</div>
						</div>

						{/* Night Duty */}
						<div className="space-y-4">
							<div>
								<div className="h-20 w-20 bg-duty-night rounded-lg"></div>
								<p className="text-sm mt-2">Night</p>
								<p className="text-xs text-base-muted">#7454DF</p>
							</div>
							<div>
								<div className="h-20 w-20 bg-duty-night-dark rounded-lg"></div>
								<p className="text-sm mt-2">Night Dark</p>
								<p className="text-xs text-base-muted">#532FC8</p>
							</div>
							<div>
								<div className="h-20 w-20 bg-duty-night-bg rounded-lg"></div>
								<p className="text-sm mt-2">Night BG</p>
								<p className="text-xs text-base-muted">#D5CCF5</p>
							</div>
						</div>

						{/* Off Duty */}
						<div className="space-y-4">
							<div>
								<div className="h-20 w-20 bg-duty-off rounded-lg"></div>
								<p className="text-sm mt-2">Off</p>
								<p className="text-xs text-base-muted">#999786</p>
							</div>
							<div>
								<div className="h-20 w-20 bg-duty-off-dark rounded-lg"></div>
								<p className="text-sm mt-2">Off Dark</p>
								<p className="text-xs text-base-muted">#726F5A</p>
							</div>
							<div>
								<div className="h-20 w-20 bg-duty-off-bg rounded-lg"></div>
								<p className="text-sm mt-2">Off BG</p>
								<p className="text-xs text-base-muted">#E5E5E1</p>
							</div>
						</div>
					</div>
				</div>

				{/* Base Colors */}
				<div>
					<h3 className="text-xl font-semibold mb-4">Base Colors</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="space-y-2">
							<div className="h-20 w-20 bg-base-background rounded-lg border"></div>
							<p className="text-sm">Background</p>
							<p className="text-xs text-base-muted">#F9F9F9</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-base-foreground rounded-lg"></div>
							<p className="text-sm">Foreground</p>
							<p className="text-xs text-base-muted">#4D4D4D</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-base-muted rounded-lg"></div>
							<p className="text-sm">Muted</p>
							<p className="text-xs text-base-muted">#D9D9D9</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-base-muted-30 rounded-lg border"></div>
							<p className="text-sm">Muted 30</p>
							<p className="text-xs text-base-muted">#F4F4F4</p>
						</div>
					</div>
				</div>
			</section>

			{/* Ward Code Input Section */}
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-6">Ward Code Input</h2>
				<div className="space-y-8">
					{/* Default */}
					<div>
						<h3 className="text-sm font-medium text-base-muted mb-4">
							Default
						</h3>
						<WardCodeInput
							id="ward-code"
							name="wardCode"
							label="병동 코드"
							onChange={(value) => console.log("Ward Code:", value)}
						/>
					</div>

					{/* With Error */}
					<div>
						<h3 className="text-sm font-medium text-base-muted mb-4">
							With Error
						</h3>
						<WardCodeInput
							id="ward-code-error"
							name="wardCode"
							label="병동 코드"
							error="올바른 병동 코드를 입력해주세요 (숫자와 영문 대문자만 가능)"
						/>
					</div>

					{/* Disabled */}
					<div>
						<h3 className="text-sm font-medium text-base-muted mb-4">
							Disabled
						</h3>
						<WardCodeInput
							id="ward-code-disabled"
							name="wardCode"
							label="병동 코드"
							disabled
						/>
					</div>
				</div>
			</section>

			{/* Icons */}
			<div className="mb-8">
				<h3 className="text-xl font-semibold mb-4">Icons</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="alert" size={24} />
						<span className="text-sm mt-2">alert</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="search" size={24} />
						<span className="text-sm mt-2">search</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="calendar" size={24} />
						<span className="text-sm mt-2">calendar</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="hospital" size={24} />
						<span className="text-sm mt-2">hospital</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="schedule" size={24} />
						<span className="text-sm mt-2">schedule</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="userPin" size={24} />
						<span className="text-sm mt-2">userPin</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="group" size={24} />
						<span className="text-sm mt-2">group</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="chat" size={24} />
						<span className="text-sm mt-2">chat</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="user" size={24} />
						<span className="text-sm mt-2">user</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="female" size={24} />
						<span className="text-sm mt-2">female</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="male" size={24} />
						<span className="text-sm mt-2">male</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="idCard" size={24} />
						<span className="text-sm mt-2">idCard</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="low" size={24} />
						<span className="text-sm mt-2">low</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="mid" size={24} />
						<span className="text-sm mt-2">mid</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="high" size={24} />
						<span className="text-sm mt-2">high</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="edit" size={24} />
						<span className="text-sm mt-2">edit</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="dots" size={24} />
						<span className="text-sm mt-2">dots</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="sort" size={24} />
						<span className="text-sm mt-2">sort</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="filter" size={24} />
						<span className="text-sm mt-2">filter</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="copy" size={24} />
						<span className="text-sm mt-2">copy</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="door" size={24} />
						<span className="text-sm mt-2">door</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="right" size={24} />
						<span className="text-sm mt-2">right</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="left" size={24} />
						<span className="text-sm mt-2">left</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="undo" size={24} />
						<span className="text-sm mt-2">undo</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="menu" size={24} />
						<span className="text-sm mt-2">menu</span>
					</div>
					<div className="flex flex-col items-center p-4 border rounded-lg">
						<Icon name="close" size={24} />
						<span className="text-sm mt-2">close</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Playgrounds;
