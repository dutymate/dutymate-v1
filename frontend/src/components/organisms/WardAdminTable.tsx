// import { useState } from "react";
import WardAdminRowCard from "./WardAdminRowCard";
import { Nurse } from "../../services/wardService";
// import { wardService } from "../../services/wardService";

import { toast } from "react-toastify";
import useWardStore from "../../store/wardStore";

interface WardAdminTableProps {
	nurses: Nurse[];
}

const WardAdminTable = ({ nurses }: WardAdminTableProps) => {
	const { updateNurse, syncWithServer } = useWardStore();
	// const [setSelectedNurses] = useState<string[]>([]);
	// const [selectedNurses] = useState<string[]>([]);

	const handleNurseUpdate = async (memberId: number, data: any) => {
		try {
			await updateNurse(memberId, data);
			toast.success("간호사 정보가 수정되었습니다", {
				position: "top-right",
			});
		} catch (error) {
			toast.error("간호사 정보 수정에 실패했습니다", {
				position: "top-right",
			});
			// 실패 시 서버와 강제 동기화
			await syncWithServer();
		}
	};

	// const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (e.target.checked) {
	// 		setSelectedNurses(nurses.map((nurse) => nurse.memberId.toString()));
	// 	} else {
	// 		setSelectedNurses([]);
	// 	}
	// };

	return (
		<div className="bg-white rounded-[1.154375rem] p-4">
			<div className="overflow-x-auto">
				<div className="flex flex-col gap-2 min-w-[900px]">
					{/* Header */}
					<div className="flex items-center p-1.5 lg:p-2 mb-2 text-sm lg:text-base text-gray-600 font-medium bg-base-muted-30 rounded-xl">
						{/* <input
							type="checkbox"
							className="mr-3 min-w-[20px] flex-shrink-0"
							onChange={handleSelectAll}
							checked={selectedNurses.length === nurses.length}
						/> */}
						<div className="flex items-center justify-between flex-1 gap-10">
							<div className="flex items-center gap-6 flex-shrink-0">
								<div className="w-[120px] pl-2">이름</div>
								<div className="w-[60px] text-center">직위</div>
								<div className="w-[60px] text-center">성별</div>
								<div className="w-[70px] text-center">경력</div>
								<div className="w-[80px] text-center">숙련도</div>
								<div className="w-[120px] text-center">근무 유형</div>
							</div>
							<div className="flex items-center gap-6 flex-1 min-w-0">
								<div className="flex-1 text-center">메모</div>
							</div>
						</div>
					</div>

					{/* Nurse List */}
					{nurses.map((nurse) => (
						<WardAdminRowCard
							key={nurse.memberId}
							nurse={nurse}
							onUpdate={handleNurseUpdate}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default WardAdminTable;
