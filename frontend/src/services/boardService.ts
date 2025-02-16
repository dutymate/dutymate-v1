// import Signup from "@/pages/Signup";
import axiosInstance from "../lib/axios";
import axios from "axios";

// Response Types
export interface AllPostResponse {
	boardId: number;
	nickname: string;
	profileImg: string | null;
	title: string;
	content: string;
	boardImgUrl: string | null;
	category: string;
	createdAt: string;
	viewCnt: number;
	likeCnt: number;
	commentCnt: number;
}

export interface BoardImgResponse {
	boardImgUrl: string;
}

export interface BoardRequest {
	category: string;
	title: string;
	content: string;
	boardImgUrl: string;
}

export interface ApiErrorResponse {
	message: string;
	timestamp: string;
	status: string;
}

// API Functions
export const boardService = {
	/**
	 * 전체 게시판 조회
	 * @param code - 카테고리
	 * @param success - 성공 시 콜백 함수
	 * @param fail - 실패 시 콜백 함수
	 */
	getAllPosts: async (
		category: string,
		success: (data: AllPostResponse[]) => void,
		fail: (error: ApiErrorResponse) => void,
	) => {
		return axiosInstance
			.get(`/board`, {
				params: { category },
			})
			.then((response) => {
				success(response.data);
			})
			.catch((error) => {
				if (axios.isAxiosError(error)) {
					fail(error.response?.data);
				}
				throw error;
			});
	},

	/**
	 * 게시글 이미지 업로드
	 * @param file - 이미지 파일
	 * @param success - 성공 시 콜백 함수
	 * @param fail - 실패 시 콜백 함수
	 */
	uploadBoardImage: async (
		file: File,
		success: (data: BoardImgResponse) => void,
		fail: (error: ApiErrorResponse) => void,
	) => {
		const formData = new FormData();
		formData.append("file", file);

		return axiosInstance
			.post(`/board/image`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				success(response.data);
			})
			.catch((error) => {
				if (axios.isAxiosError(error)) {
					fail(error.response?.data);
				}
				throw error;
			});
	},

	/**
	 * 게시글 작성
	 * @param formData
	 * @param success - 성공 시 콜백 함수
	 * @param fail - 실패 시 콜백 함수
	 */
	writePost: async (
		formData: BoardRequest,
		success: (data: BoardImgResponse) => void,
		fail: (error: ApiErrorResponse) => void,
	) => {
		return axiosInstance
			.post(`/board`, formData)
			.then((response) => {
				success(response.data);
			})
			.catch((error) => {
				if (axios.isAxiosError(error)) {
					fail(error.response?.data);
				}
				throw error;
			});
	},

	/**
	 * 게시글 하나 조회
	 * @param boardId
	 * @returns
	 */
	getSinglePosts: async (boardId: number) => {
		return axiosInstance
			.get(`/board/${boardId}`)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				if (axios.isAxiosError(error)) {
					throw error.response?.data;
				}
				if (error.response) {
					switch (error.response.status) {
						case 401:
							window.location.href = "/login";
							break;
						default:
							throw error;
					}
				}
				throw error;
			});
	},

	deleteBoard: async (boardId: number) => {
		return axiosInstance
			.delete(`/board/${boardId}`)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				if (axios.isAxiosError(error)) {
					throw error.response?.data;
				}
				if (error.response) {
					switch (error.response.status) {
						case 401:
							window.location.href = "/login";
							break;
						default:
							throw error;
					}
				}
				throw error;
			});
	},
};

export default boardService;
