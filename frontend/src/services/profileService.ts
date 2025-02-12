import axiosInstance from "../lib/axios";
import axios from "axios";

export interface ProfileResponse {
	hospitalName: string;
	wardName: string;
	profileImg: string | null;
	email: string;
	name: string;
	nickname: string;
	gender: "F" | "M";
	grade: number;
}

export interface ProfileUpdateRequest {
	name: string;
	nickname: string;
	gender: "F" | "M";
	grade: number;
}

export interface ApiErrorResponse {
	message: string;
	timestamp: string;
	status: string;
}

export const profileService = {
	// 프로필 정보 조회
	getProfile: () => {
		return axiosInstance
			.get<ProfileResponse>("/member")
			.then((response) => response.data);
	},

	// 프로필 정보 수정
	updateProfile: (data: ProfileUpdateRequest) => {
		// console.log("서버로 보내는 데이터:", data); // 디버깅용
		return axiosInstance
			.put("/member", data)
			.then((response) => response.data)
			.catch((error) => {
				console.error("서버 응답 에러:", error.response?.data); // 디버깅용
				throw error;
			});
	},

	// 닉네임 중복 체크 함수 추가
	checkNickname: (nickname: string) => {
		return axiosInstance
			.post("/member/check-nickname", { nickname })
			.then(() => true) // 200 OK면 사용 가능
			.catch((error) => {
				if (error.response?.status === 400) {
					return false; // 400 에러면 중복
				}
				throw error;
			});
	},

	// 프로필 이미지 업로드
	uploadProfileImage: (file: File) => {
		const formData = new FormData();
		formData.append("file", file);

		return axiosInstance
			.post("/member/image", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => response.data)
			.catch((error) => {
				if (error.response?.status === 401) {
					throw new Error("로그인 토큰이 만료되었습니다.");
				}
				throw error;
			});
	},

	// 프로필 이미지 삭제
	deleteProfileImage: () => {
		return axiosInstance.delete("/member/image").catch((error) => {
			if (error.response?.status === 401) {
				throw new Error("로그인 토큰이 만료되었습니다.");
			}
			throw error;
		});
	},

	// 병동 나가기
	exitWard: async (
		success: () => void,
		fail: (error: ApiErrorResponse) => void,
	) => {
		try {
			await axiosInstance.delete(`/member/ward`);
			success();
		} catch (error) {
			console.error("Error occurred:", error);
			if (axios.isAxiosError(error)) {
				fail(error.response?.data);
			}
			throw error;
		}
	},

	// 회원 탈퇴하기
	withdrawlMember: async (
		success: () => void,
		fail: (error: ApiErrorResponse) => void,
	) => {
		try {
			await axiosInstance.delete(`/member`);
			success();
		} catch (error) {
			console.error("Error occurred:", error);
			if (axios.isAxiosError(error)) {
				fail(error.response?.data);
			}
			throw error;
		}
	},

	// 로그아웃
	logout: async (
		success: () => void,
		fail: (error: ApiErrorResponse) => void,
	) => {
		try {
			await axiosInstance.post(`/member/logout`);
			success();
		} catch (error) {
			console.error("Error occurred:", error);
			if (axios.isAxiosError(error)) {
				fail(error.response?.data);
			}
			throw error;
		}
	},
};
