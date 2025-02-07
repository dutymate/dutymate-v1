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
				<h1 className="text-[1.25rem] lg:text-2xl font-semibold mb-1">
					{title}
				</h1>
				<div className="flex-1 border-b border-gray-300 ml-4"></div>
			</div>
			{/* 부제목을 제목과 동일한 시작점에서 정렬 */}
			{subtitle && (
				<p className="text-[0.875rem] lg:text-base text-gray-500 py-1">
					{subtitle}
				</p>
			)}
		</div>
	);
};

export default Title;
