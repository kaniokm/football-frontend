import React, { useState, useEffect } from "react";
import { post } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import authHeader from './AuthHeader';

export function CreatePlayerComponent() {

	const [date, setDate] = useState(new Date());
	const [open, setOpen] = React.useState(false);
	const [openFail, setOpenFail] = React.useState(false);

	const initialState = {
		name: "",
		surname: "",
		dateOfBirth: date,
		position: "STRIKER",
	};
	const [player, setPlayer] = useState(initialState);
	
	
	const navigate = useNavigate();

	

	function handleSubmit(event) {
		event.preventDefault();
		async function addPlayer() {
			try {
				await post(`http://localhost:8080/player`, player,{ headers: {"Authorization" : `Bearer `+authHeader(),
				"Access-Control-Allow-Origin": "*",
				 "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
			} });
				console.log(player);
				setOpen(true);
				navigate(`/`);
			} catch (error) {
				console.log(error);
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

	function updatePosition(position) {
        setPlayer({
            position: position.value
        });
    };



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
            <DatePicker dateFormat="yyyy/MM/dd"  selected={player.dateOfBirth} onChange={(date) => handleChangeDate(date) } />
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
                                        <Alert severity="error">Akce se nezdařila</Alert>
                                                                     </Snackbar>
		</div>
	);
    
};
export default CreatePlayerComponent;