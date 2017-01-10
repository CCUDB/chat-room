const adapter = process.env.DB_ADAPTER || 'rethinkdb'

export let insertChat
export let dumpChat

if (adapter === 'rethinkdb') {
  insertChat = require('./rethinkdb').insertChat
  dumpChat = require('./rethinkdb').dumpChat
} else {
  insertChat = require('./eazydb')
  dumpChat = require('./eazydb')
}
