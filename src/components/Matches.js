
const Matches = ({matches}) => {
    return(
        <div>
        { (matches.length !==0) ? (
        <table className="table table-striped table-sm mx-auto">
          <thead className="table-primary">
            <tr>
              <th>Round</th>
              <th>Player 1</th>
              <th>Results</th>
              <th>Player 2</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((row, index) => (
              <tr key={index}>
                <td>{row.round_number}</td>
                <td>{row.player1_name}</td>
                <td>{row.player1_points}:{row.player2_points}</td>
                <td>{row.player2_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        ):(
            <p>No matches yet.</p>
        )}
        </div>
    )
}
export default Matches;