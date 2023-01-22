import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";

export function umZug ( path: string, sequelize: Sequelize, wd: string){
    return  new Umzug({
        migrations: { 
          glob: [path, { cwd: wd }],
          resolve: ({ name, path, context }) => {
            const migration = path && require(path)
            return {
                name,
                up: async () => migration.up(context, Sequelize),
                down: async () => migration.down(context, Sequelize),
            }
        },
        },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize }),
        logger: console,
      });
}