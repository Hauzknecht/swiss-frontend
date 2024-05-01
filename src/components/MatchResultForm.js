import React, { useEffect, useState } from "react";

const MatchResultForm = ({ onFormSubmit, pairings }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const initialResults = pairings.map(({ player1_id, player1_name, player2_id, player2_name }) => ({
      player1: { id: player1_id, score: "" },
      player2: { id: player2_id, score: "" },
    }));
    setResults(initialResults);
  }, [pairings]);

  const handleChange = (index, player, event) => {
    const { value } = event.target;
    const updatedResults = [...results];
    updatedResults[index][player].score = value;
    setResults(updatedResults);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedResults = results.map((result) => ({
      player1_id: result.player1.id,
      player2_id: result.player2.id,
      player1_points: parseInt(result.player1.score) || 0,
      player2_points: parseInt(result.player2.score) || 0,
    }));
    onFormSubmit(JSON.stringify(formattedResults))
  };

  return (
    <main> 
      <form onSubmit={handleSubmit} className="text-center mb-5">
        <h3>Report round:</h3>
        <table className="table mx-auto">
          <thead className="table-primary">
            <tr>
              <th>Player 1</th>
              <th>Player 2</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{pairings[index].player1_name}</td>
                  <td>{pairings[index].player2_name}</td>
                </tr>
                { (pairings[index].player2_name !== "BYE") && ( 
                <tr>                   
                  <td>
                    <input
                      type="number"
                      name={`player${index + 1}_score`}
                      value={result.player1.score}
                      style={{width: "90px"}}
                      required
                      min="0"
                      step="1"
                      onChange={(event) => handleChange(index, "player1", event)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name={`player${index + 2}_score`}
                      value={result.player2.score}
                      style={{width: "90px"}}
                      required
                      min="0"
                      step="1"
                      onChange={(event) => handleChange(index, "player2", event)}
                    />
                  </td>
                </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary py-2 " type="submit">Submit</button>
      </form>
    </main>
  );
};

export default MatchResultForm;