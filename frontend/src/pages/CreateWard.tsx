import StartTemplate from "../components/templates/StartTemplate";
import CreateWardForm from "../components/organisms/CreateWardForm";

const CreateWard = () => {
	return (
		<StartTemplate>
			<div className="flex flex-col items-center">
				<p className="text-gray-600 text-base mb-8">
					병동 생성을 위한 기본 정보를 입력해주세요.
				</p>
				<CreateWardForm />
			</div>
		</StartTemplate>
	);
};

export default CreateWard;
