
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { Users, Ticket, BarChart3, Settings, Bell } from "lucide-react";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "Active" },
];

const analyticsData = [
  { name: "Jan", Users: 40, Tickets: 30 },
  { name: "Feb", Users: 50, Tickets: 35 },
  { name: "Mar", Users: 45, Tickets: 40 },
  { name: "Apr", Users: 60, Tickets: 50 },
  { name: "May", Users: 70, Tickets: 55 },
];

const totalUsers = users.length;
const activeUsers = users.filter((user) => user.status === "Active").length;
const notifications = 5; // Example static notification count

const userPieData = [
  { name: "Active", value: activeUsers },
  { name: "Inactive", value: totalUsers - activeUsers },
];

const COLORS = ["#4F46E5", "#F59E0B"];

export default function SupportDashboard() {
  const [activeTab, setActiveTab] = useState("Users");

  return (
    <div className="h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="bg-white p-4 shadow-lg flex justify-around">
        {[
          { label: "Users", icon: <Users className="w-5 h-5" /> },
          { label: "Tickets", icon: <Ticket className="w-5 h-5" /> },
          { label: "Analytics", icon: <BarChart3 className="w-5 h-5" /> },
          { label: "Settings", icon: <Settings className="w-5 h-5" /> },
        ].map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-2 p-2 rounded-lg transition ${
              activeTab === item.label ? "bg-blue-500 text-white px-4" : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(item.label)}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      {/* Summary Section */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow-md rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg text-center">
          <h3 className="text-lg font-semibold">Active Users</h3>
          <p className="text-2xl font-bold text-green-500">{activeUsers}</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg text-center">
          <h3 className="text-lg font-semibold">New Notifications</h3>
          <p className="text-2xl font-bold text-red-500">{notifications}</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === "Users" && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <div key={user.id} className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <p className={user.status === "Active" ? "text-green-500" : "text-red-500"}>
                    {user.status}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Tickets" && (
          <section>
            <h2 className="text-2xl font-bold">Tickets</h2>
            <p className="text-gray-600">Ticket management interface.</p>
          </section>
        )}

        {activeTab === "Analytics" && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <div className="bg-white p-4 shadow-md rounded-lg">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Users" fill="#4F46E5" />
                  <Bar dataKey="Tickets" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

        {activeTab === "Settings" && (
          <section>
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-gray-600">Configure your settings here.</p>
          </section>
        )}
      </main>

      {/* Bottom Section with Pie Chart and Bar Chart */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-bold mb-2 text-center">User Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={userPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {userPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-bold mb-2 text-center">Monthly Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Users" fill="#4F46E5" />
              <Bar dataKey="Tickets" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
