// get users page 

const getUsers = (req, res, next) => {
  res.render("users", {
    title: "Users - chat application ",
  });
};

module.exports = { getUsers };
