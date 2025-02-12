import { ApiErrorResponse, profileService } from "@/services/profileService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MypageExit = () => {
	const navigate = useNavigate();

	const handleExitButton = () => {
		const isConfirmed = confirm(
			"병동 나가기 시 이번 달 근무표에서 홍길동님의 데이터가 삭제됩니다.\n계속 진행하시겠습니까?",
		);
		if (isConfirmed) {
			profileService.exitWard(
				() => {
					navigate("/extra-info")
					// console.log("병동 나가기 성공");
				},
				(error: ApiErrorResponse) => {
					toast.error(error.message)
				},
			)
		}
	};


	const handleWithdrawal = () => {
		const isConfirmed = confirm(
			"탈퇴 시 회원 정보가 비활성화 됩니다. 계속 진행하시겠습니까?",
		);
		if (isConfirmed) {
			profileService.withdrawlMember(
				() => {
					navigate("/login")
				},
				(error: ApiErrorResponse) => {
					toast.error(error.message)
				},
			)
		}
	};

	return (
		<div className="flex flex-row justify-center items-center gap-2">
			<button 
				onClick={handleExitButton}
				className="w-full lg:w-[180px] px-3 py-2 bg-white text-gray-900 border border-gray-200 rounded-md hover:bg-gray-50 text-xs lg:text-sm h-[40px]"
			>
				병동 나가기
			</button>
			<button
				onClick={handleWithdrawal}
				className="w-full lg:w-[180px] px-3 py-2 bg-white text-gray-900 border border-gray-200 rounded-md hover:bg-gray-50 text-xs lg:text-sm h-[40px]"
			>
				회원 탈퇴하기
			</button>
		</div>
	);
};

export default MypageExit;
