// build your `/api/resources` router here
const express = require('express');
const Functions = require('./model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const resources = await Functions.getAll();
    res.json(resources)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {resource_name} = req.body

  if (!resource_name) {
    return res.status(400).json({ message: 'resource_name is required'})
  }
  try {
    const newResource = await Functions.createResource(req.body)
    res.status(201).json(newResource)
  } catch (err) {
    next (err)
  }
})





module.exports = router