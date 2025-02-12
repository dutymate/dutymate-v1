import { EmailInput, PasswordInput } from "../atoms/Input";
import kakaoIcon from "../../assets/kakaotalk.svg";
import googleIcon from "../../assets/google.svg";
import { useState } from "react";
import userService from "@/services/userService";
import { toast } from "react-toastify";
import useUserAuthStore from "@/store/userAuthStore";
import { useNavigate, Link } from "react-router-dom";

interface LoginData {
	email: string;
	password: string;
}

// 이메일 형식 검증
const validateEmail = (email: string) => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const LoginForm = () => {
	const navigate = useNavigate();
	const userAuthStore = useUserAuthStore();

	const [loginData, setLoginData] = useState<LoginData>({
		email: "",
		password: "",
	});

	const [error, setError] = useState<{ email?: string; password?: string }>({});

	const handleKakaoLogin = () => {
		window.location.href = import.meta.env.VITE_KAKAO_LOGIN_URL;
	};

	const handleGoogleLogin = () => {
		window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL;
	};

	const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setLoginData((preData) => ({
			...preData,
			[name]: value,
		}));

		// 입력 변경 시, 에러 메세지 초기화
		setError((preError) => ({
			...preError,
			[name]: "",
		}));
	};

	const handleLoginBtn = async (e: React.FormEvent) => {
		e.preventDefault();

		const trimEmail = loginData.email.trim();
		const trimpassword = loginData.password.trim();
		let isValid = true;

		// 이메일 검증
		if (!trimEmail) {
			setError((prevError) => ({
				...prevError,
				email: "이메일을 입력해 주세요.",
			}));
			isValid = false;
		} else if (!validateEmail(trimEmail)) {
			setError((prevError) => ({
				...prevError,
				email: "올바른 이메일 형식이 아닙니다.",
			}));
			isValid = false;
		}

		// 패스워드 검증
		if (!trimpassword) {
			setError((prevError) => ({
				...prevError,
				password: "비밀번호를 입력해주세요.",
			}));
			isValid = false;
		}

		if (!isValid) {
			return;
		}

		try {
			const data = await userService.login({
				email: trimEmail,
				password: trimpassword,
			});
			const { role, existAdditionalInfo, existMyWard } = data;

			userAuthStore.setUserInfo(data);
			toast.success("정상적으로 로그인되었습니다.");

			// 로그인 후 이동 로직
			if (!existAdditionalInfo) {
				navigate("/extra-info");
			} else if (!existMyWard) {
				if (role === "HN") {
					navigate("/create-ward");
				} else {
					navigate("/enter-ward");
				}
			} else {
				if (role === "HN") {
					navigate("/shift-admin");
				} else {
					navigate("/my-shift");
				}
			}
		} catch (error) {
			toast.error("아이디 또는 비밀번호가 일치하지 않습니다.");
			navigate("/login");
		}
	};

	return (
		<div className="bg-white rounded-[0.92375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] px-12 py-16 w-[25rem] lg:w-[25rem]">
			<form className="lg:block">
				<div className="lg:mt-0 mt-8">
					<EmailInput
						id="email"
						name="email"
						label="이메일"
						placeholder="ssafynurse@dutymate.com"
						value={loginData.email}
						onChange={handleLoginChange}
						error={error.email}
					/>
				</div>
				<div className="lg:mt-2 mt-6">
					<PasswordInput
						id="password"
						name="password"
						label="비밀번호"
						value={loginData.password}
						onChange={handleLoginChange}
						error={error.password}
					/>
				</div>
				<div className="lg:mt-4 mt-8">
					<button
						type="submit"
						className="w-full px-3 py-2 text-sm font-medium text-white bg-base-black rounded-md hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-black"
						onClick={handleLoginBtn}
					>
						로그인
					</button>
				</div>
				{/* <div className="lg:mt-3 mt-6 text-[0.9rem] text-gray-600 flex justify-center gap-2">
					<button type="button" className="underline">
						아이디 찾기
					</button>
					<span className="text-gray-300">|</span>
					<button type="button" className="underline">
						비밀번호 찾기
					</button>
				</div> */}
				<div className="lg:mt-8 mt-12 lg:space-y-2 space-y-4 mb-3">
					<button
						type="button"
						className="w-full px-3 py-2 text-sm font-medium text-[#000000] bg-[#FEE500] rounded-md hover:bg-[#e6cf00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FEE500] relative"
						onClick={handleKakaoLogin}
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
						onClick={handleGoogleLogin}
					>
						<img
							src={googleIcon}
							alt="구글 아이콘"
							className="w-4 h-4 absolute left-6 top-1/2 transform -translate-y-1/2"
						/>
						<span className="w-full text-center">구글 계정으로 시작하기</span>
					</button>
				</div>
			</form>
			<div className="text-center mt-4">
				<span className="text-gray-600">계정이 없으신가요? </span>
				<Link to="/sign-up" className="text-primary-dark hover:underline">
					회원가입
				</Link>
			</div>
		</div>
	);
};

export default LoginForm;
