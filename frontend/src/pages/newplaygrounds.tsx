import { useState } from "react";
import { ApprovalBtn } from "../components/atoms/ApprovalBtn";
import DutyBadgeEng from "../components/atoms/DutyBadgeEng";

const NewPlaygrounds = () => {
	// 각 섹션별로 선택된 뱃지를 추적하기 위한 상태
	const [selectedSmall, setSelectedSmall] = useState<string | null>(null);
	const [selectedMedium, setSelectedMedium] = useState<string | null>(null);
	const [selectedLarge, setSelectedLarge] = useState<string | null>(null);

	// 뱃지 타입 배열
	const badgeTypes = ["D", "E", "N", "O", "All", "default"] as const;

	return (
		<div className="min-h-screen bg-base-background p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-2xl font-bold mb-8">Component Playground</h1>

				{/* Duty Badge English Section */}
				<div className="bg-white p-6 rounded-lg shadow-sm mb-8">
					<h2 className="text-lg font-semibold mb-4">Duty Badge (English)</h2>

					<div className="space-y-6">
						{/* Small Size */}
						<div>
							<h3 className="text-sm font-medium text-base-muted mb-2">
								Small Size (Selectable)
							</h3>
							<div className="flex gap-4">
								{badgeTypes.map((type) => (
									<DutyBadgeEng
										key={type}
										type={type}
										size="sm"
										isSelected={selectedSmall === type}
										onClick={() =>
											setSelectedSmall(selectedSmall === type ? null : type)
										}
									/>
								))}
							</div>
						</div>

						{/* Medium Size */}
						<div>
							<h3 className="text-sm font-medium text-base-muted mb-2">
								Medium Size (Selectable)
							</h3>
							<div className="flex gap-4">
								{badgeTypes.map((type) => (
									<DutyBadgeEng
										key={type}
										type={type}
										size="md"
										isSelected={selectedMedium === type}
										onClick={() =>
											setSelectedMedium(selectedMedium === type ? null : type)
										}
									/>
								))}
							</div>
						</div>

						{/* Large Size */}
						<div>
							<h3 className="text-sm font-medium text-base-muted mb-2">
								Large Size (Selectable)
							</h3>
							<div className="flex gap-4">
								{badgeTypes.map((type) => (
									<DutyBadgeEng
										key={type}
										type={type}
										size="lg"
										isSelected={selectedLarge === type}
										onClick={() =>
											setSelectedLarge(selectedLarge === type ? null : type)
										}
									/>
								))}
							</div>
						</div>

						{/* Selected State */}
						<div>
							<h3 className="text-sm font-medium text-base-muted mb-2">
								Selected State (Static)
							</h3>
							<div className="flex gap-4">
								{badgeTypes.map((type) => (
									<DutyBadgeEng key={type} type={type} isSelected />
								))}
							</div>
						</div>

						{/* Clickable */}
						<div>
							<h3 className="text-sm font-medium text-base-muted mb-2">
								Clickable (With Console Log)
							</h3>
							<div className="flex gap-4">
								{badgeTypes.map((type) => (
									<DutyBadgeEng
										key={type}
										type={type}
										onClick={() => console.log(`${type} clicked`)}
									/>
								))}
							</div>
						</div>

						{/* Outline Style */}
						<div>
							<h3 className="text-sm font-medium text-base-muted mb-2">
								Outline Style
							</h3>
							<div className="flex gap-4">
								{badgeTypes.map((type) => (
									<DutyBadgeEng key={type} type={type} variant="outline" />
								))}
							</div>
						</div>

						{/* Letter Style */}
						<div>
							<h3 className="text-sm font-medium text-base-muted mb-2">
								Letter Style
							</h3>
							<div className="flex gap-4">
								{badgeTypes.map((type) => (
									<DutyBadgeEng key={type} type={type} variant="letter" />
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Approval Button Section */}
				<div className="bg-white p-6 rounded-lg shadow-sm">
					<h2 className="text-lg font-semibold mb-4">Approval Button</h2>

					<div className="space-y-6">
						{/* Default State */}
						<div>
							<h3 className="text-sm font-medium text-base-muted mb-2">
								Default (Hold)
							</h3>
							<ApprovalBtn
								onChange={(status) => console.log("Status changed to:", status)}
							/>
						</div>

						{/* Initially Approved */}
						<div>
							<h3 className="text-sm font-medium text-base-muted mb-2">
								Initially Approved
							</h3>
							<ApprovalBtn
								initialStatus="approve"
								onChange={(status) => console.log("Status changed to:", status)}
							/>
						</div>

						{/* Initially Denied */}
						<div>
							<h3 className="text-sm font-medium text-base-muted mb-2">
								Initially Denied
							</h3>
							<ApprovalBtn
								initialStatus="deny"
								onChange={(status) => console.log("Status changed to:", status)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewPlaygrounds;
