
const masterTypeConfig = {
    'donation type': {
        apiEndpoint: 'http://localhost:8081/master/donationtype/fetchall',
        fields: ['donation_type', 'status', 'created'],
        displayName: 'Donation Type',
    },
    'gender': {
        apiEndpoint: 'http://localhost:8081/master/gender/fetchall',
        fields: ['name', 'status', 'created'],
        displayName: 'Gender',
    },
    'roles': {
        apiEndpoint: 'http://localhost:8081/master/roles/fetchall',
        fields: ['name', 'status', 'created'],
        displayName: 'Role',
    }
    // Add more master types as needed
};


export default masterTypeConfig;
