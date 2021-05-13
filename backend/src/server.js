const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const taskSchema = require("../schemas/task.schemas");
const body = require("body-parser");
app.use(body.json());
const Database = require("./database");
const db = new Database();
const Task = mongoose.model("img", taskSchema);

//get all imgs
app.get("/imgs", async (req, res) => {
  let result = await Task.find();
  res.send(result);
});

//create new img
app.post("/uploadImg",  (req, res) => {
  let { id,img,name,message } = req.body;
  let task1 = new Task({
    id: id,
    img: img,
    name:name,
    message:message
  });
  (async () => {
    await db.createTask(task1);
    res.send();
  })();
});

//detele img with id
app.delete("/delete",  (req, res) => {
  let { id } = req.query;
  (async () => {
    await Task.findOneAndRemove(id);
    res.send();
  })();
});

//update img with id
app.put("/update",  (req, res) => {
  let { id,img } = req.body;
  (async () => {
    await Task.findOneAndUpdate(id, {
      img: img
    })
    res.send();
  })();
})

module.exports = app;
