
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="h-screen w-screen flex bg-stone-50 overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="flex-shrink-0 p-5">
          <Header />
        </div>
        
        <div className="flex-1 overflow-y-auto p-5">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <p className="text-gray-600">Welcome to your dashboard, {user?.email}</p>
            
            {/* Dashboard content can be added here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
                <p className="text-gray-600">Your activity overview</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
                <p className="text-gray-600">Track your purchases</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                <p className="text-gray-600">Personalized for you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
