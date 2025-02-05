// StartTemplate.tsx

import dutyMateLogo from "../../assets/logo.svg";
import notebookImage from "../../assets/notebook.svg";

const StartTemplate = () => {
	return (
		<div className="w-full h-screen grid grid-cols-2">
			{/* 왼쪽 영역 */}
			<div className="relative">
				{/* 배경 색상 레이어 */}
				<div className="absolute inset-0">
					<div className="h-[70%] bg-muted-30"></div>
					<div className="h-[30%] bg-primary-20"></div>
				</div>
				{/* 메인 텍스트 영역 - 위치 조정 */}
				<div className="relative z-10 pt-[15%] pl-48">
					<div className="flex flex-col gap-4">
						<h1 className="text-[1.25rem] font-bold text-gray-800">
							"듀티표의 마침표, 듀티메이트."
						</h1>
						<p className="text-base text-gray-600">
							간호사 업무의 효율성과 공정성을 높이는
							<br />
							자동화 듀티표 생성 서비스.
						</p>
					</div>
					{/* 노트북 이미지 - 크기 축소 */}
					<div className="mt-32 -ml-[300px] overflow-hidden">
						<img
							src={notebookImage}
							alt="Notebook Preview"
							className="w-[900px]"
						/>
					</div>
				</div>
			</div>

			{/* 오른쪽 영역 */}
			<div className="relative">
				{/* 배경 색상 레이어 */}
				<div className="absolute inset-0">
					<div className="h-[70%] bg-muted-30"></div>
					<div className="h-[30%] bg-primary-20"></div>
				</div>
				{/* 로고 영역 - 가로 중앙 정렬 */}
				<div className="relative z-10">
					{/* 로고 - 크기 증가 */}
					<div className="absolute top-120 w-full flex justify-center">
						<img src={dutyMateLogo} alt="DutyMate Logo" className="w-[300px]" />
					</div>
					{/* 노트북 이미지 */}
					<div className="absolute -bottom-20 -right-[350px] overflow-hidden">
						<img
							src={notebookImage}
							alt="Notebook Preview"
							className="w-[900px] !important"
							style={{ width: "900px" }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StartTemplate;
