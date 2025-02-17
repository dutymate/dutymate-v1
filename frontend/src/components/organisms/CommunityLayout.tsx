import useUserAuthStore from "@/store/userAuthStore";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import Title from "../atoms/Title";
import Sidebar from "./WSidebar";
import MSidebar from "./MSidebar";

const CommunityLayout = ({ title, subtitle, children }: any) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { userInfo } = useUserAuthStore();

	return (
		<div className="w-full min-h-screen flex flex-row bg-[#F4F4F4]">
			{/* 데스크톱 Sidebar */}
			<div className="hidden lg:block w-[14.875rem] shrink-0">
				<Sidebar userType={userInfo?.role as "HN" | "RN"} />
			</div>

			{/* 모바일 Sidebar */}
			<MSidebar
				userType={userInfo?.role as "HN" | "RN"}
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
			/>

			{/* 메인 컨텐츠 영역 */}
			<div className="flex-1 min-w-0 flex flex-col">
				{/* Title 영역 */}
				<div className="px-4 lg:px-8 pt-6">
					{/* 모바일 메뉴 버튼 */}
					<button
						onClick={() => setIsSidebarOpen(true)}
						className="lg:hidden mb-4 p-2 hover:bg-gray-100 rounded-lg"
					>
						<IoMdMenu className="w-6 h-6 text-gray-600" />
					</button>
					<Title title={title} subtitle={subtitle} />
				</div>

				{/* 컨텐츠 영역 */}
				<div className="flex-1 flex justify-center mt-6 pb-6">
					<div className="w-full lg:w-[53rem]  lg:px-8 overflow-y-auto">
						{children}
					</div>
					{/* 광고 배너 영역 - 데스크톱에서만 표시 */}
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
								{[
									{
										title: "신생아 살해 간호사 유죄 판결에 대한 AI 챗봇",
										content:
											"주요 인공지능(AI) 챗봇이 뉴스 기사를 상당한 수준으로 잘못 해석해 정보를 제공한다는 연구 결과가 나왔다. 영국 BBC는 ...",
										link: "https://news-url-1.com",
									},
									{
										title: "간호사 근무환경 개선을 위한 새로운 정책 발표",
										content:
											"보건복지부는 간호사들의 근무 환경 개선을 위한 새로운 정책을 발표했다. 이번 정책은 특히 야간 근무 ...",
										link: "https://news-url-2.com",
									},
									{
										title: "디지털 헬스케어와 간호사의 역할 변화",
										content:
											"디지털 기술의 발전으로 인한 의료 환경의 변화 속에서 간호사들의 역할이 더욱 중요해지고 있다 ...",
										link: "https://news-url-3.com",
									},
									{
										title: "간호대학 입학정원 확대 검토 중",
										content:
											"정부는 의료 인력 부족 문제 해결을 위해 간호대학 입학정원 확대를 적극 검토하고 있다고 밝혔다 ...",
										link: "https://news-url-4.com",
									},
								].map((news, index) => (
									<a
										key={index}
										href={news.link}
										target="_blank"
										rel="noopener noreferrer"
										className="block hover:transform hover:scale-[1.02] transition-transform"
									>
										<div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
											<div className="bg-white p-3 border-b border-gray-100">
												<h3 className="font-medium text-gray-800 text-sm">
													{news.title}
												</h3>
											</div>
											<div className="bg-primary-10 p-3">
												<p className="text-gray-500 text-xs leading-relaxed">
													{news.content}
												</p>
											</div>
										</div>
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommunityLayout;
