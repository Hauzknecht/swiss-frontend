import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import TournamentService from "../services/tournament.service";

const CreateTournament = () => {
    const [name, setName] = useState('');
    const [number_of_rounds, setNumRounds] = useState();
    const [players, setPlayers] = useState([{ name: '' }]);
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newPlayers = [...players];
        newPlayers[index][name] = value;
        setPlayers(newPlayers);
    };

    const handleAddPlayer = () => {
        setPlayers([...players, { name: '' }]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (players.length <= number_of_rounds) {
            setError('Number of players must be greater than number of rounds.');
            return;
        }

        const formData = JSON.stringify({ name, number_of_rounds, players });
        TournamentService.createTournament({formData}).then(
            (response) => {
                const tournamentID = response.data.id;
                navigate(`/detail/${tournamentID}`);
            },
            (error) => {
                console.log(error)
            }
        )
    };

    return (
        <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">New tournament form</h1>
        <div className="form-floating">
            <input
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Name"
            id="floatingInput"
            />
            <label htmlFor="floatingInput">Tournament Name</label>
        </div>
        <div className="form-floating">
            <input
            className="form-control"
            type="number"
            value={number_of_rounds}
            onChange={(e) => setNumRounds(parseInt(e.target.value))}
            required
            min="0"
            step="1"
            placeholder="Number of rounds"
            id="floatingRounds"
            />
            <label htmlFor="floatingRounds">Number of Rounds</label>
        </div>
        <div>
            <label className="h4 mb-3 fw-normal">Players:</label>
            { error && 
                <div className="alert alert-danger" role="alert">{error}</div>
                }
            {players.map((player, index) => (
            <div key={index}>
                <input
                className="form-control mb-2"
                type="text"
                name="name"
                value={player.name}
                onChange={(e) => handleInputChange(index, e)}
                required
                />
            </div>
            ))}
            <button className="btn btn-primary w-100 py-2 mt-2" type="button" onClick={handleAddPlayer}>Add Player</button>
        </div>
        <button className="btn btn-primary w-100 py-2 mt-2" type="submit">Create Tournament</button>
        </form>
        </main>
    );
}

export default CreateTournament;