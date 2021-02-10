import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from 'dotenv/types'
import { Configuration } from 'src/config/config.keys'
import { ConfigModule } from 'src/config/config.module'
import { ConfigService } from 'src/config/config.service'
import { ConnectionOptions } from 'tls'

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
            return {
                ssl: true,
                useUnifiedTopology: true,
                useNewUrlParser: true,
                type: 'mongodb' as 'mongodb',
                host: config.get(Configuration.HOST_LOCAL),
                username: config.get(Configuration.USR_DB_LOCAL),
                password: config.get(Configuration.PWD_DB_LOCAL),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}']
            } as ConnectionOptions
        }
    }),
];