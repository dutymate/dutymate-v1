import LandingTemplate from "../components/templates/LandingTemplate";
import SignupForm from "../components/organisms/SignupForm";

const Signup = () => {
	return (
		<LandingTemplate showIntroText={false}>
			<SignupForm />
		</LandingTemplate>
	);
};

export default Signup;
