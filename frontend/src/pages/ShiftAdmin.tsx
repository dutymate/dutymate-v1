import { useEffect } from "react";
import { dutyService } from "../services/dutyService";
import userAuthStore from "@/store/userAuthStore";

const DutyManagement = () => {
	useEffect(() => {
		const fetchDuty = async () => {
			try {
				// 요청 직전의 토큰 상태 확인
				const token = userAuthStore.getState().userInfo?.token; // 또는 당신의 토큰 저장소
				console.log('Current token:', token);
				
				const response = await dutyService.getDuty();
				console.log('Duty Response:', response);
			} catch (error) {
				console.error('Error fetching duty:', error);
			}
		};

		fetchDuty();
	}, []);

	return <div>Loading...</div>;
};

export default DutyManagement;
