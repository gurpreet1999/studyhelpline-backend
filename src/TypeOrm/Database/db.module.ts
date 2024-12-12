import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { DbConfig } from "./db.interface";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";


@Module({})


export class DBModule {


    private static getConnectionOptions(
        config: ConfigService,
        dbConfig: DbConfig
      ): TypeOrmModuleOptions {
        // const dbData = config.get().db;
        // if (!dbData) {
        //   throw Error("");
        // }
        const connectionOptions = this.getConnectionOptionsMySql();
        return {
          ...connectionOptions,
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
        };
      }



      private static getConnectionOptionsMySql(
        // dbData: ConfigDatabase 
      ): TypeOrmModuleOptions {
        return {
            type:"mysql",
            host:'localhost', 
            port: 3306, 
            username: 'root',
            password: 'Gurpreet@1999',
            database:'studyhelpline',
            keepConnectionAlive: true,
            ssl: false,  
          };
      }


      public static forRoot(dbConfig: DbConfig) {
        return {
          module: DBModule,
          imports: [
            TypeOrmModule.forRootAsync({
              imports: [ConfigModule],
              useFactory: (configService: ConfigService) => {
                return DBModule.getConnectionOptions(configService, dbConfig);
              },
              inject: [ConfigService],
            }),
          ],
          controllers: [],
          providers: [],
          exports: [],
        };
      }


}








