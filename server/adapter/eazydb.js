import path from 'path'

let _EazyDB

try {
  _EazyDB = require('node-eazydb')
} catch (e) {
  console.error('Please run `npm run build-depency` first')
}

const EazyDB = _EazyDB.default

const executePath = path.resolve(path.join(__dirname, '..', '..', 'eazydb', 'bin', 'eazydb'))
const dbPath = path.resolve(path.join(__dirname, '..', '..', 'db', 'chat-db'))

export async function insertChat (uid, content) {
  const db = EazyDB.open({ executePath })
  await db.use(dbPath)
  await db.insert({ uid, content })
  await db.close()
  return true
}

export async function dumpChat (uid, content) {
  const db = EazyDB.open({ executePath })
  await db.use(dbPath)
  const { data } = await db.dump()
  await db.close()
  return data
}
