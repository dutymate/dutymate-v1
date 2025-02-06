// CreateWardForm.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

const CreateWardForm = () => {
	const navigate = useNavigate();
	const [hospitalName, setHospitalName] = useState("");
	const [wardName, setWardName] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			console.log("입력된 병원 이름:", hospitalName);
			console.log("입력된 병동 이름:", wardName);
			navigate("/ward-admin");
		} catch (error) {
			console.error("병동 생성 실패:", error);
		}
	};

	return (
		<div className="bg-white rounded-[0.92375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] px-12 py-16 w-[25rem] flex flex-col items-center">
			<form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
				<div className="flex flex-col gap-4">
					<Input
						id="hospital-name"
						name="hospitalName"
						label="병원명"
						placeholder="병원명을 입력해주세요"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setHospitalName(e.target.value)
						}
					/>
					<Input
						id="ward-name"
						name="wardName"
						label="병동명"
						placeholder="병동명을 입력해주세요"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setWardName(e.target.value)
						}
					/>
				</div>
				<Button color="primary" size="lg" fullWidth>
					생성하기
				</Button>
			</form>
		</div>
	);
};

export default CreateWardForm;
