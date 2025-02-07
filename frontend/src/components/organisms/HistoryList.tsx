// HistoryList.tsx

import { Icon } from "../atoms/Icon";

// 더미 데이터
const historyData = Array(10)
	.fill(null)
	.map((_, index) => ({
		id: index + 1,
		name: "김현진",
		date: "1월 14일",
		change: "E 근무 → D 근무 변경",
	}));

const HistoryList = () => {
	return (
		<div className="flex-1 bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)] h-[280px] overflow-y-auto custom-scrollbar">
			<div className="flex justify-center items-center mb-4">
				<h2 className="text-xl font-bold text-gray-700">히스토리</h2>
			</div>
			<div className="space-y-3">
				{historyData.map((item) => (
					<div key={item.id} className="flex items-center justify-between">
						<div className="flex items-center gap-3 min-w-0 flex-1">
							<div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
							<span className="text-gray-900 truncate">
								[ {item.name} ] {item.date}
							</span>
							<span className="font-semibold text-primary-dark whitespace-nowrap">
								{item.change}
							</span>
						</div>
						<div className="flex items-center gap-1 text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2">
							<span className="text-sm whitespace-nowrap">되돌리기</span>
							<Icon name="undo" size={16} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default HistoryList;
