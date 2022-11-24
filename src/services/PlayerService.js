import axios from "axios";
import authHeader from "../components/AuthHeader";

const PLAYER_API_BASE_URL = "http://localhost:8080/";
const headers = {"Authorization" : `Bearer `+authHeader(),
"Access-Control-Allow-Origin": "*",
 "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
};
class PlayerService {

    

    getPlayers(){
        
        return axios.get(PLAYER_API_BASE_URL + `players`); 
    }

    createPlayer(player)
    {
        return axios.post(PLAYER_API_BASE_URL+`player`, player,{ headers: headers });
    }

    getPlayerById(playerId)
    {
        return axios.get(PLAYER_API_BASE_URL + `player/${playerId}`,{ headers: headers })
    }

    updatePlayer(player, playerId)
    {
        return axios.put(PLAYER_API_BASE_URL +`player/${playerId}`, player,{ headers: headers})
    }

    deletePlayer(playerId){
        return axios.delete(PLAYER_API_BASE_URL +`player/${playerId}`,
             { headers: headers });
        
    }

    getPlayerTeamNameById(playerId)
    {
        let teamName =
        axios.get(PLAYER_API_BASE_URL +`playerTeamName/${playerId}`,
        { headers: headers });
        return teamName;
    }

    


}
export default new PlayerService()