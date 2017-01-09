import r from 'rethinkdb'

export async function insertChat(uid, content) {
  const conn = await r.connect({db: 'chatroom'})
  return await r.table('message').insert({
    uid,
    content
  }).run(conn)
}

export async function dumpChat() {
  const conn = await r.connect({db: 'chatroom'})
  const all = await r.table('message').run(conn)
  return await all.toArray()
}
