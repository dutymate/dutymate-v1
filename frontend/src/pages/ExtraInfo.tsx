import { useState } from "react";
import ExtraInfoForm from "../components/organisms/ExtraInfoForm";
import StartTemplate from "../components/templates/StartTemplate";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import useUserAuthStore from "../store/userAuthStore";
import { toast } from "react-toastify";
// Mock 응답 데이터 import (임시로 주석 처리)
// import mockResponse from "../services/response-json/user/PostApiMemberInfo.json";

interface FormData {
	grade: number;
	gender: "F" | "M";
	role: "RN" | "HN";
}

const ExtraInfo = () => {
	const navigate = useNavigate();
	const { setAdditionalInfo } = useUserAuthStore();
	const [formData, setFormData] = useState<FormData>({
		grade: 0,
		gender: "F",
		role: "RN",
	});

	const handleSubmit = async (data: FormData) => {
		console.log("ExtraInfo handleSubmit 호출됨:", data);

		try {
			setFormData(data);

			// Convert form data to API request format with correct types
			const apiData = {
				grade: data.grade,
				gender: data.gender,
				role: data.role,
			};

			console.log("API 요청 데이터:", apiData);

			// 실제 API 호출
			const response = await userService.submitAdditionalInfo(apiData);

			// Mock 응답 사용 (임시로 주석 처리)
			// const response = mockResponse;
			console.log("API 응답:", response);

			// Update global state with the same data
			setAdditionalInfo({
				grade: apiData.grade,
				gender: apiData.gender,
				role: apiData.role,
			});

			console.log("전역 상태 업데이트 완료");

			toast.success("회원 가입이 완료되었습니다.", {
				position: "top-center",
				autoClose: 3000,
			});

			// Navigate based on role
			setTimeout(() => {
				if (response.role === "HN") {
					console.log("수간호사로 병동 생성 페이지로 이동");
					navigate("/create-ward");
				} else {
					console.log("평간호사로 병동 입장 페이지로 이동");
					navigate("/enter-ward");
				}
			}, 1000);
		} catch (error) {
			console.error("부가 정보 제출 중 에러 발생:", error);

			if (error instanceof Error) {
				if (error.message === "서버 연결 실패") {
					toast.error("잠시 후 다시 시도해주세요");
					return;
				}
			}
			toast.error("부가 정보 저장에 실패했습니다");
		}
	};

	return (
		<StartTemplate>
			<div className="flex flex-col items-center">
				<p className="text-base-foreground text-lg mb-8">
					원활한 서비스 이용을 위한 부가 정보를 알려주세요.
				</p>
				<ExtraInfoForm initialData={formData} onSubmit={handleSubmit} />
			</div>
		</StartTemplate>
	);
};

export default ExtraInfo;
