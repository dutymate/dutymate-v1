import axiosInstance from "../lib/axios";

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

export const profileService = {
	// 프로필 정보 조회
	getProfile: () => {
		return axiosInstance
			.get<ProfileResponse>("/member")
			.then((response) => response.data);
	},

	// 프로필 정보 수정
	updateProfile: (data: ProfileUpdateRequest) => {
		console.log("서버로 보내는 데이터:", data); // 디버깅용
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
};
