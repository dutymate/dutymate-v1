import { useEffect, useRef, useState } from "react";

interface FaultLayerProps {
	startDate: number;
	endDate: number;
	message: string;
	children?: React.ReactNode;
}

function FaultLayer({ startDate, endDate, children }: FaultLayerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [cellWidth, setCellWidth] = useState(0);

	useEffect(() => {
		if (!containerRef.current) return;

		const parentCell = containerRef.current.closest("td");
		if (!parentCell) return;

		const observer = new ResizeObserver(() => {
			// getBoundingClientRect()를 사용하여 border를 포함한 전체 너비 측정
			const rect = parentCell.getBoundingClientRect();
			setCellWidth(rect.width);
		});

		observer.observe(parentCell);
		// 초기 너비 설정
		setCellWidth(parentCell.getBoundingClientRect().width);

		return () => observer.disconnect();
	}, []);

	const width = (endDate - startDate + 1) * cellWidth;

	return (
		<div
			ref={containerRef}
			style={{
				width: `${width}px`,
				left: "0",
				position: "absolute",
			}}
			className="group absolute z-10 h-8 rounded-lg border-2 border-red-500 bg-red-100/30"
		>
			{children}
		</div>
	);
}

export default FaultLayer;
