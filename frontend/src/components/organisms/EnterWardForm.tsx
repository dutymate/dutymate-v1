// EnterWardForm.tsx

import { useState } from "react";
import { Button } from "../atoms/Button";
import { WardCodeInput } from "../atoms/WardCodeInput";

interface EnterWardFormProps {
	onSubmit: (wardCode: string) => Promise<void>;
}

const EnterWardForm = ({ onSubmit }: EnterWardFormProps) => {
	const [wardCode, setWardCode] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const validateWardCode = (code: string) => {
		if (!code) {
			setError("병동 코드를 입력해주세요");
			return false;
		}
		if (code.length !== 6) {
			setError("병동 코드는 6자리여야 합니다");
			return false;
		}
		if (!/^[A-Za-z0-9]+$/.test(code)) {
			setError("영문과 숫자만 입력 가능합니다");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted with code:", wardCode);
		
		if (!validateWardCode(wardCode)) {
			return;
		}

		setError("");
		setIsLoading(true);

		try {
			await onSubmit(wardCode);
		} catch (error) {
			console.error("Form submission error:", error);
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("알 수 없는 오류가 발생했습니다");
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange = (value: string) => {
		setWardCode(value);
		setError("");
	};

	return (
		<div className="bg-white rounded-[0.92375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] px-12 py-16 w-[25rem]">
			<h2 className="text-2xl font-bold text-center mb-8">병동 입장하기</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<div className="relative">
						<WardCodeInput
							id="ward-code"
							name="wardCode"
							label="병동 코드"
							onChange={handleInputChange}
							error={error}
							showInvalidMessage={true}
							disabled={isLoading}
						/>
					</div>
				</div>
				<Button 
					type="submit"
					color="primary" 
					size="lg" 
					fullWidth 
					disabled={isLoading || !!error || wardCode.length !== 6}
					className={isLoading ? "opacity-70 cursor-not-allowed" : ""}
				>
					{isLoading ? (
						<div className="flex items-center justify-center gap-2">
							<span className="animate-spin">⌛</span>
							<span>확인 중...</span>
						</div>
					) : (
						"입장하기"
					)}
				</Button>
			</form>
		</div>
	);
};

export default EnterWardForm;
