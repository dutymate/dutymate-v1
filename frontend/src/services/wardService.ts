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
	getWardInfo: async (): Promise<WardInfo> => {
		const response = await axiosInstance.get("/ward");
		return response.data;
	},

	/**
	 * 병동 생성
	 * @param data - 병원명, 병동명
	 * @returns 생성된 병동 정보
	 */
	createWard: async (data: CreateWardRequest): Promise<WardInfo> => {
		const response = await axiosInstance.post("/ward", data);
		return response.data;
	},

	/**
	 * 병동 코드 확인
	 * @param code - 확인할 병동 코드
	 * @returns 병동 코드 유효성 여부
	 */
	checkWardCode: async (code: string): Promise<boolean> => {
		try {
			await axiosInstance.get(`/ward/check-code`, {
				params: { code },
			});
			return true;
		} catch (error) {
			return false;
		}
	},

	/**
	 * 간호사 정보 수정
	 * @param memberId - 수정할 간호사 ID
	 * @param data - 수정할 정보 (숙련도, 근무 유형, 메모, 권한)
	 */
	updateNurseInfo: async (
		memberId: number,
		data: NurseUpdateRequest,
	): Promise<void> => {
		await axiosInstance.put(`/ward/member/${memberId}`, data);
	},

	/**
	 * 병동 간호사 내보내기
	 * @param memberId - 내보낼 간호사 ID
	 */
	removeNurse: async (memberId: number): Promise<void> => {
		await axiosInstance.delete(`/ward/member/${memberId}`);
	},
};
