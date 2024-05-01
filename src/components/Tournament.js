import { Link } from "react-router-dom";
import { useState } from "react";

const Tournament = ( {tournament, onDelete} ) => {
    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        setShowModal(true);
      };
    
    const handleDelete = () => {
        onDelete(tournament.id); // Pass the id of the tournament to delete
        setShowModal(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const monthIndex = date.getMonth()+1;
        const year = date.getFullYear();

        const formattedDay = day < 10 ? '0'+day : day;
        const formattedMonth = monthIndex < 10 ? '0'+monthIndex : monthIndex;

        return formattedDay+'. '+formattedMonth+'. '+year;
    };

    return(
        <div>
        <div className="card m-2" style={{width: "18rem"}}>
            <div className="card-body">
            <h4 className="card-title">{tournament.name}</h4>
            <p className="card-text">Number of rounds: {tournament.number_of_rounds}</p>
            <p className="card-text">Current round: {tournament.current_round}</p>
            <p className="card-text">Created: {formatDate(tournament.created)}</p>
            <div className="d-flex justify-content-between">
                <Link to={`/detail/${tournament.id}`}><button className="btn btn-primary">Continue</button></Link>
                <button className="btn btn-danger mx-2" onClick={handleDeleteClick}>Delete</button>
            </div>
            </div>         
        </div>
        {showModal && (
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
             }}>
                    <div className="bg-light p-5 border rounded-4">
                        <p>Are you sure you want to delete?</p>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-danger mx-2" onClick={handleDelete} style={{width: "90px"}}>Yes</button>
                            <button className="btn btn-secondary mx-2" onClick={() => setShowModal(false)} style={{width: "90px"}}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Tournament;