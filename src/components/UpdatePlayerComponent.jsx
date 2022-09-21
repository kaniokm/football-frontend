import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { DatePicker,LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

import PlayerService from "../services/PlayerService";


export function UpdatePlayerComponent(props) {

	
	const [open, setOpen] = React.useState(false);
	const [openFail, setOpenFail] = React.useState(false);
	const [errorText, setErrorText] = React.useState(false);

	

    const initialState = {
		name: "",
		surname: "",
		dateOfBirth: new Date(),
		position: "",
	};
	const [player, setPlayer] = useState(initialState);
	
	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function updatePlayer() {
				try {
					const response = await PlayerService.getPlayerById(_id);
					
					setPlayer({
						
						name: response.data.name,
						surname: response.data.surname,
						dateOfBirth: response.data.dateOfBirth,
						position: response.data.position,
						
						
					}
						
					)
					
					
					
					
				} catch (error) {
					console.log(error);
				}
			}
			updatePlayer();
		},
		
	);
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

	function handleSubmit(event) {
		event.preventDefault();
		async function updatePlayerPut() {
			try {
				await PlayerService.updatePlayer(player,_id);
				console.log(player);
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
		updatePlayerPut();
	}

	function handleChange(event) {
		setPlayer({ ...player, [event.target.name]: event.target.value });
		console.log(player);
	}

	function handleChangeDate(date) {
		setPlayer({...player, dateOfBirth: date})
	  }


	function handleCancel() {
		navigate(`/`);
	}


    

    
    return (
		<div className="container">
			<h1>Edit {player.name}</h1>
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
    			onChange={(date) => handleChangeDate(date) }
    			renderInput={(params) => <TextField {...params} />}
  				/>
            </LocalizationProvider>
          </div>

		  <div className="form-group">
					<label>Position</label>
					<select name="position" value={player.position} onChange={handleChange} className="form-control">
							
  							<option value="STRIKER">Striker</option>
  							<option value="MIDFIELD">Midfield</option>
  							<option value="DEFENDER">Defender</option>
  							<option value="GOALKEEPER">Goalkeeper</option>
					</select>
					
				</div>

				
				<div className="btn-group">
					<button type="submit" className="btn btn-primary">
						Update
					</button>
					<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  action={action}>
                                        <Alert severity="success">Smazáno!</Alert>
                                                                     </Snackbar>
                                        <Snackbar open={openFail} autoHideDuration={6000} onClose={handleClose}  action={action}>
                                        <Alert severity="error">{errorText}</Alert>
                                                                     </Snackbar>
					<button
						type="button"
						onClick={handleCancel}
						className="btn btn-secondary"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
    
};
export default UpdatePlayerComponent;