
import { Search, Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useState } from 'react';

const Dashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Month');

  const handleClearAlerts = () => {
    console.log('Clearing all alerts...');
  };

  const timeframeOptions = ['Day', 'Month', 'Year'];

  return (
    <div className="w-[1440px] h-[1024px] relative bg-stone-50 overflow-hidden">
      {/* Sidebar */}
      <div className="absolute left-[20px] top-[19px]">
        <Sidebar />
      </div>

      {/* Footer */}
      <div className="left-[816px] top-[984px] absolute text-center justify-center text-neutral-500 text-xs font-light font-['Poppins']">
        Powered by Multilingual AI
      </div>

      {/* Header - adjusted left position to account for wider sidebar */}
      <div className="left-[436px] top-[20px] absolute">
        <Header />
      </div>

      {/* Stats Cards Container - increased width to better fill the window */}
      <div className="w-[984px] left-[436px] top-[124px] absolute inline-flex justify-between items-center">
        {/* Voice Orders Card */}
        <div className="w-60 h-[156px] px-2.5 py-3 relative bg-neutral-50 hover:bg-slate-950 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 hover:outline-black inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden transition-all duration-300 group">
          <div className="self-stretch inline-flex justify-start items-start gap-24">
            <div className="w-28 inline-flex flex-col justify-center items-start gap-2.5">
              <div className="justify-center text-zinc-600 group-hover:text-zinc-300 text-xs font-medium font-['Poppins'] transition-colors">Voice Orders</div>
              <div className="justify-center text-black group-hover:text-white text-4xl font-medium font-['Poppins'] transition-colors">17</div>
              <div className="self-stretch inline-flex justify-start items-center gap-[5px]">
                <div className="w-12 px-[5px] py-[3px] bg-lime-200 group-hover:bg-lime-300 rounded-[5px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden transition-colors">
                  <div className="inline-flex justify-start items-center gap-[5px]">
                    <div className="w-3.5 h-2">
                      <img 
                        src="/index_page/Group 5 (2).svg"
                        alt="Growth indicator"
                        className="w-3.5 h-2 transition-colors"
                      />
                    </div>
                    <div className="justify-center text-green-700 group-hover:text-green-800 text-[10px] font-medium font-['Poppins'] transition-colors">+15%</div>
                  </div>
                </div>
                <div className="justify-center text-neutral-500 group-hover:text-neutral-400 text-[10px] font-normal font-['Poppins'] transition-colors">last month</div>
              </div>
            </div>
            <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
              <img 
                src="/index_page/01 align center (3).svg"
                alt="Menu"
                className="w-4 h-4"
              />
            </button>
          </div>
          <div className="left-[153px] top-[83px] absolute inline-flex justify-start items-end gap-1">
            <div className="w-3 h-10 bg-lime-500 group-hover:bg-lime-400 rounded-tl-sm rounded-tr-sm transition-colors" />
            <div className="w-3 h-7 bg-neutral-500 group-hover:bg-neutral-400 rounded-tl-sm rounded-tr-sm transition-colors" />
            <div className="w-3 h-4 bg-neutral-500 group-hover:bg-neutral-400 rounded-tl-sm rounded-tr-sm transition-colors" />
            <div className="w-3 h-7 bg-neutral-500 group-hover:bg-neutral-400 rounded-tl-sm rounded-tr-sm transition-colors" />
            <div className="w-3 h-7 bg-neutral-500 group-hover:bg-neutral-400 rounded-tl-sm rounded-tr-sm transition-colors" />
          </div>
        </div>

        {/* Orders in Progress Card */}
        <div className="w-60 h-[156px] px-2.5 py-3 relative bg-neutral-50 hover:bg-slate-950 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 hover:outline-black inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden transition-all duration-300 group">
          <div className="self-stretch inline-flex justify-start items-start gap-24">
            <div className="w-28 inline-flex flex-col justify-center items-start gap-2.5">
              <div className="justify-center text-zinc-600 group-hover:text-zinc-300 text-xs font-medium font-['Poppins'] transition-colors">
                Orders in Progress
              </div>
              <div className="justify-center text-black group-hover:text-stone-50 text-4xl font-medium font-['Poppins'] transition-colors">
                21
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-[5px]">
                <div className="w-12 px-[5px] py-[3px] bg-red-200 rounded-[5px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                  <div className="inline-flex justify-start items-center gap-[5px]">
                    <div className="w-3.5 h-2  outline-[1.20px] outline-offset-[-0.60px] outline-red-800" >
                      <img 
                        src="/index_page/Group 5 (3).svg"
                        alt="Down indicator"
                        className="w-3.5 h-2"
                      />
                    </div>
                    <div className="justify-center text-red-800 text-[10px] font-medium font-['Poppins']">-9%</div>
                  </div>
                </div>
                <div className="justify-center text-neutral-500 text-[10px] font-normal font-['Poppins']">last month</div>
              </div>
            </div>
            <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
              <img 
                src="/index_page/01 align center (3).svg"
                alt="Menu"
                className="w-4 h-4"
              />
            </button>
          </div>
          <div className="left-[153px] top-[83px] absolute inline-flex justify-start items-end gap-1">
            <div className="w-3 h-6 bg-neutral-200 rounded-tl-sm rounded-tr-sm" />
            <div className="w-3 h-8 bg-neutral-200 rounded-tl-sm rounded-tr-sm" />
            <div className="w-3 h-10 bg-lime-500 rounded-tl-sm rounded-tr-sm" />
            <div className="w-3 h-6 bg-neutral-200 rounded-tl-sm rounded-tr-sm" />
            <div className="w-3 h-8 bg-neutral-200 rounded-tl-sm rounded-tr-sm" />
          </div>
        </div>

        {/* Pending Requests Card */}
        <div className="w-60 h-[156px] px-2.5 py-3 relative bg-neutral-50 hover:bg-slate-950 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 hover:outline-black inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden transition-all duration-300 group">
          <div className="self-stretch inline-flex justify-start items-start gap-24">
            <div className="w-28 inline-flex flex-col justify-center items-start gap-2.5">
              <div className="justify-center text-zinc-600 group-hover:text-zinc-300 text-xs font-medium font-['Poppins'] transition-colors">
                Pending Requests
              </div>
              <div className="justify-center text-black group-hover:text-stone-50 text-4xl font-medium font-['Poppins'] transition-colors">
                17
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-[5px]">
                <div className="w-12 px-[5px] py-[3px] bg-lime-200 rounded-[5px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                  <div className="inline-flex justify-start items-center gap-[5px]">
                    <div className="w-3.5 h-2  outline-[1.20px] outline-offset-[-0.60px] outline-green-700" >
                      <img 
                      src="/index_page/Group 5 (2).svg"
                      alt="Growth indicator"
                      className="w-3.5 h-2"
                      />
                    </div>
                    <div className="justify-center text-green-700 text-[10px] font-medium font-['Poppins']">+15%</div>
                  </div>
                </div>
                <div className="justify-center text-neutral-500 text-[10px] font-normal font-['Poppins']">last month</div>
              </div>
            </div>
            <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
              <img 
                src="/index_page/01 align center (3).svg"
                alt="Menu"
                className="w-4 h-4"
              />
            </button>
          </div>
          <div className="left-[153px] top-[83px] absolute inline-flex justify-start items-end gap-1">
            <div className="w-3 h-8 bg-neutral-200 rounded-tl-sm rounded-tr-sm" />
            <div className="w-3 h-7 bg-neutral-200 rounded-tl-sm rounded-tr-sm" />
            <div className="w-3 h-4 bg-neutral-200 rounded-tl-sm rounded-tr-sm" />
            <div className="w-3 h-10 bg-lime-500 rounded-tl-sm rounded-tr-sm" />
            <div className="w-3 h-7 bg-neutral-200 rounded-tl-sm rounded-tr-sm" />
          </div>
        </div>

        {/* Products Reordered Card */}
        <div className="w-60 h-[156px] px-2.5 py-3 relative bg-neutral-50 hover:bg-slate-950 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 hover:outline-black inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden transition-all duration-300 group">
          <div className="self-stretch inline-flex justify-start items-start gap-24">
            <div className="w-28 inline-flex flex-col justify-center items-start gap-2.5">
              <div className="justify-center text-zinc-600 group-hover:text-zinc-300 text-xs font-medium font-['Poppins'] transition-colors">
                Products Reordered
              </div>
              <div className="justify-center text-black group-hover:text-stone-50 text-4xl font-medium font-['Poppins'] transition-colors">
                12
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-[5px]">
                <div className="w-12 px-[5px] py-[3px] bg-lime-200 rounded-[5px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                  <div className="inline-flex justify-start items-center gap-[5px]">
                    <div className="w-3.5 h-2  outline-[1.20px] outline-offset-[-0.60px] outline-green-700" >
                      <img 
                      src="/index_page/Group 5 (2).svg"
                      alt="Growth indicator"
                      className="w-3.5 h-2"
                      />
                    </div>
                    <div className="justify-center text-green-700 text-[10px] font-medium font-['Poppins']">+8%</div>
                  </div>
                </div>
                <div className="justify-center text-neutral-500 text-[10px] font-normal font-['Poppins']">last month</div>
              </div>
            </div>
            <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
              <img 
                src="/index_page/01 align center (3).svg"
                alt="Menu"
                className="w-4 h-4"
              />
            </button>
          </div>
          <div className="left-[153px] top-[83px] absolute inline-flex justify-start items-end gap-1">
            <div className="w-3 h-6 bg-neutral-200 rounded-tl-sm rounded-tr-sm" />
            <div className="w-3 h-10 bg-lime-500 rounded-tl-sm rounded-tr-sm" />
            <div className="w-3 h-4 bg-neutral-200 rounded-tl-sm rounded-tr-sm" />
            <div className="w-3 h-7 bg-neutral-200 rounded-tl-sm rounded-tr-sm" />
            <div className="w-3 h-8 bg-neutral-200 rounded-tl-sm rounded-tr-sm" />
          </div>
        </div>
      </div>

      {/* Charts Section - adjusted left position */}
      <div className="left-[436px] top-[294px] absolute inline-flex justify-start items-center gap-7">
        {/* Revenue Chart */}
        <div className="w-[507px] h-64 relative bg-neutral-50 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 overflow-hidden">
          {/* Bottom Line */}
          <div className="w-[487px] h-0 left-[10px] top-[214px] absolute outline outline-[0.80px] outline-offset-[-0.40px] outline-zinc-400"></div>
          
          {/* Days of Week */}
          <div className="w-[462px] left-[22px] top-[218px] absolute inline-flex justify-between items-center">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
              <div key={day} className="text-right justify-center text-neutral-600 text-xs font-normal font-['Poppins']">{day}</div>
            ))}
          </div>
          
          {/* Chart Area */}
          <div className="w-[486px] h-28 left-[11px] top-[107px] absolute">
            <div className="w-[486px] h-20 left-0 top-0 absolute outline outline-2 outline-offset-[-1px] outline-blue-700" />
            <div className="w-[486px] h-28 left-0 top-0 absolute bg-gradient-to-b from-blue-700/50 to-white/0" />
            {/* Vertical Grid Lines and Stats */}
            {[
              { left: 27, value: '₹2.1L' },
              { left: 116, value: '₹3.4L' },
              { left: 204, value: '₹2.8L' },
              { left: 294, value: '₹4.2L' },
              { left: 377, value: '₹3.7L' },
              { left: 461, value: '₹5.1L' }
            ].map(({ left, value }) => (
              <div key={left} className="relative">
                <div className="w-32 h-0 absolute origin-top-left -rotate-90 outline outline-[0.80px] outline-offset-[-0.40px] outline-neutral-200"
                     style={{ left: `${left}px`, top: '107px' }}></div>
                <div className="absolute text-xs text-neutral-600 font-['Poppins'] whitespace-nowrap" 
                     style={{ left: `${left-10}px`, top: '85px' }}>
                  {value}
                </div>
              </div>
            ))}
            {/* Chart indicator */}
            <div className="w-3.5 h-3.5 left-[453px] top-[-3px] absolute">
              <img 
                src="/index_page/Ellipse 9.svg"
                alt="Chart indicator"
                className="w-full h-full"
              />
            </div>
          </div>
          
          {/* Header Section with Stats */}
          <div className="w-[487px] h-14 left-[10px] top-[12px] absolute inline-flex flex-col justify-between items-center">
            {/* Title and Menu */}
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="w-56 justify-center text-zinc-600 text-base font-normal font-['Poppins']">Total Revenue</div>
              <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
                <img 
                  src="/index_page/01 align center (3).svg"
                  alt="Menu"
                  className="w-4 h-4"
                />
              </button>
            </div>
            
            {/* Revenue Stats */}
            <div className="self-stretch inline-flex justify-start items-center gap-2.5">
              <div className="text-right justify-center text-black text-xl font-medium font-['Poppins']">₹12,34,508</div>
              <div className="flex-1 flex justify-start items-center gap-[5px]">
                <div className="w-12 px-[5px] py-[3px] bg-lime-200 rounded-[5px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                  <div className="inline-flex justify-start items-center gap-[5px]">
                    <div className="w-3.5 h-2">
                      <img 
                        src="/index_page/Group 5 (2).svg"
                        alt="Growth indicator"
                        className="w-3.5 h-2"
                      />
                    </div>
                    <div className="justify-center text-green-700 text-[10px] font-medium font-['Poppins']">+24%</div>
                  </div>
                </div>
                <div className="justify-center text-neutral-500 text-[10px] font-normal font-['Poppins']">last month</div>
              </div>
            </div>
          </div>
        </div>

        {/* Spending Chart */}
        <div className="w-[507px] h-64 relative bg-neutral-50 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 overflow-hidden">
          {/* Donut Chart */}
          <div className="w-48 h-48 left-[303px] top-[39px] absolute">
            <svg className="w-48 h-48 absolute" viewBox="0 0 192 192">
              {/* Create a donut chart by using a smaller inner circle */}
              <defs>
                <mask id="donutHole">
                  <rect width="100%" height="100%" fill="white"/>
                  <circle cx="96" cy="96" r="48" fill="black"/> {/* Inner circle creates the hole */}
                </mask>
              </defs>
              
              {/* Segments using paths with proper angles */}
              <g mask="url(#donutHole)">
                {/* Fashion 35% (0° to 126°) */}
                <path
                  d="M96 0A96 96 0 0 1 192 96L96 96Z"
                  className="fill-blue-600"
                  transform="rotate(0 96 96)"
                />
                
                {/* Groceries 25% (126° to 216°) */}
                <path
                  d="M96 0A96 96 0 0 1 192 96L96 96Z"
                  className="fill-blue-400"
                  transform="rotate(126 96 96)"
                />
                
                {/* Electronics 20% (216° to 288°) */}
                <path
                  d="M96 0A96 96 0 0 1 192 96L96 96Z"
                  className="fill-indigo-300"
                  transform="rotate(216 96 96)"
                />
                
                {/* Home 12% (288° to 331.2°) */}
                <path
                  d="M96 0A96 96 0 0 1 192 96L96 96Z"
                  className="fill-indigo-200"
                  transform="rotate(288 96 96)"
                />
                
                {/* Others 8% (331.2° to 360°) */}
                <path
                  d="M96 0A96 96 0 0 1 192 96L96 96Z"
                  className="fill-neutral-200"
                  transform="rotate(331.2 96 96)"
                />
              </g>
            </svg>
            
            {/* Center Text */}
            <div className="w-20 left-[61px] top-[73px] absolute inline-flex flex-col justify-center items-center">
              <div className="text-right justify-center text-neutral-600 text-xs font-normal font-['Poppins']">Total Spent</div>
              <div className="self-stretch text-right justify-center text-black text-xl font-medium font-['Poppins']">₹13,567</div>
            </div>
          </div>

          {/* Legend */}
          <div className="w-[250px] left-[10px] top-[55px] absolute inline-flex flex-col justify-start items-start gap-4">
            {[
              { color: 'bg-blue-600', label: 'Fashion & Apparel', percentage: '35%' },
              { color: 'bg-blue-400', label: 'Groceries & Essentials', percentage: '25%' },
              { color: 'bg-indigo-300', label: 'Electronics & Gadgets', percentage: '20%' },
              { color: 'bg-indigo-200', label: 'Home & Living', percentage: '12%' },
              { color: 'bg-neutral-200', label: 'Others', percentage: '8%' }
            ].map(({ color, label, percentage }) => (
              <div key={label} className="w-full inline-flex justify-between items-center">
                <div className="flex items-center gap-[5px]">
                  <div className={`w-3 h-3 ${color} rounded-sm`} />
                  <div className="text-black text-xs font-normal font-['Poppins']">{label}</div>
                </div>
                <div className="text-neutral-600 text-xs font-normal font-['Poppins']">{percentage}</div>
              </div>
            ))}
          </div>

          {/* Info Text */}
          <div className="left-[10px] top-[228px] absolute inline-flex justify-start items-center gap-[3px]">
            <div className="w-5 h-5 relative">
              <img 
                src="/index_page/alert-circle.svg"
                alt="Info"
                className="w-5 h-5"
              />
            </div>
            <div className="text-neutral-500 text-[8px] font-normal font-['Poppins']">
              You spent ₹3,200 on Fashion this month
            </div>
          </div>

          {/* Header */}
          <div className="w-[487px] left-[10px] top-[12px] absolute inline-flex justify-between items-center">
            <div className="justify-center text-zinc-600 text-base font-normal font-['Poppins']">Where You Spend the Most</div>
            <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
              <img 
                src="/index_page/01 align center (3).svg"
                alt="Menu"
                className="w-4 h-4"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section - adjusted left position */}
      <div className="left-[436px] top-[600px] absolute inline-flex justify-start items-center gap-7">
        {/* Product Overview Table */}
        <div className="w-[672px] h-80 relative bg-neutral-50 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 overflow-hidden">
          {/* Header */}
          <div className="w-[652px] left-[10px] top-[12px] absolute inline-flex justify-between items-center">
            <div className="w-56 text-[#5C5C5C] text-base font-normal font-['Poppins']">Product Overview</div>
            <div className="flex justify-start items-center gap-2.5">
              <div className="text-[#5C5C5C] text-base font-normal font-['Poppins']">Day</div>
              <div className="text-[#0027ED] text-base font-normal font-['Poppins'] underline">Month</div>
              <div className="text-[#5C5C5C] text-base font-normal font-['Poppins']">Year</div>
            </div>
          </div>

          {/* Table Content */}
          <div className="w-[652px] left-[10px] top-[69px] absolute inline-flex flex-col justify-start items-start gap-2">
            {/* Table Header */}
            <div className="w-full inline-flex justify-between items-center px-2">
              <div className="w-36 text-[#000000] text-xs font-medium font-['Poppins']">Product</div>
              <div className="w-24 text-[#000000] text-xs font-medium font-['Poppins']">Product ID</div>
              <div className="w-20 text-[#000000] text-xs font-medium font-['Poppins']">Status</div>
              <div className="w-24 text-[#000000] text-xs font-medium font-['Poppins']">Price (₹)</div>
              <div className="w-28 text-[#000000] text-xs font-medium font-['Poppins']">Region</div>
              <div className="w-24 text-[#000000] text-xs font-medium font-['Poppins']">Last Ordered</div>
            </div>

            {/* Header Divider */}
            <div className="w-[652px] h-0 border-t border-[#5C5C5C]"></div>

            {/* Table Rows */}
            <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
              {/* Row 1 */}
              <div className="w-full inline-flex justify-between items-center px-2 py-1">
                <div className="w-36 text-[#555555] text-xs font-normal font-['Poppins']">Smart AirPods Max</div>
                <div className="w-24 text-[#555555] text-xs font-normal font-['Poppins']">#A23XH12</div>
                <div className="w-20 px-2 py-1 bg-[#D0FFB3] rounded-[5px] flex justify-center items-center">
                  <div className="text-[#009402] text-xs font-normal font-['Poppins']">In Stock</div>
                </div>
                <div className="w-24 text-[#555555] text-xs font-normal font-['Poppins']">₹ 10,900</div>
                <div className="w-28 text-[#555555] text-xs font-normal font-['Poppins']">United States</div>
                <div className="w-24 text-[#555555] text-xs font-normal font-['Poppins']">3 days ago</div>
              </div>

              {/* Divider */}
              <div className="w-[652px] h-0 border-t border-[#E6E6E6]"></div>

              {/* Row 2 */}
              <div className="w-full inline-flex justify-between items-center px-2 py-1">
                <div className="w-36 text-[#555555] text-xs font-normal font-['Poppins']">Eco Bamboo Toothbrush</div>
                <div className="w-24 text-[#555555] text-xs font-normal font-['Poppins']">#B77YT56</div>
                <div className="w-20 px-2 py-1 bg-[#FFF8B3] rounded-[5px] flex justify-center items-center">
                  <div className="text-[#C29F00] text-xs font-normal font-['Poppins']">Low Stock</div>
                </div>
                <div className="w-24 text-[#555555] text-xs font-normal font-['Poppins']">₹ 3,500</div>
                <div className="w-28 text-[#555555] text-xs font-normal font-['Poppins']">Germany</div>
                <div className="w-24 text-[#555555] text-xs font-normal font-['Poppins']">3 days ago</div>
              </div>

              {/* Divider */}
              <div className="w-[652px] h-0 border-t border-[#E6E6E6]"></div>

              {/* Row 3 */}
              <div className="w-full inline-flex justify-between items-center px-2 py-1">
                <div className="w-36 text-[#555555] text-xs font-normal font-['Poppins']">LED Fairy Lights 24ft</div>
                <div className="w-24 text-[#555555] text-xs font-normal font-['Poppins']">#C98GH22</div>
                <div className="w-20 px-2 py-1 bg-[#D0FFB3] rounded-[5px] flex justify-center items-center">
                  <div className="text-[#009402] text-xs font-normal font-['Poppins']">In Stock</div>
                </div>
                <div className="w-24 text-[#555555] text-xs font-normal font-['Poppins']">₹ 2,690</div>
                <div className="w-28 text-[#555555] text-xs font-normal font-['Poppins']">Canada</div>
                <div className="w-24 text-[#555555] text-xs font-normal font-['Poppins']">2 days ago</div>
              </div>

              {/* Divider */}
              <div className="w-[652px] h-0 border-t border-[#E6E6E6]"></div>

              {/* Row 4 */}
              <div className="w-full inline-flex justify-between items-center px-2 py-1">
                <div className="w-36 text-[#555555] text-xs font-normal font-['Poppins']">Himalayan Salt Lamp</div>
                <div className="w-24 text-[#555555] text-xs font-normal font-['Poppins']">#D55LK87</div>
                <div className="w-20 px-2 py-1 bg-[#FFCBCB] rounded-[5px] flex justify-center items-center">
                  <div className="text-[#940000] text-xs font-normal font-['Poppins']">Out of Stock</div>
                </div>
                <div className="w-24 text-[#555555] text-xs font-normal font-['Poppins']">₹ 3,250</div>
                <div className="w-28 text-[#555555] text-xs font-normal font-['Poppins']">India</div>
                <div className="w-24 text-[#555555] text-xs font-normal font-['Poppins']">1 days ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Alerts */}
        <div className="w-[342px] h-80 relative bg-neutral-50 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 overflow-hidden">
          <div className="w-[322px] left-[10px] top-[12px] absolute inline-flex justify-between items-center">
            <div className="flex justify-start items-center gap-[5px]">
              <div className="w-5 h-5 relative">
                <img 
                  src="/quick_alerts/eva_alert-triangle-fill.svg"
                  alt="Quick Alerts"
                  className="w-5 h-5"
                />
              </div>
              <div className="text-zinc-600 text-base font-normal font-['Poppins']">Quick Alerts</div>
            </div>
            <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
              <img 
                src="/index_page/01 align center (3).svg"
                alt="Menu"
                className="w-4 h-4"
              />
            </button>
          </div>
          <div className="w-[322px] h-0 left-[10px] top-[47px] absolute border-t border-zinc-400"></div>
          
          {/* Alert Items */}
          <div className="w-[322px] left-[10px] top-[66px] absolute flex flex-col justify-start items-start gap-4">
            
            {/* Alert 1 - Delivery */}
            <div className="w-full flex flex-col justify-start items-start gap-0">
              <div className="w-full flex justify-start items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">
                  <img 
                    src="/quick_alerts/fluent-color_alert-48.svg"
                    alt="Delivery Alert"
                    className="w-6 h-6"
                  />
                </div>
                <div className="flex-1 text-black text-xs font-medium font-['Poppins']">
                  Your Amazon Echo will arrive today by 7:30 PM
                </div>
              </div>
              <div className="w-full text-right">
                <button className="text-stone-500 text-[10px] font-normal font-['Poppins'] hover:text-blue-600 transition-colors">
                  Track Order
                </button>
              </div>
              <div className="w-full h-0 border-t border-neutral-200"></div>
            </div>
            
            {/* Alert 2 - Restock */}
            <div className="w-full flex flex-col justify-start items-start gap-0">
              <div className="w-full flex justify-start items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">
                  <img 
                    src="/quick_alerts/gg_arrows-exchange.svg"
                    alt="Restock Alert"
                    className="w-6 h-6"
                  />
                </div>
                <div className="flex-1 text-black text-xs font-medium font-['Poppins']">
                  Time to restock shampoo
                </div>
              </div>
              <div className="w-full text-right">
                <button className="text-stone-500 text-[10px] font-normal font-['Poppins'] hover:text-blue-600 transition-colors">
                  Reorder Now
                </button>
              </div>
              <div className="w-full h-0 border-t border-neutral-200"></div>
            </div>
            
            {/* Alert 3 - Payment */}
            <div className="w-full flex flex-col justify-start items-start gap-0">
              <div className="w-full flex justify-start items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">
                  <img 
                    src="/quick_alerts/Vector.svg"
                    alt="Payment Alert"
                    className="w-6 h-6"
                  />
                </div>
                <div className="flex-1 text-black text-xs font-medium font-['Poppins']">
                  Complete payment for your June 2nd cart
                </div>
              </div>
              <div className="w-full text-right">
                <button className="text-stone-500 text-[10px] font-normal font-['Poppins'] hover:text-blue-600 transition-colors">
                  Pay Now
                </button>
              </div>
              <div className="w-full h-0 border-t border-neutral-200"></div>
            </div>
            
            {/* Alert 4 - Offer */}
            <div className="w-full flex flex-col justify-start items-start gap-0">
              <div className="w-full flex justify-start items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">
                  <img 
                    src="/quick_alerts/icon-park-solid_juice.svg"
                    alt="Offer Alert"
                    className="w-6 h-6"
                  />
                </div>
                <div className="flex-1 text-black text-xs font-medium font-['Poppins']">
                  Organic Amla Juice just at ₹299
                </div>
              </div>
              <div className="w-full text-right">
                <button className="text-stone-500 text-[10px] font-normal font-['Poppins'] hover:text-blue-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleClearAlerts}
            className="left-[42px] bottom-[8px] absolute text-blue-700 text-xs font-medium font-['Poppins'] hover:underline transition-all"
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
