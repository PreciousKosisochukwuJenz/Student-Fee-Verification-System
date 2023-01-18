const axios = require("axios");
const { Benefits } = require("../model/enums");

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
  const classLevel = await axios.get(`${url}/api/classes`);
  const authUser = req.user;

  res.render("roles", {
    settings: settings.data,
    classLevel: classLevel.data.classLevel,
    authUser,
    title: "Classes",
  });
};
