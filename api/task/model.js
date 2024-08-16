// build your `Task` model here
const db = require('../../data/dbConfig')

async function getAllTasks() {
  const tasks = await db('tasks as t')
  .join('projects as p', 't.project_id', 'p.project_id')
  .select('t.*', "p.project_name", "p.project_description")
  return tasks.map(task => ({
    ...task,
    task_completed: task.task_completed === 1
  }))
}

async function createTask(task) {
  const [id] = await db('tasks').insert(task)
  const newTask = await db('tasks').where('task_id', id).first()

  return {
    ...newTask,
    task_completed: newTask.task_completed === 1
  }
}





module.exports = {
  getAllTasks,
  createTask
}