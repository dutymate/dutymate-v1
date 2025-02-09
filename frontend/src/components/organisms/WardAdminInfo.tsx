import { Icon } from "../atoms/Icon";
// import { SmallSearchInput } from "../atoms/Input";
// import { SortButton, FilterButton } from "../atoms/SubButton";
import { WardInfo } from "../../services/wardService";
import { toast } from "react-toastify";

interface WardAdminInfoProps {
	wardInfo: WardInfo;
}

const WardAdminInfo = ({ wardInfo }: WardAdminInfoProps) => {
	const handleCopyCode = () => {
		navigator.clipboard.writeText(wardInfo.wardCode);
		toast.success("병동 코드가 복사되었습니다");
	};

	return (
		<div className="w-full">
			<div className="bg-white rounded-[1.154375rem] p-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
					<div className="bg-white rounded-xl p-2.5 col-span-1 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
						<h3 className="text-[0.95rem] text-gray-600 mb-1 font-medium">
							병동 정보
						</h3>
						<p className="font-semibold border border-gray-300 rounded-md px-3 py-1 text-center">
							{wardInfo.hospitalName} | {wardInfo.wardName}
						</p>
					</div>

					<div className="bg-white rounded-xl p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
						<h3 className="text-[0.95rem] text-gray-600 mb-1 font-medium">
							병동 인원
						</h3>
						<p className="font-semibold border border-gray-300 rounded-md px-3 py-1 text-center">
							{wardInfo.nursesTotalCnt}명
						</p>
					</div>

					<div className="bg-white rounded-xl p-2.5 col-span-1 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
						<div className="flex items-center gap-2 mb-1">
							<h3 className="text-[0.95rem] text-gray-600 font-medium">
								병동 코드
							</h3>
							<Icon
								name="copy"
								size={18}
								className="text-gray-500 cursor-pointer"
								onClick={handleCopyCode}
							/>
						</div>
						<p className="font-semibold border border-gray-300 rounded-md px-3 py-1 text-center">
							{wardInfo.wardCode}
						</p>
					</div>

					<div className="bg-white rounded-xl p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
						<div className="flex items-center gap-2 mb-1">
							<h3 className="text-[0.95rem] text-gray-600 font-medium">
								입장 관리
							</h3>
							<Icon name="door" size={18} className="text-gray-500" />
						</div>
						<p className="font-semibold border border-gray-300 rounded-md px-3 py-1 text-center">
							1명 대기
						</p>
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
			</div>
		</div>
	);
};

export default WardAdminInfo;
