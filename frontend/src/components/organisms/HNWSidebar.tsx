'use client'

import React from "react";
import { SlCalender } from "react-icons/sl"; // 듀티표 관리
import { FaHospital } from "react-icons/fa"; // 병동 관리
import { AiFillSchedule } from "react-icons/ai"; // 요청 근무 관리
import { BiSolidUserPin } from "react-icons/bi"; // 나의 듀티표
import { HiOutlineUsers } from "react-icons/hi2"; // 병동 듀티표
import { IoIosChatboxes } from "react-icons/io"; // 커뮤니티
import { PiLightbulbFilamentFill } from "react-icons/pi"; // 튜토리얼

const navigation = [
  { name: '듀티표 관리', href: '#', icon: SlCalender, current: false },
  { name: '병동 관리', href: '#', icon: FaHospital, current: false },
  { name: '요청 근무 관리', href: '#', icon: AiFillSchedule, current: false },
  { name: '나의 듀티표', href: '#', icon: BiSolidUserPin, current: false },
  { name: '병동 듀티표', href: '#', icon: HiOutlineUsers, current: false },
  { name: '커뮤니티', href: '#', icon: IoIosChatboxes, current: false },
  { name: '튜토리얼', href: '#', icon: PiLightbulbFilamentFill, current: false },
];

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  return (
    <div className="fixed inset-y-0 left-0 z-50 flex w-[18%] flex-col bg-white border-r border-gray-200 rounded-tr-[18.47px] rounded-br-[18.47px] py-10">
      {/* 로고 (상단 간격 조정) */}
      <div className="flex h-40 items-center justify-center mt-16 mb-40">

      <img alt="듀티메이트" src="/src/assets/logo.svg" className="h-30 w-auto" />

      </div>
      
      {/* 메뉴 목록 */}
      <nav className="flex flex-1 flex-col px-8">
        <ul role="list" className="flex flex-1 flex-col gap-y-10">
          {navigation.map((item) => (
            <li key={item.name} className="flex justify-center">
<a
  href={item.href}
  className={classNames(
    'text-gray-700 hover:text-primary hover:bg-primary-10',
    'group flex items-center justify-start gap-x-4 rounded-lg pl-12 pr-6 py-6 text-[16px] font-semibold w-full h-40' // 🔹 글자 크기 고정 (text-lg → text-[16px])
  )}
>






{React.createElement(item.icon, {
  className: classNames(
    item.current ? 'text-primary-dark' : 'text-gray-500 group-hover:text-primary-dark',
    'w-[24px] h-[24px]' // 🔹 아이콘 크기 고정
  ),
  "aria-hidden": "true"
})}

<span className="text-[16px] truncate">{item.name}</span>

              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 마이 페이지 */}
      <div className="px-8 mt-auto">
      <a href="#" className="flex items-center justify-start gap-x-4 py-4 text-lg font-semibold text-gray-900 hover:bg-gray-50 rounded-md pl-10 pr-4">


          <img alt="마이 페이지" src="/src/assets/profile.svg" className="size-12 rounded-full bg-gray-50" />
          <span aria-hidden="true">마이 페이지</span>
        </a>
        
        {/* 구분선 (길이 조정) */}
        <div className="border-t border-gray-300 my-3 w-3/4 mx-auto"></div>
        
        {/* 푸터 */}
        <div className="text-left text-sm text-gray-500  pt-10 pb-10 px-6">
          <div className="font-bold text-gray-900">(주) 듀티메이트.</div>
          <div className="text-[12px] text-gray-400">support@dutymate.net</div>
        </div>
      </div>
    </div>
  );
}
