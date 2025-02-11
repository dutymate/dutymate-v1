const MypageExit = () => {
	const handleWithdrawal = () => {
		const isConfirmed = confirm(
			"탈퇴 시 회원 정보가 비활성화 됩니다. 계속 진행하시겠습니까?",
		);
		if (isConfirmed) {
			try {
				// TODO: 회원 탈퇴 로직 구현
				const isSuccess = Math.random() < 0.5; // 임시로 랜덤하게 성공/실패 처리

				if (isSuccess) {
					alert("탈퇴가 정상적으로 처리되었습니다.");
					// TODO: 로그아웃 처리 및 메인 페이지로 이동
				} else {
					alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
				}
			} catch (error) {
				alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
			}
		}
	};

	return (
		<div className="flex flex-row justify-center items-center gap-2">
			<button className="w-full lg:w-[180px] px-3 py-2 bg-white text-gray-900 border border-gray-200 rounded-md hover:bg-gray-50 text-xs lg:text-sm h-[40px]">
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
