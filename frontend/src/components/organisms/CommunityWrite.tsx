//글쓰기

import React from "react";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import { BsImage } from "react-icons/bs";

const CommunityWrite = () => {
	const categories = ["일상글", "간호지식 Q&A", "이직 정보"];

	return (
		<div className="flex flex-col gap-6">
			{/* 글쓰기 폼 */}
			<div className="bg-white rounded-lg p-6 shadow-sm">
				<h2 className="text-2xl font-bold mb-6">글쓰기</h2>

				{/* 카테고리 선택 */}
				<select className="w-full p-3 border border-gray-200 rounded-lg mb-4 text-gray-600">
					<option value="">카테고리를 선택해주세요</option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>

				{/* 제목 입력 */}
				<input
					type="text"
					placeholder="제목을 입력해주세요"
					className="w-full p-3 border border-gray-200 rounded-lg mb-4"
				/>

				{/* 내용 입력 */}
				<textarea
					placeholder="내용을 입력해주세요"
					className="w-full h-[200px] p-3 border border-gray-200 rounded-lg mb-4 resize-none"
				/>

				{/* 이미지 업로드 */}
				<div className="flex items-center gap-2 mb-6">
					<button className="p-2 hover:bg-gray-100 rounded-lg">
						<BsImage className="w-6 h-6 text-gray-600" />
					</button>
				</div>

				{/* 등록 버튼 */}
				<div className="flex justify-center">
					<Button color="primary" size="lg" width="long">
						등록
					</Button>
				</div>
			</div>

			{/* 커뮤니티 규칙 */}
			<div className="bg-white rounded-lg p-6 shadow-sm">
				<h3 className="text-lg font-bold mb-4">
					간호사 커뮤니티 이용 규칙 및 운영 정책
				</h3>
				<p className="text-gray-600 text-sm mb-4">
					듀티메이트는 간호사 및 의료 종사자 간의 원활한 정보 공유와 건강한
					소통을 위한 공간입니다. 커뮤니티 이용 시 아래의 규칙을 반드시 준수하여
					주시기 바라며, 이를 위반할 경우 경고, 이용 제한 및 법적 조치가
					이루어질 수 있습니다.
				</p>

				<div className="text-sm text-gray-600 space-y-4">
					<div>
						<h4 className="font-bold mb-2">1. 홍보 및 상업적 활동 금지</h4>
						<p>
							본 커뮤니티에서는 개인 또는 기업의 홍보 및 상업적 활동을 일절
							금지합니다. 제품 판매, 의료기관 및 특정 강의 홍보, 리크루팅
							게시글, 영리 목적의 광고 등은 사전 경고 없이 삭제될 수 있으며,
							반복적인 위반 시 계정 이용이 제한될 수 있습니다.
						</p>
					</div>
					{/* 나머지 규칙들도 동일한 형식으로 추가 */}
				</div>
			</div>
		</div>
	);
};

export default CommunityWrite;
