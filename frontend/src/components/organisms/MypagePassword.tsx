import { Button } from "../atoms/Button";

const MypagePassword = () => {
	return (
		<div className="bg-white rounded-lg shadow-md p-4">
			<h2 className="text-base font-semibold text-gray-900 mb-4">
				비밀번호 변경
			</h2>
			<div className="space-y-4">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
					<div className="flex flex-col">
						<span className="text-sm text-gray-600 mb-2">현재 비밀번호</span>
						<input
							type="password"
							className="p-2 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-20"
							placeholder="**********"
						/>
					</div>
					<div className="flex flex-col">
						<span className="text-sm text-gray-600 mb-2">새로운 비밀번호</span>
						<input
							type="password"
							className="p-2 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-20"
							placeholder="**********"
						/>
					</div>
					<div className="flex flex-col">
						<span className="text-sm text-gray-600 mb-2">비밀번호 확인</span>
						<input
							type="password"
							className="p-2 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-20"
							placeholder="**********"
						/>
					</div>
				</div>
				<div className="flex justify-center lg:justify-end">
					<Button
						type="button"
						size="sm"
						color="primary"
						className="w-full lg:w-[120px] h-[36px] max-w-[380px]"
					>
						변경하기
					</Button>
				</div>
			</div>
		</div>
	);
};

export default MypagePassword;
