import boardService, { NewsResponse } from "@/services/boardService";
import { useEffect, useState } from "react";

const CommunityNews = ({}: any) => {
	const [newsies, setNewsies] = useState<NewsResponse[]>([]);

	useEffect(() => {
		fetchNewsies();
	});

	const fetchNewsies = () =>
		boardService.getNews(
			(data) => setNewsies(data),
			(error) => console.error(error),
		);

	return (
		// {/* 광고 배너 영역 - 데스크톱에서만 표시 */}
		<div className={`hidden lg:block w-[22rem] shrink-0 px-1`}>
			<div className="bg-white rounded-lg p-3 min-h-[37.5rem] sticky top-6 shadow-[0_0.25rem_0.75rem_rgba(0,0,0,0.1)]">
				{/* Title with dots */}
				<div className="flex items-center justify-center gap-2 mb-6">
					<h2 className="mt-2 text-primary-dark font-semibold whitespace-nowrap">
						오늘의 간호 NEWS
					</h2>
				</div>

				{/* News Cards */}
				<div className="space-y-4">
					{newsies.map((news, index) => (
						<a
							key={index}
							href={news.link}
							target="_blank"
							rel="noopener noreferrer"
							className="block hover:border-primary border-2 rounded-lg"
						>
							<div className="rounded-lg overflow-hidden">
								<div className="bg-white p-3">
									<h3 className="font-medium text-foreground flex-1 truncate text-md">
										{news.title}
									</h3>
								</div>
								<div className="bg-white p-3">
									<p className="text-gray-500 text-sm leading-relaxed line-clamp-4">
										{news.description}
									</p>
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default CommunityNews;
