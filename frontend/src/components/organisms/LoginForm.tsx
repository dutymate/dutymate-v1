import { EmailInput, PasswordInput } from "../atoms/Input";
import kakaoIcon from "../../assets/kakaotalk.svg";
import googleIcon from "../../assets/google.svg";

const LoginForm = () => {
	const handleKakaoLogin = () => {
		window.location.href = import.meta.env.VITE_KAKAO_LOGIN_URL;
	};

	const handleGoogleLogin = () => {
		window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL;
	};

	return (
		<div className="bg-white rounded-[0.92375rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] px-12 py-16 w-[25rem]">
			<form>
				<EmailInput
					id="email"
					name="email"
					label="아이디"
					placeholder="ssafynurse@dutymate.com"
				/>
				<div className="mt-2">
					<PasswordInput id="password" name="password" label="비밀번호" />
				</div>
				<div className="mt-4">
					<button
						type="submit"
						className="w-full px-3 py-2 text-sm font-medium text-white bg-base-black rounded-md hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-black"
					>
						로그인
					</button>
				</div>
				<div className="mt-3 text-[0.9rem] text-gray-600 flex justify-center gap-2">
					<button type="button" className="underline">
						회원 가입
					</button>
					<span className="text-gray-300">|</span>
					<button type="button" className="underline">
						비밀번호 찾기
					</button>
					<span className="text-gray-300">|</span>
					<button type="button" className="underline">
						아이디 찾기
					</button>
				</div>
				<div className="mt-8 space-y-2 mb-3">
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
		</div>
	);
};

export default LoginForm;
