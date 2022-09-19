import './App.css';
import ListPlayerComponent from './components/ListPlayerComponent';
import { Container } from 'reactstrap';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Link} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import Heading from './components/Heading';
import FooterComponent from './components/FooterComponent';
import CreatePlayerComponent from './components/CreatePlayerComponent';
import UpdatePlayerComponent from './components/UpdatePlayerComponent';
import Login from "./components/Login";

import AuthService from "./components/AuthService";
import { useState, useEffect } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };






  return (
    
    <div className="App">





      
      <Router>
          <Heading/>
            <Container>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route exact path="/" element={<ListPlayerComponent />}></Route>
                <Route exact path="/players" element={<ListPlayerComponent />}></Route>
                <Route exact path="/add-player" element={<CreatePlayerComponent />}></Route>
                <Route exact path="/update-player/:_id" element={<UpdatePlayerComponent />}></Route>
              </Routes>
            </Container>
            
          <FooterComponent />
      </Router>
    </div>
  );
}

export default App;

