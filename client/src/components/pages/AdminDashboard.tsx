import React from 'react'
import Card from '../blocs/Card';
import DashboardChart from '../blocs/DashboardChart';

const AdminDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Total Users" data="1,234" />
        <Card title="Total Messages" data="5,678" />
        <Card title="Total Revenue" data="$9,012" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="col-span-1 md:col-span-2">

        <DashboardChart />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard