import { Routes, Route } from "react-router-dom";
import Playgrounds from "../pages/playgrounds";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import MyShift from "../pages/MyShift";
import TeamShift from "../pages/TeamShift";
import ShiftAdmin from "../pages/ShiftAdmin";
import ReqAdmin from "../pages/ReqAdmin";
import WardAdmin from "../pages/WardAdmin";
import CreateWard from "../pages/CreateWard";
import EnterWard from "../pages/EnterWard";
import ExtraInfo from "../pages/ExtraInfo";
import MobilePractice from "../pages/MobilePractice";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/login" element={<Login />} />
			<Route path="/my-shift" element={<MyShift />} />
			<Route path="/team-shift" element={<TeamShift />} />
			<Route path="/shift-admin" element={<ShiftAdmin />} />
			<Route path="/req-admin" element={<ReqAdmin />} />
			<Route path="/ward-admin" element={<WardAdmin />} />
			<Route path="/create-ward" element={<CreateWard />} />
			<Route path="/enter-ward" element={<EnterWard />} />
			<Route path="/extra-info" element={<ExtraInfo />} />
			<Route path="/playgrounds" element={<Playgrounds />} />
			<Route path="/mobile" element={<MobilePractice />} />
		</Routes>
	);
};

export default Router;
