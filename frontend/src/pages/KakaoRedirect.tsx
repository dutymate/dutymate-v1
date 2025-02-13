import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
	userService,
	LoginResponse,
	// ApiErrorResponse,
} from "../services/userService";
import useUserAuthStore from "../store/userAuthStore";
import { toast } from "react-toastify";
import PageLoadingSpinner from "@/components/atoms/Loadingspinner";

export function KakaoRedirect() {
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

		userService.kakaoLogin(
			code,
			(data: LoginResponse) => {
				const { role, existAdditionalInfo, existMyWard } = data;
				userAuthStore.setUserInfo({ ...data, provider: "kakao" });
				toast.success("정상적으로 로그인되었습니다.");

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
			() => {
				toast.error("이미 다른 경로로 가입한 회원입니다.");
				navigate("/login");
			},
		);
	}, []);

	// 로딩 상태를 보여주는 컴포넌트 반환
	return <PageLoadingSpinner />;
}
