import React from 'react';
import { Link } from 'react-router-dom';

const DataTableColumns = ({ deleteUser }) => [
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
        name: 'Email',
        selector: row => row.email,
        sortable: true,
    },
    {
        name: 'Mobile',
        selector: row => row.mobile,
        sortable: true,
    },
    {
        name: 'Actions',
        cell: row => (
            <>
                <Link to={`/userform/${row.id}`} className="btn btn-secondary btn-sm">Edit</Link>
                {' '}
                <button
                    onClick={() => deleteUser(row.id)}
                    className="btn btn-danger btn-sm"
                >
                    Delete
                </button>
            </>
        ),
    },
];

export default DataTableColumns;
