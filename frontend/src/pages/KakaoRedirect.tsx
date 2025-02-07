import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
	userService,
	LoginResponse,
	ApiErrorResponse,
} from "../services/userService";
import Login from "./Login";

export function KakaoRedirect() {
	const navigate = useNavigate();
	const code: string | null = new URL(window.location.href).searchParams.get(
		"code",
	);

	useEffect(() => {
		if (!code) {
			console.error("Authorization code is missing.");
			return;
		}

		userService.kakaoLogin(
			code,
			(data: LoginResponse) => {
				// console.log("✅ 로그인 성공:", data);

				// 사용자 정보 가져오기
				const { role, existAdditionalInfo, existMyWard } = data;

				// TODO 사용자 정보 전역 스토어에 저장

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
export default KakaoRedirect;
