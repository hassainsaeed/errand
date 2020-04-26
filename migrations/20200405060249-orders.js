
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
  db.createTable('orders', {
    id: {
      type: 'int',
      primaryKey: true,
    },
    runner_job_id: {
      type: 'int',
    },
    runner_user_id: {
      type: 'int',
    },
    requester_user_id: {
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
    list: {
      type: 'text',
      length: 65536,
    },
    store_name: {
      type: 'string',
      length: 100,
    },
    requester_latitude: {
      type: 'string',
      length: 40,
    },
    requester_longitude: {
      type: 'string',
      length: 40,
    },
  }, (err) => {
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function (db, callback) {
  db.dropTable('orders', callback);
};

exports._meta = {
  version: 1,
};
