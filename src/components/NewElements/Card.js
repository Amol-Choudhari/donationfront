import React from 'react';
import PropTypes from 'prop-types'; // Correct import

function Card({ title, value, icon, color, completed, total }) {

  const isTasksCard = completed !== undefined && total !== undefined; 
  const percentage = isTasksCard ? Math.round((completed / total) * 100) : 0;

    // Prop Validation
    Card.propTypes = {
        title: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,  

        icon: PropTypes.string.isRequired,
        color: PropTypes.string,  

        completed: PropTypes.number,
        total: PropTypes.number
    };

    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className={`card border-left-${color} shadow h-100 py-2`}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>
                                {title}
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {isTasksCard ? `${completed}/${total} Completed` : value}
                            </div>

                            {isTasksCard && (

                                <div className="row no-gutters align-items-center">
                                    <div className="col-auto">
                                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{percentage}%</div>
                                    </div>
                                    <div className="col">
                                        <div className="progress progress-sm mr-2">
                                            <div className="col">
                                                <progress className="progress progress-sm mr-2" value={percentage} max="100">{percentage}%</progress> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-auto">
                            <i className={`fas ${icon} fa-2x text-gray-300`}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
