import { useState } from "react";
import ExtraInfoForm from "../components/organisms/ExtraInfoForm";
import StartTemplate from "../components/templates/StartTemplate";

interface FormData {
	genderIndex: number;
	positionIndex: number;
	career: string;
}

const ExtraInfo = () => {
	const [formData, setFormData] = useState<FormData>({
		genderIndex: 0,
		positionIndex: 0,
		career: "",
	});

	const handleSubmit = (data: FormData) => {
		setFormData(data);
		// TODO: API 호출 또는 다른 로직 처리
		console.log("Form submitted:", data);
	};

	return (
		<StartTemplate>
			<div className="flex flex-col items-center">
				<p className="text-base-foreground text-lg mb-8">
					원활한 서비스 이용을 위한 부가 정보를 알려주세요.
				</p>
				<ExtraInfoForm initialData={formData} onSubmit={handleSubmit} />
			</div>
		</StartTemplate>
	);
};

export default ExtraInfo;
