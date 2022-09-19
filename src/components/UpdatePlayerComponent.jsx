import React, { useState, useEffect } from "react";
import { get, put } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import { parseISO, format, toDate } from 'date-fns';
import authHeader from './AuthHeader';
import Moment, { now } from 'moment';


export function UpdatePlayerComponent(props) {

	const [date, setDate] = useState(new Date());
	

    const initialState = {
		name: "",
		surname: "",
		dateOfBirth: date,
	};
	const [player, setPlayer] = useState(initialState);
	
	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function updatePlayer() {
				try {
					const response = await get(`http://localhost:8080/player/${_id}`,{ headers: {"Authorization" : `Bearer `+authHeader(),
					"Access-Control-Allow-Origin": "*",
					 "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
				} });
					
					setPlayer({
						
						name: response.data.name,
						surname: response.data.surname,
						dateOfBirth: response.data.dateOfBirth,

						
						
					}
						
					)
					
					
					console.log(player);
					console.log( response.data.dateOfBirth);
					console.log( player.date);
					
				} catch (error) {
					console.log(error);
				}
			}
			updatePlayer();
		},
		[props]
	);

	function handleSubmit(event) {
		event.preventDefault();
		async function updatePlayerPut() {
			try {
				await put(`http://localhost:8080/player/${_id}`, player,{ headers: {"Authorization" : `Bearer `+authHeader(),
				"Access-Control-Allow-Origin": "*",
				 "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
			} });
				console.log(player);
				navigate(`/`);
			} catch (error) {
				console.log(error);
			}
		}
		updatePlayerPut();
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
            <DatePicker dateFormat="yyyy/MM/dd"  selected={player.dateOfBirth} onChange={(date) => handleChangeDate(date) } />
          </div>

				
				<div className="btn-group">
					<button type="submit" className="btn btn-primary">
						Update
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
export default UpdatePlayerComponent;