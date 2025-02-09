import LoginForm from "../components/organisms/LoginForm";
import StartTemplate from "../components/templates/StartTemplate";

const Login = () => {
	return (
		<StartTemplate isLoginPage>
			<LoginForm />
		</StartTemplate>
	);
};

export default Login;
