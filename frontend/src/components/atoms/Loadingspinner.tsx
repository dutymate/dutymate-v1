import { SyncLoader } from "react-spinners";

const PageLoadingSpinner = () => {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<SyncLoader
				color="#F5A281"
				cssOverride={{}}
				loading
				margin={5}
				size={12}
				speedMultiplier={1}
			/>
		</div>
	);
};

export default PageLoadingSpinner;
