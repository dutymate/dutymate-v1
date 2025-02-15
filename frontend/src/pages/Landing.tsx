import StartTemplate from "../components/templates/StartTemplate";
import { Button } from "../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LandingTemplate from "../components/templates/LandingTemplate"; // 모바일 버전 전용 랜딩 템플릿 임포트
import "../styles/animations.css";

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

	const handleStart = () => {
		navigate("/login");
	};

	return isMobile ? (
		<LandingTemplate>
			<Button
				color="primary"
				size="lg"
				width="long"
				onClick={handleStart}
				className="mt-1 lg:mt-[5vh] h-[4.5vh] lg:h-12"
			>
				<span className="text-xl lg:text-base">시작하기</span>
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
					className="mt-1 lg:mt-[5vh] h-[4.5vh] lg:h-12"
				>
					<span className="text-xl lg:text-base">시작하기</span>
				</Button>
			</div>
		</StartTemplate>
	);
};

export default Landing;
