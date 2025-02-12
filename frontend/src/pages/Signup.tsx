import SignupForm from "../components/organisms/SignupForm";
import StartTemplate from "../components/templates/StartTemplate";
import NextTemplate from "../components/templates/NextTemplate";
import { useState, useEffect } from "react";

const Signup = () => {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const Template = isMobile ? NextTemplate : StartTemplate;

	return (
		<Template>
			<div className="flex flex-col items-center">
				<div className="mt-[15vh] lg:mt-8"></div>
			</div>
			<SignupForm />
		</Template>
	);
};

export default Signup;
