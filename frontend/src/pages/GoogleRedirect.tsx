import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
	userService,
	LoginResponse,
	ApiErrorResponse,
} from "../services/userService";
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
				const { role, existAdditionalInfo, existMyWard } = data;
				userAuthStore.setUserInfo(data);

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

	// 로딩 상태를 보여주는 컴포넌트 반환
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="animate-spin text-4xl">⌛</div>
		</div>
	);
}
