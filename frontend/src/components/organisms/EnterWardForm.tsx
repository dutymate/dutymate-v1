// EnterWardForm.tsx

import { useState } from "react";
import { Button } from "../atoms/Button";
import { WardCodeInput } from "../atoms/WardCodeInput";
import useUserAuthStore from "@/store/userAuthStore";
import { useNavigate } from "react-router-dom";

interface EnterWardFormProps {
	onSubmit: (wardCode: string) => Promise<void>;
}

const EnterWardForm = ({ onSubmit }: EnterWardFormProps) => {
	const [wardCode, setWardCode] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const validateWardCode = (code: string) => {
		if (!code) {
			setError("병동 코드를 입력해주세요.");
			return false;
		}
		if (code.length !== 6) {
			setError("병동 코드는 6자리여야 합니다.");
			return false;
		}
		if (!/^[A-Za-z0-9]+$/.test(code)) {
			setError("영문과 숫자만 입력 가능합니다.");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// console.log("Form submitted with code:", wardCode);

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

	const handleLogoutButton = () => {
		useUserAuthStore.getState().logout();
		navigate("/login");
	};

	if (useUserAuthStore.getState().userInfo?.sentWardCode) {
		return (
			<div className="bg-white rounded-[0.92375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] px-12 py-16 lg:py-16 w-[25rem] h-[25.5rem] flex flex-col items-center justify-center">
				<div className="flex flex-col items-center text-center w-full">
					<h1 className="text-2xl font-bold text-gray-800 mb-1">
						병동 입장 대기 중입니다.
					</h1>
					<p className="text-gray-400 text-lg mb-8">
						관리자의 승인 후 입장이 가능합니다. <br />
						병동 관리자에게 문의해주세요!
					</p>
					<div className="w-full mt-0 lg:mt-0 -mb-0"></div>
					<button
						onClick={handleLogoutButton}
						className="w-full lg:w-[100px] px-3 py-2 bg-white text-gray-900 border border-gray-400 rounded-md hover:bg-gray-100 text-xs lg:text-sm h-[35px] ml-3"
					>
						로그아웃
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-[0.92375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] px-12 py-16 w-[25rem]">
			<h2 className="text-2xl font-bold text-center mb-8">병동 입장하기</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<div className="relative">
						<label className="block text-lg font-medium text-gray-700 mb-2 text-left">
							병동 코드
						</label>
						<div className="w-full flex justify-center">
							<WardCodeInput
								id="ward-code"
								name="wardCode"
								label=""
								onChange={handleInputChange}
								error={error}
								showInvalidMessage={true}
								disabled={isLoading}
							/>
						</div>
					</div>
				</div>
				<Button
					type="submit"
					color="primary"
					size="lg"
					fullWidth
					disabled={isLoading || !!error || wardCode.length !== 6}
					className={`h-[5vh] lg:h-12 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
				>
					{isLoading ? (
						<div className="flex items-center justify-center gap-2">
							<span className="animate-spin">⌛</span>
							<span className="text-xl lg:text-base">확인 중...</span>
						</div>
					) : (
						<span className="text-lg lg:text-base">입장하기</span>
					)}
				</Button>
			</form>
		</div>
	);
};

export default EnterWardForm;
