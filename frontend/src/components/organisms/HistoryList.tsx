// HistoryList.tsx

import { Icon } from "../atoms/Icon";

interface HistoryListProps {
  histories: {
    idx: number;
    memberId: number;
    name: string;
    before: string;
    after: string;
    modifiedDay: number;
    isAutoCreated: boolean;
  }[];
  onRevert: (historyIdx: number) => void;
}

const HistoryList = ({ histories = [], onRevert }: HistoryListProps) => {
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

      {/* 블러 효과 & 스크롤 - min-w-0 추가하여 flex 컨테이너 크기 조절 문제 해결 */}
      <div className="relative h-[140px] flex-1 w-full min-w-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
        <div className="space-y-3">
          {histories.map((item) => (
            <div key={item.idx} className="flex items-center w-full gap-3">
              <div className="flex items-center gap-3">
                <span className="bg-primary-bg px-1.5 py-0.75 rounded-md">
                  <span className="font-medium text-sm">{item.name}</span>
                </span>
                <span className="text-foreground text-sm">{item.modifiedDay}일</span>
                <div className="font-semibold text-primary-dark text-sm">
                  {item.before} 근무 → {item.after} 근무 변경
                </div>
              </div>
              <div 
                className="ml-auto mr-4 flex items-center gap-1 text-gray-400 hover:text-gray-600 flex-shrink-0 cursor-pointer"
                onClick={() => onRevert(item.idx)}
              >
                <span className="text-sm whitespace-nowrap">되돌리기</span>
                <Icon name="undo" size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryList;
  