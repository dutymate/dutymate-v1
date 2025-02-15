import StartTemplate from "../components/templates/StartTemplate";
import NextTemplate from "../components/templates/NextTemplate";
import EnterWardForm from "../components/organisms/EnterWardForm";
import useUserAuthStore from "../store/userAuthStore";
// import { useNavigate } from "react-router-dom";
import { wardService } from "../services/wardService";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const EnterWard = () => {
	const { userInfo } = useUserAuthStore();
	// const navigate = useNavigate();
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
		// console.log("Attempting to enter ward with code:", wardCode);

		try {
			// 1. 병동 코드 확인
			await wardService.checkWardCode(wardCode);
			// console.log("Ward code check result:", response);

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
			if (error) {
				switch (error.response.data.message) {
					case "서버 연결 실패":
						toast.error("잠시 후 다시 시도해주세요");
						return;
					default:
						toast.error(error.response.data.message);
				}
			}
		}
	};

	return (
		<Template>
			<div className="flex flex-col items-center justify-center text-center -mt-[5vh]">
				<div className={`${isMobile ? "" : "mt-16"}`}>
					<p className="text-[#FF8282] font-semibold text-lg mb-1 ">
						{userInfo?.name}님 환영합니다!
					</p>
					<p className="text-gray-600 text-base mb-8">
						병동 입장하기 위해 전달 받은 병동 코드를 입력해주세요.
					</p>
					<EnterWardForm onSubmit={handleEnterWard} />
				</div>
			</div>
		</Template>
	);
};

export default EnterWard;
