import axiosInstance from "../lib/axios";
import axios from "axios";

// Response Types
export interface LoginResponse {
	token: string;
	memberId: number;
	name: string;
	role: string;
	profileImg: string;
	existAdditionalInfo: boolean;
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

export interface ApiErrorResponse {
	message: string;
	timestamp: string;
	status: string;
}

// API Functions
export const userService = {
	/**
	 * Google 로그인 API
	 * @param code - Google OAuth 인증 코드
	 * @param success - 성공 시 콜백 함수
	 * @param fail - 실패 시 콜백 함수
	 */
	googleLogin: async (
		code: string,
		success: (data: LoginResponse) => void,
		fail: (error: ApiErrorResponse) => void,
	) => {
		try {
			const response = await axiosInstance.get(`/member/login/google`, {
				params: { code },
			});
			success(response.data);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				fail(error.response?.data);
			}
		}
	},

	/**
	 * Kakao 로그인 API
	 * @param code - Kakao OAuth 인증 코드
	 * @param success - 성공 시 콜백 함수
	 * @param fail - 실패 시 콜백 함수
	 */
	kakaoLogin: async (
		code: string,
		success: (data: LoginResponse) => void,
		fail: (error: ApiErrorResponse) => void,
	) => {
		try {
			const response = await axiosInstance.get(`/member/login/kakao`, {
				params: { code },
			});
			success(response.data);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				fail(error.response?.data);
			}
		}
	},

	/**
	 * 부가정보 입력 API
	 * @param data - 부가정보 (연차, 성별, 역할)
	 * @param success - 성공 시 콜백 함수
	 * @param fail - 실패 시 콜백 함수
	 */
	submitAdditionalInfo: async (
		data: AdditionalInfoRequest,
		success: (data: AdditionalInfoResponse) => void,
		fail: (error: ApiErrorResponse) => void,
	): Promise<void> => {
		try {
			const response = await axiosInstance.post(`/member/info`, data);
			success(response.data);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				fail(error.response?.data);
			}
		}
	},
};

export default userService;
