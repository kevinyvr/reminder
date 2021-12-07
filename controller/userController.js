const userModel = require("../model/database").userModel;

const fetch = require('node-fetch');

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const findGithubIDOrCreate = (profile) => {
  // adding a prefix of gh_ such that the ID would know be similar to our id in the reminder system
  let user = userModel.findById(`gh_${profile.id}`);
  if (user) {
    console.log("Git hub user had previously logged in our reminder system");
    return user;
  } else {
    let githubUser = {
      id: `gh_${profile.id}`,
      name: profile.username,
      reminders: [],
      profileURL: "",
      role: "user",
    };
    let newUser = userModel.addUser(githubUser)
    console.log("Git hub user is not in our reminder system but has now been created");
    return newUser;
  }
  return null;
}

const findEmailOrCreate = async (email, name, password) => {
  // local database
  // let user = userModel.findOne(email);
  // let nextID = userModel.nextID();
  // let existed = 1;

  // if (user) {
  //   console.log("The user is already existed");
  //   return [user, existed];
  // } else {
  //   let localUser = {
  //     id: nextID,
  //     name: name,
  //     email: name,
  //     password: password,
  //     reminders: [],
  //     profileUrl: await getRandomImage(),
  //     role: "user",
  //   };
  //   let newUser = userModel.addUser(localUser);
  //   existed = 0;
  //   console.log("The user is created");
  //   return [newUser, existed];
  // }
  try {
    // prisma database
    let user = await userModel.findPrismaOne(email);
    let existed = 1;

    if (user) {
      console.log("The user is already existed");
      return [user, existed];
    } else {
      const profileURL = await getRandomImage();
      const newUser = await userModel.createPrismaUser(name,email, password, profileURL);
      existed = 0;
      console.log("The user is created");
      return [newUser, existed];
    }
  }
  catch (error) {
    console.log(error);
  }
}

const getRandomImage = async () => {
  const res = await fetch('https://source.unsplash.com/random/400x400');
  return res.url;
}

const isUserValid = (user, password) => {
  return user.password === password;
};

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getRandomImage,
  findGithubIDOrCreate,
  findEmailOrCreate,
};