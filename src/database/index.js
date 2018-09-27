import { Database } from 'react-native-database';
import Realm from 'realm';

class User { }
User.schema = {
  name: 'User',
  properties: {
    id: 'string',
    username: 'string',
    fullname: 'string',
    email: 'string',
  },
};

const schema = { schema: [User], schemaVersion: 1 };
const database = new Database(schema);
export const realm = new Realm(schema);

export const saveTODB = (className, props, callback) => {
  try {
    database.write(() => { database.create(className, props); });
    callback(true);
  } catch (error) {
    callback(false);
  }
};

export const fetchDataWithIdFromDB = (className, query, callback) => {
  try {
    callback(true, database.objects(className).filtered(query));
  } catch (error) {
    callback(false, []);
  }
};

export const fetchListFromDB = (className, callback) => {
  try {
    callback(true, database.objects(className));
  } catch (error) {
    callback(false, []);
  }
};

export const deleteFromDB = (className, props, callback) => {
  try {
    realm.write(() => {
     realm.delete(
        realm.objects("User")
      );
    });
  } catch (error) {
    console.log(error);
    callback(false);
  }
};
export const deleteAllFromDB = (className, props, callback) => {
  try {
    database.deleteAll(props);
    callback(true);
  } catch (error) {
    console.log(error);
    callback(false);
  }
};

