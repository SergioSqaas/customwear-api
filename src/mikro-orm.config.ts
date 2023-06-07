import { MikroORM, Connection, IDatabaseDriver } from '@mikro-orm/core';

import { Options } from "@mikro-orm/core";


const isLocalPathEntities = process.env.MIKRO_CONFIG_ENTITIES_TS === 'true'
const config: Options<IDatabaseDriver<Connection>> = {
  entities: isLocalPathEntities ? ['*/services/**/entity.ts'] : ["*/services/**/entity.js"],
  type: "postgresql",
  debug: true,
  dbName: process.env.POSTGRES_DB_NAME,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  tsNode: true,
  populateAfterFlush: false,
};


console.log("🚀 ~ file: mikro-orm.config.ts:20 ~ process.env.MIKRO_CONFIG_ENTITIES_TS:", process.env.MIKRO_CONFIG_ENTITIES_TS === 'true')

export default config;