import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";


import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

import PlayerService from "../services/PlayerService";
import { DatePicker,LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export function CreatePlayerComponent() {

	
	const [open, setOpen] = React.useState(false);
	const [openFail, setOpenFail] = React.useState(false);
	const [errorText, setErrorText] = React.useState(false);

	const initialState = {
		name: "",
		surname: "",
		dateOfBirth: new Date(),
		position: "STRIKER",
	};
	const [player, setPlayer] = useState(initialState);
	
	
	const navigate = useNavigate();

	

	function handleSubmit(event) {
		event.preventDefault();
		async function addPlayer() {
			try {
				await PlayerService.createPlayer(player);
				console.log(player);
				setOpen(true);
				navigate(`/`);
			} catch (error) {
				if (error.response.status === 401)
            {
                setErrorText("You are not authorised")
            }
            else
            {
                setErrorText("Unsuccesful action")
            }


			console.error(error);
            setOpenFail(true);
			}
		}
		addPlayer();
	}

	function handleChange(event) {
		setPlayer({ ...player, [event.target.name]: event.target.value });
	}

	function handleChangeDate(date) {
		setPlayer({...player, dateOfBirth: date})
	  }

	function handleCancel() {
		navigate(`/`);
	}

	



	const handleClose = () => {
        
    
        setOpen(false);
        setOpenFail(false);
      };
    
      const action = (
        <React.Fragment>
          
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );


    

    
    return (
		<div className="container">
			<h1>Add player</h1>
			<hr />
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Name</label>
					<input
						name="name"
						type="text"
						value={player.name}
						onChange={handleChange}
						className="form-control"
					/>
				</div>

                <div className="form-group">
					<label>Surname</label>
					<input
						name="surname"
						type="text"
						value={player.surname}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
            <label>Select Date: </label>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
	  	inputFormat="DD/MM/YYYY"
        label="Basic example"
        value={player.dateOfBirth}
        onChange={(date) => handleChangeDate(date)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
            
          </div>

		  <div className="form-group">
					<label>Position</label>
					<select name="position" value={player.position} onChange={handleChange} className="form-control">
							
  							<option selected value="STRIKER">Striker</option>
  							<option value="MIDFIELD">Midfield</option>
  							<option value="DEFENDER">Defender</option>
  							<option value="GOALKEEPER">Goalkeeper</option>
					</select>
					
				</div>

				
				<div className="btn-group">
					<button type="submit" className="btn btn-primary">
						Add
					</button>
					
					
					<button
						type="button"
						onClick={handleCancel}
						className="btn btn-secondary"
					>
						Cancel
					</button>
				</div>
			</form>

			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  action={action}>
                                        <Alert severity="success">Smazáno!</Alert>
                                                                     </Snackbar>
                                        <Snackbar open={openFail} autoHideDuration={6000} onClose={handleClose}  action={action}>
                                        <Alert severity="error">{errorText}</Alert>
                                                                     </Snackbar>
		</div>
	);
    
};
export default CreatePlayerComponent;