
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
  db.createTable('runner_jobs', {
    id: {
      type: 'int',
      primaryKey: true,
    },
    runners_user_id: {
      type: 'int',
    },
    status: {
      type: 'string',
      length: 20,
    },
    created_at: {
      type: 'datetime',
    },
    ended_at: {
      type: 'datetime',
    },
    is_accepting_requests: {
      type: 'boolean',
    },
    store_name: {
      type: 'string',
      length: 100,
    },
    runner_latitude: {
      type: 'string',
      length: 40,
    },
    runner_longitude: {
      type: 'string',
      length: 40,
    },
    radius: {
      type: 'int',
    },
  }, (err) => {
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function (db, callback) {
  db.dropTable('runner_jobs', callback);
};

exports._meta = {
  version: 1,
};
