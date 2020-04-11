'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.changeColumn("users", "id", {
    type: 'int',
    unsigned: true,
    notNull: true,
    autoIncrement: true,
    length: 10
  }, (err) => {
    if (err) return callback(err);
    return callback();
  });

  db.changeColumn("orders", "id", {
    type: 'int',
    unsigned: true,
    notNull: true,
    autoIncrement: true,
    length: 10
  }, (err) => {
    if (err) return callback(err);
    return callback();
  });

  db.changeColumn("runner_jobs", "id", {
    type: 'int',
    unsigned: true,
    notNull: true,
    autoIncrement: true,
    length: 10
  }, (err) => {
    if (err) return callback(err);
    return callback();
  });

};

exports.down = function(db, callback) {
  db.changeColumn("users", "id", {
    type: 'int',
    primaryKey: true
  }, (err) => {
    if (err) return callback(err);
    return callback();
  });

  db.changeColumn("orders", "id", {
    type: 'int',
    primaryKey: true
  }, (err) => {
    if (err) return callback(err);
    return callback();
  });

  db.changeColumn("runner_jobs", "id", {
    type: 'int',
    primaryKey: true
  }, (err) => {
    if (err) return callback(err);
    return callback();
  });
};

exports._meta = {
  "version": 1
};
