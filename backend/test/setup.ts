import { sequelize } from '../src/util/db';
import { connectToDatabase } from '../src/util/db';


export const connectTestDB = async () => {
  await connectToDatabase();
};

export const closeTestDB = async () => {
  console.log('CLOSETESTDB FINISHED EXECUTING, CONNECTING SUCCESFULLY CLOSED')
  await sequelize.close();
};

export const clearTestDB = async () => {
  const models = sequelize.models;
  for (const model of Object.values(models)) {
    if (model.name !== 'SequelizeMeta') {
      try {
        console.log('destroyed model is', model.name);
        await model.destroy({ where: {}, force: true });
      } catch (error) {
        console.log('error in clear test db is', error);
      }
    }
  };
  console.log('CLEARTESTDB FINISHED EXECUTING')
};