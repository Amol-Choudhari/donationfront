import React from 'react';
import { Link } from 'react-router-dom';

const DataTableColumnsDonation = ({ deleteDonation, donationTypes }) => {
    const getDonationTypeName = (typeId) => {
        if (!donationTypes || donationTypes.length === 0) return 'Unknown Type';
        const type = donationTypes.find(type => type.id === typeId);
        return type ? type.donation_type : 'Unknown Type';
    };

    return [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: true,
            width: '50px',
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Mobile',
            selector: row => row.mobile,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.amount,
            sortable: true,
        },
        {
            name: 'Type',
            selector: row => getDonationTypeName(row.donation_type),
            sortable: true,
        },
        {
            name: 'By User',
            selector: row => row.by_user,
            sortable: true,
        },
        {
            name: 'Transactions',
            selector: row => row.transaction_no,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: '5px' }}>
                    <Link to={`/donationform/${row.id}`} className="btn btn-secondary btn-sm">
                        View
                    </Link>
                    <button
                        onClick={() => deleteDonation(row.id)}
                        className="btn btn-danger btn-sm"
                    >
                        Delete
                    </button>
                </div>
            ),
            width: '200px',
        },
    ];
};

export default DataTableColumnsDonation;
