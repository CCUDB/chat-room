const adapter = process.env.DB_ADAPTER || 'rethinkdb'

let insertChat
let dumpChat

if (adapter === 'rethinkdb') {
  insertChat = require('./rethinkdb').insertChat
  dumpChat = require('./rethinkdb').dumpChat
} else {
  insertChat = require('./eazydb')
  dumpChat = require('./eazydb')
}

export insertChat
export dumpChat
