const Student = require("../model/student");
const ClassLevel = require("../model/classlevel");
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

exports.fetchClassLevel = async (req, res) => {
  let classlevels = await ClassLevel.find({});
  classlevels = classlevels.map((level) => {
    const abbrev = getAbbrev(level.class);
    return { ...level._doc, abbrev };
  });
  res.status(200).send({ message: "Request successfully", classlevels });
};

exports.createClassLevel = async (req, res) => {
  const _class = req.body.class;
  const level = req.body.level;

  const newClassLevel = new ClassLevel({
    class:_class,
    level
  });
  await newClassLevel.save();
  res.status(201).send({
    message: `Class "${_class} ${level}" added successfully`,
    classLevel: newClassLevel,
  });
};

exports.getClassLevel = async (req, res) => {
  const classLevel = await ClassLevel.findById(req.params.id);
  if (!classLevel) console.error("No class level found");
  res.status(200).send({ message: "Request successfully", classLevel });
};

exports.updateClassLevel = async (req, res) => {
  const _class = req.body.class;
  const level = req.body.class;
  const id = req.params.id;
  let query = { _id: id };

  let model = {
    class:_class,
    level
  };
  const classLevel = await ClassLevel.updateOne(query, model);
  res
    .status(200)
    .send({ message: `Class "${_class} ${level}" updated successfully`, classLevel });
};

exports.deleteClassLevel = async (req, res) => {
  let query = { _id: req.params.id };
  const classLevel = await ClassLevel.remove(query);
  res.status(200).send({
    message: `Class with id "${req.params.id}" removed successfully"`,
    classLevel,
  });
};
 