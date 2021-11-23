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
        profileURL: "",
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
        profileURL: "https://images.unsplash.com/photo-1635365349638-c79256d73f79?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzNzYyNTUyNg&ixlib=rb-1.2.1&q=80&w=400",
        role: "user",
    },
    {
        id: 3,
        name: "Johnny Doe",
        email: "john@test.com",
        password: "test",
        reminders: [],
        profileURL: "",
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
    },
    nextID: () => {
        return Database.length + 1;
    },
    updateProfileURL: (userID, newProfileURL) => {
        const user = Database.find((user) => user.id === userID);
        if (user) {
            user.profileURL = newProfileURL;
        }
    },
};

module.exports = {
    Database,
    userModel
};