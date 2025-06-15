
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
    <div className="w-full h-screen bg-stone-50 overflow-hidden flex">
      {/* Sidebar - Fixed width */}
      <div className="w-80 flex-shrink-0 p-4">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 p-4 overflow-hidden">
        {/* Header */}
        <div className="mb-4">
          <Header />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Stats Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Voice Orders Card */}
            <div className="h-36 px-3 py-3 relative bg-neutral-50 hover:bg-slate-950 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-200 hover:outline-black flex flex-col justify-start items-start gap-2 overflow-hidden transition-all duration-300 group">
              <div className="self-stretch flex justify-between items-start">
                <div className="flex flex-col justify-center items-start gap-2 flex-1">
                  <div className="text-zinc-600 group-hover:text-zinc-300 text-xs font-medium font-['Poppins'] transition-colors">Voice Orders</div>
                  <div className="text-black group-hover:text-white text-3xl font-medium font-['Poppins'] transition-colors">17</div>
                  <div className="flex justify-start items-center gap-1">
                    <div className="px-1.5 py-1 bg-lime-200 group-hover:bg-lime-300 rounded text-green-700 group-hover:text-green-800 text-xs font-medium transition-colors">
                      +15%
                    </div>
                    <div className="text-neutral-500 group-hover:text-neutral-400 text-xs font-normal transition-colors">last month</div>
                  </div>
                </div>
                <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
                  <img src="/index_page/01 align center (3).svg" alt="Menu" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Orders in Progress Card */}
            <div className="h-36 px-3 py-3 relative bg-neutral-50 hover:bg-slate-950 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-200 hover:outline-black flex flex-col justify-start items-start gap-2 overflow-hidden transition-all duration-300 group">
              <div className="self-stretch flex justify-between items-start">
                <div className="flex flex-col justify-center items-start gap-2 flex-1">
                  <div className="text-zinc-600 group-hover:text-zinc-300 text-xs font-medium font-['Poppins']">Orders in Progress</div>
                  <div className="text-black group-hover:text-stone-50 text-3xl font-medium font-['Poppins']">21</div>
                  <div className="flex justify-start items-center gap-1">
                    <div className="px-1.5 py-1 bg-red-200 rounded text-red-800 text-xs font-medium">-9%</div>
                    <div className="text-neutral-500 text-xs font-normal">last month</div>
                  </div>
                </div>
                <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
                  <img src="/index_page/01 align center (3).svg" alt="Menu" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pending Requests Card */}
            <div className="h-36 px-3 py-3 relative bg-neutral-50 hover:bg-slate-950 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-200 hover:outline-black flex flex-col justify-start items-start gap-2 overflow-hidden transition-all duration-300 group">
              <div className="self-stretch flex justify-between items-start">
                <div className="flex flex-col justify-center items-start gap-2 flex-1">
                  <div className="text-zinc-600 group-hover:text-zinc-300 text-xs font-medium font-['Poppins']">Pending Requests</div>
                  <div className="text-black group-hover:text-stone-50 text-3xl font-medium font-['Poppins']">17</div>
                  <div className="flex justify-start items-center gap-1">
                    <div className="px-1.5 py-1 bg-lime-200 rounded text-green-700 text-xs font-medium">+15%</div>
                    <div className="text-neutral-500 text-xs font-normal">last month</div>
                  </div>
                </div>
                <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
                  <img src="/index_page/01 align center (3).svg" alt="Menu" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Products Reordered Card */}
            <div className="h-36 px-3 py-3 relative bg-neutral-50 hover:bg-slate-950 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-200 hover:outline-black flex flex-col justify-start items-start gap-2 overflow-hidden transition-all duration-300 group">
              <div className="self-stretch flex justify-between items-start">
                <div className="flex flex-col justify-center items-start gap-2 flex-1">
                  <div className="text-zinc-600 group-hover:text-zinc-300 text-xs font-medium font-['Poppins']">Products Reordered</div>
                  <div className="text-black group-hover:text-stone-50 text-3xl font-medium font-['Poppins']">12</div>
                  <div className="flex justify-start items-center gap-1">
                    <div className="px-1.5 py-1 bg-lime-200 rounded text-green-700 text-xs font-medium">+8%</div>
                    <div className="text-neutral-500 text-xs font-normal">last month</div>
                  </div>
                </div>
                <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
                  <img src="/index_page/01 align center (3).svg" alt="Menu" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Revenue Chart */}
            <div className="h-56 relative bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-200 overflow-hidden p-3">
              <div className="flex justify-between items-center mb-4">
                <div className="text-zinc-600 text-sm font-normal font-['Poppins']">Total Revenue</div>
                <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
                  <img src="/index_page/01 align center (3).svg" alt="Menu" className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="text-black text-lg font-medium font-['Poppins']">₹12,34,508</div>
                <div className="px-1.5 py-1 bg-lime-200 rounded text-green-700 text-xs font-medium">+24%</div>
                <div className="text-neutral-500 text-xs font-normal">last month</div>
              </div>
              
              {/* Chart placeholder */}
              <div className="w-full h-24 bg-gradient-to-r from-blue-100 to-blue-200 rounded"></div>
            </div>

            {/* Spending Chart */}
            <div className="h-56 relative bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-200 overflow-hidden p-3">
              <div className="flex justify-between items-center mb-4">
                <div className="text-zinc-600 text-sm font-normal font-['Poppins']">Where You Spend the Most</div>
                <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
                  <img src="/index_page/01 align center (3).svg" alt="Menu" className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 h-40">
                {/* Legend */}
                <div className="space-y-2">
                  {[
                    { color: 'bg-blue-600', label: 'Fashion & Apparel', percentage: '35%' },
                    { color: 'bg-blue-400', label: 'Groceries & Essentials', percentage: '25%' },
                    { color: 'bg-indigo-300', label: 'Electronics & Gadgets', percentage: '20%' },
                    { color: 'bg-indigo-200', label: 'Home & Living', percentage: '12%' },
                    { color: 'bg-neutral-200', label: 'Others', percentage: '8%' }
                  ].map(({ color, label, percentage }) => (
                    <div key={label} className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 ${color} rounded-sm`} />
                        <div className="text-black text-xs font-normal font-['Poppins'] truncate">{label}</div>
                      </div>
                      <div className="text-neutral-600 text-xs font-normal font-['Poppins']">{percentage}</div>
                    </div>
                  ))}
                </div>
                
                {/* Chart placeholder */}
                <div className="flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 via-blue-400 to-neutral-200"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Product Overview Table */}
            <div className="lg:col-span-2 bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-200 overflow-hidden p-3">
              <div className="flex justify-between items-center mb-4">
                <div className="text-zinc-600 text-sm font-normal font-['Poppins']">Product Overview</div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="text-zinc-600">Day</div>
                  <div className="text-blue-700 underline">Month</div>
                  <div className="text-zinc-600">Year</div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs">
                      <th className="text-left p-2">Product</th>
                      <th className="text-left p-2">Product ID</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Price (₹)</th>
                      <th className="text-left p-2">Region</th>
                      <th className="text-left p-2">Last Ordered</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr className="border-b">
                      <td className="p-2">Smart AirPods Max</td>
                      <td className="p-2">#A23XH12</td>
                      <td className="p-2"><span className="px-2 py-1 bg-green-100 text-green-700 rounded">In Stock</span></td>
                      <td className="p-2">₹ 10,900</td>
                      <td className="p-2">United States</td>
                      <td className="p-2">3 days ago</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Eco Bamboo Toothbrush</td>
                      <td className="p-2">#B77YT56</td>
                      <td className="p-2"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Low Stock</span></td>
                      <td className="p-2">₹ 3,500</td>
                      <td className="p-2">Germany</td>
                      <td className="p-2">3 days ago</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">LED Fairy Lights 24ft</td>
                      <td className="p-2">#C98GH22</td>
                      <td className="p-2"><span className="px-2 py-1 bg-green-100 text-green-700 rounded">In Stock</span></td>
                      <td className="p-2">₹ 2,690</td>
                      <td className="p-2">Canada</td>
                      <td className="p-2">2 days ago</td>
                    </tr>
                    <tr>
                      <td className="p-2">Himalayan Salt Lamp</td>
                      <td className="p-2">#D55LK87</td>
                      <td className="p-2"><span className="px-2 py-1 bg-red-100 text-red-700 rounded">Out of Stock</span></td>
                      <td className="p-2">₹ 3,250</td>
                      <td className="p-2">India</td>
                      <td className="p-2">1 days ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Alerts */}
            <div className="bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-200 overflow-hidden p-3">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <img src="/quick_alerts/eva_alert-triangle-fill.svg" alt="Quick Alerts" className="w-4 h-4" />
                  <div className="text-zinc-600 text-sm font-normal font-['Poppins']">Quick Alerts</div>
                </div>
                <button className="w-4 h-4 relative overflow-hidden hover:opacity-70 transition-opacity">
                  <img src="/index_page/01 align center (3).svg" alt="Menu" className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <img src="/quick_alerts/fluent-color_alert-48.svg" alt="Delivery Alert" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-black text-xs font-medium">Your Amazon Echo will arrive today by 7:30 PM</div>
                    <button className="text-stone-500 text-xs hover:text-blue-600 transition-colors">Track Order</button>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <img src="/quick_alerts/gg_arrows-exchange.svg" alt="Restock Alert" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-black text-xs font-medium">Time to restock shampoo</div>
                    <button className="text-stone-500 text-xs hover:text-blue-600 transition-colors">Reorder Now</button>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <img src="/quick_alerts/Vector.svg" alt="Payment Alert" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-black text-xs font-medium">Complete payment for your June 2nd cart</div>
                    <button className="text-stone-500 text-xs hover:text-blue-600 transition-colors">Pay Now</button>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <img src="/quick_alerts/icon-park-solid_juice.svg" alt="Offer Alert" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-black text-xs font-medium">Organic Amla Juice just at ₹299</div>
                    <button className="text-stone-500 text-xs hover:text-blue-600 transition-colors">Add to Cart</button>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleClearAlerts}
                className="w-full text-center text-blue-700 text-xs font-medium hover:underline transition-all mt-4"
              >
                Clear all
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-neutral-500 text-xs font-light font-['Poppins'] py-4">
            Powered by Multilingual AI
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
