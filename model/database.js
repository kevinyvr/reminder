let Database = [{
        id: 1,
        name: "kevin",
        email: "test@testing.com",
        password: "test",
        reminders: [{
            id: 1,
            title: "abc",
            description: "abcabc",
            completed: false
        }],
        role: "admin",
    },
    {
        id: 2,
        name: "alex",
        email: "testing@test.com",
        password: "test",
        reminders: [{
            id: 1,
            title: "abcd",
            description: "abcdabcd",
            completed: true
        }],
        role: "user",
    },
    {
        id: 3,
        name: "Johnny Doe",
        email: "john@test.com",
        password: "test",
        reminders: [],
        role: "user",
    },
];


// module.exports = Database;

const userModel = {
    findOne: (email) => {
        const user = Database.find((user) => user.email === email);
        if (user) {
            return user;
        }
        // throw new Error(`Couldn't find user with email: ${email}`);
    },
    findById: (id) => {
        const user = Database.find((user) => user.id === id);
        if (user) {
            return user;
        }
        // throw new Error(`Couldn't find user with id: ${id}`);
    },
    addUser: (newUser) => {
        Database.push(newUser);
        return newUser;
    }
};

module.exports = {
    Database,
    userModel
};