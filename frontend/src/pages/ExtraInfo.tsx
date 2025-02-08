import { useState } from "react";
import ExtraInfoForm from "../components/organisms/ExtraInfoForm";
import StartTemplate from "../components/templates/StartTemplate";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import useUserAuthStore from "../store/userAuthStore";
// Mock 응답 데이터 import
import mockResponse from "../services/response-json/user/PostApiMemberInfo.json";

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

			// 실제 API 호출 (백엔드 연결 시 주석 해제)
			// const response = await userService.submitAdditionalInfo(apiData);

			// Mock 응답 사용 (백엔드 연결 시 제거)
			const response = mockResponse;
			console.log("API 응답:", response);

			// Update global state with the same data
			setAdditionalInfo({
				grade: apiData.grade,
				gender: apiData.gender,
				role: apiData.role,
			});

			console.log("전역 상태 업데이트 완료");

			// Navigate based on role (mock 응답의 role 사용)
			if (response.role === "HN") {
				console.log("수간호사로 병동 생성 페이지로 이동");
				navigate("/create-ward");
			} else {
				console.log("평간호사로 병동 입장 페이지로 이동");
				navigate("/enter-ward");
			}
		} catch (error) {
			console.error("부가 정보 제출 중 에러 발생:", error);
			// TODO: Add error handling UI
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
