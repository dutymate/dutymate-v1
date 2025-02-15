// StartTemplate.tsx

interface StartTemplateProps {
	children: React.ReactNode;
	isLoginPage?: boolean;
	isEnterWardPage?: boolean;
}

const StartTemplate: React.FC<StartTemplateProps> = ({
	children,
	isLoginPage,
	isEnterWardPage,
}) => {
	return (
		<div className="w-full h-screen lg:grid lg:grid-cols-2">
			{/* 모바일 레이아웃 */}
			<div className="lg:hidden flex flex-col h-screen overflow-hidden">
				{/* 로고 영역 */}
				<div className="flex-1 bg-base-muted-30 flex flex-col relative">
					<div
						className={`flex justify-center items-center ${
							isEnterWardPage
								? "mt-[5vh]" // EnterWard 페이지일 때만 로고 위치 조정
								: isLoginPage
									? "mt-[12vh]"
									: "mt-[18vh]" // 다른 페이지들은 기존 위치 유지
						} mb-8`}
					>
						<img
							src="/images/logo.svg"
							alt="DutyMate Logo"
							className="w-[60%] max-w-[280px]"
						/>
					</div>

					{/* 로그인 폼 - 로그인 페이지일 때만 표시 */}
					{isLoginPage && (
						<div className="flex-1 flex items-center justify-center">
							{children}
						</div>
					)}

					{/* 부가 정보 폼 - 로그인 페이지가 아닐 때 */}
					{!isLoginPage && (
						<div className="flex-1 flex items-center justify-center -mt-28">
							{children}
						</div>
					)}
				</div>
			</div>

			{/* 데스크톱 레이아웃 */}
			<div className="hidden lg:block relative w-full h-full">
				{/* 배경 색상 레이어 */}
				<div className="absolute inset-0">
					<div className="h-full bg-base-muted-30"></div>
				</div>
				{/* 콘텐츠 래퍼 - 전체 세로 중앙 정렬 */}
				<div className="relative h-full flex items-center">
					<div className="relative w-full">
						{/* 메인 텍스트 영역 */}
						<div className="pl-[8%]">
							<div className="flex flex-col gap-[0.3vw]">
								<h1 className="text-[1.7vw] font-bold text-gray-800">
									Welcome
								</h1>
								<p className="text-[1.1vw] text-gray-600">
									Start your journey with us
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* 데스크톱 오른쪽 영역 */}
			<div className="hidden lg:block relative w-full h-full">
				<div className="absolute inset-0">
					<div className="h-full bg-base-muted-30"></div>
				</div>
				<div className="relative z-10 h-full flex flex-col items-center justify-center">
					<img alt="듀티메이트" src="/images/logo.svg" className="w-full" />
					{children}
				</div>
			</div>
		</div>
	);
};

export default StartTemplate;
