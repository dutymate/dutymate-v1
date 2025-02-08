import axiosInstance from "../lib/axios";

// 타입 정의
interface Nurse {
	memberId: number;
	name: string;
	gender: "F" | "M";
	role: "HN" | "RN"; // HN: Head Nurse, RN: Registered Nurse
	grade: number;
	shift: "D" | "E" | "N" | "All";
	skillLevel: "초급" | "중급" | "상급";
	memo: string;
}

interface WardInfo {
	wardCode: string;
	wardName: string;
	hospitalName: string;
	nursesTotalCnt: number;
	nurses: Nurse[];
}

interface NurseUpdateRequest {
	shift: "D" | "E" | "N" | "All";
	skillLevel: "초급" | "중급" | "상급";
	memo: string;
	role: "HN" | "RN";
}

interface CreateWardRequest {
	hospitalName: string;
	wardName: string;
}

// API 서비스
export const wardService = {
	/**
	 * 병동 정보 조회
	 * @returns 병동 정보 및 소속 간호사 목록
	 */
	getWardInfo: () => {
		return axiosInstance
			.get("/ward")
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				if (error.code === "ERR_NETWORK") {
					console.error(
						"서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.",
					);
					throw new Error("서버 연결 실패");
				}
				if (error.response) {
					switch (error.response.status) {
						case 401:
							window.location.href = "/login";
							break;
						default:
							window.location.href = "/error";
					}
				}
				throw error;
			});
	},

	/**
	 * 병동 생성
	 * @param data - 병원명, 병동명
	 * @returns 생성된 병동 정보
	 */
	createWard: (data: CreateWardRequest) => {
		return axiosInstance
			.post("/ward", data)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				if (error.code === "ERR_NETWORK") {
					console.error(
						"서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.",
					);
					throw new Error("서버 연결 실패");
				}
				if (error.response) {
					switch (error.response.status) {
						case 401:
							window.location.href = "/login";
							break;
						default:
							window.location.href = "/error";
					}
				}
				throw error;
			});
	},

	/**
	 * 병동 코드 확인
	 * @param code - 확인할 병동 코드
	 * @returns 병동 코드 유효성 여부
	 */
	checkWardCode: (code: string) => {
		return axiosInstance
			.get(`/ward/check-code`, {
				params: { code },
			})
			.then(() => true)
			.catch((error) => {
				if (error.code === "ERR_NETWORK") {
					console.error(
						"서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.",
					);
					return false;
				}
				if (error.response) {
					switch (error.response.status) {
						case 401:
							window.location.href = "/login";
							break;
						case 404:
							return false;
						default:
							window.location.href = "/error";
					}
				}
				return false;
			});
	},

	/**
	 * 간호사 정보 수정
	 * @param memberId - 수정할 간호사 ID
	 * @param data - 수정할 정보 (숙련도, 근무 유형, 메모, 권한)
	 */
	updateNurseInfo: (memberId: number, data: NurseUpdateRequest) => {
		return axiosInstance
			.put(`/ward/member/${memberId}`, data)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				if (error.code === "ERR_NETWORK") {
					console.error(
						"서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.",
					);
					throw new Error("서버 연결 실패");
				}
				if (error.response) {
					switch (error.response.status) {
						case 401:
							window.location.href = "/login";
							break;
						default:
							window.location.href = "/error";
					}
				}
				throw error;
			});
	},

	/**
	 * 병동 간호사 내보내기
	 * @param memberId - 내보낼 간호사 ID
	 */
	removeNurse: (memberId: number) => {
		return axiosInstance
			.delete(`/ward/member/${memberId}`)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				if (error.code === "ERR_NETWORK") {
					console.error(
						"서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.",
					);
					throw new Error("서버 연결 실패");
				}
				if (error.response) {
					switch (error.response.status) {
						case 401:
							window.location.href = "/login";
							break;
						default:
							window.location.href = "/error";
					}
				}
				throw error;
			});
	},
};
