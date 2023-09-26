const express = require("express");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
require('dotenv').config()
const db = mysql.createConnection({
  host: "fc404394.mysql.tools",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "fc404394_eroclub",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(req.body, "in");
    cb(null, `${req.body.modelId}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname ,'uploads')));


app.post("/thumbnailUpload", upload.single("thumbnail"), (req, res) => {
  try {
    console.log('file', req.file) ;
    return res.json({ data: req.file.filename });
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/models", (req, res) => {
    const q = "select * from models";
    db.query(q, (err, data) => {
      console.log(err, data);
      if (err) return res.json({ error: err.sqlMessage });
      else return res.json({ data });
    });
  });
  app.post("/models", (req, res) => {
    const q = `insert into models (modelId,name,phone,age,height,breast,location,hour,hour_2,night,is_out,description,time,services,thumbnail) values(?)`;
    const values = [...Object.values(req.body)];
    console.log("insert", values);
    db.query(q, [values], (err, data) => {
      console.log(err, data);
      if (err) return res.json({ error: err.sqlMessage });
      else return res.json({ data });
    });
  });
  
  app.get("/models/:modelId", (req, res) => {
    const id = req.params.modelId;
    const q = "SELECT * FROM models where modelId=?";
    db.query(q, [id], (err, data) => {
      console.log(err, data);
      if (err) return res.json({ error: err.sqlMessage });
      else return res.json({ data });
    });
  });
  
  app.put("/models/:modelId", (req, res) => {
    const id = req.params.modelId;
    console.log("updated " + req.body);
    const data = req.body;

    if (data.age) data.age = Number.parseInt(data.age);
    if (data.height) data.height = Number.parseInt(data.height);
    if (data.breast) data.breast = Number.parseInt(data.breast);
    if (data.hour) data.hour = Number.parseInt(data.hour);
    if (data.hour_2) data.hour_2 = Number.parseInt(data.hour_2);
    if (data.night) data.night = Number.parseInt(data.night);

    const q =
      "update models set " +
      Object.keys(data)
        .map((k) => `${k} = ?`)
        .join(",") +
      " where modelId='" +
      id +
      "'";
    console.log(q);
    db.query(q, [...Object.values(data)], (err, out) => {
      console.log(err, out);
      if (err) return res.json({ error: err.message });
      else {
        return res.json({ data: out });
      }
    });
  });
  
  app.delete("/models/:modelId", (req, res) => {
    const id = req.params.modelId;
    console.log("deleting " + id, req.body);
    const { thumbnail } = req.body;
    console.log(req.body);
    const q = `DELETE FROM models WHERE modelId= ?`;
    db.query(q, [id], (err, data) => {
      console.log(err, data);
      if (err) return res.json({ error: err.sqlMessage });
      else res.json({data})
    })
});


app.listen(8081, () => {
  console.log("listening");
});
