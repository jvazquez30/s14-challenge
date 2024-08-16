/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema
  .createTable('projects', pr => {
    pr.increments('project_id')
    pr.string('project_name', 128).notNullable()
    pr.string('project_description')
    pr.boolean('project_completed').defaultTo(false)
  })
  .createTable('resources', res => {
    res.increments('resource_id')
    res.string('resource_name', 128).notNullable().unique()
    res.string('resource_description', 128)
  })
  .createTable('tasks', task => {
    task.increments('task_id')
    task.string('task_description', 128).notNullable()
    task.string('task_notes', 128)
    task.boolean('task_completed').defaultTo(false)
    task.integer('project_id', 128)
      .unsigned()
      .notNullable()
      .references('project_id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
  .dropTableIfExists('project_resources')
  .dropTableIfExists('tasks')
  .dropTableIfExists('resources')
  .dropTableIfExists('projects')
};
