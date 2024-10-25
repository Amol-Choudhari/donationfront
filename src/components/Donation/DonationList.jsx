import React from 'react';
import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DataTableColumnsDonation from '../NewElements/DataTableColumnsDonation';

const customStyles = {
    table: {
        style: {
            border: '1px solid #dee2e6',
        },
    },
    headCells: {
        style: {
            backgroundColor: '#343a40',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
            borderBottom: '2px solid #dee2e6',
        },
    },
    rows: {
        style: {
            borderBottom: '1px solid #dee2e6',
            fontSize: '14px',
        },
        highlightOnHoverStyle: {
            backgroundColor: '#f1f3f5',
            cursor: 'pointer',
        },
    },
    pagination: {
        style: {
            borderTop: '1px solid #dee2e6',
            padding: '10px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', 
            paddingRight: '8px',
        },
    },
};

const DonationList = ({ donations, deleteDonation, donationTypes, loading }) => {
    return (
        <div>
            <h1 className='bg-secondary' style={{color: 'white'}}>Donations</h1>
            <Link to="/donationform" className="btn btn-primary mb-5">Add Donation</Link>
            <DataTable
                title="List of donations"
                columns={DataTableColumnsDonation({ deleteDonation, donationTypes })} 
                data={donations}
                progressPending={loading}
                pagination
                highlightOnHover
                striped
                customStyles={customStyles} 
            />
        </div>
    );
};

// Add PropTypes validation for expected props
DonationList.propTypes = {
    donations: PropTypes.array.isRequired,
    deleteDonation: PropTypes.func.isRequired,
    donationTypes: PropTypes.array.isRequired, // Ensure donationTypes is validated
    loading: PropTypes.bool.isRequired,
};

export default DonationList;
