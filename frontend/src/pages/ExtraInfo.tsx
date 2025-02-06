import ExtraInfoForm from "../components/organisms/ExtraInfoForm";
import StartTemplate from "../components/templates/StartTemplate";

const ExtraInfo = () => {
	return (
		<StartTemplate>
			<div className="flex flex-col items-center">
				<p className="text-base-foreground text-lg mb-8">
					원활한 서비스 이용을 위한 부가 정보를 알려주세요.
				</p>
				<ExtraInfoForm />
			</div>
		</StartTemplate>
	);
};

export default ExtraInfo;
