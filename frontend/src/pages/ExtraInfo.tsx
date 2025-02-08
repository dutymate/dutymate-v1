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
	const [careerError, setCareerError] = useState<string>("");

	const handleSubmit = async (data: FormData) => {
		try {
			// 연차 입력 검증
			if (!data.grade || data.grade <= 0) {
				setCareerError("간호사 연차를 입력해주세요");
				return;
			}

			setFormData(data);

			// Convert form data to API request format with correct types
			const apiData = {
				grade: data.grade,
				gender: data.gender,
				role: data.role,
			};

			// 실제 API 호출 (백엔드 연결 시 주석 해제)
			// const response = await userService.submitAdditionalInfo(apiData);

			// Mock 응답 사용 (백엔드 연결 시 제거)
			const response = mockResponse;

			// Update global state with the same data
			setAdditionalInfo({
				grade: apiData.grade,
				gender: apiData.gender,
				role: apiData.role,
			});

			// Navigate based on role (mock 응답의 role 사용)
			if (response.role === "HN") {
				navigate("/create-ward");
			} else {
				navigate("/enter-ward");
			}
		} catch (error) {
			console.error("Error submitting additional info:", error);
			// TODO: Add error handling UI
		}
	};

	return (
		<StartTemplate>
			<div className="flex flex-col items-center">
				<p className="text-base-foreground text-lg mb-8">
					원활한 서비스 이용을 위한 부가 정보를 알려주세요.
				</p>
				<ExtraInfoForm
					initialData={formData}
					onSubmit={handleSubmit}
					careerError={careerError}
				/>
			</div>
		</StartTemplate>
	);
};

export default ExtraInfo;
