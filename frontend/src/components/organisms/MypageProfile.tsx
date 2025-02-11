import { FaUserCircle } from "react-icons/fa";
import { Button } from "../atoms/Button";
import { MypageInput, MypageSelect } from "../atoms/Input";
import { MypageToggleButton } from "../atoms/ToggleButton";
import { useState, useEffect } from "react";
import useProfileStore from "../../store/profileStore";
import { toast } from "react-toastify";

const MypageProfile = () => {
	const { profile, fetchProfile, updateProfile, checkNickname } =
		useProfileStore();
	const [selectedImageOption, setSelectedImageOption] = useState(0);
	const [formData, setFormData] = useState({
		name: "",
		nickname: "",
		gender: "F",
		grade: "1",
	});
	const [nicknameStatus, setNicknameStatus] = useState<{
		isValid: boolean | null;
		message: string;
	}>({ isValid: null, message: "" });

	useEffect(() => {
		fetchProfile();
	}, [fetchProfile]);

	useEffect(() => {
		if (profile) {
			setFormData({
				name: profile.name,
				nickname: profile.nickname,
				gender: profile.gender,
				grade: String(profile.grade),
			});
		}
	}, [profile]);

	const handleSubmit = async () => {
		try {
			await updateProfile({
				name: formData.name,
				nickname: formData.nickname,
				gender: formData.gender as "F" | "M",
				grade: Number(formData.grade),
			});
			toast.success("프로필이 수정되었습니다.");
		} catch (error) {
			console.error("프로필 수정 실패:", error); // 디버깅용
			toast.error("프로필 수정에 실패했습니다.");
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

	const handleNicknameChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const newNickname = e.target.value;
		setFormData({ ...formData, nickname: newNickname });

		if (newNickname === profile?.nickname) {
			setNicknameStatus({ isValid: null, message: "" });
			return;
		}

		if (newNickname.length > 0) {
			try {
				const isAvailable = await checkNickname(newNickname);
				setNicknameStatus({
					isValid: isAvailable,
					message: isAvailable
						? "사용 가능한 닉네임입니다."
						: "이미 사용 중인 닉네임입니다.",
				});
			} catch (error) {
				setNicknameStatus({
					isValid: false,
					message: "닉네임 확인 중 오류가 발생했습니다.",
				});
			}
		} else {
			setNicknameStatus({ isValid: null, message: "" });
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-4">
			<h2 className="text-sm font-semibold text-gray-900 mb-2">프로필 설정</h2>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{/* 왼쪽 프로필 아이콘 */}
				<div className="flex flex-col items-center justify-center space-y-6">
					<div className="text-center mb-1">
						<h3 className="text-sm font-bold">{profile?.hospitalName}</h3>
						<p className="text-xs text-gray-600">{profile?.wardName}</p>
					</div>
					{profile?.profileImg ? (
						<img
							src={profile.profileImg}
							alt="프로필 이미지"
							className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover"
							onError={(e) => {
								e.currentTarget.onerror = null; // 에러 핸들러 제거
								e.currentTarget.style.display = "none"; // 이미지 숨기기
								// FaUserCircle이 대신 표시됨
							}}
						/>
					) : (
						<FaUserCircle className="w-20 h-20 lg:w-24 lg:h-24 text-gray-400" />
					)}
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
						value={profile?.email || ""}
						disabled
					/>
					<MypageInput
						id="name"
						name="name"
						label="이름"
						value={profile?.name || ""}
						disabled
					/>
					<div className="relative">
						<MypageInput
							id="nickname"
							name="nickname"
							label="닉네임"
							value={formData.nickname}
							onChange={handleNicknameChange}
							className="focus:outline-none focus:ring-2 focus:ring-primary-20"
						/>
						{nicknameStatus.message && (
							<p
								className={`mt-1 text-sm ${
									nicknameStatus.isValid ? "text-green-600" : "text-red-600"
								}`}
							>
								{nicknameStatus.message}
							</p>
						)}
					</div>
					<div className="grid grid-cols-2 gap-2">
						<MypageSelect
							id="gender"
							name="gender"
							label="성별"
							options={genderOptions}
							value={formData.gender}
							onChange={(e) =>
								setFormData({
									...formData,
									gender: e.target.value as "F" | "M",
								})
							}
							className="focus:outline-none focus:ring-2 focus:ring-primary-20"
						/>
						<MypageSelect
							id="grade"
							name="grade"
							label="연차"
							options={gradeOptions}
							value={formData.grade}
							onChange={(e) =>
								setFormData({ ...formData, grade: e.target.value })
							}
							className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-20"
						/>
					</div>
				</div>
			</div>
			<div className="flex justify-center lg:justify-end mt-6">
				<Button
					type="button"
					size="sm"
					color="primary"
					className="w-full lg:w-[120px] h-[36px] max-w-[380px]"
					onClick={handleSubmit}
				>
					저장하기
				</Button>
			</div>
		</div>
	);
};

export default MypageProfile;
