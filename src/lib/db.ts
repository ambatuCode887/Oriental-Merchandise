import * as mongoDB from 'mongodb'
import { DB_URI } from '$env/static/private';

const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_URI);
await client.connect();
const db: mongoDB.Db = client.db('oresb');

// export const getAdminsCollection = async () =>
// 	(await db.collection('admins'))
// export const getBranchsCollection = async () =>
// 	(await db.collection('branchs'))
export const getMerchandisesCollection = async () =>
	(await db.collection('merchandises'))
