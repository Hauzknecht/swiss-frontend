import api from "./api";

const getUserOngoingTournaments = () => {
    return api.get("/tournaments/ongoing");
  };

const getUserFinishedTournaments = () => {
    return api.get("/tournaments/finished");
  };

const getTournamentDetail = ({id}) =>{
  return api.get(`/tournament/${id}`);
}

const getPairingsAndStandings = ({id}) => {
  return api.get(`/tournament/${id}/round`);
}

const reportRound = ({id}, {formData}) => {
  return api.post(`/tournament/${id}/round`, formData);
}

const createTournament = ({formData}) => {
  return api.post('/tournament', formData);
}

const deleteTournament = ({id}) => {
  return api.delete(`/tournament/${id}`);
}

const tournamentService = {
    getUserOngoingTournaments,
    getUserFinishedTournaments,
    getTournamentDetail,
    getPairingsAndStandings,
    reportRound,
    createTournament,
    deleteTournament,
};

export default tournamentService;