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
	id: string;
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
export const dutyService = {
	/**
	 * 당일 근무자 리스트 조회
	 * @param year - 년도
	 * @param month - 월
	 * @param date - 일
	 */
	getDayDuty: (year: number, month: number, date: number) => {
		return axiosInstance
			.get("/duty/mobile/day-duty", {
				params: { year, month, date },
			})
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
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
	 * 나의 근무표 조회
	 * @param year - 년도 (선택)
	 * @param month - 월 (선택)
	 */
	getMyDuty: (year?: number, month?: number) => {
		const params = year && month ? { year, month } : {};
		return axiosInstance
			.get("/duty/mobile/my-duty", { params })
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
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
	 * 병동 근무표 조회
	 */
	getWardDuty: () => {
		return axiosInstance
			.get("/duty/ward")
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
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
	 * 근무표 자동 생성
	 * @param year - 년도
	 * @param month - 월
	 */
	autoCreateDuty: (year: number, month: number) => {
		return axiosInstance
			.get("/duty/auto-create", {
				params: { year, month },
			})
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
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
	 * 근무표 수정
	 * @param data - 수정할 근무 정보
	 */
	updateDuty: (data: DutyUpdateRequest) => {
		return axiosInstance
			.put("/duty", data)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
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
	 * 근무표 조회/되돌리기
	 * @param params - 년도, 월, 히스토리 인덱스 (선택)
	 */
	getDuty: (params?: {
		year?: number;
		month?: number;
		history?: number;
	}) => {
		return axiosInstance
			.get("/duty", { params })
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
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
