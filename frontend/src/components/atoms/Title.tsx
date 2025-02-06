interface TitleProps {
	title: string;
	subtitle: string;
	className?: string;
}

const Title = ({ title, subtitle, className }: TitleProps) => {
	return (
		<div className={`flex flex-col w-full ${className || ""}`}>
			{/* 제목과 선을 같은 라인에서 정렬 */}
			<div className="flex items-center w-full">
				<h1 className="text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] font-bold text-base-foreground whitespace-nowrap">
					{title}
				</h1>
				<div className="flex-1 border-b border-gray-300 ml-4"></div>
			</div>
			{/* 부제목을 제목과 동일한 시작점에서 정렬 */}
			<p className="text-[0.75rem] md:text-[0.875rem] text-gray-500 py-1">
				{subtitle}
			</p>
		</div>
	);
};

export default Title;
