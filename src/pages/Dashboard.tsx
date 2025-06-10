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

      {/* Header */}
      <div className="left-[378px] top-[20px] absolute">
        <Header />
      </div>

      {/* Stats Cards */}
      <div className="w-[1042px] left-[378px] top-[124px] absolute inline-flex justify-between items-center">
        {/* Voice Orders Card */}
        <div className="w-60 px-2.5 py-3 relative bg-slate-950 rounded-[10px] shadow-[0px_0px_16.5px_0px_rgba(0,0,0,0.35)] outline outline-1 outline-offset-[-1px] outline-black inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          <div className="self-stretch inline-flex justify-start items-start gap-24">
            <div className="w-28 inline-flex flex-col justify-center items-start gap-2.5">
              <div className="justify-center text-zinc-300 text-xs font-medium font-['Poppins']">Voice Orders</div>
              <div className="justify-center text-stone-50 text-4xl font-medium font-['Poppins']">17</div>
              <div className="self-stretch inline-flex justify-start items-center gap-[5px]">
                <div className="w-12 px-[5px] py-[3px] bg-lime-200 rounded-[5px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                  <div className="inline-flex justify-start items-center gap-[5px]">
                    <div className="w-3.5 h-2 outline outline-[1.20px] outline-offset-[-0.60px] outline-green-700" />
                    <div className="w-1 h-1 outline outline-[1.20px] outline-offset-[-0.60px] outline-green-700" />
                    <div className="justify-center text-green-700 text-[10px] font-medium font-['Poppins']">+15%</div>
                  </div>
                </div>
                <div className="justify-center text-zinc-300 text-[10px] font-normal font-['Poppins']">last month</div>
              </div>
            </div>
            <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
              <div className="w-[3px] h-[3px] left-0 top-[7.50px] absolute bg-white" />
              <div className="w-[3px] h-[3px] left-[7.50px] top-[7.50px] absolute bg-white" />
              <div className="w-[3px] h-[3px] left-[15px] top-[7.50px] absolute bg-white" />
            </button>
          </div>
          <div className="left-[153px] top-[83px] absolute inline-flex justify-start items-end gap-1">
            <div className="w-3 h-10 bg-lime-500 rounded-tl-sm rounded-tr-sm" />
            <div className="w-3 h-7 bg-neutral-500 rounded-tl-sm rounded-tr-sm" />
            <div className="w-3 h-4 bg-neutral-500 rounded-tl-sm rounded-tr-sm" />
            <div className="w-3 h-7 bg-neutral-500 rounded-tl-sm rounded-tr-sm" />
            <div className="w-3 h-7 bg-neutral-500 rounded-tl-sm rounded-tr-sm" />
          </div>
        </div>

        {/* Orders in Progress Card */}
        <div className="w-60 px-2.5 py-3 relative bg-neutral-50 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          <div className="self-stretch inline-flex justify-start items-start gap-24">
            <div className="w-28 inline-flex flex-col justify-center items-start gap-2.5">
              <div className="justify-center text-zinc-600 text-xs font-medium font-['Poppins']">Orders in Progress</div>
              <div className="justify-center text-black text-4xl font-medium font-['Poppins']">21</div>
              <div className="self-stretch inline-flex justify-start items-center gap-[5px]">
                <div className="w-12 px-[5px] py-[3px] bg-red-200 rounded-[5px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                  <div className="inline-flex justify-start items-center gap-[5px]">
                    <div className="w-3.5 h-2 outline outline-[1.20px] outline-offset-[-0.60px] outline-red-800" />
                    <div className="w-1 h-1 outline outline-[1.20px] outline-offset-[-0.60px] outline-red-800" />
                    <div className="justify-center text-red-800 text-[10px] font-medium font-['Poppins']">-9%</div>
                  </div>
                </div>
                <div className="justify-center text-neutral-500 text-[10px] font-normal font-['Poppins']">last month</div>
              </div>
            </div>
            <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
              <div className="w-[3px] h-[3px] left-0 top-[7.50px] absolute bg-black" />
              <div className="w-[3px] h-[3px] left-[7.50px] top-[7.50px] absolute bg-black" />
              <div className="w-[3px] h-[3px] left-[15px] top-[7.50px] absolute bg-black" />
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
        <div className="w-60 px-2.5 py-3 relative bg-neutral-50 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          <div className="self-stretch inline-flex justify-start items-start gap-24">
            <div className="w-28 inline-flex flex-col justify-center items-start gap-2.5">
              <div className="justify-center text-zinc-600 text-xs font-medium font-['Poppins']">Pending Requests</div>
              <div className="justify-center text-black text-4xl font-medium font-['Poppins']">17</div>
              <div className="self-stretch inline-flex justify-start items-center gap-[5px]">
                <div className="w-12 px-[5px] py-[3px] bg-lime-200 rounded-[5px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                  <div className="inline-flex justify-start items-center gap-[5px]">
                    <div className="w-3.5 h-2 outline outline-[1.20px] outline-offset-[-0.60px] outline-green-700" />
                    <div className="w-1 h-1 outline outline-[1.20px] outline-offset-[-0.60px] outline-green-700" />
                    <div className="justify-center text-green-700 text-[10px] font-medium font-['Poppins']">+15%</div>
                  </div>
                </div>
                <div className="justify-center text-neutral-500 text-[10px] font-normal font-['Poppins']">last month</div>
              </div>
            </div>
            <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
              <div className="w-[3px] h-[3px] left-0 top-[7.50px] absolute bg-black" />
              <div className="w-[3px] h-[3px] left-[7.50px] top-[7.50px] absolute bg-black" />
              <div className="w-[3px] h-[3px] left-[15px] top-[7.50px] absolute bg-black" />
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
        <div className="w-60 px-2.5 py-3 relative bg-neutral-50 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          <div className="self-stretch inline-flex justify-start items-start gap-24">
            <div className="w-28 inline-flex flex-col justify-center items-start gap-2.5">
              <div className="justify-center text-zinc-600 text-xs font-medium font-['Poppins']">Products Reordered</div>
              <div className="justify-center text-black text-4xl font-medium font-['Poppins']">12</div>
              <div className="self-stretch inline-flex justify-start items-center gap-[5px]">
                <div className="w-12 px-[5px] py-[3px] bg-lime-200 rounded-[5px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                  <div className="inline-flex justify-start items-center gap-[5px]">
                    <div className="w-3.5 h-2 outline outline-[1.20px] outline-offset-[-0.60px] outline-green-700" />
                    <div className="w-1 h-1 outline outline-[1.20px] outline-offset-[-0.60px] outline-green-700" />
                    <div className="justify-center text-green-700 text-[10px] font-medium font-['Poppins']">+8%</div>
                  </div>
                </div>
                <div className="justify-center text-neutral-500 text-[10px] font-normal font-['Poppins']">last month</div>
              </div>
            </div>
            <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
              <div className="w-[3px] h-[3px] left-0 top-[7.50px] absolute bg-black" />
              <div className="w-[3px] h-[3px] left-[7.50px] top-[7.50px] absolute bg-black" />
              <div className="w-[3px] h-[3px] left-[15px] top-[7.50px] absolute bg-black" />
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

      {/* Charts Section */}
      <div className="left-[378px] top-[294px] absolute inline-flex justify-start items-center gap-7">
        {/* Revenue Chart */}
        <div className="w-[507px] h-64 relative bg-neutral-50 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 overflow-hidden">
          <div className="w-[487px] h-0 left-[10px] top-[214px] absolute outline outline-[0.80px] outline-offset-[-0.40px] outline-zinc-400"></div>
          <div className="w-[462px] left-[22px] top-[218px] absolute inline-flex justify-between items-center">
            <div className="text-right justify-center text-neutral-600 text-xs font-normal font-['Poppins']">MON</div>
            <div className="text-right justify-center text-neutral-600 text-xs font-normal font-['Poppins']">TUE</div>
            <div className="text-right justify-center text-neutral-600 text-xs font-normal font-['Poppins']">WED</div>
            <div className="text-right justify-center text-neutral-600 text-xs font-normal font-['Poppins']">THU</div>
            <div className="text-right justify-center text-neutral-600 text-xs font-normal font-['Poppins']">FRI</div>
            <div className="text-right justify-center text-neutral-600 text-xs font-normal font-['Poppins']">SAT</div>
          </div>
          <div className="w-[486px] h-28 left-[11px] top-[107px] absolute">
            <div className="w-[486px] h-20 left-0 top-0 absolute outline outline-2 outline-offset-[-1px] outline-blue-700" />
            <div className="w-[486px] h-28 left-0 top-0 absolute bg-gradient-to-b from-blue-700/50 to-white/0" />
            <div className="w-32 h-0 left-[27px] top-[106px] absolute origin-top-left -rotate-90 outline outline-[0.80px] outline-offset-[-0.40px] outline-neutral-200"></div>
            <div className="w-32 h-0 left-[116px] top-[107px] absolute origin-top-left -rotate-90 outline outline-[0.80px] outline-offset-[-0.40px] outline-neutral-200"></div>
            <div className="w-32 h-0 left-[204px] top-[107px] absolute origin-top-left -rotate-90 outline outline-[0.80px] outline-offset-[-0.40px] outline-neutral-200"></div>
            <div className="w-32 h-0 left-[294px] top-[107px] absolute origin-top-left -rotate-90 outline outline-[0.80px] outline-offset-[-0.40px] outline-neutral-200"></div>
            <div className="w-32 h-0 left-[377px] top-[107px] absolute origin-top-left -rotate-90 outline outline-[0.80px] outline-offset-[-0.40px] outline-neutral-200"></div>
            <div className="w-32 h-0 left-[461px] top-[107px] absolute origin-top-left -rotate-90 outline outline-[0.80px] outline-offset-[-0.40px] outline-neutral-200"></div>
            <div className="w-3.5 h-3.5 left-[453px] top-[-3px] absolute bg-stone-50 rounded-full border-2 border-blue-700" />
          </div>
          <div className="w-[487px] h-14 left-[10px] top-[12px] absolute inline-flex flex-col justify-between items-center">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="w-56 justify-center text-zinc-600 text-base font-normal font-['Poppins']">Total Revenue</div>
              <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
                <div className="w-[3px] h-[3px] left-0 top-[7.50px] absolute bg-black" />
                <div className="w-[3px] h-[3px] left-[7.50px] top-[7.50px] absolute bg-black" />
                <div className="w-[3px] h-[3px] left-[15px] top-[7.50px] absolute bg-black" />
              </button>
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-2.5">
              <div className="text-right justify-center text-black text-xl font-medium font-['Poppins']">₹12,34,508</div>
              <div className="flex-1 flex justify-start items-center gap-[5px]">
                <div className="w-12 px-[5px] py-[3px] bg-lime-200 rounded-[5px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                  <div className="inline-flex justify-start items-center gap-[5px]">
                    <div className="w-3.5 h-2 outline outline-[1.20px] outline-offset-[-0.60px] outline-green-700" />
                    <div className="w-1 h-1 outline outline-[1.20px] outline-offset-[-0.60px] outline-green-700" />
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
          <div className="w-48 h-48 left-[303px] top-[39px] absolute">
            <div className="w-48 h-48 left-0 top-0 absolute bg-indigo-200 rounded-full" />
            <div className="w-48 h-48 left-0 top-0 absolute bg-neutral-200 rounded-full" />
            <div className="w-48 h-48 left-0 top-0 absolute bg-indigo-300 rounded-full" />
            <div className="w-48 h-48 left-0 top-0 absolute bg-blue-400 rounded-full" />
            <div className="w-48 h-48 left-0 top-0 absolute bg-blue-600 rounded-full" />
            <div className="w-20 left-[61px] top-[73px] absolute inline-flex flex-col justify-center items-center">
              <div className="text-right justify-center text-neutral-600 text-xs font-normal font-['Poppins']">Total Spent</div>
              <div className="self-stretch text-right justify-center text-black text-xl font-medium font-['Poppins']">₹13,567</div>
            </div>
          </div>
          <div className="w-36 left-[10px] top-[71px] absolute inline-flex flex-col justify-start items-start gap-2.5">
            <div className="inline-flex justify-start items-center gap-[5px]">
              <div className="w-3 h-3 bg-blue-600 rounded-sm" />
              <div className="text-right justify-center text-black text-xs font-normal font-['Poppins']">Fashion & Apparel</div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-[5px]">
              <div className="w-3 h-3 bg-blue-400 rounded-sm" />
              <div className="text-right justify-center text-black text-xs font-normal font-['Poppins']">Groceries & Essentials</div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-[5px]">
              <div className="w-3 h-3 bg-indigo-300 rounded-sm" />
              <div className="text-right justify-center text-black text-xs font-normal font-['Poppins']">Electronics & Gadgets</div>
            </div>
            <div className="inline-flex justify-start items-center gap-[5px]">
              <div className="w-3 h-3 bg-indigo-200 rounded-sm" />
              <div className="text-right justify-center text-black text-xs font-normal font-['Poppins']">Home & Living</div>
            </div>
            <div className="inline-flex justify-start items-center gap-[5px]">
              <div className="w-3 h-3 bg-neutral-200 rounded-sm" />
              <div className="text-right justify-center text-black text-xs font-normal font-['Poppins']">Others</div>
            </div>
          </div>
          <div className="left-[10px] top-[238px] absolute inline-flex justify-start items-center gap-[3px]">
            <div className="w-5 h-5 p-[3px] bg-gray-200 rounded-xl flex justify-start items-center gap-2.5">
              <div className="w-4 h-4 relative overflow-hidden">
                <div className="w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-700" />
                <div className="w-0 h-[2.67px] left-[8px] top-[5.33px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-700" />
                <div className="w-[0.01px] h-0 left-[8px] top-[10.67px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-700" />
              </div>
            </div>
            <div className="text-right justify-center text-neutral-500 text-[8px] font-normal font-['Poppins']">You spent ₹3,200 on Fashion this month</div>
          </div>
          <div className="w-[487px] left-[10px] top-[12px] absolute inline-flex justify-between items-center">
            <div className="justify-center text-zinc-600 text-base font-normal font-['Poppins']">Where You Spend the Most</div>
            <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
              <div className="w-[3px] h-[3px] left-0 top-[7.50px] absolute bg-black" />
              <div className="w-[3px] h-[3px] left-[7.50px] top-[7.50px] absolute bg-black" />
              <div className="w-[3px] h-[3px] left-[15px] top-[7.50px] absolute bg-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="left-[378px] top-[600px] absolute inline-flex justify-start items-center gap-7">
        {/* Product Overview Table */}
        <div className="w-[672px] h-80 relative rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 overflow-hidden bg-neutral-50">
          <div className="w-[652px] left-[10px] top-[12px] absolute inline-flex justify-between items-center">
            <div className="w-56 justify-center text-zinc-600 text-base font-normal font-['Poppins']">Product Overview</div>
            <div className="flex justify-start items-center gap-2.5">
              {timeframeOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedTimeframe(option)}
                  className={`text-center justify-center text-base font-normal font-['Poppins'] transition-colors ${
                    selectedTimeframe === option
                      ? 'text-blue-700 underline'
                      : 'text-zinc-600 hover:text-blue-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          
          {/* Table Header */}
          <div className="w-[652px] left-[10px] top-[69px] absolute inline-flex flex-col justify-start items-start gap-2">
            <div className="inline-flex justify-start items-center gap-14">
              <div className="justify-center text-black text-xs font-medium font-['Poppins']">Product</div>
              <div className="justify-center text-black text-xs font-medium font-['Poppins']">Product ID</div>
              <div className="justify-center text-black text-xs font-medium font-['Poppins']">Status</div>
              <div className="justify-center text-black text-xs font-medium font-['Poppins']">Price (₹)</div>
              <div className="justify-center text-black text-xs font-medium font-['Poppins']">Region</div>
              <div className="justify-center text-black text-xs font-medium font-['Poppins']">Last Ordered</div>
            </div>
            <div className="w-[652px] h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-zinc-400"></div>
            
            {/* Table Rows */}
            <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
              <div className="w-[652px] h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-200"></div>
              <div className="inline-flex justify-start items-start gap-9">
                <div className="w-24 justify-center text-neutral-600 text-xs font-normal font-['Poppins']">Smart AirPods Max</div>
                <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">#A23XH12</div>
                <div className="px-[5px] py-[3px] bg-lime-200 rounded-[5px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                  <div className="justify-center text-green-700 text-xs font-normal font-['Poppins']">In Stock</div>
                </div>
                <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">₹ 10,900</div>
                <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">United States</div>
                <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">3 days ago</div>
              </div>
              
              {/* More table rows... keeping existing structure */}
              <div className="w-[652px] h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-200"></div>
              <div className="w-24 justify-center text-neutral-600 text-xs font-normal font-['Poppins']">Eco Bamboo Toothbrush</div>
              <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">#B77YT56</div>
              <div className="px-[5px] py-[3px] bg-yellow-100 rounded-[5px] flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                <div className="justify-center text-yellow-600 text-xs font-normal font-['Poppins']">Low Stock</div>
              </div>
              <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">₹ 3,500</div>
              <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">Germany</div>
              <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">3 days ago</div>
              <div className="w-[652px] h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-200"></div>
              <div className="w-24 justify-center text-neutral-600 text-xs font-normal font-['Poppins']">LED Fairy Lights 24ft</div>
              <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">#C98GH22</div>
              <div className="px-[5px] py-[3px] bg-lime-200 rounded-[5px] flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                <div className="justify-center text-green-700 text-xs font-normal font-['Poppins']">In Stock</div>
              </div>
              <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">₹ 2,690</div>
              <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">Canada</div>
              <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">2 days ago</div>
              <div className="w-[652px] h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-200"></div>
              <div className="w-24 justify-center text-neutral-600 text-xs font-normal font-['Poppins']">Himalayan Salt Lamp</div>
              <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">#D55LK87</div>
              <div className="px-[5px] py-[3px] bg-red-200 rounded-[5px] flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                <div className="justify-center text-red-800 text-xs font-normal font-['Poppins']">Out of Stock</div>
              </div>
              <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">₹ 3,250</div>
              <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">India</div>
              <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">1 days ago</div>
            </div>
          </div>
        </div>

        {/* Quick Alerts */}
        <div className="w-80 h-80 relative bg-neutral-50 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 overflow-hidden">
          <div className="w-80 left-[10px] top-[12px] absolute inline-flex justify-between items-center">
            <div className="flex justify-start items-center gap-[5px]">
              <div className="w-5 h-5 relative">
                <div className="w-5 h-4 left-[0.93px] top-[1.83px] absolute bg-gradient-to-b from-red-700 to-orange-800" />
              </div>
              <div className="justify-center text-zinc-600 text-base font-normal font-['Poppins']">Quick Alerts</div>
            </div>
            <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
              <div className="w-[3px] h-[3px] left-0 top-[7.50px] absolute bg-black" />
              <div className="w-[3px] h-[3px] left-[7.50px] top-[7.50px] absolute bg-black" />
              <div className="w-[3px] h-[3px] left-[15px] top-[7.50px] absolute bg-black" />
            </button>
          </div>
          <div className="w-80 h-0 left-[10px] top-[47px] absolute outline outline-[0.50px] outline-offset-[-0.25px] outline-zinc-400"></div>
          
          {/* Alert Items */}
          <div className="w-80 left-[10px] top-[66px] absolute inline-flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch flex flex-col justify-start items-end gap-[5px]">
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="w-3.5 h-3.5 relative overflow-hidden">
                    <div className="w-1 h-1 left-[5.62px] top-[10px] absolute bg-gradient-to-b from-orange-600 to-yellow-400/95" />
                    <div className="w-3 h-2.5 left-[1.88px] top-[1.25px] absolute bg-gradient-to-l from-orange-400 to-yellow-400" />
                  </div>
                  <div className="justify-center text-black text-xs font-medium font-['Poppins']">Your Amazon Echo will arrive today by 7:30 PM</div>
                </div>
                <button className="self-stretch text-right justify-center text-stone-500 text-[10px] font-normal font-['Poppins'] hover:text-blue-600 transition-colors">
                  Track Order
                </button>
              </div>
              <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-200"></div>
            </div>
            
            {/* More alert items with similar interactive structure... */}
            <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch flex flex-col justify-center items-start gap-[5px]">
                <div className="inline-flex justify-start items-center gap-1.5">
                  <div className="w-3.5 h-3.5 relative overflow-hidden">
                    <div className="w-2.5 h-2 left-[2.50px] top-[3.87px] absolute bg-gradient-to-b from-blue-700 to-blue-800" />
                  </div>
                  <div className="justify-center text-black text-xs font-medium font-['Poppins']">Time to restock shampoo</div>
                </div>
                <button className="self-stretch text-right justify-center text-stone-500 text-[10px] font-normal font-['Poppins'] hover:text-blue-600 transition-colors">
                  Reorder Now
                </button>
              </div>
              <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-200"></div>
            </div>
            
            <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch flex flex-col justify-center items-start gap-[5px]">
                <div className="w-72 inline-flex justify-between items-center">
                  <div className="w-3 h-4 bg-gradient-to-b from-orange-500 to-orange-700" />
                  <div className="justify-center text-black text-xs font-medium font-['Poppins']">Complete payment for your June 2nd cart</div>
                </div>
                <button className="self-stretch text-right justify-center text-stone-500 text-[10px] font-normal font-['Poppins'] hover:text-blue-600 transition-colors">
                  Pay Now
                </button>
              </div>
              <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-200"></div>
            </div>
            
            <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch flex flex-col justify-center items-start gap-[5px]">
                <div className="inline-flex justify-start items-center gap-1.5">
                  <div className="w-3.5 h-3.5 relative overflow-hidden">
                    <div className="w-1.5 h-1.5 left-[4.69px] top-[7.50px] absolute bg-gradient-to-b from-green-500 to-green-700 outline outline-2 outline-offset-[-1px] outline-green-500" />
                    <div className="w-2 h-0.5 left-[3.44px] top-[5.62px] absolute outline outline-2 outline-offset-[-1px] outline-green-500" />
                    <div className="w-1.5 h-[3.12px] left-[4.38px] top-[2.50px] absolute bg-gradient-to-b from-green-500 to-green-700 outline outline-2 outline-offset-[-1px] outline-green-500" />
                    <div className="w-[0.62px] h-[1.25px] left-[8.12px] top-[1.25px] absolute outline outline-2 outline-offset-[-1px] outline-green-500" />
                  </div>
                  <div className="justify-center text-black text-xs font-medium font-['Poppins']">Organic Amla Juice just at ₹299</div>
                </div>
                <button className="self-stretch text-right justify-center text-stone-500 text-[10px] font-normal font-['Poppins'] hover:text-blue-600 transition-colors">
                  Add to Cart
                </button>
              </div>
              <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-200"></div>
            </div>
          </div>
          
          <button
            onClick={handleClearAlerts}
            className="left-[277px] top-[318px] absolute justify-center text-blue-700 text-xs font-medium font-['Poppins'] hover:underline transition-all"
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
