import { EmailInput, PasswordInput, Input } from "../atoms/Input";
import kakaoIcon from "../../assets/kakaotalk.svg";
import googleIcon from "../../assets/google.svg";
import { useState } from "react";

interface SignupData {
	email: string;
	password: string;
	passwordConfirm: string;
	name: string;
}

const SignupForm = () => {
	const [signupData, setSignupData] = useState<SignupData>({
		email: "",
		password: "",
		passwordConfirm: "",
		name: "",
	});

	const [error, setError] = useState<{
		email?: string;
		password?: string;
		passwordConfirm?: string;
		name?: string;
	}>({});

	const [isAgreed, setIsAgreed] = useState(false);

	const handleKakaoSignup = () => {
		window.location.href = import.meta.env.VITE_KAKAO_LOGIN_URL;
	};

	const handleGoogleSignup = () => {
		window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL;
	};

	const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSignupData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		setError((prevError) => ({
			...prevError,
			[name]: "",
		}));
	};

	const handleSignupSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// 회원가입 로직 구현 예정
	};

	return (
		<div className="bg-white rounded-[0.92375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] px-8 py-8 w-[25rem] lg:w-[25rem] lg:px-12 lg:py-12">
			<form onSubmit={handleSignupSubmit} className="lg:block">
				<div className="lg:mt-0 mt-0">
					<EmailInput
						id="email"
						label="아이디"
						name="email"
						value={signupData.email}
						onChange={handleSignupChange}
						error={error.email}
						placeholder="아이디"
					/>
				</div>
				<div className="lg:mt-2 mt-2">
					<PasswordInput
						id="password"
						label="비밀번호"
						name="password"
						value={signupData.password}
						onChange={handleSignupChange}
						error={error.password}
						placeholder="비밀번호"
					/>
				</div>
				<div className="lg:mt-2 mt-2">
					<PasswordInput
						id="passwordConfirm"
						label=""
						name="passwordConfirm"
						value={signupData.passwordConfirm}
						onChange={handleSignupChange}
						error={error.passwordConfirm}
						placeholder="비밀번호 확인"
					/>
				</div>
				<div className="lg:mt-2 mt-2">
					<Input
						id="name"
						name="name"
						label=""
						value={signupData.name}
						onChange={handleSignupChange}
						error={error.name}
						placeholder="이름"
					/>
				</div>
				<div className="lg:mt-4 mt-6 flex justify-center">
					<div className="flex items-center">
						<input
							type="checkbox"
							id="agreement"
							checked={isAgreed}
							onChange={(e) => setIsAgreed(e.target.checked)}
							className="w-4 h-4 text-primary-dark"
						/>
						<label htmlFor="agreement" className="ml-2 text-sm text-gray-600">
							개인정보 수집,이용에 동의합니다.
						</label>
					</div>
				</div>
				<div className="lg:mt-4 mt-6">
					<button
						type="submit"
						className="w-full px-3 py-2 text-sm font-medium text-white bg-base-black rounded-md hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-black"
					>
						회원가입
					</button>
				</div>
			</form>
			<div className="lg:mt-4 mt-6 flex items-center">
				<div className="flex-grow h-[1px] bg-gray-200"></div>
				<span className="px-4 text-sm text-gray-500">또는</span>
				<div className="flex-grow h-[1px] bg-gray-200"></div>
			</div>
			<div className="lg:mt-4 mt-6 space-y-2 mb-2">
				<button
					type="button"
					className="w-full px-3 py-2 text-sm font-medium text-[#000000] bg-[#FEE500] rounded-md hover:bg-[#e6cf00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FEE500] relative"
					onClick={handleKakaoSignup}
				>
					<img
						src={kakaoIcon}
						alt="카카오 아이콘"
						className="w-4 h-4 absolute left-6 top-1/2 transform -translate-y-1/2"
					/>
					<span className="w-full text-center">카카오 계정으로 시작하기</span>
				</button>
				<button
					type="button"
					className="w-full px-3 py-2 text-sm font-medium text-[#000000] bg-[#F2F2F2] rounded-md hover:bg-[#E6E6E6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F2F2F2] relative"
					onClick={handleGoogleSignup}
				>
					<img
						src={googleIcon}
						alt="구글 아이콘"
						className="w-4 h-4 absolute left-6 top-1/2 transform -translate-y-1/2"
					/>
					<span className="w-full text-center">구글 계정으로 시작하기</span>
				</button>
			</div>
		</div>
	);
};

export default SignupForm;
