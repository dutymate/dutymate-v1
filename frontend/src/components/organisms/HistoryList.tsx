// HistoryList.tsx

import { Icon } from "../atoms/Icon";
import DutyBadgeEng from "../atoms/DutyBadgeEng";
import { DutyHistory } from "../../services/dutyService";

interface HistoryListProps {
	histories: DutyHistory[];
	onRevert: (historyIdx: number) => void;
}

const HistoryList = ({ histories = [], onRevert }: HistoryListProps) => {
	// 최신 수정 기록이 위에 오도록 정렬
	const sortedHistories = [...histories].sort((a, b) => b.idx - a.idx);

	const renderChangeIndicator = (item: DutyHistory) => {
		if (item.isAutoCreated) {
			return (
				<div className="flex items-center gap-2 bg-blue-50 px-2 py-1 rounded-md">
					<div className="flex items-center gap-1">
						<Icon name="schedule" size={14} className="text-blue-500" />
						<span className="text-sm text-blue-600">자동 생성됨</span>
					</div>
				</div>
			);
		}

		return (
			<div className="flex items-center gap-2">
				<DutyBadgeEng
					type={item.before as "D" | "E" | "N" | "O" | "X"}
					size="xs"
					variant="filled"
				/>
				<Icon name="right" size={12} className="text-gray-400" />
				<DutyBadgeEng
					type={item.after as "D" | "E" | "N" | "O" | "X"}
					size="xs"
					variant="filled"
				/>
			</div>
		);
	};

	return (
		<div className="flex w-1/2 max-w-[600px] bg-white rounded-xl p-5 shadow-lg relative overflow-hidden">
			{/* 헤더 고정 */}
			<div className="flex items-center justify-center pr-4 sticky top-0 bg-white z-10">
				<h2
					className="text-md font-bold text-foreground"
					style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
				>
					수정 기록
				</h2>
			</div>

			{/* 스크롤 영역 */}
			<div className="relative h-[300px] flex-1 w-full min-w-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
				{sortedHistories.length === 0 ? (
					<div className="flex items-center justify-center h-full text-gray-500">
						수정 기록이 없습니다
					</div>
				) : (
					<div className="space-y-3">
						{sortedHistories.map((item) => (
							<div
								key={item.idx}
								className={`flex items-center w-full gap-3 px-2 py-1 hover:bg-gray-50 ${
									item.isAutoCreated ? "border-l-2 border-blue-400" : ""
								}`}
							>
								<div className="flex items-center gap-3 flex-1 min-w-0">
									<span
										className={`px-1.5 py-0.75 rounded-md ${
											item.isAutoCreated ? "bg-blue-50" : "bg-primary-bg"
										}`}
									>
										<span className="font-medium text-sm">{item.name}</span>
									</span>
									<span className="text-foreground text-sm">
										{item.modifiedDay}일
									</span>
									{renderChangeIndicator(item)}
								</div>
								<button
									className="flex items-center gap-1 text-gray-400 hover:text-gray-600 px-2 py-1 rounded-md hover:bg-gray-100"
									onClick={() => onRevert(item.idx)}
								>
									<span className="text-sm whitespace-nowrap">되돌리기</span>
									<Icon name="undo" size={16} />
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default HistoryList;
