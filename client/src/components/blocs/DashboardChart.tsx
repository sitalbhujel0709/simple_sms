"use client"
import React from 'react'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', users: 400 },
  { month: 'Feb', users: 600 },
  { month: 'Mar', users: 800 },
  { month: 'Apr', users: 700 },
  { month: 'May', users: 900 },
  { month: 'Jun', users: 1000 },
];

const DashboardChart = () => {

  return (
    <div className="">
      <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="users" />
      </LineChart>
    </ResponsiveContainer>
    </div>
  )
}

export default DashboardChart