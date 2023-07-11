import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';


export const dataBaseProviders :Array<Provider>  = [
   // {
     //   provide: 'DATA_SOURCE',
      //  useFactory: async () => {
        //    const dataSource = new DataSource({
          //       type: "postgres",
            //     url: process.env.DATABASE_URL_PRODUTION,
              //   entities: [
                //    __dirname + '/../../**/*.entity{.ts,.js}',
              //  ],
              //  synchronize: true
           // });
           // return dataSource.initialize();
        //},
    //}, 
    {
      provide: 'DATA_SOURCE_DEV',
      useFactory:async () => {
        const dataSource = new DataSource({
            type: 'postgres',
            url: process.env.DATABASE_URL_DEV,
            entities: [
                __dirname + '/../../**/*.entity{.ts,.js}',
            ],
            synchronize: true
        });
        return dataSource.initialize();
      }
    },

]