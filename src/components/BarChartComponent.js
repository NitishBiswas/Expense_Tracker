import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartComponent = ({data}) => {
  return (
    <div className='bg-white'>
      <BarChart
          style={{backgroundColor: 'white'}}
          width={350}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
          barSize={70}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 50, right: 50 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
    </div>
  )
}

export default BarChartComponent
