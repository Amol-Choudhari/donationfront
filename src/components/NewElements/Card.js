import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';  // Assuming you add your custom styles here

function Card({ title, value, icon, color = 'primary', completed, total }) {
    const isTasksCard = completed !== undefined && total !== undefined; 
    const percentage = isTasksCard && total !== 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className={`card custom-card shadow h-100 py-2`}>
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
                                <div className="row no-gutters align-items-center mt-3">
                                    <div className="col-auto">
                                        <div className="h5 mb-0 ml-2 mr-3 font-weight-bold text-gray-800">{percentage}%</div>
                                    </div>
                                    <div className="col">
                                        {/* Using the <progress> element for better accessibility */}
                                        <progress 
                                            className="custom-progress-bar" 
                                            value={percentage} 
                                            max="100">
                                                {percentage}%
                                        </progress>
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

Card.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),  
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,  
    completed: PropTypes.number,
    total: PropTypes.number,
};

export default React.memo(Card);
