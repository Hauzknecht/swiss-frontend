import React, { useState, useEffect } from "react";
import TournamentService from "../services/tournament.service";
import AuthService from "../services/auth.service";
import Tournament from "./Tournament";
import { Link } from "react-router-dom";

const Home = () => {
  const [tournaments, setTournaments] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [tournametsUpdated, setTournamentsUpdated] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      TournamentService.getUserOngoingTournaments().then(
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

  return (
    <div>
      {currentUser ? (
        <div className="col-lg-8 mx-auto p-4 py-md-5">
          <h1 className="text-body-emphasis">Welcome to our tournament management platform.</h1>
          <div className="d-flex justify-content-around my-3">
            <Link to="/create"><button className="btn btn-success p-3">Create new tournament</button></Link>
          </div>
          { (tournaments.length !==0) && (
            <div className="d-flex justify-content-center">
            <h4 className="text-body-emphasis">Choose from ongoing tournaments:</h4>
          </div>
          )}
          
          <div className="d-flex flex-wrap justify-content-center">
            {tournaments.map(tournament => (
                <Tournament key={tournament.id} tournament={tournament} onDelete={handleDeleteTournament}/>                
            ))}
          </div>
        </div>
      ): (
        <div className="col-lg-8 mx-auto p-4 py-md-5">
        <main>
          <h1 className="text-body-emphasis">Welcome to our tournament management platform.</h1>
          <p className="fs-5 col-md-8">Take your tournaments to the next level with our intuitive Swiss-style tournament system, designed to handle tiebreakers with precision. Whether you're organizing a chess competition, a gaming tournament, or any other event, our platform ensures fairness and efficiency.</p>

          <hr className="col-3 col-md-12 mb-5" />

          <div className="row g-5">
            <div className="col-md-4">
              <h2 className="text-body-emphasis">Swiss-Style Tournaments</h2>
              <p>Say goodbye to elimination brackets and hello to a more balanced and inclusive tournament structure.</p>
            </div>

            <div className="col-md-4">
              <h2 className="text-body-emphasis">Tiebreaker Scoring</h2>
              <p>Our platform calculates tiebreakers using a sophisticated algorithm that considers factors such as opponent match winrate and opponent's game winrate, ensuring accurate rankings.</p>
            </div>

            <div className="col-md-4">
              <h2 className="text-body-emphasis">Bye Management</h2>
              <p>Even with an odd number of players, our platform handles bye rounds seamlessly, ensuring that every participant gets a fair chance to compete. Plus, byes are counted as a win, maintaining the integrity of the tournament.</p>
            </div>

          </div>
          <h3 className="text-body-emphasis">To continue please Sign in or login.</h3>
          <Link to="/login"><button className="btn btn-primary py-2 m-2">Login</button></Link>
          <Link to="/register"><button className="btn btn-primary py-2">Sign up</button></Link>
        </main>
        </div>
      )}
    </div>
  );
};

export default Home;