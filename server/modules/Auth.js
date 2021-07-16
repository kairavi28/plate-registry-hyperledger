module.exports = {
    roles: {
        //if requests contains this token, it means they already have
        //a jwt token attached to the request
        authenticated: 'abc123',

        //this procedure needs authorization
        //to simplify the process, we use these pseudo-tokens for "user in roles"
        admin: 'admin-token',
        carDealer: 'car-dealer-token',
        insuranceCompany: 'ins-comp-token',
        police: 'police-token'
    }
}