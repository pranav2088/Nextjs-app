"use client"

import { useState } from 'react'

import Layout from "../component/layout"

import UsersList from './usersList';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Users() {
 
  return (
    <>
      <Layout>
      <UsersList />
      
      </Layout>
    </>
  )
}
