import StartTemplate from "../components/templates/StartTemplate";
import EnterWardForm from "../components/organisms/EnterWardForm";

const EnterWard = () => {
	return (
		<StartTemplate>
			<div className="flex flex-col items-center">
				<p className="text-[#FF8282] font-semibold text-lg mb-1">
					홍길동님 환영합니다!
				</p>
				<p className="text-gray-600 text-base mb-8">
					병동 입장하기 위해 전달 받은 병동 코드를 입력해주세요.
				</p>
				<EnterWardForm />
			</div>
		</StartTemplate>
	);
};

export default EnterWard;
