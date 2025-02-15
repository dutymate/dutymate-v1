import LoginForm from "../components/organisms/LoginForm";
import StartTemplate from "../components/templates/StartTemplate";
import NextTemplate from "../components/templates/NextTemplate";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const Login = () => {
	const navigate = useNavigate();
	const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

	useEffect(() => {
		try {
			// 로그인 페이지로 접근 시, 토큰 삭제
			sessionStorage.removeItem("user-auth-storage");

			const handleResize = () => {
				setIsMobile(window.innerWidth < 1024);
			};

			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		} catch (error) {
			console.error("로그인 페이지 접근 실패:", error);
			if (error instanceof Error) {
				if (error.message === "서버 연결 실패") {
					toast.error("잠시 후 다시 시도해주세요.");
					return;
				}
				if (error.message === "UNAUTHORIZED") {
					navigate("/login");
					return;
				}
			}
			if ((error as AxiosError)?.response?.status === 400) {
				toast.error("잘못된 접근입니다.");
				return;
			}
			// 그 외의 모든 에러는 에러 페이지로 이동
			navigate("/error");
		}
	}, [navigate]);

	const Template = isMobile ? NextTemplate : StartTemplate;

	return (
		<Template isLoginPage>
			<div className="flex flex-col items-center">
				<div className="mt-[8vh] lg:mt-8"></div>
			</div>
			<LoginForm />
		</Template>
	);
};

export default Login;
