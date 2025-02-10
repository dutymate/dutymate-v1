import StartTemplate from "../components/templates/StartTemplate";
import { Button } from "../components/atoms/Button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
	const navigate = useNavigate();

	const handleStart = () => {
		navigate("/login");
	};

	return (
		<StartTemplate>
			<div className="flex flex-col items-center">
				<Button
					color="primary"
					size="lg"
					width="long"
					onClick={handleStart}
					className="mt-1 lg:mt-[5vh] h-[4.5vh] lg:h-12"
				>
					<span className="text-xl lg:text-base">시작하기</span>
				</Button>
			</div>
		</StartTemplate>
	);
};

export default Landing;
