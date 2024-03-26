"use client";
export default function DashboardTouristHeader() {
  return (
    <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-blue-950">
      <div className="flex flex-shrink-0 items-center space-x-4 text-white">
        <div className="flex flex-col items-end ">
          <div className="text-md font-medium ">Unknow Unknow</div>
          <div className="text-sm font-regular">Student</div>
        </div>
        <img className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-indigo-600" />
      </div>
    </header>
  );
}
