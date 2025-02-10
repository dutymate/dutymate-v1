import { FaUserCircle } from "react-icons/fa";
import { Button } from "../atoms/Button";
import { MypageInput, MypageSelect } from "../atoms/Input";
import { MypageToggleButton } from "../atoms/ToggleButton";
import { useState } from "react";

const MypageForm = () => {
	const [selectedImageOption, setSelectedImageOption] = useState(0);

	const handleWithdrawal = () => {
		const isConfirmed = confirm(
			"탈퇴 시 회원 정보가 비활성화 됩니다. 계속 진행하시겠습니까?",
		);
		if (isConfirmed) {
			try {
				// TODO: 회원 탈퇴 로직 구현
				const isSuccess = Math.random() < 0.5; // 임시로 랜덤하게 성공/실패 처리

				if (isSuccess) {
					// 탈퇴 성공
					alert("탈퇴가 정상적으로 처리되었습니다.");
					// TODO: 로그아웃 처리 및 메인 페이지로 이동
				} else {
					// 탈퇴 실패
					alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
				}
			} catch (error) {
				alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
			}
		}
	};

	const genderOptions = [
		{ value: "F", label: "여자" },
		{ value: "M", label: "남자" },
	];

	const gradeOptions = [
		{ value: "1", label: "1년차" },
		{ value: "2", label: "2년차" },
		{ value: "3", label: "3년차" },
		{ value: "4", label: "4년차" },
		{ value: "5", label: "5년차" },
		{ value: "6", label: "6년차" },
		{ value: "7", label: "7년차" },
		{ value: "8", label: "8년차" },
		{ value: "9", label: "9년차" },
		{ value: "10", label: "10년차" },
	];

	return (
		<div className="space-y-4 max-w-[1000px] mx-auto">
			{/* 프로필 설정 */}
			<div className="bg-white rounded-lg shadow-md p-4">
				<h2 className="text-sm font-semibold text-gray-900 mb-2">
					프로필 설정
				</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					{/* 왼쪽 프로필 아이콘 */}
					<div className="flex flex-col items-center justify-center space-y-6">
						<div className="text-center mb-1">
							<h3 className="text-sm font-bold">서울대학교병원</h3>
							<p className="text-xs text-gray-600">내과 병동</p>
						</div>
						<FaUserCircle className="w-20 h-20 lg:w-24 lg:h-24 text-gray-400" />
						<MypageToggleButton
							options={[{ text: "기본이미지" }, { text: "사진 등록" }]}
							selectedIndex={selectedImageOption}
							onChange={(index) => setSelectedImageOption(index)}
						/>
					</div>
					{/* 오른쪽 정보 */}
					<div className="space-y-2">
						<MypageInput
							id="email"
							name="email"
							label="아이디"
							value="ssafy1234@naver.com"
							disabled
						/>
						<MypageInput
							id="name"
							name="name"
							label="이름"
							value="김현진"
							disabled
						/>
						<MypageInput
							id="nickname"
							name="nickname"
							label="닉네임"
							defaultValue="충주는간호사"
							className="focus:outline-none focus:ring-2 focus:ring-primary-20"
						/>
						<div className="grid grid-cols-2 gap-2">
							<MypageSelect
								id="gender"
								name="gender"
								label="성별"
								options={genderOptions}
								defaultValue="F"
								placeholder="성별 선택"
								className="focus:outline-none focus:ring-2 focus:ring-primary-20"
							/>
							<MypageSelect
								id="grade"
								name="grade"
								label="연차"
								options={gradeOptions}
								defaultValue="3"
								placeholder="연차 선택"
								className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-20"
							/>
						</div>
					</div>
				</div>
				{/* 저장하기 버튼을 그리드 밖으로 이동 */}
				<div className="flex justify-center lg:justify-end mt-6">
					<Button
						type="button"
						size="sm"
						color="primary"
						className="w-full lg:w-[120px] h-[36px] max-w-[380px]"
					>
						저장하기
					</Button>
				</div>
			</div>

			{/* 비밀번호 변경 */}
			<div className="bg-white rounded-lg shadow-md p-4">
				<h2 className="text-base font-semibold text-gray-900 mb-4">
					비밀번호 변경
				</h2>
				<div className="space-y-4">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
						<div className="flex flex-col">
							<span className="text-sm text-gray-600 mb-2">현재 비밀번호</span>
							<input
								type="password"
								className="p-2 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-20"
								placeholder="**********"
							/>
						</div>
						<div className="flex flex-col">
							<span className="text-sm text-gray-600 mb-2">
								새로운 비밀번호
							</span>
							<input
								type="password"
								className="p-2 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-20"
								placeholder="**********"
							/>
						</div>
						<div className="flex flex-col">
							<span className="text-sm text-gray-600 mb-2">비밀번호 확인</span>
							<input
								type="password"
								className="p-2 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-20"
								placeholder="**********"
							/>
						</div>
					</div>
					<div className="flex justify-center lg:justify-end">
						<Button
							type="button"
							size="sm"
							color="primary"
							className="w-full lg:w-[120px] h-[36px] max-w-[380px]"
						>
							변경하기
						</Button>
					</div>
				</div>
			</div>

			{/* 회원 탈퇴 & 병동 나가기 버튼 */}
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
		</div>
	);
};

export default MypageForm;
