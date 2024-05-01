import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import TournamentService from "../services/tournament.service";
import MatchResultForm from "./MatchResultForm";
import Standings from "./Standings";

const TournamentDetail = () => {
    const [tournament, setTournament] = useState('')
    const [standings, setStandings] = useState([])
    const [pairings, setPairings] = useState([])
    const [roundUpdated, setRoundUpdated] = useState(false)
    const {id} = useParams();

    useEffect( () => {
        TournamentService.getTournamentDetail({id}).then(
            (response) => {
                setTournament(response.data)
            },
            (error) => {
                console.log(error)
            }
        );
        TournamentService.getPairingsAndStandings({id}).then(
            (response) => {
                setStandings(response.data.standings)
                setPairings(response.data.pairings)
                setRoundUpdated(false)
            },
            (error) => {
                console.log(error)
            }
        );
    }, [id, roundUpdated]);

    const handleRoundSubmit = (formData) => {
        TournamentService.reportRound({id},{formData}).then(
            (response) => {
                setRoundUpdated(true)
            },
            (error) => {
                console.log(error)
            }
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const monthIndex = date.getMonth()+1;
        const year = date.getFullYear();

        const formattedDay = day < 10 ? '0'+day : day;
        const formattedMonth = monthIndex < 10 ? '0'+monthIndex : monthIndex;

        return formattedDay+'. '+formattedMonth+'. '+year;
    }

    return (
        <div className="text-center col-lg-8 mx-auto p-4 py-md-5">
            <h1>{tournament.name}</h1>
            <p>Number of rounds: {tournament.number_of_rounds}</p>
            <p>Current round: {tournament.current_round}</p>
            <p>Created : {formatDate(tournament.created)}</p>  
            {/*<p>{JSON.stringify(tournament)}</p>*/}
            <Standings standings={standings} />
            { (pairings.length !== 0) ? (
                <MatchResultForm onFormSubmit={handleRoundSubmit} pairings={pairings} />
            ):(
                <div>
                    <h3>Tournament finished</h3>
                    <Link to="/home"><button className="btn btn-primary">Home</button></Link>
               </div>
            )}
        </div>
    )
}

export default TournamentDetail;