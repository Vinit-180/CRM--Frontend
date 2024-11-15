// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';
// import axios from "axios";
// function createData(id, first_name, last_name, email, phone_number) {
//   return {
//     id,
//     first_name,
//     last_name,
//     email,
//     phone_number,
//     // protein,
//   };
// }


// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// const headCells = [
//   {
//     id: 'firstName',
//     numeric: false,
//     disablePadding: true,
//     label: 'First Name',
//   },
//   {
//     id: 'lastName',
//     numeric: false,
//     disablePadding: true,
//     label: 'Last Name',
//   },
//   {
//     id: 'email',
//     numeric: false,
//     disablePadding: false,
//     label: 'email',
//   },
//   {
//     id: 'phoneNumber',
//     numeric: false,
//     disablePadding: false,
//     label: 'Phone Number',
//   },
//   // {
//   //   id: 'carbs',
//   //   numeric: true,
//   //   disablePadding: false,
//   //   label: 'Carbs (g)',
//   // },
//   // {
//   //   id: 'protein',
//   //   numeric: true,
//   //   disablePadding: false,
//   //   label: 'Protein (g)',
//   // },
// ];

// function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//     props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all desserts',
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;
//   return (
//     <Toolbar
//       sx={[
//         {
//           pl: { sm: 2 },
//           pr: { xs: 1, sm: 1 },
//         },
//         numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         },
//       ]}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Contact List
//         </Typography>
//       )}
//       {numSelected > 0 && (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// const TableComponent = () => {
//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('calories');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [rows,setRows] = React.useState([]);
  
//   // createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
  
//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   // const visibleRows = React.useMemo(
//   //   () =>
//   //     [...rows]
//   //       .sort(getComparator(order, orderBy))
//   //       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//   //   [order, orderBy, page, rowsPerPage],
//   // );
//   const visibleRows = React.useMemo(
//     () =>
//       [...rows]
//         .sort(getComparator(order, orderBy))
//         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//     [rows, order, orderBy, page, rowsPerPage] // Include rows here
//   );
  

//   React.useEffect(()=>{
//       axios.get("http://localhost:9000/api/v1/contacts").then((data)=>{
//         console.log(data);
//         const formattedData = data?.data?.data?.map((e) =>
//           createData(e?._id, e?.firstName, e?.lastName, e?.email, e?.phoneNumber)
//         );
//         console.log(formattedData)
//         setRows(formattedData)
//         // setRows((prevRows) => [...prevRows, ...formattedData]);
//         // data?.data?.data?.map((e)=>{
//         //   console.log(e);
//         //   setRows([...rows,createData(e?._id,e?.firstName,e?.lastName,e?.email,e?.phoneNumber)])
//         // })
//         // setRows(data.data.data);
//       }).catch((err)=>{
//         console.log(err);
//       })
//   },[]);

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Paper sx={{ width: '100%', mb: 2 }}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <TableContainer>
//           <Table
//             sx={{ minWidth: 750 }}
//             aria-labelledby="tableTitle"
//             size={dense ? 'small' : 'medium'}
//           >
//             <EnhancedTableHead
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
//             <TableBody>
//               {rows.length>0 && visibleRows.map((row, index) => {
//                 const isItemSelected = selected.includes(row.id);
//                 const labelId = `enhanced-table-checkbox-${index}`;

//                 return (
//                   <TableRow
//                     hover
//                     onClick={(event) => handleClick(event, row.id)}
//                     role="checkbox"
//                     aria-checked={isItemSelected}
//                     tabIndex={-1}
//                     key={row.id}
//                     selected={isItemSelected}
//                     sx={{ cursor: 'pointer' }}
//                   >
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         color="primary"
//                         checked={isItemSelected}
//                         inputProps={{
//                           'aria-labelledby': labelId,
//                         }}
//                       />
//                     </TableCell>
//                     {console.log(row)}
//                     <TableCell
//                       component="th"
//                       id={labelId}
//                       scope="row"
//                       padding="none"
//                     >
//                       {row?.first_name}
//                     </TableCell>
//                     <TableCell align="right">{row?.last_name}</TableCell>
//                     <TableCell align="right">{row?.email}</TableCell>
//                     <TableCell align="right">{row?.phone_number}</TableCell>
//                     {/* <TableCell align="right">{row.protein}</TableCell> */}
//                   </TableRow>
//                 );
//               })}
//               {emptyRows > 0 && (
//                 <TableRow
//                   style={{
//                     height: (dense ? 33 : 53) * emptyRows,
//                   }}
//                 >
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//       <FormControlLabel
//         control={<Switch checked={dense} onChange={handleChangeDense} />}
//         label="Dense padding"
//       />
//     </Box>
//   );
// }
// export default TableComponent;

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./ContactForm";
import EditIcon from '@mui/icons-material/Edit';
const TableComponent=()=>{
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [edit,setEdit]=useState(false);
  const [editContact,setEditContact]=useState([]);
  var editKey=0;
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    axios.get("http://localhost:9000/api/v1/contacts").then((data)=>{
      console.log(data);
    setContacts(data.data.data);  
    }).catch((err)=>{
      console.log(err);
    })
    // setContacts(data.data.data);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:9000/api/v1/contacts/${id}`).then((data)=>{
      console.log(data);
      fetchContacts();
    }).catch((err)=>{
      console.log(err);
    });
  };


  const handleUpdate=(id)=>{
    axios.get(`http://localhost:9000/api/v1/contacts/${id}`).then((data)=>{
      console.log(data);
      setEdit(true);
      editKey+=1;
      setEditContact(data.data.data);
    }).catch((err)=>{
      console.log(err);
    });
  }

  return (
    <>
    <ContactForm fetchContacts={fetchContacts}  />
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact) => (
            <TableRow key={contact._id}>
              <TableCell>{contact?.firstName}</TableCell>
              <TableCell>{contact?.lastName}</TableCell>
              <TableCell>{contact?.email}</TableCell>
              <TableCell>{contact?.phoneNumber}</TableCell>
              <TableCell>{contact?.company}</TableCell>
              <TableCell>{contact?.jobTitle}</TableCell>
              <TableCell>
                <IconButton onClick={()=>handleUpdate(contact?._id)}>
                <EditIcon /></IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(contact?._id)}><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value))}
      />
    </TableContainer>

    {edit && <ContactForm isOpen={true} data={editContact} type={"update"} fetchContacts={fetchContacts}  key={editKey}/>}
    </>
  );
};

export default TableComponent;