import { useState } from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { useNavigate } from "react-router-dom";

interface CreateWardFormProps {
	onSubmit: (hospitalName: string, wardName: string) => Promise<void>;
	initialSuccess?: boolean;
}

interface FormErrors {
	hospitalName?: string;
	wardName?: string;
}

const CreateWardForm = ({
	onSubmit,
	initialSuccess = false,
}: CreateWardFormProps) => {
	const [hospitalName, setHospitalName] = useState("");
	const [wardName, setWardName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(initialSuccess);
	const [errors, setErrors] = useState<FormErrors>({});
	const [showDropdown, setShowDropdown] = useState(false);
	const navigate = useNavigate();
	const hospitals = [
		{
			name: "강북 삼성병원",
			location: "서울",
			address: "서울특별시 종로구 새문안로 29, (평동)",
		},
		{
			name: "삼성서울병원",
			location: "서울",
			address: "서울특별시 강남구 일원로 81, (일원동, 삼성의료원)",
		},
		{
			name: "SG삼성조은병원",
			location: "충남",
			address: "충청남도 천안시 서북구 불당25로 200, 2,3,4,5층 (불당동)",
		},
	];

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
		if (!validateForm()) return;

		setIsLoading(true);
		try {
			await onSubmit(hospitalName, wardName);
			setIsSuccess(true);
			setTimeout(() => {
				navigate("/shift-admin");
			}, 5000);
		} catch (error) {
			console.error("병동 생성 실패:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleHospitalNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setHospitalName(e.target.value);
		setShowDropdown(true);
		if (errors.hospitalName) {
			setErrors((prev) => ({ ...prev, hospitalName: undefined }));
		}
	};

	const handleHospitalSelect = (hospital: string) => {
		setHospitalName(hospital);
		setShowDropdown(false);
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

	const handleInputFocus = () => {
		setShowDropdown(true);
	};

	if (isSuccess) {
		return (
			<div className="bg-white rounded-[0.92375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] px-12 py-16 lg:py-16 w-[25rem] h-[25.5rem] flex flex-col items-center justify-center">
				<div className="flex flex-col items-center text-center w-full">
					<h1 className="text-xl font-bold text-gray-800 mb-1">
						성공적으로 병동을 생성했습니다.
					</h1>
					<p className="text-gray-400 text-ms mb-8">
						듀티메이트와 함께 더 편리한 관리를 시작하세요!
					</p>
					<div className="w-full mt-0 lg:mt-0 -mb-0"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-[0.92375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] px-12 py-16 lg:py-16 w-[25rem] flex flex-col items-center">
			<form
				noValidate
				onSubmit={handleSubmit}
				className="flex flex-col gap-6 w-full"
			>
				<div className="flex flex-col gap-4">
					<div className="relative">
						<Input
							id="hospital-name"
							name="hospitalName"
							label="병원명"
							placeholder="병원명을 입력해주세요"
							value={hospitalName}
							onChange={handleHospitalNameChange}
							onFocus={handleInputFocus}
							error={errors.hospitalName}
							required
						/>
						{showDropdown && (
							<div className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
								{hospitals
									.filter((hospital) =>
										hospital.name
											.toLowerCase()
											.includes(hospitalName.toLowerCase()),
									)
									.map((hospital) => (
										<div
											key={hospital.name}
											className="px-4 py-3 rounded-md cursor-pointer hover:bg-primary-10 active:bg-primary-10"
											onClick={() => handleHospitalSelect(hospital.name)}
											onMouseEnter={(e) =>
												e.currentTarget.classList.add("bg-primary-10")
											}
											onMouseLeave={(e) =>
												e.currentTarget.classList.remove("bg-primary-10")
											}
											onTouchStart={(e) =>
												e.currentTarget.classList.add("bg-primary-10")
											}
											onTouchMove={(e) =>
												e.currentTarget.classList.add("bg-primary-10")
											}
											onTouchEnd={(e) =>
												e.currentTarget.classList.remove("bg-primary-10")
											}
										>
											<div className="flex items-center gap-2">
												<span className="font-medium">{hospital.name}</span>
												<span className="text-xs text-gray-500">
													{hospital.location}
												</span>
											</div>
											<div className="text-sm text-gray-500 mt-1">
												{hospital.address}
											</div>
										</div>
									))}
							</div>
						)}
					</div>
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
				<div className="mt-8 lg:mt-2 -mb-1">
					<Button
						type="submit"
						color="primary"
						size="lg"
						fullWidth
						disabled={isLoading}
						className="h-[5vh] lg:h-12"
					>
						<span className="text-xl lg:text-base">
							{isLoading ? "생성 중..." : "생성하기"}
						</span>
					</Button>
				</div>
			</form>
		</div>
	);
};

export default CreateWardForm;
