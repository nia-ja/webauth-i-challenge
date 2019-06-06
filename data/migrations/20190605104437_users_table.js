exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', tbl => {
      // for uuid imlementation
      tbl.string('id', 128)
              .primary()
              .notNullable();
      tbl
        .string('username', 128)
        .unique()
        .notNullable();
      tbl.string('password', 128).notNullable();
    });
};
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};