"use client";

import React from "react";
import { useLocation } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { FaHospital } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import { BiSolidUserPin } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoIosChatboxes } from "react-icons/io";
import { PiLightbulbFilamentFill } from "react-icons/pi";
import { BiSolidUserCircle } from "react-icons/bi";

interface NavigationItem {
	name: string;
	href: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const navigation: NavigationItem[] = [
	{ name: "듀티표 관리", href: "/duty-management", icon: SlCalender },
	{ name: "병동 관리", href: "/ward-management", icon: FaHospital },
	{ name: "요청 근무 관리", href: "/request-management", icon: AiFillSchedule },
	{ name: "나의 듀티표", href: "/my-duty", icon: BiSolidUserPin },
	{ name: "병동 듀티표", href: "/ward-duty", icon: HiOutlineUsers },
	{ name: "커뮤니티", href: "/community", icon: IoIosChatboxes },
	{ name: "튜토리얼", href: "/tutorial", icon: PiLightbulbFilamentFill },
];

const NavigationItem = React.memo(
	({ item, isActive }: { item: NavigationItem; isActive: boolean }) => (
		<li className="flex justify-center">
			<a
				href={item.href}
				className={`
        flex items-center gap-x-6 px-6 py-4 w-full rounded-lg text-lg
        ${
					isActive
						? "text-primary-dark bg-primary-10"
						: "text-gray-700 hover:text-primary hover:bg-primary-10"
				}
      `}
			>
				{React.createElement(item.icon, {
					className: `w-[1.2em] h-[1.2em] ${isActive ? "text-primary-dark" : "text-gray-500"}`,
				})}
				<span className="font-semibold">{item.name}</span>
			</a>
		</li>
	),
);

const Sidebar = () => {
	const location = useLocation();

	return (
		<div className="fixed inset-y-0 left-0 z-40 flex flex-col bg-white w-[280px] border-r border-gray-200">
			{/* Logo */}
			<div className="flex items-center justify-center px-6 py-8">
				<img
					alt="듀티메이트"
					src="/src/assets/logo.svg"
					className="w-[75%] h-auto"
				/>
			</div>

			{/* Navigation */}
			<nav className="flex-1 px-4 py-4">
				<ul className="space-y-3">
					{navigation.map((item) => (
						<NavigationItem
							key={item.name}
							item={item}
							isActive={location.pathname === item.href}
						/>
					))}
				</ul>
			</nav>

			{/* Footer */}
			<div className="px-6 py-6 border-t border-gray-200">
				<a
					href="/my-page"
					className="flex items-center gap-x-4 p-4 text-gray-900 hover:bg-gray-50 rounded-lg text-lg"
				>
					<BiSolidUserCircle className="w-[1.2em] h-[1.2em] text-gray-500" />
					<span className="font-semibold">마이 페이지</span>
				</a>

				<div className="mt-6 text-sm text-gray-500">
					<div className="font-bold text-gray-900 text-base">
						(주) 듀티메이트.
					</div>
					<div className="text-sm text-gray-400 mt-1">support@dutymate.net</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(Sidebar);
