import axiosInstance from "../lib/axios";

// Response Types
interface LoginResponse {
	token: string;
	memberId: number;
	name: string;
	role: string;
	profileImg: string;
	existAdditinalInfo: boolean;
	existMyWard: boolean;
}

interface AdditionalInfoRequest {
	grade: number;
	gender: "F" | "M";
	role: "RN" | "HN"; // RN: 평간호사, HN: 수간호사
}

interface AdditionalInfoResponse {
	role: string;
}

// API Functions
export const userService = {
	/**
	 * Google 로그인 API
	 * @param code - Google OAuth 인증 코드
	 * @returns LoginResponse - 로그인 응답 데이터
	 *
	 * axiosInstance를 사용하므로:
	 * - 자동으로 baseURL이 앞에 붙습니다 (/api/member/login/google)
	 * - 토큰이 있다면 자동으로 Authorization 헤더가 포함됩니다
	 * - 401 에러 시 자동으로 로그인 페이지로 리다이렉트됩니다
	 */
	googleLogin: async (code: string): Promise<LoginResponse> => {
		const response = await axiosInstance.get(`/member/login/google`, {
			params: { code },
		});
		return response.data;
	},

	/**
	 * Kakao 로그인 API
	 * @param code - Kakao OAuth 인증 코드
	 * @returns LoginResponse - 로그인 응답 데이터
	 */
	kakaoLogin: async (code: string): Promise<LoginResponse> => {
		const response = await axiosInstance.get(`/member/login/kakao`, {
			params: { code },
		});
		return response.data;
	},

	/**
	 * 부가정보 입력 API
	 * @param data - 부가정보 (연차, 성별, 역할)
	 * @returns AdditionalInfoResponse - 부가정보 입력 응답 데이터
	 */
	submitAdditionalInfo: async (
		data: AdditionalInfoRequest,
	): Promise<AdditionalInfoResponse> => {
		const response = await axiosInstance.post(`/member/info`, data);
		return response.data;
	},
};

export default userService;
