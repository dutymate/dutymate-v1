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
			<Button color="primary" size="lg" width="long" onClick={handleStart}>
				시작하기
			</Button>
		</StartTemplate>
	);
};

export default Landing;
