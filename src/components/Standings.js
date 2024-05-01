
const Standings = ({standings}) => {
    return (
      <div className="text-center">
        <h3>Current standings:</h3>
        <table className="table table-striped table-sm mx-auto">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Player Name</th>
              <th>Score</th>
              <th>OMW</th>
              <th>OGWR</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3].toFixed(3)}</td>
                <td>{row[4].toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      );
}

export default Standings;