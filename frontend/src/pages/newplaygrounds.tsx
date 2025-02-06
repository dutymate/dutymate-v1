import { ApprovalBtn } from "../components/atoms/ApprovalBtn";

const NewPlaygrounds = () => {
	return (
		<div className="min-h-screen bg-base-background p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-2xl font-bold mb-8">Component Playground</h1>

				{/* Approval Button Section */}
				<div className="bg-white p-6 rounded-lg shadow-sm">
					<h2 className="text-lg font-semibold mb-4">Approval Button</h2>

					<div className="space-y-6">
						{/* Default State */}
						<div>
							<h3 className="text-sm font-medium text-base-muted mb-2">
								Default (Hold)
							</h3>
							<ApprovalBtn
								onChange={(status) => console.log("Status changed to:", status)}
							/>
						</div>

						{/* Initially Approved */}
						<div>
							<h3 className="text-sm font-medium text-base-muted mb-2">
								Initially Approved
							</h3>
							<ApprovalBtn
								initialStatus="approve"
								onChange={(status) => console.log("Status changed to:", status)}
							/>
						</div>

						{/* Initially Denied */}
						<div>
							<h3 className="text-sm font-medium text-base-muted mb-2">
								Initially Denied
							</h3>
							<ApprovalBtn
								initialStatus="deny"
								onChange={(status) => console.log("Status changed to:", status)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewPlaygrounds;
