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
		<div className={`hidden lg:block w-[20rem] shrink-0 px-1`}>
			<div className="bg-white rounded-lg p-3 min-h-[37.5rem] sticky top-6 shadow-[0_0.25rem_0.75rem_rgba(0,0,0,0.1)]">
				{/* Title with dots */}
				<div className="flex items-center justify-center gap-2 mb-6">
					<div className="w-2 h-2 rounded-full bg-primary-30" />
					<h2 className="text-primary font-semibold whitespace-nowrap">
						Nurse News
					</h2>
					<div className="w-2 h-2 rounded-full bg-primary-30" />
				</div>

				{/* News Cards */}
				<div className="space-y-4">
					{newsies.map((news, index) => (
						<a
							key={index}
							href={news.link}
							target="_blank"
							rel="noopener noreferrer"
							className="block hover:transform hover:scale-[1.02] transition-transform border-2 rounded-lg"
						>
							<div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
								<div className="bg-white p-3 border-b border-gray-100">
									<h3 className="font-medium text-gray-800 text-sm">
										{news.title}
									</h3>
								</div>
								<div className="bg-primary-10 p-3">
									<p className="text-gray-500 text-xs leading-relaxed">
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
