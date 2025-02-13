import useShiftStore from "../../store/shiftStore";
import { Icon } from "../atoms/Icon";

const RuleCheckList = () => {
	const issues = useShiftStore((state) => state.dutyInfo?.issues || []);

	return (
		<div className="flex flex-1 bg-white rounded-xl p-5 shadow-lg relative overflow-hidden">
			{/* 헤더 고정 */}
			<div className="flex items-top justify-center pr-4 sticky top-0 bg-white z-10">
				<Icon name="alert" size={24} className="text-gray-600" />
			</div>

			{/* 블러 효과 & 스크롤 - min-w-0 추가하여 flex 컨테이너 크기 조절 문제 해결 */}
			<div className="relative h-[300px] flex-1 w-full min-w-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
				{issues.length === 0 ? (
					<div className="flex items-center justify-center h-full text-gray-500">
						규칙 위반이 없습니다
					</div>
				) : (
					<div className="space-y-3">
						{issues.map((item, index) => (
							<div key={index} className="flex items-center gap-5">
								<span className="bg-duty-off-bg px-1.5 py-0.75 rounded-md">
									<span className="font-medium text-md">{item.name}</span>
								</span>
								<span className="text-foreground text-sm">
									{item.startDate}일
								</span>
								<div className="text-duty-evening-dark text-sm text-red-500">
									{item.message}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default RuleCheckList;
