//임시간호사 추가 모달 ,rem으로 변경

import { useState, useEffect } from "react";
import { Icon } from "../atoms/Icon";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";

interface WardAdminTempProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (count: number) => void;
}

const WardAdminTemp = ({ isOpen, onClose, onConfirm }: WardAdminTempProps) => {
	const [count, setCount] = useState(1);
	const MAX_NURSES = 20; // 최대 추가 가능 인원

	// 모달이 닫힐 때 count를 1로 초기화
	useEffect(() => {
		if (!isOpen) {
			setCount(1);
		}
	}, [isOpen]);

	if (!isOpen) return null;

	const handleDecrease = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};

	const handleIncrease = () => {
		if (count < MAX_NURSES) {
			// 최대 인원 제한 체크
			setCount(count + 1);
		} else {
			toast.warning(`한 번에 최대 ${MAX_NURSES}명까지 추가할 수 있습니다.`);
		}
	};

	const handleClose = () => {
		setCount(1); // 모달을 닫을 때도 count 초기화
		onClose();
	};

	return (
		<div
			className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
			onClick={handleClose}
		>
			<div
				className="bg-white rounded-[1.25rem] p-[1.5rem] w-[90%] max-w-[25rem] relative"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header - 중앙 정렬 및 닫기 버튼 위치 수정 */}
				<div className="relative mb-[1.5rem]">
					<h2 className="text-[1.25rem] font-semibold text-center">
						임시 간호사 추가
					</h2>
					<button
						onClick={handleClose}
						className="absolute top-0 right-0 p-[0.5rem] hover:bg-gray-100 rounded-[0.5rem] transition-colors"
					>
						<Icon name="close" size={24} className="text-gray-400" />
					</button>
				</div>

				{/* Content */}
				<div className="bg-[#F4F4F4] rounded-[1rem] p-[1.25rem] mb-[1.25rem]">
					<p className="text-[1rem] text-center mb-[1rem]">
						추가할 인원 수를 선택해 주세요.
					</p>
					<div className="bg-white rounded-[0.75rem] p-[1rem] flex items-center justify-between">
						<button
							onClick={handleDecrease}
							className="p-[0.5rem] hover:bg-gray-100 rounded-[0.75rem] transition-colors"
							disabled={count <= 1}
						>
							<FaMinus
								className={`text-[1.25rem] ${count <= 1 ? "text-gray-300" : "text-gray-600"}`}
							/>
						</button>
						<span className="text-[1.25rem] font-medium min-w-[2rem] text-center">
							{count}명
						</span>
						<button
							onClick={handleIncrease}
							className="p-[0.5rem] hover:bg-gray-100 rounded-[0.75rem] transition-colors"
							disabled={count >= MAX_NURSES}
						>
							<FaPlus
								className={`text-[1.25rem] ${count >= MAX_NURSES ? "text-gray-300" : "text-gray-600"}`}
							/>
						</button>
					</div>
				</div>

				{/* Confirm Button */}
				<button
					onClick={() => {
						onConfirm(count);
						setCount(1); // 확인 버튼 클릭 시에도 count 초기화
					}}
					className="w-full py-[0.875rem] bg-primary hover:bg-primary-dark text-white rounded-[0.625rem] transition-colors"
				>
					확인
				</button>
			</div>
		</div>
	);
};

export default WardAdminTemp;
