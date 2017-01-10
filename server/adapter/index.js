import { insertChat as rInsertChat, dumpChat as rDumpChat } from './rethinkdb'
import { insertChat as eInsertChat, dumpChat as eDumpChat } from './eazydb'

const adapter = process.env.DB_ADAPTER || 'rethinkdb'

export let insertChat
export let dumpChat

if (adapter === 'rethinkdb') {
  insertChat = rInsertChat
  dumpChat = rDumpChat
} else {
  insertChat = eInsertChat
  dumpChat = eDumpChat
}

export const rethinkdb = {
  insertChat: rInsertChat,
  dumpChat: rDumpChat
}

export const eazydb = {
  insertChat: eInsertChat,
  dumpChat: eDumpChat
}
