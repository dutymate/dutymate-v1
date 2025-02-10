import { FaUserCircle } from "react-icons/fa";
import { Button } from "../atoms/Button";
import { Input, Select } from "../atoms/Input";

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
		<div className="space-y-6">
			{/* 프로필 설정 */}
			<div className="bg-white rounded-lg shadow-md p-6">
				<h2 className="text-2xl font-semibold text-gray-900 mb-6">
					프로필 설정
				</h2>
				<div className="grid grid-cols-2 gap-8">
					{/* 왼쪽 프로필 아이콘 */}
					<div className="flex items-center justify-center">
						<FaUserCircle className="w-48 h-48 text-gray-400" />
					</div>
					{/* 오른쪽 정보 */}
					<div className="space-y-4">
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
						<div className="grid grid-cols-2 gap-4">
							<Select
								id="gender"
								name="gender"
								label="성별"
								options={genderOptions}
								defaultValue="F"
							/>
							<Select
								id="grade"
								name="grade"
								label="연차"
								options={gradeOptions}
								defaultValue="3"
							/>
						</div>
						<div className="flex justify-end mt-4">
							<Button type="button" size="md" color="primary">
								저장하기
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* 비밀번호 변경 */}
			<div className="bg-white rounded-lg shadow-md p-6">
				<h2 className="text-xl font-semibold text-gray-900 mb-6">
					비밀번호 변경
				</h2>
				<div className="flex items-center gap-6">
					<div className="flex items-center gap-4">
						<span className="text-gray-600 whitespace-nowrap">
							현재 비밀번호
						</span>
						<input
							type="password"
							className="p-2 border border-gray-300 rounded-md w-48"
							placeholder="**********"
						/>
					</div>
					<div className="flex items-center gap-4">
						<span className="text-gray-600 whitespace-nowrap">
							새로운 비밀번호
						</span>
						<input
							type="password"
							className="p-2 border border-gray-300 rounded-md w-48"
							placeholder="**********"
						/>
					</div>
					<div className="flex items-center gap-4">
						<span className="text-gray-600 whitespace-nowrap">
							비밀번호 확인
						</span>
						<input
							type="password"
							className="p-2 border border-gray-300 rounded-md w-48"
							placeholder="**********"
						/>
					</div>
				</div>
				<div className="flex justify-end mt-4">
					<Button type="button" size="md" color="primary">
						변경하기
					</Button>
				</div>
			</div>

			{/* 회원 탈퇴 & 병동 나가기 버튼 */}
			<div className="flex justify-end gap-4">
				<button className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded-md hover:bg-gray-50">
					병동 나가기
				</button>
				<button className="px-4 py-2 bg-white text-gray-900 border border-gray-900 rounded-md hover:bg-gray-50">
					회원 탈퇴하기
				</button>
			</div>
		</div>
	);
};

export default MypageForm;
