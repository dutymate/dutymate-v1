import React from "react";

const Playgrounds: React.FC = () => {
	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-8">Component Playgrounds</h1>

			{/* Atoms Section */}
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Atoms</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* 여기에 Atoms 컴포넌트들이 들어갈 예정입니다 */}
				</div>
			</section>

			{/* Organisms Section */}
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Organisms</h2>
				<div className="space-y-8">
					{/* 여기에 Organisms 컴포넌트들이 들어갈 예정입니다 */}
				</div>
			</section>

			{/* Templates Section */}
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Templates</h2>
				<div className="space-y-8">
					{/* 여기에 Templates 컴포넌트들이 들어갈 예정입니다 */}
				</div>
			</section>
		</div>
	);
};

export default Playgrounds;
