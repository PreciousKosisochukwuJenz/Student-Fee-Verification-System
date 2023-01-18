const User = require("../model/user");
const Role = require("../model/role");
const { getAbbrev } = require("../utils/utils");

const bcrypt = require("bcrypt");
exports.fetch = async (req, res) => {
  let users = await User.find({});
  users = users.map((user) => {
    const abbrev = getAbbrev(user.username);
    return { ...user._doc, abbrev };
  });
  res.status(200).send({ message: "Request successfully", users });
};

exports.create = async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const role = req.body.role;
  const password = req.body.password;
  const passwordSalt = req.body.passwordSalt;

  if (password !== passwordSalt)
    res.status(500).send({ message: "Password does not match" });
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);
  const newUser = new User({
    email,
    username,
    role,
    password: hash,
  });
  await newUser.save();
  res.status(201).send({
    message: `User "${username}" added successfully`,
    user: newUser,
  });
};

exports.get = async (req, res) => {
  const user = await User.findById(req.params.id)
    .select(["username", "email", "role"])
    .populate("role");
  if (!user) console.error("No user found");
  res.status(200).send({ message: "Request successfully", user });
};

exports.update = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const role = req.body.role;
  const id = req.params.id;

  let query = { _id: id };

  let model = {
    username,
    email,
    role,
  };
  const user = await User.updateOne(query, model);
  res
    .status(200)
    .send({ message: `User "${username}" updated successfully`, user });
};

exports.delete = async (req, res) => {
  let query = { _id: req.params.id };
  const user = await User.remove(query);
  res.status(200).send({
    message: `User with id "${req.params.id}" deleted successfully`,
    user,
  });
};

exports.fetchRoles = async (req, res) => {
  let roles = await Role.find({});
  roles = roles.map((role) => {
    const abbrev = getAbbrev(role.description);
    return { ...role._doc, abbrev };
  });
  res.status(200).send({ message: "Request successfully", roles });
};

exports.createRole = async (req, res) => {
  const description = req.body.description;

  const newRole = new Role({
    description,
  });
  await newRole.save();
  res.status(201).send({
    message: `Role "${description}" added successfully`,
    user: newRole,
  });
};

exports.getRole = async (req, res) => {
  const role = await Role.findById(req.params.id);
  if (!role) console.error("No user found");
  res.status(200).send({ message: "Request successfully", role });
};

exports.updateRole = async (req, res) => {
  const description = req.body.description;
  const id = req.params.id;
  let query = { _id: id };

  let model = {
    description,
  };
  const role = await Role.updateOne(query, model);
  res
    .status(200)
    .send({ message: `Role "${description}" updated successfully`, role });
};

exports.deleteRole = async (req, res) => {
  let query = { _id: req.params.id };
  const role = await Role.remove(query);
  res.status(200).send({
    message: `Role with id "${req.params.id}" removed successfully"`,
    role,
  });
};
