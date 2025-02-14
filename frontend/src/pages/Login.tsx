import LoginForm from "../components/organisms/LoginForm";
import StartTemplate from "../components/templates/StartTemplate";
import NextTemplate from "../components/templates/NextTemplate";
import { useState, useEffect } from "react";

const Login = () => {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

	useEffect(() => {
		// 로그인 페이지로 접근 시, 토큰 삭제
		sessionStorage.removeItem("user-auth-storage");

		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

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
