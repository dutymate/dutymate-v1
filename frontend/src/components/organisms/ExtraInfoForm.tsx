import { Select } from "../atoms/Input";
import { ToggleButton } from "../atoms/ToggleButton";
import { Button } from "../atoms/Button";
import { useState, useEffect } from "react";

interface FormData {
	grade: number;
	gender: "F" | "M";
	role: "RN" | "HN";
}

interface ExtraInfoFormProps {
	initialData: FormData;
	onSubmit: (data: FormData) => void;
	careerError?: string;
}

// 연차 옵션 배열 생성
const careerOptions = Array.from({ length: 100 }, (_, i) => ({
	value: String(i + 1),
	label: String(i + 1)
}));

const ExtraInfoForm = ({ initialData, onSubmit, careerError }: ExtraInfoFormProps) => {
	const [formState, setFormState] = useState<FormData>(initialData);

	// initialData가 변경될 때 formState 업데이트
	useEffect(() => {
		setFormState(initialData);
	}, [initialData]);

	const handleCareerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormState((prev) => ({
			...prev,
			grade: parseInt(e.target.value),
		}));
	};

	const handleGenderChange = (index: number) => {
		setFormState((prev) => ({
			...prev,
			gender: index === 0 ? "F" : "M",
		}));
	};

	const handlePositionChange = (index: number) => {
		setFormState((prev) => ({
			...prev,
			role: index === 0 ? "RN" : "HN",
		}));
	};

	const handleSubmit = () => {
		onSubmit(formState);
	};

	return (
		<div className="bg-white rounded-[0.904375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] px-12 py-8 w-[25rem]">
			{/* 간호사 연차 입력 */}
			<div className="mb-4">
				<Select
					id="career"
					name="career"
					label="간호사 연차"
					placeholder="연차를 선택해주세요"
					options={careerOptions}
					value={String(formState.grade)}
					onChange={handleCareerChange}
					error={careerError}
				/>
			</div>

			{/* 성별 선택 */}
			<div className="mb-4">
				<label className="block text-base font-medium text-gray-900 mb-3">
					성별
				</label>
				<ToggleButton
					options={[
						{ text: "여자", icon: "♀" },
						{ text: "남자", icon: "♂" },
					]}
					selectedIndex={formState.gender === "F" ? 0 : 1}
					onChange={handleGenderChange}
					variant="gender"
				/>
			</div>

			{/* 직책 선택 */}
			<div className="mb-8">
				<label className="block text-base font-medium text-gray-900 mb-3">
					직책
				</label>
				<ToggleButton
					options={[{ text: "평간호사" }, { text: "수간호사" }]}
					selectedIndex={formState.role === "RN" ? 0 : 1}
					onChange={handlePositionChange}
					variant="nurse"
				/>
			</div>

			{/* 작성 완료 버튼 */}
			<Button size="lg" width="long" fullWidth onClick={handleSubmit}>
				작성 완료
			</Button>
		</div>
	);
};

export default ExtraInfoForm;
