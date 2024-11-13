// import { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';

// const SetTime = () => {
//     const [formData, setFormData] = useState({
//         time: '',
//     });

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     return (
//         <TextField
//             select
//             margin="dense"
//             name="time"
//             label="Select Hour"
//             fullWidth
//             variant="standard"
//             value={formData.time}
//             onChange={handleChange}
//         >
//             {/* Loop to create hour options from 9 AM to 2 PM */}
//             {[...Array(8)].map((_, index) => {
//                 const hour = 9 + index; // 9 AM to 2 PM
//                 const label = hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
//                 return (
//                     <MenuItem key={hour} value={`${hour}:00`}>
//                         {label}
//                     </MenuItem>
//                 );
//             })}
//         </TextField>
//     );
// };

// export default SetTime;
