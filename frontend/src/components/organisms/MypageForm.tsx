import { FaUserCircle } from "react-icons/fa";
import { Button } from "../atoms/Button";
import { Input, Select } from "../atoms/Input";
import ToggleButton from "../atoms/ToggleButton";

const MypageForm = () => {
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
	];

	return (
		<div className="space-y-4">
			{/* 프로필 설정 */}
			<div className="bg-white rounded-lg shadow-md p-4">
				<h2 className="text-base font-semibold text-gray-900 mb-4">
					프로필 설정
				</h2>
				<div className="grid grid-cols-2 gap-4">
					{/* 왼쪽 프로필 아이콘 */}
					<div className="flex flex-col items-center justify-center space-y-2">
						<div className="text-center mb-2">
							<h3 className="text-lg font-bold">서울대학교병원</h3>
							<p className="text-sm text-gray-600">내과 병동</p>
						</div>
						<FaUserCircle className="w-48 h-48 text-gray-400" />
						<ToggleButton
							options={[{ text: "기본이미지" }, { text: "사진 등록" }]}
							selectedIndex={0}
							onChange={() => {}}
							variant="nurse"
						/>
					</div>
					{/* 오른쪽 정보 */}
					<div className="space-y-2">
						<Input
							id="email"
							name="email"
							label="아이디"
							value="ssafy1234@naver.com"
							disabled
						/>
						<Input id="name" name="name" label="이름" value="김현진" disabled />
						<Input
							id="nickname"
							name="nickname"
							label="닉네임"
							defaultValue="충주는간호사"
						/>
						<div className="grid grid-cols-2 gap-2">
							<Select
								id="gender"
								name="gender"
								label="성별"
								options={genderOptions}
								defaultValue="F"
								placeholder="성별 선택"
							/>
							<Select
								id="grade"
								name="grade"
								label="연차"
								options={gradeOptions}
								defaultValue="3"
								placeholder="연차 선택"
							/>
						</div>
						<Button type="button" size="sm" color="primary" className="w-full">
							저장하기
						</Button>
					</div>
				</div>
			</div>

			{/* 비밀번호 변경 */}
			<div className="bg-white rounded-lg shadow-md p-4">
				<h2 className="text-base font-semibold text-gray-900 mb-4">
					비밀번호 변경
				</h2>
				<div className="space-y-4">
					<div className="grid grid-cols-3 gap-3">
						<div className="flex flex-col">
							<span className="text-sm text-gray-600 mb-2">현재 비밀번호</span>
							<input
								type="password"
								className="p-2 border border-gray-300 rounded-md w-full text-sm"
								placeholder="**********"
							/>
						</div>
						<div className="flex flex-col">
							<span className="text-sm text-gray-600 mb-2">
								새로운 비밀번호
							</span>
							<input
								type="password"
								className="p-2 border border-gray-300 rounded-md w-full text-sm"
								placeholder="**********"
							/>
						</div>
						<div className="flex flex-col">
							<span className="text-sm text-gray-600 mb-2">비밀번호 확인</span>
							<input
								type="password"
								className="p-2 border border-gray-300 rounded-md w-full text-sm"
								placeholder="**********"
							/>
						</div>
					</div>
					<div className="flex justify-end">
						<Button type="button" size="sm" color="primary">
							변경하기
						</Button>
					</div>
				</div>
			</div>

			{/* 회원 탈퇴 & 병동 나가기 버튼 */}
			<div className="flex justify-end gap-2">
				<button className="px-3 py-2 bg-white text-gray-900 border border-gray-900 rounded-md hover:bg-gray-50 text-xs h-[32px]">
					병동 나가기
				</button>
				<button className="px-3 py-2 bg-white text-gray-900 border border-gray-900 rounded-md hover:bg-gray-50 text-xs h-[32px]">
					회원 탈퇴하기
				</button>
			</div>
		</div>
	);
};

export default MypageForm;
