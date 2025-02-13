import { Icon } from "../atoms/Icon";
// import { SmallSearchInput } from "../atoms/Input";
// import { SortButton, FilterButton } from "../atoms/SubButton";
import { WardInfo } from "../../services/wardService";
import { toast } from "react-toastify";
import { useState } from "react";
// import { TempNurseButton } from "../atoms/Button";

interface WardAdminInfoProps {
	wardInfo: WardInfo;
	onAddTempNurse: () => void;
	onViewHistory?: () => void;
}

interface NurseAssignModalProps {
	nurse: {
		name: string;
		gender: string;
		year: number;
	};
	onClose: () => void;
}

const NurseAssignModal = ({ nurse, onClose }: NurseAssignModalProps) => {
	const [selectedNurse, setSelectedNurse] = useState<number | null>(null);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-2xl p-6 w-full max-w-xl mx-4">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">간호사 배정</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<Icon name="close" size={24} />
					</button>
				</div>

				{/* 선택된 간호사 정보 */}
				<div className="bg-gray-50 p-3 rounded-lg mb-4">
					<div className="flex items-center gap-6">
						<span className="font-medium">{nurse.name}</span>
						<span className="text-gray-600">{nurse.gender}</span>
						<span className="text-gray-600">{nurse.year}년차</span>
					</div>
				</div>

				{/* 간호사 선택 리스트 */}
				<div className="mb-4">
					<p className="font-medium mb-2">배정할 간호사를 선택해주세요</p>
					<div className="max-h-[280px] overflow-y-auto space-y-2 pr-2">
						{Array.from({ length: 7 }, (_, i) => i + 1).map((num) => (
							<div
								key={num}
								onClick={() => setSelectedNurse(num)}
								className={`p-3 rounded-lg border cursor-pointer transition-colors ${
									selectedNurse === num
										? "border-primary bg-primary bg-opacity-5"
										: "border-gray-200 hover:border-gray-300"
								}`}
							>
								<div className="flex items-center gap-2">
									<div
										className={`w-4 h-4 rounded-full border ${
											selectedNurse === num
												? "border-primary bg-primary"
												: "border-gray-300"
										}`}
									/>
									<span className="font-medium">간호사 {num}</span>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* 하단 버튼 */}
				<div className="flex justify-center">
					<button
						onClick={() => {
							// TODO: 실제 추가 로직 구현
							onClose();
						}}
						className="px-6 py-2 bg-[#F5A281] hover:bg-[#F37C4C] font-bold text-white rounded-lg transition-colors"
					>
						바로 추가하기
					</button>
				</div>
			</div>
		</div>
	);
};

const WardAdminInfo = ({ wardInfo, onAddTempNurse }: WardAdminInfoProps) => {
	const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
	const [selectedNurse, setSelectedNurse] = useState<{
		name: string;
		gender: string;
		year: number;
	} | null>(null);

	const handleCopyCode = () => {
		navigator.clipboard.writeText(wardInfo.wardCode);
		toast.success("병동 코드가 복사되었습니다");
	};

	const handleViewHistory = () => {
		setIsHistoryModalOpen(true);
	};

	return (
		<div className="w-full">
			<div className="bg-white rounded-[1.154375rem] p-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
					<div className="bg-white rounded-xl p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
						<h3 className="text-[0.95rem] text-gray-600 mb-1 font-medium">
							병동 정보
						</h3>
						<p className="font-semibold border border-gray-300 rounded-md px-3 py-1 text-center">
							{wardInfo.hospitalName} | {wardInfo.wardName}
						</p>
					</div>

					<div className="bg-white rounded-xl p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
						<div className="flex items-center justify-between mb-1">
							<h3 className="text-[0.95rem] text-gray-600 font-medium">
								병동 인원
							</h3>
							<button
								onClick={onAddTempNurse}
								className="flex items-center justify-center gap-1 py-1 px-3 bg-[#999786] hover:bg-[#88866f] rounded-lg transition-colors"
							>
								<Icon name="edit" size={14} className="text-white" />
								<span className="text-[0.8rem] text-white">임시 간호사</span>
							</button>
						</div>
						<p className="font-semibold border border-gray-300 rounded-md px-3 py-1 text-center">
							{wardInfo.nursesTotalCnt}명
						</p>
					</div>

					<div className="bg-white rounded-xl p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
						<div className="flex items-center gap-2 mb-1">
							<h3 className="text-[0.95rem] text-gray-600 font-medium">
								병동 코드
							</h3>
							<Icon
								name="copy"
								size={18}
								className="text-gray-500 cursor-pointer hover:text-primary transition-colors"
								onClick={handleCopyCode}
							/>
						</div>
						<p className="font-semibold border border-gray-300 rounded-md px-3 py-1 text-center">
							{wardInfo.wardCode}
						</p>
					</div>

					<div className="bg-white rounded-xl p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
						<div className="flex items-center justify-between mb-1">
							<h3 className="text-[0.95rem] text-gray-600 font-medium">
								입장 관리
							</h3>
							<button
								onClick={handleViewHistory}
								className="flex items-center justify-center gap-1 py-1 px-3 bg-[#999786] hover:bg-[#88866f] rounded-lg transition-colors"
							>
								<Icon name="history" size={14} className="text-white" />
								<span className="text-[0.8rem] text-white">내역 조회</span>
							</button>
						</div>
						<p className="font-semibold border border-gray-300 rounded-md px-3 py-1 text-center">
							1명 대기
						</p>
					</div>
				</div>
			</div>

			{/* <div className="mb-3">
				<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-0">
					<h2 className="text-lg font-semibold">간호사 관리</h2>
					<div className="flex items-center gap-2 w-full lg:w-auto">
						<div className="flex-1 lg:flex-initial">
							<SmallSearchInput
								id="search-nurse"
								name="searchNurse"
								placeholder="이름으로 검색하기"
							/>
						</div>
						<div className="flex gap-2 flex-shrink-0">
							<SortButton label="정렬" onClick={() => {}} />
							<FilterButton label="필터" onClick={() => {}} />
						</div>
					</div>
				</div>
			</div> */}

			{isHistoryModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-2xl p-6 w-full max-w-xl">
						<div className="flex justify-between items-center mb-4">
							<div>
								<h2 className="text-xl font-semibold mb-1">입장 관리</h2>
								<p className="text-sm text-gray-500">신청 내역</p>
							</div>
							<button
								onClick={() => setIsHistoryModalOpen(false)}
								className="text-gray-500 hover:text-gray-700"
							>
								<Icon name="close" size={24} />
							</button>
						</div>
						<div className="bg-gray-50 rounded-xl p-4">
							<div className="space-y-3">
								{[
									{ name: "김민지", gender: "여자", year: 3 },
									{ name: "이준호", gender: "남자", year: 5 },
									{ name: "박서연", gender: "여자", year: 2 },
									{ name: "최현우", gender: "남자", year: 4 },
									{ name: "정유진", gender: "여자", year: 1 },
								].map((nurse, index) => (
									<div
										key={index}
										className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
									>
										<div className="flex items-center gap-6">
											<span className="font-medium w-20">{nurse.name}</span>
											<span className="text-gray-600 w-16">{nurse.gender}</span>
											<span className="text-gray-600 w-20">
												{nurse.year}년차
											</span>
										</div>
										<div className="flex items-center gap-2">
											<button
												onClick={() => {
													setSelectedNurse(nurse);
													setIsHistoryModalOpen(false);
												}}
												className="px-4 py-1.5 bg-primary text-white rounded-md hover:bg-primary-dark text-sm"
											>
												수락
											</button>
											<button className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm">
												거절
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}

			{selectedNurse && (
				<NurseAssignModal
					nurse={selectedNurse}
					onClose={() => setSelectedNurse(null)}
				/>
			)}
		</div>
	);
};

export default WardAdminInfo;
