const Student = require("../model/student");
const ClassLevel = require("../model/classlevel");
const ClassFee = require("../model/classFee");
const StudentFee = require("../model/studentfee");
const { getAbbrev } = require("../utils/utils");

exports.fetchClassLevel = async (req, res) => {
  let classLevels = await ClassLevel.find({});
  classLevels = classLevels.map((level) => {
    const abbrev = getAbbrev(level.class);
    return { ...level._doc, abbrev };
  });
  res.status(200).send({ message: "Request successfully", classLevels });
};

exports.createClassLevel = async (req, res) => {
  const _class = req.body.class;
  const level = req.body.level;

  const newClassLevel = new ClassLevel({
    class: _class,
    level,
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
  const level = req.body.level;
  const id = req.params.id;
  let query = { _id: id };

  let model = {
    class: _class,
    level,
  };
  const classLevel = await ClassLevel.updateOne(query, model);
  res.status(200).send({
    message: `Class "${_class} ${level}" updated successfully`,
    classLevel,
  });
};

exports.deleteClassLevel = async (req, res) => {
  let query = { _id: req.params.id };
  const classLevel = await ClassLevel.remove(query);
  res.status(200).send({
    message: `Class with id "${req.params.id}" removed successfully"`,
    classLevel,
  });
};

exports.fetchClassFees = async (req, res) => {
  let classFees = await ClassFee.find({}).populate("class");
  classFees = classFees.map((fee) => {
    const abbrev = getAbbrev(fee.fee);
    return { ...fee._doc, abbrev };
  });
  res.status(200).send({ message: "Request successfully", classFees });
};

exports.createClassFee = async (req, res) => {
  const _class = req.body.class;
  const fee = req.body.fee;
  const amount = req.body.amount;

  const newClassfee = new ClassFee({
    class: _class,
    fee,
    amount,
  });
  await newClassfee.save();
  res.status(201).send({
    message: `Fee "${fee} added for ${_class}" successfully`,
    classfee: newClassfee,
  });
};

exports.getClassFee = async (req, res) => {
  const classFee = await ClassFee.findById(req.params.id);
  if (!classFee) console.error("No class fee found");
  res.status(200).send({ message: "Request successfully", classFee });
};

exports.updateClassFee = async (req, res) => {
  const _class = req.body.class;
  const fee = req.body.fee;
  const amount = req.body.amount;
  const id = req.params.id;
  let query = { _id: id };

  let model = {
    class: _class,
    fee,
    amount,
  };
  const classFee = await ClassFee.updateOne(query, model);
  res.status(200).send({
    message: `Class "${fee} uodate for ${_class}" successfully`,
    classFee,
  });
};

exports.deleteClassFee = async (req, res) => {
  let query = { _id: req.params.id };
  const classFee = await ClassFee.remove(query);
  res.status(200).send({
    message: `Class fee with id "${req.params.id}" removed successfully"`,
    classFee,
  });
};

exports.fetchStudents = async (req, res) => {
  let students = await Student.find({}).populate("class");
  students = students.map((student) => {
    const abbrev = getAbbrev(student.surname);
    return { ...student._doc, abbrev };
  });
  res.status(200).send({ message: "Request successfully", students });
};

exports.createStudent = async (req, res) => {
  const surname = req.body.surname;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const _class = req.body.class;
  const dob = req.body.dob;
  const gender = req.body.gender;

  const students = await Student.find({}).select("_id");

  const newStudent = new Student({
    class: _class,
    firstname,
    surname,
    lastname,
    dob,
    gender,
    class: _class,
    regnumber: `STU/00${students.length + 1}`,
  });
  await newStudent.save();
  res.status(201).send({
    message: `Student ${surname} ${firstname} ${lastname} added successfully`,
    student: newStudent,
  });
};

exports.getStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) console.error("No student found");
  res.status(200).send({ message: "Request successfully", student });
};

exports.searchStudent = async (req, res) => {
  const regnumber = req.body.regnumber;
  const student = await Student.findOne({ regnumber }).populate("class");
  if (!student) return res.status(404).send({ message: "Student not found successfully"});
  let classFees = await ClassFee.find({ class: student.class });
  let responseArr = [];
  for(let fee of classFees){
    const log  = await StudentFee.findOne({student: student._id, classFee: fee._id})
    const response = {...fee._doc};
    if(log){
      response.paid = true;
      response.referenceNumber = log.referenceNumber;
    }
    responseArr.push(response);
  }
  res.status(200).send({ message: "Request successfully", student, classFees: responseArr });
};

exports.updateStudent = async (req, res) => {
  const surname = req.body.surname;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const _class = req.body.class;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const id = req.params.id;
  let query = { _id: id };

  const model = {
    class: _class,
    firstname,
    surname,
    lastname,
    dob,
    gender,
    class: _class,
  };
  const student = await Student.updateOne(query, model);
  res.status(200).send({
    message: `Student ${surname} ${firstname} ${lastname} updated successfully`,
    student,
  });
};

exports.deleteStudent = async (req, res) => {
  let query = { _id: req.params.id };
  const student = await Student.remove(query);
  res.status(200).send({
    message: `Student with id ${req.params.id} removed successfully"`,
    student,
  });
};

exports.logPayment = async (req, res) => {
  const { student, classFee, referenceNumber } = req.body;
  const log = new StudentFee({
    student,
    classFee,
    referenceNumber,
  });
  const studentProfile = await Student.findOne({ _id: student });
  const _classFee = await ClassFee.findOne({ _id: classFee });
  await log.save();
  res.status(200).send({
    message: `Student ${studentProfile.surname} ${studentProfile.firstname} ${studentProfile.lastname} has paid for ${_classFee.fee} fee successfully`,
    student,
  });
};
