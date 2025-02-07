import { Routes, Route } from "react-router-dom";
import Playgrounds from "../pages/playgrounds";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import MyShift from "../pages/MyShift";
import TeamShift from "../pages/TeamShift";
import WardAdmin from "../pages/WardAdmin";
import CreateWard from "../pages/CreateWard";
import EnterWard from "../pages/EnterWard";
import ExtraInfo from "../pages/ExtraInfo";
import MobilePractice from "../pages/MobilePractice";
import NewPlaygrounds from "../pages/newplaygrounds";
import Community from "../pages/Community";
import RequestManagement from "../pages/RequestManagement";
import DutyManagement from "../pages/DutyManagement";
import Error from "../pages/Error";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/login" element={<Login />} />
			<Route path="/my-shift" element={<MyShift />} />
			<Route path="/team-shift" element={<TeamShift />} />
			<Route path="/ward-admin" element={<WardAdmin />} />
			<Route path="/create-ward" element={<CreateWard />} />
			<Route path="/enter-ward" element={<EnterWard />} />
			<Route path="/extra-info" element={<ExtraInfo />} />
			<Route path="/playgrounds" element={<Playgrounds />} />
			<Route path="/mobile" element={<MobilePractice />} />
			<Route path="/newplaygrounds" element={<NewPlaygrounds />} />
			<Route path="/community" element={<Community />} />
			<Route path="/req-admin" element={<RequestManagement />} />
			<Route path="/shift-admin" element={<DutyManagement />} />
			<Route path="/error" element={<Error />} />
			<Route path="*" element={<Error />} />
		</Routes>
	);
};

export default Router;
