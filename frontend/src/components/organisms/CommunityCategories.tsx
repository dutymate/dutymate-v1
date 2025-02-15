// import React from 'react';

interface CommunityCategoriesProps {
	onCategorySelect: (category: string) => void;
	selectedCategory: string;
}

const CommunityCategories = ({
	onCategorySelect,
	selectedCategory,
}: CommunityCategoriesProps) => {
	const categories = ["전체글", "일상글", "간호지식 Q&A", "이직 정보", "HOT"];

	return (
		<div className="flex gap-1.5 sm:gap-2 w-full overflow-x-auto scrollbar-hide">
			{categories.map((category) => (
				<button
					key={category}
					className={`px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg whitespace-nowrap transition-colors ${
						selectedCategory === category
							? "bg-primary-10 text-primary-dark"
							: "hover:bg-primary-10 hover:text-primary-dark"
					}`}
					onClick={() => onCategorySelect(category)}
				>
					{category}
				</button>
			))}
		</div>
	);
};

export default CommunityCategories;
