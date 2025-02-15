import { Icon } from "../atoms/Icon";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ConnectButton } from "../atoms/Button";
import { wardService } from "../../services/wardService";

interface Nurse {
	name: string;
	gender: string;
	year: number;
}

interface HistoryModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSelectNurse: (nurse: Nurse) => void;
}

interface NurseAssignModalProps {
	nurse: Nurse;
	onClose: () => void;
}

// Add interface for temp nurse
interface TempNurse {
	tempMemberId: number;
	profileImg: string | null;
	name: string;
	grade: number;
	gender: "F" | "M";
}

// 내역 조회 모달
export const HistoryModal = ({
	isOpen,
	onClose,
	onSelectNurse,
}: HistoryModalProps) => {
	if (!isOpen) return null;

	// 임시 데이터 8명으로 확장
	const nurses = [
		{ name: "김간호", gender: "여자", year: 3 },
		{ name: "이간호", gender: "남자", year: 2 },
		{ name: "박간호", gender: "여자", year: 5 },
		{ name: "최간호", gender: "여자", year: 1 },
		{ name: "정간호", gender: "남자", year: 4 },
		{ name: "강간호", gender: "여자", year: 2 },
		{ name: "윤간호", gender: "남자", year: 3 },
		{ name: "임간호", gender: "여자", year: 4 },
	];

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			<div className="bg-white rounded-2xl p-6 w-full max-w-[480px] mx-4">
				<div className="flex justify-between items-center mb-4 relative">
					<h2 className="text-xl font-semibold text-center w-full">
						입장 신청 내역
					</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 absolute right-0"
					>
						<Icon name="close" size={24} />
					</button>
				</div>

				<div className="bg-gray-50 rounded-xl p-4">
					<div className="max-h-[320px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
						{nurses.map((nurse, i) => (
							<div
								key={i}
								className="flex items-center justify-between gap-2 px-3 py-2.5 bg-white rounded-xl border border-gray-100"
							>
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-1.5 w-[80px]">
										<Icon
											name="user"
											size={18}
											className="text-gray-500 flex-shrink-0"
										/>
										<span className="font-medium truncate text-sm">
											{nurse.name}
										</span>
									</div>
									<div className="flex items-center gap-1 w-[45px]">
										<Icon
											name={nurse.gender === "여자" ? "female" : "male"}
											size={14}
											className="text-gray-500 flex-shrink-0"
										/>
										<span className="text-gray-600 text-sm">
											{nurse.gender}
										</span>
									</div>
									<div className="flex items-center gap-1 w-[45px]">
										<Icon
											name="idCard"
											size={14}
											className="text-gray-500 flex-shrink-0"
										/>
										<span className="text-gray-600 text-sm whitespace-nowrap">
											{nurse.year}차
										</span>
									</div>
								</div>
								<div className="flex items-center gap-1.5 flex-shrink-0">
									<button
										onClick={() => {
											onSelectNurse(nurse);
										}}
										className="px-3 py-1 rounded-md text-xs transition-colors bg-primary text-white hover:bg-primary-dark whitespace-nowrap"
									>
										수락
									</button>
									<button
										onClick={() => toast.info("거절되었습니다")}
										className="px-3 py-1 rounded-md text-xs transition-colors bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 whitespace-nowrap"
									>
										거절
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

// 간호사 배정 모달
export const NurseAssignModal = ({ nurse, onClose }: NurseAssignModalProps) => {
	const [selectedNurse, setSelectedNurse] = useState<number | null>(null);
	const [tempNurses, setTempNurses] = useState<TempNurse[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTempNurses = async () => {
			try {
				const data = await wardService.getTempNurseList();
				setTempNurses(data);
			} catch (error) {
				console.error("임시 간호사 목록 조회 실패:", error);
				toast.error("임시 간호사 목록을 불러오는데 실패했습니다");
			} finally {
				setIsLoading(false);
			}
		};

		fetchTempNurses();
	}, []);

	const handleConnect = (nurseNumber: number) => {
		if (
			window.confirm(`간호사 ${nurseNumber}과(와) 연동을 진행하시겠습니까?`)
		) {
			setSelectedNurse(nurseNumber);
			// TODO: 실제 연동 로직 구현
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			<div className="bg-white rounded-2xl p-6 w-full max-w-[480px] mx-4">
				<div className="flex justify-between items-center mb-4 relative">
					<h2 className="text-xl font-semibold text-center w-full">
						간호사 배정
					</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 absolute right-0"
					>
						<Icon name="close" size={24} />
					</button>
				</div>

				{/* 선택된 간호사 정보 */}
				<div className="flex items-center justify-center gap-4 px-3 py-2.5 bg-white rounded-xl mb-4 border border-primary-20">
					<div className="flex items-center gap-1.5 w-[80px]">
						<Icon
							name="user"
							size={18}
							className="text-gray-500 flex-shrink-0"
						/>
						<span className="font-medium truncate text-sm">{nurse.name}</span>
					</div>
					<div className="flex items-center gap-1 w-[45px]">
						<Icon
							name={nurse.gender === "여자" ? "female" : "male"}
							size={14}
							className="text-gray-500 flex-shrink-0"
						/>
						<span className="text-gray-600 text-sm">{nurse.gender}</span>
					</div>
					<div className="flex items-center gap-1 w-[45px]">
						<Icon
							name="idCard"
							size={14}
							className="text-gray-500 flex-shrink-0"
						/>
						<span className="text-gray-600 text-sm whitespace-nowrap">
							{nurse.year}차
						</span>
					</div>
				</div>

				<p className="text-sm text-gray-500 mb-3">
					연동할 간호사를 선택해주세요.
				</p>

				{/* 간호사 선택 리스트 */}
				<div className="bg-gray-50 rounded-xl p-4 mb-4">
					<div className="text-sm text-gray-600 mb-2 px-2">근무자</div>
					<div className="max-h-[280px] overflow-y-auto space-y-2 pr-2">
						{isLoading ? (
							<div className="text-center py-4">로딩 중...</div>
						) : tempNurses.length === 0 ? (
							<div className="text-center py-4">임시 간호사가 없습니다.</div>
						) : (
							tempNurses.map((tempNurse) => (
								<div
									key={tempNurse.tempMemberId}
									className="flex items-center justify-between gap-2 px-3 py-2.5 bg-white rounded-xl"
								>
									<div className="flex items-center gap-4">
										<div className="flex items-center gap-1.5 w-[80px]">
											{tempNurse.profileImg ? (
												<img
													src={tempNurse.profileImg}
													alt="프로필"
													className="w-[18px] h-[18px] rounded-full"
												/>
											) : (
												<Icon
													name="user"
													size={18}
													className="text-gray-500 flex-shrink-0"
												/>
											)}
											<span className="font-medium truncate text-sm">
												{tempNurse.name}
											</span>
										</div>
										<div className="flex items-center gap-1 w-[45px]">
											<Icon
												name={tempNurse.gender === "F" ? "female" : "male"}
												size={14}
												className="text-gray-500 flex-shrink-0"
											/>
											<span className="text-gray-600 text-sm">
												{tempNurse.gender === "F" ? "여자" : "남자"}
											</span>
										</div>
										<div className="flex items-center gap-1 w-[45px]">
											<Icon
												name="idCard"
												size={14}
												className="text-gray-500 flex-shrink-0"
											/>
											<span className="text-gray-600 text-sm whitespace-nowrap">
												{tempNurse.grade}차
											</span>
										</div>
									</div>
									<button
										onClick={() => handleConnect(tempNurse.tempMemberId)}
										className={`px-3 py-1 rounded-md text-xs transition-colors whitespace-nowrap ${
											selectedNurse === tempNurse.tempMemberId
												? "bg-primary text-white hover:bg-primary-dark"
												: "bg-white text-primary border border-primary hover:bg-primary hover:text-white"
										}`}
									>
										연동
									</button>
								</div>
							))
						)}
					</div>
				</div>

				{/* 하단 버튼 */}
				<div className="flex justify-center">
					<ConnectButton
						onClick={() => {
							// TODO: 실제 추가 로직 구현
							onClose();
						}}
					/>
				</div>
			</div>
		</div>
	);
};
