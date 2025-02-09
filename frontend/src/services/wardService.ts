import axiosInstance from "../lib/axios";
// import mockWardData from "./response-json/ward/GetApiWard.json";

/**
 * 병동 정보를 나타내는 인터페이스
 */
export interface WardInfo {
	/** 병동 코드 */
	wardCode: string;
	/** 병동 이름 */
	wardName: string;
	/** 병원 이름 */
	hospitalName: string;
	/** 간호사 총 인원 */
	nursesTotalCnt: number;
	/** 간호사 목록 */
	nurses: Nurse[];
}

export interface Nurse {
	/** 간호사 ID */
	memberId: number;
	/** 이름 */
	name: string;
	/** 성별 */
	gender: "F" | "M";
	/** 직위 */
	role: "HN" | "RN"; // HN: Head Nurse, RN: Registered Nurse
	/** 경력 */
	grade: number;
	/** 근무 유형 */
	shift: "D" | "E" | "N" | "ALL";
	/** 숙련도 */
	skillLevel: "LOW" | "MID" | "HIGH";
	/** 메모 */
	memo: string;
}

/**
 * 간호사 정보 수정 요청 인터페이스
 */
export interface NurseUpdateRequest {
	/** 근무 유형 */
	shift: "D" | "E" | "N" | "ALL";
	/** 숙련도 */
	skillLevel: "LOW" | "MID" | "HIGH";
	/** 메모 */
	memo: string;
	/** 직위 */
	role: "HN" | "RN";
}

/**
 * 병동 생성 요청 인터페이스
 */
export interface CreateWardRequest {
	/** 병원 이름 */
	hospitalName: string;
	/** 병동 이름 */
	wardName: string;
}

/**
 * 성별 타입
 */
export type Gender = "F" | "M";

/**
 * 직위 타입
 */
export type Role = "HN" | "RN";

/**
 * 근무 유형 타입
 */
export type Shift = "D" | "E" | "N" | "ALL";

/**
 * 숙련도 타입
 */
export type SkillLevel = "LOW" | "MID" | "HIGH";

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
			.then((response) => {
				return true;
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
						case 400:
							throw new Error("이미 입장한 병동이 있습니다");
						case 401:
							window.location.href = "/login";
							break;
						case 404:
							throw new Error("유효하지 않은 병동 코드입니다");
						default:
							window.location.href = "/error";
					}
				}
				throw error;
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
		// // Simulate successful removal
		// return new Promise((resolve) => {
		// 	setTimeout(() => {
		// 		resolve({ success: true });
		// 	}, 300);
		// });
	},
};
