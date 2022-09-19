import React, { useState, useEffect } from "react";
import { post } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function CreatePlayerComponent() {

	const [date, setDate] = useState(new Date());

	const initialState = {
		name: "",
		surname: "",
		dateOfBirth: date,
	};
	const [player, setPlayer] = useState(initialState);
	
	
	const navigate = useNavigate();

	

	function handleSubmit(event) {
		event.preventDefault();
		async function addPlayer() {
			try {
				await post(`http://localhost:8080/player/`, player);
				console.log(player);
				navigate(`/`);
			} catch (error) {
				console.log(error);
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
            <DatePicker dateFormat="yyyy/MM/dd" selected={player.dateOfBirth} startDate={player.dateOfBirth} onChange={date => handleChangeDate(date)  } />
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
		</div>
	);
    
};
export default CreatePlayerComponent;