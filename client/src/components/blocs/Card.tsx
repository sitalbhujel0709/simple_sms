import React from 'react'

const Card = ({title, data}: { title: string; data: string }) => {
  return (
    <div className="max-w-sm w-full rounded shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-4xl font-semibold">{data}</p>
    </div>
  )
}

export default Card