import axios from "axios";
import authHeader from "../components/AuthHeader";

const PLAYER_API_BASE_URL = "http://localhost:8080/";

class PlayerService {

    getPlayers(){
        
        return axios.get(PLAYER_API_BASE_URL + `players`); 
    }

    createPlayer(player)
    {
        return axios.post(PLAYER_API_BASE_URL+`player`, player,{ headers: {"Authorization" : `Bearer `+authHeader(),
        "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    } });
    }

    getPlayerById(playerId)
    {
        return axios.get(PLAYER_API_BASE_URL + `player/${playerId}`,{ headers: {"Authorization" : `Bearer `+authHeader(),
        "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    } })
    }

    updatePlayer(player, playerId)
    {
        return axios.put(PLAYER_API_BASE_URL +`player/${playerId}`, player,{ headers: {"Authorization" : `Bearer `+authHeader(),
        "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    } })
    }

    deletePlayer(playerId){
        return axios.delete(PLAYER_API_BASE_URL +`playerdel/${playerId}`,
             { headers: {"Authorization" : `Bearer `+authHeader(),
            "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        } });
        
    }

    getPlayerTeamNameById(playerId)
    {
        let teamName =
        axios.get(PLAYER_API_BASE_URL +`playerTeamName/${playerId}`,
        { headers: {"Authorization" : `Bearer `+authHeader(),
       "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
   } });
        return teamName;
    }

    


}
export default new PlayerService()