// RuleCheckList.tsx

const RuleCheckList = () => {
	const ruleViolationData = Array(5)
		.fill(null)
		.map((_, index) => ({
			id: index + 1,
			name: "김현진",
			date: "1월 2일",
			rule: "Day 근무",
			message: "연속 근무는 최대 5일을 초과할 수 없습니다.",
		}));

	return (
		<div className="flex-1 bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)] h-[280px] overflow-y-auto custom-scrollbar">
			<div className="flex justify-center items-center mb-4">
				<h2 className="text-xl font-bold text-gray-700">규칙 위반</h2>
			</div>
			<div className="space-y-3">
				{ruleViolationData.map((item) => (
					<div key={item.id} className="flex flex-col gap-1">
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-2">
								<span className="bg-primary-20 px-2 py-0.5 rounded-md">
									<span className="font-bold">[{item.name}]</span> 규칙 위반
								</span>
								<span className="text-gray-900 text-sm">
									{item.date} {item.rule}
								</span>
							</div>
						</div>
						<div className="text-red-500 text-sm">{item.message}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RuleCheckList;
