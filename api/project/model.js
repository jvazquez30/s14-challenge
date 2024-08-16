// build your `Project` model here
const db = require('../../data/dbConfig')

async function getProjects() {
  const projects = await db('projects')
  return projects.map(project => ({
    ...project,
    project_completed: project.project_completed === 1
  }))
}

async function newProject(project) {
  const [id] = await db('projects').insert(project)
  const newProject = await db('projects').where('project_id', id).first()
  return {
    ...newProject,
    project_completed: newProject.project_completed === 1
  }
}

module.exports = {
  getProjects,
  newProject
}