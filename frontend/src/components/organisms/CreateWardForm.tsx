import { useState } from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

interface CreateWardFormProps {
	onSubmit: (hospitalName: string, wardName: string) => Promise<void>;
}

interface FormErrors {
	hospitalName?: string;
	wardName?: string;
}

const CreateWardForm = ({ onSubmit }: CreateWardFormProps) => {
	const [hospitalName, setHospitalName] = useState("");
	const [wardName, setWardName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({});

	const validateForm = () => {
		const newErrors: FormErrors = {};

		if (!hospitalName.trim()) {
			newErrors.hospitalName = "병원명을 입력해주세요";
		} else if (hospitalName.length < 2) {
			newErrors.hospitalName = "병원명은 2자 이상 입력해주세요";
		} else if (hospitalName.length > 50) {
			newErrors.hospitalName = "병원명은 50자 이하로 입력해주세요";
		}

		if (!wardName.trim()) {
			newErrors.wardName = "병동명을 입력해주세요";
		} else if (wardName.length < 2) {
			newErrors.wardName = "병동명은 2자 이상 입력해주세요";
		} else if (wardName.length > 20) {
			newErrors.wardName = "병동명은 20자 이하로 입력해주세요";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("폼 제출 시도:", { hospitalName, wardName });

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);

		try {
			console.log("onSubmit 함수 호출 전");
			await onSubmit(hospitalName, wardName);
			console.log("onSubmit 함수 호출 완료");
		} catch (error) {
			console.error("병동 생성 실패:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleHospitalNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setHospitalName(e.target.value);
		if (errors.hospitalName) {
			setErrors((prev) => ({ ...prev, hospitalName: undefined }));
		}
	};

	const handleWardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setWardName(e.target.value);
		if (errors.wardName) {
			setErrors((prev) => ({ ...prev, wardName: undefined }));
		}
	};

	return (
		<div className="bg-white rounded-[0.92375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] px-12 py-16 w-[25rem] flex flex-col items-center">
			<form
				noValidate
				onSubmit={handleSubmit}
				className="flex flex-col gap-6 w-full"
			>
				<div className="flex flex-col gap-4">
					<Input
						id="hospital-name"
						name="hospitalName"
						label="병원명"
						placeholder="병원명을 입력해주세요"
						value={hospitalName}
						onChange={handleHospitalNameChange}
						error={errors.hospitalName}
						required
					/>
					<Input
						id="ward-name"
						name="wardName"
						label="병동명"
						placeholder="병동명을 입력해주세요"
						value={wardName}
						onChange={handleWardNameChange}
						error={errors.wardName}
						required
					/>
				</div>
				<Button
					type="submit"
					color="primary"
					size="lg"
					fullWidth
					disabled={isLoading}
				>
					{isLoading ? "생성 중..." : "생성하기"}
				</Button>
			</form>
		</div>
	);
};

export default CreateWardForm;
