import React from "react";
import notebookImage from "../../assets/notebook.svg";

interface LandingTemplateProps {
	children?: React.ReactNode;
}

const LandingTemplate: React.FC<LandingTemplateProps> = ({ children }) => {
	return (
		<div className="w-full h-screen flex flex-col lg:flex-row">
			{/* 모바일 레이아웃 */}
			<div className="lg:hidden flex flex-col h-screen overflow-hidden">
				<div className="flex-1 bg-base-muted-30 animate-wave-bg flex flex-col items-center justify-center p-[1.5rem]">
					<img
						src="/images/logo.svg"
						alt="DutyMate Logo"
						className="w-[60%] max-w-[17.5rem] mb-[3rem]"
					/>
					<div className="text-center mb-[2rem]">
						<h1 className="text-[1.5rem] font-bold text-gray-800 mb-[0.5rem]">
							"듀티표의 마침표, 듀티메이트."
						</h1>
						<p className="text-[1rem] text-gray-600">
							간호사 업무의 효율성과 공정성을 높이는
							<br />
							자동화 듀티표 생성 서비스.
						</p>
					</div>
					{children}
				</div>
			</div>

			{/* 데스크톱 레이아웃 */}
			<div className="hidden lg:flex flex-1">
				<div className="relative w-full h-full bg-base-muted-30">
					<div className="absolute inset-0 flex flex-col justify-center px-[8%]">
						<div className="mb-[2rem]">
							<h1 className="text-[2rem] font-bold text-gray-800 mb-[0.5rem]">
								"듀티표의 마침표, 듀티메이트."
							</h1>
							<p className="text-[1.2rem] text-gray-600">
								간호사 업무의 효율성과 공정성을 높이는
								<br />
								자동화 듀티표 생성 서비스.
							</p>
						</div>
						<div className="relative w-[120%] -ml-[10%]">
							<img
								src={notebookImage}
								alt="Notebook Preview"
								className="w-full"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* 데스크톱 오른쪽 영역 */}
			<div className="hidden lg:flex flex-1 bg-base-muted-30">
				<div className="w-full flex flex-col items-center justify-center">
					<img
						src="/images/logo.svg"
						alt="DutyMate Logo"
						className="w-[35%] mb-[2rem]"
					/>
					{children}
				</div>
			</div>
		</div>
	);
};

export default LandingTemplate;
