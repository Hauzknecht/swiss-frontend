import React, { useState, useEffect } from "react";
import TournamentService from "../services/tournament.service";
import AuthService from "../services/auth.service";
import Tournament from "./Tournament";

const History = () => {
    const [tournaments, setTournaments] = useState([]);
    const [tournametsUpdated, setTournamentsUpdated] = useState(false);
  
    useEffect(() => {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        TournamentService.getUserFinishedTournaments().then(
          (response) => {
            setTournaments(response.data);
            setTournamentsUpdated(false)
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }, [tournametsUpdated]);
  
    const handleDeleteTournament = (id) => {
     TournamentService.deleteTournament({id}).then(
      (response) => {
        setTournamentsUpdated(true);
      },
      (error) => {
        console.log(error)
      }
     )
    };
    return(
        <div className="col-lg-8 mx-auto p-4 py-md-5">
            { (tournaments.length !==0) && (
            <div className="d-flex justify-content-center">
            <h4 className="text-body-emphasis">Choose from finished tournaments:</h4>
          </div>
          )}
          { (tournaments.length ===0) && (
            <div className="d-flex justify-content-center">
            <h4 className="text-body-emphasis">You dont have any finished tournaments yet.</h4>
          </div>
          )}
          
          <div className="d-flex flex-wrap justify-content-center">
            {tournaments.map(tournament => (
                <Tournament key={tournament.id} tournament={tournament} onDelete={handleDeleteTournament}/>                
            ))}
          </div>
        </div>
    )
}

export default History;