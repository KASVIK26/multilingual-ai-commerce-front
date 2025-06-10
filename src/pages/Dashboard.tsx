
import { Search, Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="w-[1440px] h-[1024px] relative bg-stone-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 h-[984px] left-[20px] top-[19px] absolute bg-stone-300/20 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 overflow-hidden">
        {/* Background gradients */}
        <div className="w-80 h-80 left-[-191px] top-[-57px] absolute opacity-75 bg-gradient-to-b from-violet-700 to-sky-400 rounded-full blur-[184.05px]" />
        <div className="w-80 h-80 left-[132px] top-[867px] absolute opacity-75 bg-gradient-to-b from-green-500 to-amber-300 rounded-full blur-[184.05px]" />
        
        <div className="w-72 left-[21px] top-[20px] absolute inline-flex flex-col justify-start items-center gap-9">
          {/* Logo */}
          <div className="self-stretch text-center justify-center text-violet-700 text-3xl font-bold font-['Poppins']">Multilingual AI</div>
          
          {/* Navigation */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
            <div className="self-stretch h-14 px-2.5 py-3.5 bg-blue-700 rounded-[10px] flex flex-col justify-center items-center gap-2.5 overflow-hidden">
              <div className="w-64 inline-flex justify-between items-center">
                <div className="justify-center text-stone-50 text-sm font-normal font-['Poppins']">Home</div>
                <Home className="w-4 h-4 text-stone-50" />
              </div>
            </div>
            <div className="self-stretch h-14 px-2.5 py-3.5 bg-gradient-to-r from-slate-950 to-blue-900 rounded-[10px] flex flex-col justify-center items-center gap-2.5 overflow-hidden">
              <div className="w-64 inline-flex justify-between items-center">
                <div className="justify-center text-stone-50 text-sm font-normal font-['Poppins']">New Chat</div>
                <MessageSquare className="w-4 h-4 text-stone-50" />
              </div>
            </div>
          </div>

          {/* Conversations Section */}
          <div className="self-stretch flex flex-col justify-start items-start gap-9">
            <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-center text-black text-sm font-normal font-['Poppins']">Conversations</div>
                <div className="w-20 h-9 px-5 py-0.5 bg-gradient-to-b from-blue-700 to-sky-700 rounded-[5px] flex justify-between items-center overflow-hidden">
                  <div className="justify-center text-stone-50 text-sm font-normal font-['Poppins']">Clear</div>
                </div>
              </div>
              <div className="self-stretch px-2.5 py-3 bg-stone-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-stone-300/30 flex flex-col justify-start items-start gap-2.5 overflow-hidden">
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="self-stretch h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="self-stretch inline-flex justify-between items-center">
                      <div className="justify-center text-black text-sm font-normal font-['Poppins']">Shopping Chat Log</div>
                    </div>
                  </div>
                  <div className="self-stretch h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="self-stretch inline-flex justify-between items-center">
                      <div className="justify-center text-black text-sm font-normal font-['Poppins']">About Payment Options</div>
                    </div>
                  </div>
                  <div className="self-stretch h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="self-stretch inline-flex justify-between items-center">
                      <div className="justify-center text-black text-sm font-normal font-['Poppins']">Reorder Dettol Handwash</div>
                    </div>
                  </div>
                  <div className="self-stretch h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="self-stretch inline-flex justify-between items-center">
                      <div className="justify-center text-black text-sm font-normal font-['Poppins']">Deals on Summer Collection</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Week Section */}
            <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
              <div className="inline-flex justify-start items-center gap-32">
                <div className="justify-center text-black text-sm font-normal font-['Poppins']">Last Week</div>
              </div>
              <div className="self-stretch px-2.5 py-3 bg-stone-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-stone-300/30 flex flex-col justify-start items-start gap-2.5 overflow-hidden">
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="self-stretch h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="self-stretch inline-flex justify-between items-center">
                      <div className="justify-center text-black text-sm font-normal font-['Poppins']">Activate Voice Shopping</div>
                    </div>
                  </div>
                  <div className="self-stretch h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="self-stretch inline-flex justify-between items-center">
                      <div className="justify-center text-black text-sm font-normal font-['Poppins']">Use Voice Assistant</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Month Section */}
            <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
              <div className="inline-flex justify-start items-center gap-32">
                <div className="justify-center text-black text-sm font-normal font-['Poppins']">Last Month</div>
              </div>
              <div className="self-stretch px-2.5 py-3 bg-stone-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-stone-300/30 flex flex-col justify-start items-start gap-2.5 overflow-hidden">
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="self-stretch h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="self-stretch inline-flex justify-between items-center">
                      <div className="justify-center text-black text-sm font-normal font-['Poppins']">Last Grocery Order</div>
                    </div>
                  </div>
                  <div className="self-stretch h-9 px-2.5 py-[5px] rounded-lg flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="self-stretch inline-flex justify-between items-center">
                      <div className="justify-center text-black text-sm font-normal font-['Poppins']">Help With Return Policy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div className="self-stretch px-2.5 py-3 bg-slate-950 rounded-2xl outline outline-1 outline-offset-[-1px] flex flex-col justify-start items-start gap-2.5 overflow-hidden">
            <div className="w-72 h-9 px-2.5 py-[5px] bg-gradient-to-r from-violet-700 via-purple-700 to-sky-800 rounded-[10px] flex flex-col justify-center items-center gap-2.5 overflow-hidden">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-center text-white text-sm font-normal font-['Poppins']">My Account</div>
                <div className="w-4 h-4 outline outline-[1.20px] outline-offset-[-0.60px] outline-white" />
              </div>
            </div>
            <div className="w-72 h-9 px-2.5 py-[5px] rounded-[10px] flex flex-col justify-center items-center gap-2.5 overflow-hidden">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-center text-stone-50 text-sm font-normal font-['Poppins']">Log Out</div>
                <div className="w-4 h-4 relative overflow-hidden">
                  <div className="w-1.5 h-4 left-0 top-0 absolute bg-stone-50" />
                  <div className="w-3.5 h-2.5 left-[3.75px] top-[3.97px] absolute bg-stone-50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="left-[816px] top-[984px] absolute text-center justify-center text-neutral-500 text-xs font-light font-['Poppins']">Powered by Multilingual AI</div>
      
      {/* Header */}
      <div className="w-[1042px] left-[378px] top-[20px] absolute inline-flex justify-between items-start">
        <div className="w-52 inline-flex flex-col justify-start items-start">
          <div className="self-stretch justify-center text-black text-2xl font-medium font-['Poppins']">Welcome Alex!</div>
          <div className="self-stretch justify-center text-neutral-500 text-base font-normal font-['Poppins']">How can we help you today?</div>
        </div>
        <div className="flex justify-start items-center gap-2.5">
          <div className="w-64 h-11 px-2.5 py-3 bg-gray-200 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-100 inline-flex flex-col justify-center items-start gap-2.5 overflow-hidden">
            <div className="self-stretch inline-flex justify-start items-center gap-2.5">
              <Search className="w-3.5 h-3.5 text-neutral-500" />
              <div className="justify-center text-neutral-500 text-xs font-normal font-['Poppins']">Search here..</div>
            </div>
          </div>
          <div className="w-11 h-11 bg-gray-200 rounded-[35px] flex justify-center items-center gap-2.5 overflow-hidden">
            <Bell className="w-3.5 h-3 text-black" />
          </div>
          <img className="w-11 h-11 rounded-full" src="https://placehold.co/45x45" />
        </div>
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
                    <div className="justify-center text-green-700 text-[10px] font-medium font-['Poppins']">+15%</div>
                  </div>
                </div>
                <div className="justify-center text-zinc-300 text-[10px] font-normal font-['Poppins']">last month</div>
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
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
                    <div className="justify-center text-red-800 text-[10px] font-medium font-['Poppins']">-9%</div>
                  </div>
                </div>
                <div className="justify-center text-neutral-500 text-[10px] font-normal font-['Poppins']">last month</div>
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
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
                    <div className="justify-center text-green-700 text-[10px] font-medium font-['Poppins']">+15%</div>
                  </div>
                </div>
                <div className="justify-center text-neutral-500 text-[10px] font-normal font-['Poppins']">last month</div>
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
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
                    <div className="justify-center text-green-700 text-[10px] font-medium font-['Poppins']">+8%</div>
                  </div>
                </div>
                <div className="justify-center text-neutral-500 text-[10px] font-normal font-['Poppins']">last month</div>
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
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
          <div className="w-[487px] left-[10px] top-[12px] absolute inline-flex flex-col justify-between items-center">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="w-56 justify-center text-zinc-600 text-base font-normal font-['Poppins']">Total Revenue</div>
              <MoreHorizontal className="w-4 h-4 text-black" />
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-2.5">
              <div className="text-right justify-center text-black text-xl font-medium font-['Poppins']">₹12,34,508</div>
              <div className="flex-1 flex justify-start items-center gap-[5px]">
                <div className="w-12 px-[5px] py-[3px] bg-lime-200 rounded-[5px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                  <div className="inline-flex justify-start items-center gap-[5px]">
                    <div className="justify-center text-green-700 text-[10px] font-medium font-['Poppins']">+24%</div>
                  </div>
                </div>
                <div className="justify-center text-neutral-500 text-[10px] font-normal font-['Poppins']">last month</div>
              </div>
            </div>
          </div>
          
          {/* Chart area */}
          <div className="w-[462px] left-[22px] top-[218px] absolute inline-flex justify-between items-center">
            <div className="text-right justify-center text-neutral-600 text-xs font-normal font-['Poppins']">MON</div>
            <div className="text-right justify-center text-neutral-600 text-xs font-normal font-['Poppins']">TUE</div>
            <div className="text-right justify-center text-neutral-600 text-xs font-normal font-['Poppins']">WED</div>
            <div className="text-right justify-center text-neutral-600 text-xs font-normal font-['Poppins']">THU</div>
            <div className="text-right justify-center text-neutral-600 text-xs font-normal font-['Poppins']">FRI</div>
            <div className="text-right justify-center text-neutral-600 text-xs font-normal font-['Poppins']">SAT</div>
          </div>
        </div>

        {/* Spending Chart */}
        <div className="w-[507px] h-64 relative bg-neutral-50 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 overflow-hidden">
          <div className="w-[487px] left-[10px] top-[12px] absolute inline-flex justify-between items-center">
            <div className="justify-center text-zinc-600 text-base font-normal font-['Poppins']">Where You Spend the Most</div>
            <MoreHorizontal className="w-4 h-4 text-black" />
          </div>
          
          {/* Legend */}
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

          {/* Total spent display */}
          <div className="w-20 left-[364px] top-[112px] absolute inline-flex flex-col justify-center items-center">
            <div className="text-right justify-center text-neutral-600 text-xs font-normal font-['Poppins']">Total Spent</div>
            <div className="self-stretch text-right justify-center text-black text-xl font-medium font-['Poppins']">₹13,567</div>
          </div>
        </div>
      </div>

      {/* Lower Section - Product Overview and Quick Alerts */}
      <div className="left-[378px] top-[600px] absolute inline-flex justify-start items-center gap-7">
        {/* Product Overview Table */}
        <div className="w-[672px] h-80 relative rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 overflow-hidden bg-white">
          <div className="w-[652px] left-[10px] top-[12px] absolute inline-flex justify-between items-center">
            <div className="w-56 justify-center text-zinc-600 text-base font-normal font-['Poppins']">Product Overview</div>
            <div className="flex justify-start items-center gap-2.5">
              <div className="text-center justify-center text-zinc-600 text-base font-normal font-['Poppins']">Day</div>
              <div className="justify-center text-blue-700 text-base font-normal font-['Poppins'] underline">Month</div>
              <div className="text-center justify-center text-zinc-600 text-base font-normal font-['Poppins']">Year</div>
            </div>
          </div>
          
          {/* Table content */}
          <div className="w-[652px] left-[10px] top-[69px] absolute inline-flex flex-col justify-start items-start gap-2">
            <div className="inline-flex justify-start items-center gap-14">
              <div className="justify-center text-black text-xs font-medium font-['Poppins']">Product</div>
              <div className="justify-center text-black text-xs font-medium font-['Poppins']">Product ID</div>
              <div className="justify-center text-black text-xs font-medium font-['Poppins']">Status</div>
              <div className="justify-center text-black text-xs font-medium font-['Poppins']">Price (₹)</div>
              <div className="justify-center text-black text-xs font-medium font-['Poppins']">Region</div>
              <div className="justify-center text-black text-xs font-medium font-['Poppins']">Last Ordered</div>
            </div>
            
            {/* Table rows */}
            <div className="self-stretch flex flex-col justify-start items-start gap-2.5 mt-4">
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
              
              <div className="inline-flex justify-start items-start gap-9">
                <div className="w-24 justify-center text-neutral-600 text-xs font-normal font-['Poppins']">Eco Bamboo Toothbrush</div>
                <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">#B77YT56</div>
                <div className="px-[5px] py-[3px] bg-yellow-100 rounded-[5px] flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                  <div className="justify-center text-yellow-600 text-xs font-normal font-['Poppins']">Low Stock</div>
                </div>
                <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">₹ 3,500</div>
                <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">Germany</div>
                <div className="justify-center text-neutral-600 text-xs font-normal font-['Poppins']">3 days ago</div>
              </div>
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
            <MoreHorizontal className="w-4 h-4 text-black" />
          </div>
          
          <div className="w-80 left-[10px] top-[66px] absolute inline-flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch flex flex-col justify-start items-end gap-[5px]">
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="w-3.5 h-3.5 bg-orange-500 rounded-sm" />
                  <div className="justify-center text-black text-xs font-medium font-['Poppins']">Your Amazon Echo will arrive today by 7:30 PM</div>
                </div>
                <div className="self-stretch text-right justify-center text-stone-500 text-[10px] font-normal font-['Poppins']">Track Order</div>
              </div>
            </div>
            
            <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch flex flex-col justify-center items-start gap-[5px]">
                <div className="inline-flex justify-start items-center gap-1.5">
                  <div className="w-3.5 h-3.5 bg-blue-700 rounded-sm" />
                  <div className="justify-center text-black text-xs font-medium font-['Poppins']">Time to restock shampoo</div>
                </div>
                <div className="self-stretch text-right justify-center text-stone-500 text-[10px] font-normal font-['Poppins']">Reorder Now</div>
              </div>
            </div>
            
            <div className="left-[277px] top-[318px] absolute justify-center text-blue-700 text-xs font-medium font-['Poppins']">Clear all</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
