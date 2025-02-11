interface TitleProps {
	title: string;
	subtitle: string;
	className?: string;
}

const Title = ({ title, subtitle, className }: TitleProps) => {
	return (
		<div className={`flex items-center w-full ${className || ""}`}>
			{/* 제목과 부제목을 같은 줄에 배치하면서 간격 추가 */}
			<h1 className="text-[1rem] lg:text-xl font-semibold">{title}</h1>
			{subtitle && (
				<p className="text-[0.75rem] lg:text-sm text-gray-500 ml-2">
					{subtitle}
				</p>
			)}
			{/* 선(border)를 오른쪽에서 확장 */}
			<div className="flex-1 border-b border-gray-300 ml-4"></div>
		</div>
	);
};

export default Title;
