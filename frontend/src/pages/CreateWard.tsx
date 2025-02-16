import StartTemplate from "../components/templates/StartTemplate";
import NextTemplate from "../components/templates/NextTemplate";
import CreateWardForm from "../components/organisms/CreateWardForm";
import { useNavigate } from "react-router-dom";
import useUserAuthStore from "../store/userAuthStore";
import { wardService, HospitalInfo } from "../services/wardService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const CreateWard = () => {
	const navigate = useNavigate();
	const userAuthStore = useUserAuthStore();
	const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
	const [hospitals, setHospitals] = useState<HospitalInfo[]>([]);
	const [isSearching, setIsSearching] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleSearchHospitals = async (searchTerm: string) => {
		if (!searchTerm.trim()) {
			setHospitals([]);
			return;
		}

		setIsSearching(true);
		try {
			const results = await wardService.searchHospitals(searchTerm);
			setHospitals(results);
		} catch (error) {
			console.error("병원 검색 실패:", error);
			toast.error("병원 검색에 실패했습니다.");
		} finally {
			setIsSearching(false);
		}
	};

	const handleCreateWard = async (hospitalName: string, wardName: string) => {
		// console.log("handleCreateWard 함수 호출됨:", { hospitalName, wardName });

		try {
			// console.log("wardService.createWard 호출 전");
			await wardService.createWard({
				hospitalName,
				wardName,
			});
			// console.log("wardService.createWard 호출 성공");

			const currentUserInfo = userAuthStore.userInfo;
			if (currentUserInfo) {
				userAuthStore.setUserInfo({
					...currentUserInfo,
					existMyWard: true,
					role: "HN",
				});
			}

			// 성공 토스트 메시지 표시
			toast.success("병동이 생성되었습니다.", {
				position: "top-center",
				autoClose: 3000,
			});

			// 잠시 후 페이지 이동
			setTimeout(() => {
				navigate("/shift-admin");
			}, 1000);
		} catch (error) {
			console.error("병동 생성 실패:", error);
			if (error instanceof Error) {
				if (error.message === "서버 연결 실패") {
					toast.error("잠시 후 다시 시도해주세요.");
					return;
				}
				if (error.message === "UNAUTHORIZED") {
					navigate("/login");
					return;
				}
			}
			if ((error as AxiosError)?.response?.status === 400) {
				toast.error("병동 생성에 실패했습니다.");
				navigate("/ward-admin");
				return;
			}
			// 그 외의 모든 에러는 에러 페이지로 이동
			navigate("/error");
		}
	};

	const Template = isMobile ? NextTemplate : StartTemplate;

	return (
		<Template>
			<div className="flex flex-col items-center">
				<p className="text-gray-600 text-[1rem] mt-[2rem] mb-[2rem]">
					병동 생성을 위한 기본 정보를 입력해주세요.
				</p>
				<CreateWardForm
					onSubmit={handleCreateWard}
					onSearchHospitals={handleSearchHospitals}
					hospitals={hospitals}
					isSearching={isSearching}
				/>
			</div>
		</Template>
	);
};

export default CreateWard;
