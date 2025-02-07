import axiosInstance from "../lib/axios";

// 타입 정의
interface DayDuty {
	myShift: "D" | "E" | "N" | "O";
	otherShifts: {
		grade: number;
		name: string;
		shift: "D" | "E" | "N" | "O";
	}[];
}

interface MyDuty {
	year: number;
	month: number;
	prevShifts: string; // 전달 일주일
	nextShifts: string; // 다음달 일주일
	shifts: string; // 이번달 근무표
}

interface DutyHistory {
	index: number;
	memberId: number;
	name: string;
	before: string;
	after: string;
	modifiedDay: number;
	isAutoCreated: boolean;
}

interface DutyIssue {
	name: string;
	startDate: number;
	endDate: number;
	endDateShift: string;
	message: string;
}

interface DutyInfo {
	_id: string;
	year: number;
	month: number;
	invalidCnt: number;
	duty: {
		memberId: number;
		name: string;
		role: "HN" | "RN";
		prevShifts: string;
		shifts: string;
	}[];
	issues: DutyIssue[];
	history: DutyHistory[];
}

interface DutyUpdateRequest {
	year: number;
	month: number;
	history: {
		memberId: number;
		name: string;
		before: string;
		after: string;
		modifiedDay: number;
		isAutoCreated: boolean;
	};
}

// API 서비스
export const scheduleService = {
	/**
	 * 당일 근무자 리스트 조회
	 * @param year - 년도
	 * @param month - 월
	 * @param date - 일
	 */
	getDayDuty: async (
		year: number,
		month: number,
		date: number,
	): Promise<DayDuty> => {
		const response = await axiosInstance.get("/duty/mobile/day-duty", {
			params: { year, month, date },
		});
		return response.data;
	},

	/**
	 * 나의 근무표 조회
	 * @param year - 년도 (선택)
	 * @param month - 월 (선택)
	 */
	getMyDuty: async (year?: number, month?: number): Promise<MyDuty> => {
		const params = year && month ? { year, month } : {};
		const response = await axiosInstance.get("/duty/mobile/my-duty", {
			params,
		});
		return response.data;
	},

	/**
	 * 병동 근무표 조회
	 */
	getWardDuty: async (): Promise<DutyInfo> => {
		const response = await axiosInstance.get("/duty/ward");
		return response.data;
	},

	/**
	 * 근무표 자동 생성
	 * @param year - 년도
	 * @param month - 월
	 */
	autoCreateDuty: async (year: number, month: number): Promise<void> => {
		await axiosInstance.get("/duty/auto-create", {
			params: { year, month },
		});
	},

	/**
	 * 근무표 수정
	 * @param data - 수정할 근무 정보
	 */
	updateDuty: async (data: DutyUpdateRequest): Promise<DutyInfo> => {
		const response = await axiosInstance.put("/duty", data);
		return response.data;
	},

	/**
	 * 근무표 조회/되돌리기
	 * @param year - 년도 (선택)
	 * @param month - 월 (선택)
	 * @param historyIndex - 히스토리 인덱스 (되돌리기용, 선택)
	 */
	getDuty: async (params?: {
		year?: number;
		month?: number;
		history?: number;
	}): Promise<DutyInfo> => {
		const response = await axiosInstance.get("/duty", { params });
		return response.data;
	},
};
