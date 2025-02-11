interface RuleCheckListProps {
  issues: {
    name: string;
    startDate: number;
    endDate: number;
    endDateShift: string;
    message: string;
  }[];
}

const RuleCheckList = ({ issues }: RuleCheckListProps) => {
  return (
    <div className="flex w-1/2 max-w-[600px] bg-white rounded-xl p-5 shadow-lg relative overflow-hidden">
      {/* 헤더 고정 */}
      <div className="flex items-center justify-center pr-4 sticky top-0 bg-white z-10">
        <h2
          className="text-md font-bold text-foreground"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          규칙 위반
        </h2>
      </div>

      {/* 블러 효과 & 스크롤 - min-w-0 추가하여 flex 컨테이너 크기 조절 문제 해결 */}
      <div className="relative h-[140px] flex-1 w-full min-w-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
        <div className="space-y-3">
          {issues.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="bg-primary-bg px-1.5 py-0.75 rounded-md">
                <span className="font-medium text-sm">{item.name}</span>
              </span>
              <span className="text-foreground text-sm">
                {item.startDate}일 - {item.endDateShift} 근무
              </span>
              <div className="text-duty-evening-dark text-sm text-red-500">
                {item.message}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RuleCheckList;
