const Obstacle = require("../models/Obstacle");

exports.createObstacle = async (req, res) => {
  try {
    const obs = await Obstacle.create({ owner: req.userId, ...req.body });
    res.status(201).json(obs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getAllObstacles = async (req, res) => {
  try {
    const list = await Obstacle.find({ owner: req.userId });
    res.status(200).json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.deleteObstacle = async (req, res) => {
  try {
    await Obstacle.deleteOne({ _id: req.params.id, owner: req.userId });
    res.status(200).json({ message: "Deleted" });
  } catch (e) {
    if (e.kind === 'ObjectId') return res.status(400).json({ message: "Invalid ID" });
    res.status(500).json({ error: e.message });
  }
};

exports.exportObstacles = async (req,res) => {
    try {
        const obs = await Obstacle.find({ owner: req.userId });
        res.setHeader("Content-Disposition","attachment; filename=obstacles.json");
        res.json(list);
        res.status(200).json(obs);
    }
    catch (e) {
      res.status(500).json({ error: e.message });
    }    
  };

exports.importObstacles = async (req,res) => {
    try{
        const docs = req.body.map(o=>({ owner: req.userId, ...o }));
        await Obstacle.insertMany(docs);
        res.status(201).json({ imported: docs.length });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};


  