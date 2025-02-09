import { useState } from "react";
import WardAdminRowCard from "./WardAdminRowCard";
import { Nurse, wardService } from "../../services/wardService";
import { toast } from "react-toastify";

interface WardAdminTableProps {
	nurses: Nurse[];
}

const WardAdminTable = ({ nurses }: WardAdminTableProps) => {
	const [selectedNurses, setSelectedNurses] = useState<string[]>([]);

	const handleNurseUpdate = async (memberId: number, data: any) => {
		try {
			await wardService.updateNurseInfo(memberId, {
				shift: data.shift,
				skillLevel: data.skillLevel,
				memo: data.memo,
				role: data.role,
			});
			toast.success("간호사 정보가 수정되었습니다");
		} catch (error) {
			toast.error("간호사 정보 수정에 실패했습니다");
		}
	};

	const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setSelectedNurses(nurses.map((nurse) => nurse.memberId.toString()));
		} else {
			setSelectedNurses([]);
		}
	};

	return (
		<div className="bg-white rounded-[1.154375rem] p-4">
			<div className="overflow-x-auto">
				<div className="flex flex-col gap-2 min-w-[900px]">
					{/* Header */}
					<div className="flex items-center px-2.5 py-1">
						<input
							type="checkbox"
							className="mr-3 min-w-[20px] flex-shrink-0"
							onChange={handleSelectAll}
							checked={selectedNurses.length === nurses.length}
						/>
						<div className="flex items-center justify-between flex-1">
							<div className="flex items-center gap-6">
								<span className="text-sm text-gray-500 w-[120px]">이름</span>
								<span className="text-sm text-gray-500 w-[60px]">직위</span>
								<span className="text-sm text-gray-500 w-[60px]">성별</span>
								<span className="text-sm text-gray-500 w-[70px]">경력</span>
								<span className="text-sm text-gray-500 w-[80px]">숙련도</span>
								<span className="text-sm text-gray-500 w-[120px]">
									근무 유형
								</span>
							</div>
							<div className="flex items-center gap-6">
								<span className="text-sm text-gray-500 w-[300px]">메모</span>
								<span className="text-sm text-gray-500 w-[60px]">관리</span>
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
