// StartTemplate.tsx

import dutyMateLogo from "../../assets/logo.svg";
import notebookImage from "../../assets/notebook.svg";

const StartTemplate = () => {
	return (
		<div className="w-full h-screen grid grid-cols-2">
			{/* 왼쪽 영역 */}
			<div className="relative w-full h-full">
				{/* 배경 색상 레이어 */}
				<div className="absolute inset-0">
					<div className="h-[70%] bg-muted-30"></div>
					<div className="h-[30%] bg-primary-20 z-0"></div>
				</div>
				{/* 콘텐츠 래퍼 - 전체 세로 중앙 정렬 */}
				<div className="relative h-full flex items-center -translate-y-[8vh]">
					<div className="relative w-full">
						{/* 텍스트와 노트북 컨테이너 */}
						<div className="relative h-[70vh]">
							{/* 메인 텍스트 영역 */}
							<div className="absolute top-[8vh] w-full z-10">
								<div className="pl-[8%]">
									<div className="flex flex-col gap-[0.3vw]">
										<h1 className="text-[1.7vw] font-bold text-gray-800">
											"듀티표의 마침표, 듀티메이트."
										</h1>
										<p className="text-[1.1vw] text-gray-600">
											간호사 업무의 효율성과 공정성을 높이는
											<br />
											자동화 듀티표 생성 서비스.
										</p>
									</div>
								</div>
							</div>
							{/* 노트북 이미지 */}
							<div className="absolute top-[23vh] -left-[20%] w-[120%] z-20">
								<img
									src={notebookImage}
									alt="Notebook Preview"
									className="w-full"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* 오른쪽 영역 */}
			<div className="relative w-full h-full">
				{/* 배경 색상 레이어 */}
				<div className="absolute inset-0">
					<div className="h-[70%] bg-muted-30"></div>
					<div className="h-[30%] bg-primary-20"></div>
				</div>
				{/* 로고 영역 */}
				<div className="relative z-10 h-full flex items-center justify-center -translate-y-[5vh]">
					<img 
						src={dutyMateLogo} 
						alt="DutyMate Logo" 
						className="w-[40%]" 
					/>
				</div>
			</div>
		</div>
	);
};

export default StartTemplate;
