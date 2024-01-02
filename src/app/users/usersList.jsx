import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';

import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Userdetails from './userdetails'

export default function UserList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    const [adduser, setAdduser] = useState(false)
    const [rows, setRows] = useState([null])
    const handleadduserclose = () => {
        setAdduser(false)
    }

    useEffect(() => {
        getData();
    }, [adduser])

    const getData = () => {
        axios.get('/api/users')
            .then(response => {
                console.log('data', response)
                setData(response.data)

            })
            .catch(err => {
                console.log("ERROR", err)
            })
        console.log('Data');
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //DELETE
    const deleterecord = (row) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleterow(row)
                },
                {
                    label: 'No',
                }
            ]
        });

    };

    const deleterow = (row) => {
        let data = JSON.stringify({
            "id": row.id,
        });
        let config = {
            method: 'delete',
            url: "/api/users",
            data: data
        }
        axios.request(config)
            .then(response => {

                toast.success('Data Deleted!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                getData();
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
    }
    const addrecord = () => {

        setRows(null)
        setAdduser(true)

    };

    //UPDATE
    const editrecord = (row) => {

        setRows(row)
        setAdduser(true)

    };
    const dateformatter = (dateString) => {
        const parseDate = new Date(dateString);
        return format(parseDate, "MMM d,yyyy h:mm a")
    };
    return (
        <>
            <ToastContainer />
            {adduser ? (<Userdetails handleadduserclose={handleadduserclose} rows={rows} />) : (
                <>
                    <div className='flex justify-between'>
                        <h1 className="font-bold mb-4">Users</h1>
                        <div>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outlined" className='mb-2' onClick={() => addrecord()} endIcon={<AddCircleIcon />}>
                            Add User
                        </Button>
                    </div>

                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            align="right"
                                            style={{ minWidth: 70 }}
                                        >
                                            ID
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            style={{ minWidth: 70 }}
                                        >
                                            Name
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            style={{ minWidth: 70 }}
                                        >
                                            Email
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            style={{ minWidth: 70 }}
                                        >
                                            Type
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            style={{ minWidth: 70 }}
                                        >
                                            Password
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{ minWidth: 70 }}
                                        >
                                            Created_at
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{ minWidth: 70 }}
                                        >
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data
                                        .filter(row =>
                                            row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            row.email.toLowerCase().includes(searchTerm.toLowerCase())||
                                            row.type.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    <TableCell key={index} align="right">
                                                        {row.id}
                                                    </TableCell>
                                                    <TableCell key={index} align="right">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell key={index} align="right">
                                                        {row.email}
                                                    </TableCell>
                                                    <TableCell key={index} align="right">
                                                        {row.type}
                                                    </TableCell>
                                                    <TableCell key={index} align="right">
                                                        {row.password}
                                                    </TableCell>
                                                    <TableCell key={index} align="right">
                                                        {dateformatter(row.created_at)}
                                                    </TableCell>
                                                    <TableCell key={index} align="right">
                                                        <div className='flex justify-center'>
                                                            <div className='cursor-pointer text-green-700 mr-2' onClick={() => editrecord(row)}>
                                                                <EditIcon />
                                                            </div>
                                                            <div className='cursor-pointer text-orange-700' onClick={() => deleterecord(row)}>
                                                                <DeleteIcon />
                                                            </div>
                                                        </div>
                                                    </TableCell>

                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={data.filter(row =>
                                row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                row.type.toLowerCase().includes(searchTerm.toLowerCase())
                            ).length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />

                    </Paper>

                </>
            )


            }



        </>

    );
}