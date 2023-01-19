const express = require("express");
const route = express.Router();

const services = require("../services/render");
const AuthCtrl = require("../controller/auth.controller");
const UserCtrl = require("../controller/user.controller");
const StudentCtrl = require("../controller/student.controller");
const SettingsCtrl = require("../controller/common.controller");

/**
 *  @description Root Route
 *  @method GET /
 */
route.get("/", services.homeRoutes);

/**
 *  @description Login Route
 *  @method GET /
 */
route.get("/auth/login", services.login);

/**
 *  @description settings page
 *  @method GET /settings
 */
route.get("/settings", services.getSettings);

/**
 *  @description user page
 *  @method GET /users
 */
route.get("/users", services.getUsers);

/**
 *  @description roles page
 *  @method GET /roles
 */
route.get("/roles", services.getRoles);

/**
 *  @description classes page
 *  @method GET /classes
 */
route.get("/classes", services.getClasses);

/**
 *  @description class fees
 *  @method GET /classfee
 */
route.get("/classfee", services.getClassFees);

/**
 *  @description students
 *  @method GET /students
 */
route.get("/students", services.getStudents);

/**
 *  @description student Fees
 *  @method GET /studentfee
 */
route.get("/studentfee", services.getStudentFee);

// API

//User
route.get("/api/users", UserCtrl.fetch);
route.post("/api/users", UserCtrl.create);
route.get("/api/users/:id", UserCtrl.get);
route.put("/api/users/:id", UserCtrl.update);
route.delete("/api/users/:id", UserCtrl.delete);

//Role
route.get("/api/roles", UserCtrl.fetchRoles);
route.post("/api/roles", UserCtrl.createRole);
route.get("/api/roles/:id", UserCtrl.getRole);
route.put("/api/roles/:id", UserCtrl.updateRole);
route.delete("/api/roles/:id", UserCtrl.deleteRole);

// Settings
route.get("/api/settings", SettingsCtrl.find);
route.put("/api/settings", SettingsCtrl.update);

// Auth
route.post("/auth/login", AuthCtrl.postLogin);
route.get("/auth/logout", AuthCtrl.logout);

//Class
route.get("/api/class", StudentCtrl.fetchClassLevel);
route.post("/api/class", StudentCtrl.createClassLevel);
route.get("/api/class/:id", StudentCtrl.getClassLevel);
route.put("/api/class/:id", StudentCtrl.updateClassLevel);
route.delete("/api/class/:id", StudentCtrl.deleteClassLevel);

// Class fee
route.get("/api/classfee", StudentCtrl.fetchClassFees);
route.post("/api/classfee", StudentCtrl.createClassFee);
route.get("/api/classfee/:id", StudentCtrl.getClassFee);
route.put("/api/classfee/:id", StudentCtrl.updateClassFee);
route.delete("/api/classfee/:id", StudentCtrl.deleteClassFee);

// Student fee
route.get("/api/student", StudentCtrl.fetchStudents);
route.post("/api/student", StudentCtrl.createStudent);
route.get("/api/student/:id", StudentCtrl.getStudent);
route.post("/api/student/search", StudentCtrl.searchStudent);
route.put("/api/student/:id", StudentCtrl.updateStudent);
route.delete("/api/student/:id", StudentCtrl.deleteStudent);
route.post("/api/student/logpayment", StudentCtrl.logPayment);

module.exports = route;
