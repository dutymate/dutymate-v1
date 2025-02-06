// EnterWardForm.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../atoms/Button";
import { WardCodeInput } from "../atoms/WardCodeInput";

const EnterWardForm = () => {
	const navigate = useNavigate();
	const [wardCode, setWardCode] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: 병동 입장 로직 구현
		try {
			// API 호출 로직 추가 예정
			navigate("/ward"); // 성공 시 병동 페이지로 이동
		} catch (error) {
			console.error("병동 입장 실패:", error);
		}
	};

	return (
		<div className="bg-white rounded-[0.92375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] px-12 py-16 w-[25rem]">
			<h2 className="text-2xl font-bold text-center mb-8">병동 입장하기</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<WardCodeInput
						id="ward-code"
						name="wardCode"
						label="병동 코드"
						onChange={(value) => setWardCode(value)}
					/>
				</div>
				<Button color="primary" size="lg" fullWidth>
					입장하기
				</Button>
			</form>
		</div>
	);
};

export default EnterWardForm;
