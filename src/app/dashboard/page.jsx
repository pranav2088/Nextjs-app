"use client"

import { useEffect, useState } from 'react'
import Layout from "../component/layout"
import Typography from '@mui/material/Typography';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Line, Circle } from 'rc-progress';
import CountUp from 'react-countup';
import axios from 'axios';
export default function Dashboard() {

  const [data, setData] = useState([])

  useEffect(() => {
    getData();
  }, [])
  // fetching the user list info
  const getData = () => {
    axios.get('/api/users')
      .then(response => {

        setData(response.data)

      })
      .catch(err => {
        console.log("ERROR", err)
      })

  }
  
  // Calculate the percentage based on the total number of Registration
  const TotalRegistration = data.length;
  const Regper = (TotalRegistration / 100) * 100; //
  // Differing from type
  //User Type
  const TotalUser = data.filter(user => user.type === 'User');
  const UserCount = TotalUser.length;// calculate  total user role
  const userper = (UserCount / 100) * 100; //

  //Manager Type
  const TotalManager = data.filter(user => user.type === 'Manager');
  const ManagerCount = TotalManager.length// calculate  total user role
  const managerper = (ManagerCount / 100) * 100; //

  //Admin Type
  const TotalAdmin = data.filter(user => user.type === 'Admin');
  const AdminCount = TotalAdmin.length
  const Adminper = (AdminCount / 100) * 100; //



  return (
    <>
      <Layout>
        <>
          <div className='grid grid-cols-4 gap-6'>
            <div className='lg:col-span-1 sm:col-span-4 xs:col-span-4 '>
            
              <div className="mx-auto  bg-white rounded-xl shadow-lg hover:scale-105 transition duration-150">
                <div className="flex justify-between">
                  <div className="ml-7 mt-5 text-3xl">
                    <PeopleAltIcon fontSize='large' />
                  </div>
                  <div className=" mt-5 roundprogess mr-5">
                    <Circle percent={Regper} strokeWidth={10} trailColor='#b3a4f3' trailWidth={8} strokeColor="rgb(2,132,199)  " />
                  </div>
                </div>
                <div className='pl-7 py-5' >
                  <div className="text-bule-600 font-semi-bold">
                    Total Registration
                  </div>
                  <div className="text-3xl font-semibold">
                    <CountUp start={0} end={TotalRegistration} delay={1} />

                  </div>
                </div>
              </div>

            </div>
            <div className='lg:col-span-1 sm:col-span-4 xs:col-span-4 '>
              <div className="mx-auto  bg-white rounded-xl shadow-lg hover:scale-105 transition duration-150">
                <div className="flex justify-between">
                  <div className="ml-7 mt-5 text-3xl">
                    <PeopleAltIcon fontSize='large' />
                  </div>
                  <div className=" mt-5 roundprogess mr-5">
                    <Circle percent={userper} strokeWidth={10} trailColor='#b3a4f3' trailWidth={8} strokeColor="rgb(2,132,199)  " />
                  </div>
                </div>
                <div className='pl-7 py-5' >
                  <div className="text-bule-600 font-semi-bold">
                    Total User
                  </div>
                  <div className="text-3xl font-semibold">
                    <CountUp start={0} end={UserCount} delay={1} />

                  </div>
                </div>
              </div>

            </div>

            <div className='lg:col-span-1 sm:col-span-4 xs:col-span-4 '>
              <div className="mx-auto  bg-white rounded-xl shadow-lg hover:scale-105 transition duration-150">
                <div className="flex justify-between">
                  <div className="ml-7 mt-5 text-3xl">
                    <PeopleAltIcon fontSize='large' />
                  </div>
                  <div className=" mt-5 roundprogess mr-5">
                    <Circle percent={managerper} strokeWidth={10} trailColor='#b3a4f3' trailWidth={8} strokeColor="rgb(2,132,199)  " />
                  </div>
                </div>
                <div className='pl-7 py-5' >
                  <div className="text-bule-600 font-semi-bold">
                    Total Manager's
                  </div>
                  <div className="text-3xl font-semibold">
                    <CountUp start={0} end={ManagerCount} delay={1} />

                  </div>
                </div>
              </div>

            </div>

            <div className='lg:col-span-1 sm:col-span-4 xs:col-span-4 '>
              <div className="mx-auto  bg-white rounded-xl shadow-lg hover:scale-105 transition duration-150">
                <div className="flex justify-between">
                  <div className="ml-7 mt-5 text-3xl">
                    <PeopleAltIcon fontSize='large' />
                  </div>
                  <div className=" mt-5 roundprogess mr-5">
                    <Circle percent={Adminper} strokeWidth={10} trailColor='#b3a4f3' trailWidth={8} strokeColor="rgb(2,132,199)  " />
                  </div>
                </div>
                <div className='pl-7 py-5' >
                  <div className="text-bule-600 font-semi-bold">
                    AdminCount
                  </div>
                  <div className="text-3xl font-semibold">
                    <CountUp start={0} end={AdminCount} delay={1} />

                  </div>
                </div>
              </div>

            </div>

            <div className='lg:col-span-1 sm:col-span-4 xs:col-span-4'>
              <div className="mx-auto bg-white rounded-xl shadow-lg hover:scale-105 transition duration-150">
                <div className="flex flex-col items-center">
                  <div className="mt-5 text-3xl">
                    <PeopleAltIcon fontSize='large' />
                  </div>
                  <div className="mt-5 roundprogess">
                    <Circle percent={77} strokeWidth={10} trailColor='#b3a4f3' trailWidth={8} strokeColor="rgb(2,132,199)" />
                  </div>
                  <div className='py-20 text-center'>
                    <div className="text-bule-100 font-semi-bold">
                      Total User
                    </div>
                    <div className="text-3xl font-semibold">
                      <CountUp start={0} end={127} delay={1} />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </>
      </Layout >
    </>
  )
}
