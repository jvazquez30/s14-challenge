// build your `Resource` model here
const db = require('../../data/dbConfig')

function getAll() {
  return db('resources');
}

async function createResource(resource) {
  const [id] = await db('resources').insert(resource)
  return getAll().where('resource_id', id).first();
}

module.exports = {
  getAll,
  createResource
}