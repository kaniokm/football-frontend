import axios from "axios";

const PLAYER_API_BASE_URL = "http://localhost:8080/";

class PlayerService {

    getPlayers(){
        return axios.get(PLAYER_API_BASE_URL + 'players'); 
    }

    createPlayer(player)
    {
        return axios.post(PLAYER_API_BASE_URL + 'player', player);
    }

    getPlayerById(playerId)
    {
        return axios.get(PLAYER_API_BASE_URL + 'player/' + playerId);
    }

    updatePlayer(player, playerId)
    {
        return axios.put(PLAYER_API_BASE_URL + 'player/' + playerId, player);
    }

    deletePlayer(playerId){
        return axios.delete(PLAYER_API_BASE_URL + 'player/' + playerId);
    }

}
export default new PlayerService()