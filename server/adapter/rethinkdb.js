import r from 'rethinkdb'

export async function insertChat (uid, content) {
  const conn = await r.connect({db: 'chatroom'})
  const result = await r.table('message').insert({
    uid,
    content
  }).run(conn)
  await conn.close()
  return result
}

export async function dumpChat () {
  const conn = await r.connect({db: 'chatroom'})
  const all = await r.table('message').run(conn)
  await conn.close()
  return await all.toArray()
}
