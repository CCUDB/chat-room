import r from 'rethinkdb'
import perfy from 'perfy'

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

  perfy.start('rethinkdb')
  const all = await r.table('message').run(conn)
  const result = perfy.end('rethinkdb')
  console.log('rethinkdb dumpchat: ' + result.time)

  await conn.close()
  return await all.toArray()
}
