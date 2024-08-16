// build your server here and require it from index.js
const express = require('express');
const helmet = require('helmet');
const ResourceRouter = require('./resource/router.js')
const ProjectRouter = require('./project/router.js')
const TaskRouter = require('./task/router.js')

const server = express()


server.use(helmet());
server.use(express.json());

server.use('/api/resources', ResourceRouter)
server.use('/api/projects', ProjectRouter)
server.use('/api/tasks', TaskRouter)


server.use((err, req, res, next) => { //eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
})





module.exports = server