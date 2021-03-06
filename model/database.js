const {
    PrismaClient
} = require('@prisma/client');
const prisma = new PrismaClient(); // new prisma connection

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


const userModel = {
    // findOne: (email) => {
    //     const user = Database.find((user) => user.email === email);
    //     if (user) {
    //         return user;
    //     }
    //     // throw new Error(`Couldn't find user with email: ${email}`);
    // },
    // findById: (id) => {
    //     const user = Database.find((user) => user.id === id);
    //     if (user) {
    //         return user;
    //     }
    //     // throw new Error(`Couldn't find user with id: ${id}`);
    // },
    // addUser: (newUser) => {
    //     Database.push(newUser);
    //     return newUser;
    // },
    // nextID: () => {
    //     return Database.length + 1;
    // },
    updateProfileURL: (userID, newProfileURL) => {
        const user = Database.find((user) => user.id === userID);
        if (user) {
            user.profileURL = newProfileURL;
        }
    },
    createPrismaUser: async (name, email, password, profileURL) => {
        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    profileURL
                }
            });
        } catch (error) {
            console.log(error + "error creating user");
        }
    },
    findPrismaById: async (id) => {
        id = id.toString();
        try {
            const existingUser = await prisma.user.findUnique({
                where: {
                    id
                }
            });
            if (existingUser) {
                return existingUser;
            }
            return null;
        } catch (error) {
            console.log(error + "Error looking up user");
        }
    },
    findPrismaOne: async (email) => {
        try {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            if (existingUser) {
                return existingUser;
            }
            return null;
        } catch (error) {
            console.log(error + "Error looking up user");
        }
    },
};

module.exports = {
    Database,
    userModel
};