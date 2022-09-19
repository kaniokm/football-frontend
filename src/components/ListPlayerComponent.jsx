
import React, {action, useState, useEffect } from 'react'
import { Button, Row, Table } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from "axios";
import authHeader from './AuthHeader';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { matchSorter } from 'match-sorter';
import PlayerService from '../services/PlayerService';
import { parseISO, format, toDate } from 'date-fns';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';
import Moment from 'moment';


function ListPlayerComponent() {

    const [players, setPlayers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [openFail, setOpenFail] = React.useState(false);

    const getAllData = () => {
        axios.get('http://localhost:8080/players' ).then((response) => {
            const myPlayers = response.data;
        setPlayers(myPlayers);
    })
        ;
        
        
      }
    
    useEffect(() =>{
        getAllData();
			
			
		
	}, []);
    

    
    

    
    
    async function handleDelete(id) {
		try {
            console.log(authHeader())
			await axios.delete(`http://localhost:8080/playerdel/${id}`,
             { headers: {"Authorization" : `Bearer `+authHeader(),
            "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        } });
            getAllData();
            setOpen(true);

			
		} catch (error) {
			console.error(error);
            setOpenFail(true);
            
		}


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
            
        <div>

            <h2 className="text-center" style={{padding:"1em"}}>Players List</h2>
            <div style={{textAlign:'left'}}>
            
                
            </div>
            <Row>
                <Table striped bordered responsive hover>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>Position</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            players.map(
                                player => 
                                <tr key = {player.id}>
                                    <td> {player.name} </td>
                                    <td> {player.surname} </td>
                                    <td> {Moment(player.dateOfBirth).format('DD. MMM YYYY')} </td>
                                    <td> {player.position}</td>
                                    
                                    <td>
                                        
                                        <Link to={{ pathname:`/update-player/${player.id}`}}> <Button color="primary">Update</Button> </Link>
                                        <Button onClick={() => handleDelete(player.id)} className="btn btn-danger">Delete</Button>
                                        
                                    </td>
                                </tr>
                            )


                            
                        }
                    </tbody>
                </Table>
            </Row>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  action={action}>
                                        <Alert severity="success">Smazáno!</Alert>
                                                                     </Snackbar>
                                        <Snackbar open={openFail} autoHideDuration={6000} onClose={handleClose}  action={action}>
                                        <Alert severity="error">Akce se nezdařila</Alert>
                                                                     </Snackbar>
        </div>
    );
    
};
export default ListPlayerComponent;
