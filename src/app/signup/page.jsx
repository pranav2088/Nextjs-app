"use client";
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import MenuItem from '@mui/material/MenuItem';
import * as yup from "yup"
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object({
  name: yup.string().matches(/^[A-Z][a-z]*$/, 'Please enter a valid Name with the first letter capitalized and without numbers or special characters').required('Please enter your Name'),
  email: yup.string().email('Please enter a valid email address').matches(/@[a-zA-Z0-9.-]+\.(com|org)$/, 'Invalid email domain. Please use .com or .org').required('Please enter your Email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(32, 'Password must not exceed 32 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)'
    )
    .notOneOf([yup.ref('username')], 'Password must not be the same as the username'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
}).required();


function Signup() {
  const [utype, setUtype] = useState('User');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    Object.assign(data, { type: utype });

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        
        theme: "dark",
      });
      return;
    }

    axios.post('/api/users', JSON.stringify(data))
      .then(response => {
        console.log('data', response)
        toast.success('Data Added!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        router.push("/")
      })
      .catch(err => {
        console.log("ERROR", err)
        toast.error(err, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
  };

  const handleChange = (event) => {
    setUtype(event.target.value);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center mt-16">
        <div style={{ minWidth: "30%" }}>
          <div className=" shadow-lg flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create an account !
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                <div>
                  <TextField fullWidth size="small" label="Name" {...register("name")} variant="outlined" />
                  <p className='text-orange-600 ml-1 text-xs'>{errors.name?.message}</p>
                </div>

                <div>
                  <TextField fullWidth size="small" label="Email" {...register("email")} variant="outlined" />
                  <p className='text-orange-600 ml-1 text-xs'>{errors.email?.message}</p>
                </div>

                <div>
                  <TextField fullWidth size="small" label="Password" {...register("password")} variant="outlined" />
                  <p className='text-orange-600 ml-1 text-xs'>{errors.password?.message}</p>
                </div>
                
                <div>
                  <TextField fullWidth size="small" label="Confirm Password"   {...register('confirmPassword', {
                        validate: (value) => value === watch('password') || 'Passwords do not match',
                      })} variant="outlined" />
                  <p className='text-orange-600 ml-1 text-xs'>{errors.confirmPassword?.message}</p>
                </div>

                <div>
                  <FormControl fullWidth>
                    <InputLabel size="small">Type</InputLabel>
                    <Select
                      value={utype}
                      label="Type"
                      size="small"
                      onChange={handleChange}
                    >
                      <MenuItem value="User">User</MenuItem>
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?{' '}
                <span
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  onClick={() => router.push("/")}
                >
                  Log in
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup;
