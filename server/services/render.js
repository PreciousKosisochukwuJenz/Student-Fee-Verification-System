const axios = require("axios");
const { Fees } = require("../model/enums");

const url = process.env.URL;
exports.homeRoutes = async (req, res) => {
  const settings = await axios.get(`${url}/api/settings`);
  const authUser = req.user;
  res.render("index", { settings: settings.data, authUser, title: "Home" });
};

exports.getSettings = async (req, res) => {
  const settings = await axios.get(`${url}/api/settings`);
  const authUser = req.user;
  res.render("settings", {
    settings: settings.data,
    authUser,
    title: "Settings",
  });
};

exports.updateSettings = async (req, res) => {
  await axios.put(`${url}/api/settings`);
  const settings = await axios.get(`${url}/api/settings`);
  const authUser = req.user;

  res.render("settings", {
    settings: settings.data,
    authUser,
    title: "Settings",
  });
};

exports.login = async (req, res) => {
  const settings = await axios.get(`${url}/api/settings`);
  const authUser = req.user;

  res.render("login", { settings: settings.data, authUser, title: "Login" });
};

exports.getUsers = async (req, res) => {
  const settings = await axios.get(`${url}/api/settings`);
  const users = await axios.get(`${url}/api/users`);
  const roles = await axios.get(`${url}/api/roles`);
  const authUser = req.user;
  res.render("user", {
    settings: settings.data,
    users: users.data.users,
    roles,
    authUser,
    title: "Users",
  });
};

exports.getRoles = async (req, res) => {
  const settings = await axios.get(`${url}/api/settings`);
  const roles = await axios.get(`${url}/api/roles`);
  const authUser = req.user;

  res.render("roles", {
    settings: settings.data,
    roles: roles.data.roles,
    authUser,
    title: "Roles",
  });
};

exports.getClasses = async (req, res) => {
  const settings = await axios.get(`${url}/api/settings`);
  const classLevels = await axios.get(`${url}/api/class`);
  const authUser = req.user;

  res.render("classes", {
    settings: settings.data,
    classLevels: classLevels.data.classLevels,
    authUser,
    title: "Classes",
  });
};

exports.getClassFees = async (req, res) => {
  const settings = await axios.get(`${url}/api/settings`);
  const classLevels = await axios.get(`${url}/api/class`);
  const classFees = await axios.get(`${url}/api/classfee`);
  const authUser = req.user;

  res.render("classfee", {
    settings: settings.data,
    classLevels: classLevels.data.classLevels,
    classFees: classFees.data.classFees,
    Fees: Object.values(Fees),
    authUser,
    title: "Class Fees",
  });
};

exports.getStudents = async (req, res) => {
  const settings = await axios.get(`${url}/api/settings`);
  const classLevels = await axios.get(`${url}/api/class`);
  const students = await axios.get(`${url}/api/student`);
  const authUser = req.user;

  res.render("students", {
    settings: settings.data,
    classLevels: classLevels.data.classLevels,
    students: students.data.students,
    authUser,
    title: "Students",
  });
};

exports.getStudentFee = async (req, res) => {
  const settings = await axios.get(`${url}/api/settings`);
  const authUser = req.user;

  res.render("studentfee", {
    settings: settings.data,
    authUser,
    title: "Student Fee Payment",
  });
};
