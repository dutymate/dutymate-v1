import axiosInstance from "../lib/axios";

// 타입 정의
interface WardRequest {
	requestId: number;
	memberId: number;
	name: string;
	date: string;
	shift: "D" | "E" | "N" | "O";
	memo: string;
	status: "승인" | "거절" | "대기";
}

interface MyRequest {
	date: string;
	shift: "D" | "E" | "N" | "O";
	memo: string;
	status: "승인" | "승인 대기중" | "거절";
}

interface CreateRequestDto {
	date: string; // YYYY-MM-DD 형식
	shift: "D" | "E" | "N" | "O";
	memo: string;
}

// API 서비스
export const requestService = {
	/**
	 * 병동 근무 요청 내역 조회 (수간호사용)
	 * 현재 요청 상태에 따라 승인/거절/대기 데이터를 반환
	 * @returns 병동의 모든 근무 요청 내역
	 */
	getWardRequests: async (): Promise<WardRequest[]> => {
		const response = await axiosInstance.get("/ward/request");
		return response.data;
	},

	/**
	 * 나의 근무 요청 내역 조회
	 * @returns 내가 신청한 근무 요청 내역
	 */
	getMyRequests: async (): Promise<MyRequest[]> => {
		const response = await axiosInstance.get("/request");
		return response.data;
	},

	/**
	 * 근무 변경 요청하기
	 * @param data - 요청할 근무 정보 (날짜, 근무 유형, 메모)
	 */
	createRequest: async (data: CreateRequestDto): Promise<void> => {
		await axiosInstance.post("/request", data);
	},
};
