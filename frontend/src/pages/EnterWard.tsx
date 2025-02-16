import StartTemplate from "../components/templates/StartTemplate";
import NextTemplate from "../components/templates/NextTemplate";
import EnterWardForm from "../components/organisms/EnterWardForm";
import useUserAuthStore from "../store/userAuthStore";
import { useNavigate } from "react-router-dom";
import { wardService } from "../services/wardService";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const EnterWard = () => {
	const { userInfo } = useUserAuthStore();
	const navigate = useNavigate();
	const userAuthStore = useUserAuthStore();
	const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const Template = isMobile ? NextTemplate : StartTemplate;

	const handleEnterWard = async (wardCode: string) => {
		try {
			// 1. 병동 코드 확인
			await wardService.checkWardCode(wardCode);

			// 2. 병동 입장 성공 시 사용자 정보 업데이트
			userAuthStore.setUserInfo({
				...userAuthStore.userInfo!,
				existMyWard: true,
				sentWardCode: true,
			});

			// 3. 성공 메시지 표시
			toast.success("병동 입장 요청이 완료되었습니다.", {
				position: "top-center",
				autoClose: 3000,
			});
		} catch (error: any) {
			console.error("병동 입장 실패:", error);
			if (error instanceof Error) {
				if (error.message === "서버 연결 실패") {
					toast.error("잠시 후 다시 시도해주세요");
					return;
				}
				if (error.message === "UNAUTHORIZED") {
					navigate("/login");
					return;
				}
			}
			if (error?.response?.status === 400) {
				toast.error(error.response.data.message);
				return;
			}
			// 그 외의 모든 에러는 에러 페이지로 이동
			navigate("/error");
		}
	};

	return (
		<Template>
			<div className="flex flex-col items-center justify-center text-center -mt-[3vh]">
				<div className={`${isMobile ? "" : "mt-[4rem]"}`}>
					<p className="text-[#FF8282] font-semibold text-[1.125rem] mb-[0.25rem]">
						{userInfo?.name}님 환영합니다!
					</p>
					<p className="text-gray-600 text-[1rem] mb-[2rem]">
						병동 입장하기 위해 전달 받은 병동 코드를 입력해주세요.
					</p>
					<EnterWardForm onSubmit={handleEnterWard} />
				</div>
			</div>
		</Template>
	);
};

export default EnterWard;
