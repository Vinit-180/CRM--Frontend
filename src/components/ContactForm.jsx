import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const ContactForm = ({fetchContacts,isOpen,type,data}) => {
  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", phoneNumber: "", company: "", jobTitle: "" });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error,setError]=useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };
  useEffect(()=>{
    setOpen(isOpen);
    if(type==='update'){
        setContact(data);
    }
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit(contact);
    if(type==='update')
    {
        axios.put(`http://localhost:9000/api/v1/contacts/${contact._id}`,contact).then((data)=>{
            console.log(data);
          setContact({ firstName: "", lastName: "", email: "", phoneNumber: "", company: "", jobTitle: "" });
          setOpen(false);
          fetchContacts();
          }).catch((err)=>{
            console.log(err);
          })

    }
    else
    {
        axios.post("http://localhost:9000/api/v1/contacts",contact).then((data)=>{
        console.log(data);
      setContact({ firstName: "", lastName: "", email: "", phoneNumber: "", company: "", jobTitle: "" });
      setOpen(false);
      fetchContacts();
      }).catch((err)=>{
        setError(err.response?.data?.message)
        console.log(err,err.response?.data?.message);
      })
    }
  };

  return (
<>
    {type!=='update' &&  <div className="flex w-100"> <Button  className="items-end justify-end" onClick={handleOpen}>Add new Contact</Button> </div>}
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box sx={style}>

<form onSubmit={handleSubmit}>
    {error && <span className="text-red-500 py-4" >{error}</span>}
      <TextField name="firstName" label="First Name" value={contact.firstName} onChange={handleChange} fullWidth margin="normal" required="true"  />
      <TextField name="lastName" label="Last Name" value={contact.lastName} onChange={handleChange} fullWidth margin="normal" required="true"  />
      <TextField name="email" label="Email" value={contact.email} type="email" onChange={handleChange} fullWidth margin="normal" required="true"  />
      <TextField name="phoneNumber" label="Phone Number" type="number" value={contact.phoneNumber} onChange={handleChange} fullWidth margin="normal" required="true"  />
      <TextField name="company" label="Company" value={contact.company} onChange={handleChange} fullWidth margin="normal" />
      <TextField name="jobTitle" label="Job Title" value={contact.jobTitle} onChange={handleChange} fullWidth margin="normal" />
      <Button type="submit" variant="contained" color={`${type==='update' ? 'primary' : 'success'}`}>
        {type==='update' ? 'Edit Contact' :'Add Contact'}
        </Button>
    </form>
  {/* <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Text in a modal
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </Typography>
    */}
  </Box>
</Modal>
</>
    
  );
};

export default ContactForm;
