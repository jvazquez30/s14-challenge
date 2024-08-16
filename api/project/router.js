// build your `/api/projects` router here
const express = require('express');
const Projects = require('./model');

const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.getProjects()
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req,res,next) => {
  const {project_name} = req.body;

  if (!project_name) {
    return res.status(400).json({ message: "project_name is required"})
  }

  try {
    const newPro = await Projects.newProject(req.body)
    res.json(newPro)
  } catch (err) {
    next(err)
  }
})














module.exports = router