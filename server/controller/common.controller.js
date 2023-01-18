const Settings = require("../model/settings");

exports.find = async (req, res) => {
  const settings = await Settings.find()
    .select(["appName", "poweredBy"])
    .limit(1);
  if (settings.length > 0) {
    res.status(200).send({ ...settings[0]._doc });
  } else {
    res.status(200).send({
      appName: "STAFF PROMOTION AND RENUMERATION SYSTEM",
      poweredBy: "Precious Kosisochukwu",
    });
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const settings = await Settings.find().limit(1);
  if (settings.length > 0) {
    await Settings.findByIdAndUpdate(settings[0]._id, req.body, {
      useFindAndModify: false,
    });
  } else {
    const newSettings = new Settings({
      appName: req.body.appName,
      poweredBy: req.body.poweredBy,
    });
    await newSettings.save();
  }
  res.status(201).send({ message: "Setting updated successfully." });
};
