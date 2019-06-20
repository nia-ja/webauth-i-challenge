const db = require('../../data/dbConfig.js');
const uuid = require('uuid/v4');

module.exports = {
    getUsers,
    getUserById,
    getUserBy,
    addUser
}

// return all users from the db
function getUsers() {
    return db('users')
}

// return a single user from the db
// id in the db is a string!
function getUserById(id) {
    return db('users as u')
        .where('u.id', id)
        .first()
}

function getUserBy(filter) {
    return db('users').where(filter);
}

// add a user to the db, id is randomly created with uuid
async function addUser(user) {
    const newUser = { id: uuid(), ...user };
    const id = await db('users')
        .insert(newUser)
        .then(res => {
            return newUser.id;
        });
    return getUserById(id);
}