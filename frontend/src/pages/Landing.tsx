import StartTemplate from "../components/templates/StartTemplate";
import { Button } from "../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LandingTemplate from "../components/templates/LandingTemplate"; // 모바일 버전 전용 랜딩 템플릿 임포트
import "../styles/animations.css";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const Landing = () => {
	const navigate = useNavigate();
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleStart = async () => {
		try {
			navigate("/login");
		} catch (error) {
			console.error("페이지 이동 실패:", error);
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
	};

	return isMobile ? (
		<LandingTemplate>
			<Button
				color="primary"
				size="lg"
				width="long"
				onClick={handleStart}
				className="mt-[0.0625rem] lg:mt-[3rem] h-[2.5rem] lg:h-[3rem]"
			>
				<span className="text-[1.25rem] lg:text-[1rem]">시작하기</span>
			</Button>
		</LandingTemplate>
	) : (
		<StartTemplate>
			<div className="flex flex-col items-center">
				<Button
					color="primary"
					size="lg"
					width="long"
					onClick={handleStart}
					className="mt-[0.0625rem] lg:mt-[3rem] h-[2.5rem] lg:h-[3rem]"
				>
					<span className="text-[1.25rem] lg:text-[1rem]">시작하기</span>
				</Button>
			</div>
		</StartTemplate>
	);
};

export default Landing;
