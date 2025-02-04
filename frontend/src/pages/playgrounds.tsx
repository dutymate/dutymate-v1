import React from "react";
import { Button } from "@/components/atoms/Button";

const Playgrounds: React.FC = () => {
	return (
		<div className="p-8 font-pretendard">
			<h1 className="text-3xl font-black mb-8">Component Playgrounds</h1>
			{/* Atoms Section */}
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Atoms</h2>

				{/* Buttons */}
				<div className="mb-8">
					<h3 className="text-xl font-semibold mb-4">Buttons</h3>
					<div className="space-y-8">
						{/* Button Colors */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-2">
								Button Colors
							</h4>
							<div className="flex flex-col space-y-4">
								{/* Primary Buttons */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Primary Button
									</h5>
									<div className="flex flex-wrap gap-4">
										<Button color="primary">Active</Button>
										<Button color="primary" disabled>
											Disabled
										</Button>
									</div>
								</div>

								{/* Secondary Buttons */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Secondary Button
									</h5>
									<div className="flex flex-wrap gap-4">
										<Button color="secondary">Active</Button>
										<Button color="secondary" disabled>
											Disabled
										</Button>
									</div>
								</div>

								{/* Tertiary Buttons */}
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										Tertiary Button
									</h5>
									<div className="flex flex-wrap gap-4">
										<Button color="tertiary">Active</Button>
										<Button color="tertiary" disabled>
											Disabled
										</Button>
									</div>
								</div>
							</div>
						</div>

						{/* Short Buttons */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-2">
								Short Buttons (SM: 70/112px, MD: 75/120px, LG: 80/128px)
							</h4>
							<p className="text-xs text-base-muted mb-4">
								Text Size - SM: 11px/12px, MD/LG: 12px/14px
							</p>
							<div className="flex flex-col space-y-4">
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										SM Size
									</h5>
									<Button size="sm" width="short">
										Button
									</Button>
								</div>
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										MD Size
									</h5>
									<Button size="md" width="short">
										Button
									</Button>
								</div>
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										LG Size
									</h5>
									<Button size="lg" width="short">
										Button
									</Button>
								</div>
							</div>
						</div>

						{/* Long Buttons */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-2">
								Long Buttons (SM: 180/330px, MD: 188/350px, LG: 200/370px)
							</h4>
							<p className="text-xs text-base-muted mb-4">
								Text Size - SM: 11px/12px, MD/LG: 12px/14px
							</p>
							<div className="flex flex-col space-y-4">
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										SM Size
									</h5>
									<Button size="sm" width="long">
										Longer Button
									</Button>
								</div>
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										MD Size
									</h5>
									<Button size="md" width="long">
										Longer Button
									</Button>
								</div>
								<div>
									<h5 className="text-sm font-medium text-base-muted mb-2">
										LG Size
									</h5>
									<Button size="lg" width="long">
										Longer Button
									</Button>
								</div>
							</div>
						</div>

						{/* Full Width Button */}
						<div>
							<h4 className="text-sm font-medium text-base-muted mb-2">
								Full Width Button
							</h4>
							<Button size="md" fullWidth>
								Full Width Button
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Organisms Section */}
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Organisms</h2>
			</section>

			{/* Templates Section */}
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Templates</h2>
			</section>

			{/* Font Weight Showcase */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold mb-6">Font Weight Showcase</h2>
				<div className="space-y-4">
					<p className="text-lg font-black">Black (900) - 가장 두꺼운 텍스트</p>
					<p className="text-lg font-bold">Bold (700) - 굵은 텍스트</p>
					<p className="text-lg font-semibold">
						SemiBold (600) - 중간 굵은 텍스트
					</p>
					<p className="text-lg font-medium">Medium (500) - 중간 텍스트</p>
					<p className="text-lg font-normal">Regular (400) - 기본 텍스트</p>
					<p className="text-lg font-light">Light (300) - 얇은 텍스트</p>
					<p className="text-lg font-extralight">
						ExtraLight (200) - 매우 얇은 텍스트
					</p>
					<p className="text-lg font-thin">Thin (100) - 가장 얇은 텍스트</p>
				</div>
			</section>

			{/* Color System */}
			<section className="mb-12">
				<h2 className="text-2xl font-bold mb-6">Color System</h2>

				{/* Primary Colors */}
				<div className="mb-8">
					<h3 className="text-xl font-semibold mb-4">Primary Colors</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="space-y-2">
							<div className="h-20 w-20 bg-primary rounded-lg"></div>
							<p className="text-sm">Primary</p>
							<p className="text-xs text-base-muted">#F5A281</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-primary-dark rounded-lg"></div>
							<p className="text-sm">Primary Dark</p>
							<p className="text-xs text-base-muted">#F37C4C</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-primary-bg rounded-lg"></div>
							<p className="text-sm">Primary BG</p>
							<p className="text-xs text-base-muted">#FCE3D9</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-primary-10 rounded-lg border"></div>
							<p className="text-sm">Primary 10</p>
							<p className="text-xs text-base-muted">#FEF6F2</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-primary-20 rounded-lg"></div>
							<p className="text-sm">Primary 20</p>
							<p className="text-xs text-base-muted">#FFE6DC</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-primary-30 rounded-lg"></div>
							<p className="text-sm">Primary 30</p>
							<p className="text-xs text-base-muted">#FACDB8</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-primary-40 rounded-lg"></div>
							<p className="text-sm">Primary 40</p>
							<p className="text-xs text-base-muted">#F8BEA7</p>
						</div>
					</div>
				</div>

				{/* Duty Colors */}
				<div className="mb-8">
					<h3 className="text-xl font-semibold mb-4">Duty Status Colors</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{/* Day Duty */}
						<div className="space-y-4">
							<div>
								<div className="h-20 w-20 bg-duty-day rounded-lg"></div>
								<p className="text-sm mt-2">Day</p>
								<p className="text-xs text-base-muted">#61A86A</p>
							</div>
							<div>
								<div className="h-20 w-20 bg-duty-day-dark rounded-lg"></div>
								<p className="text-sm mt-2">Day Dark</p>
								<p className="text-xs text-base-muted">#318F3D</p>
							</div>
							<div>
								<div className="h-20 w-20 bg-duty-day-bg rounded-lg"></div>
								<p className="text-sm mt-2">Day BG</p>
								<p className="text-xs text-base-muted">#D0E5D2</p>
							</div>
						</div>

						{/* Evening Duty */}
						<div className="space-y-4">
							<div>
								<div className="h-20 w-20 bg-duty-evening rounded-lg"></div>
								<p className="text-sm mt-2">Evening</p>
								<p className="text-xs text-base-muted">#F68585</p>
							</div>
							<div>
								<div className="h-20 w-20 bg-duty-evening-dark rounded-lg"></div>
								<p className="text-sm mt-2">Evening Dark</p>
								<p className="text-xs text-base-muted">#E55656</p>
							</div>
							<div>
								<div className="h-20 w-20 bg-duty-evening-bg rounded-lg"></div>
								<p className="text-sm mt-2">Evening BG</p>
								<p className="text-xs text-base-muted">#FCDADA</p>
							</div>
						</div>

						{/* Night Duty */}
						<div className="space-y-4">
							<div>
								<div className="h-20 w-20 bg-duty-night rounded-lg"></div>
								<p className="text-sm mt-2">Night</p>
								<p className="text-xs text-base-muted">#7454DF</p>
							</div>
							<div>
								<div className="h-20 w-20 bg-duty-night-dark rounded-lg"></div>
								<p className="text-sm mt-2">Night Dark</p>
								<p className="text-xs text-base-muted">#532FC8</p>
							</div>
							<div>
								<div className="h-20 w-20 bg-duty-night-bg rounded-lg"></div>
								<p className="text-sm mt-2">Night BG</p>
								<p className="text-xs text-base-muted">#D5CCF5</p>
							</div>
						</div>

						{/* Off Duty */}
						<div className="space-y-4">
							<div>
								<div className="h-20 w-20 bg-duty-off rounded-lg"></div>
								<p className="text-sm mt-2">Off</p>
								<p className="text-xs text-base-muted">#999786</p>
							</div>
							<div>
								<div className="h-20 w-20 bg-duty-off-dark rounded-lg"></div>
								<p className="text-sm mt-2">Off Dark</p>
								<p className="text-xs text-base-muted">#726F5A</p>
							</div>
							<div>
								<div className="h-20 w-20 bg-duty-off-bg rounded-lg"></div>
								<p className="text-sm mt-2">Off BG</p>
								<p className="text-xs text-base-muted">#E5E5E1</p>
							</div>
						</div>
					</div>
				</div>

				{/* Base Colors */}
				<div>
					<h3 className="text-xl font-semibold mb-4">Base Colors</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="space-y-2">
							<div className="h-20 w-20 bg-base-background rounded-lg border"></div>
							<p className="text-sm">Background</p>
							<p className="text-xs text-base-muted">#F9F9F9</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-base-foreground rounded-lg"></div>
							<p className="text-sm">Foreground</p>
							<p className="text-xs text-base-muted">#4D4D4D</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-base-muted rounded-lg"></div>
							<p className="text-sm">Muted</p>
							<p className="text-xs text-base-muted">#D9D9D9</p>
						</div>
						<div className="space-y-2">
							<div className="h-20 w-20 bg-base-muted-30 rounded-lg border"></div>
							<p className="text-sm">Muted 30</p>
							<p className="text-xs text-base-muted">#F4F4F4</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Playgrounds;
