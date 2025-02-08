import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
	userService,
	LoginResponse,
	ApiErrorResponse,
} from "../services/userService";
import Login from "./Login";
import useUserAuthStore from "../store/userAuthStore";

export function GoogleRedirect() {
	const navigate = useNavigate();
	const userAuthStore = useUserAuthStore();
	const code: string | null = new URL(window.location.href).searchParams.get(
		"code",
	);

	useEffect(() => {
		if (!code) {
			console.error("Authorization code is missing.");
			navigate("/login");
			return;
		}

		userService.googleLogin(
			code,
			(data: LoginResponse) => {
				// console.log("✅ 로그인 성공:", data);

				// 사용자 정보 가져오기
				const { role, existAdditionalInfo, existMyWard } = data;

				// 사용자 정보 전역 스토어에 저장
				userAuthStore.setUserInfo(data);

				// 로그인 후 페이지 이동
				if (!existAdditionalInfo) {
					navigate("/extra-info");
				} else if (!existMyWard) {
					if (role === "HN") {
						navigate("/create-ward");
					} else {
						navigate("/enter-ward");
					}
				} else {
					if (role === "HN") {
						navigate("/shift-admin");
					} else {
						navigate("/my-shift");
					}
				}
			},
			(error: ApiErrorResponse) => {
				// 인증 오류시 login 페이지로 이동동
				navigate("/login");
				console.error(error);
			},
		);
	}, []);

	return (
		<div>
			<Login />
		</div>
	);
}
export default GoogleRedirect;
