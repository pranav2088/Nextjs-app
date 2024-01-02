"use client"

import React from 'react'
import Layout from "../component/layout"
import Typography from '@mui/material/Typography';
// import PieChart from './charts/piechart';
// import Areachart from './charts/areachart';
import dynamic from 'next/dynamic';
import { Padding } from '@mui/icons-material';

const Areachart= dynamic(()=>import("./charts/areachart"),{
  Padding:()=><p>chart  Loading..</p>
})
const PieChart= dynamic(()=>import("./charts/piechart"),{
  Padding:()=><p>chart  Loading..</p>
})
export default function Analytics() {

  return (
    <>
      <Layout>
        <>
          <h1 className='text-lg mb-2'>Analytics</h1>
          <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-5 rounded-lg shadow-lg px-4 py-4 bg-white' >
            <PieChart />
          </div>
          <div className='col-span-7 rounded-lg shadow-lg px-4 py-4 bg-white'>
            <Areachart />
          </div>
          </div>
       
        </>
      </Layout>
    </>
  )
}
