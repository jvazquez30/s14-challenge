// build your `/api/tasks` router here
const express = require('express')
const Tasks = require('./model')

const router = express.Router()

router.get('/', async ( req, res, next) => {
  try {
    const info = await Tasks.getAllTasks()
    res.json(info);
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const { task_description, project_id } = req.body

  if (!task_description) {
    return res.status(400).json({ message: 'missing task_description'})
  }
  if (!project_id) {
    return res.status(400).json({ message: 'missing project_id'})
  } 
  if (typeof project_id !== 'number') {
    return res.status(400).json({ message: 'invalid project_id'})
  }

  try {
    const newTask = await Tasks.createTask(req.body)
    res.status(201).json(newTask)
  } catch (err) {
    next(err)
  }
})





















module.exports = router