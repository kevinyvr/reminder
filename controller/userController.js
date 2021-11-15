const userModel = require("../model/database").userModel;

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
      reminders: []
    };
    let newUser = userModel.addUser(githubUser)
    console.log("Git hub user is not in our reminder system but has now been created");
    return newUser;
  } 
  return null;
}

function isUserValid(user, password) {
  return user.password === password;
};

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  findGithubIDOrCreate,
};