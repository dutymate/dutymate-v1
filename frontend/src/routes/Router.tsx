import { Routes, Route } from "react-router-dom";
import Playgrounds from "../pages/_playgrounds";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import KakaoRedirect from "../pages/KakaoRedirect";
import GoogleRedirect from "../pages/GoogleRedirect";
import MyShift from "../pages/MyShift";
import TeamShift from "../pages/TeamShift";
import WardAdmin from "../pages/WardAdmin";
import CreateWard from "../pages/CreateWard";
import EnterWard from "../pages/EnterWard";
import ExtraInfo from "../pages/ExtraInfo";
import Community from "../pages/Community";
import ReqAdmin from "../pages/ReqAdmin";
import DutyManagement from "../pages/DutyManagement";
import Error from "../pages/Error";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/login" element={<Login />} />
			<Route path="/oauth/kakao" element={<KakaoRedirect />} />
			<Route path="/oauth/google" element={<GoogleRedirect />} />
			<Route path="/my-shift" element={<MyShift />} />
			<Route path="/team-shift" element={<TeamShift />} />
			<Route path="/ward-admin" element={<WardAdmin />} />
			<Route path="/create-ward" element={<CreateWard />} />
			<Route path="/enter-ward" element={<EnterWard />} />
			<Route path="/extra-info" element={<ExtraInfo />} />
			<Route path="/community" element={<Community />} />
			<Route path="/req-admin" element={<ReqAdmin />} />
			<Route path="/shift-admin" element={<DutyManagement />} />
			<Route path="/error" element={<Error />} />
			<Route path="*" element={<Error />} />
		</Routes>
	);
};

export default Router;
