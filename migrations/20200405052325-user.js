
let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('users', {
    id: {
      type: 'int',
      primaryKey: true,
    },
    email: {
      type: 'string',
      length: 50,
    },
    password: {
      type: 'string',
      length: 100,
    },
    first_name: {
      type: 'string',
      length: 20,
    },
    last_name: {
      type: 'string',
      length: 20,
    },
    created_at: {
      type: 'datetime',
    },
    phone_number: {
      type: 'string',
      length: 15,
    },
  }, (err) => {
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function (db, callback) {
  db.dropTable('users', callback);
};

exports._meta = {
  version: 1,
};
