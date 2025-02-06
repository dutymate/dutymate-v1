import { NumberInput } from "../atoms/Input";
import { ToggleButton } from "../atoms/ToggleButton";
import { Button } from "../atoms/Button";
import { useState } from "react";

const ExtraInfoForm = () => {
	const [genderIndex, setGenderIndex] = useState(0);
	const [positionIndex, setPositionIndex] = useState(0);
	const [career, setCareer] = useState<string>("");

	const handleCareerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCareer(e.target.value);
	};

	return (
		<div className="bg-white rounded-[0.904375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] px-12 py-8 w-[25rem]">
			{/* 간호사 연차 입력 */}
			<div className="mb-4">
				<NumberInput
					id="career"
					name="career"
					label="간호사 연차"
					placeholder="연차는 숫자로 입력해주세요."
					min={0}
					defaultValue={career}
					onChange={handleCareerChange}
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
					selectedIndex={genderIndex}
					onChange={setGenderIndex}
					variant="gender"
				/>
			</div>

			{/* 직책 선택 */}
			<div className="mb-8">
				<label className="block text-base font-medium text-gray-900 mb-3">
					직책
				</label>
				<ToggleButton
					options={[{ text: "수간호사" }, { text: "평간호사" }]}
					selectedIndex={positionIndex}
					onChange={setPositionIndex}
					variant="nurse"
				/>
			</div>

			{/* 작성 완료 버튼 */}
			<Button size="lg" width="long" fullWidth>
				작성 완료
			</Button>
		</div>
	);
};

export default ExtraInfoForm;
