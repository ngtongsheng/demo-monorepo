import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('./db/channels.json');
const db = lowdb(adapter);

export default db;
