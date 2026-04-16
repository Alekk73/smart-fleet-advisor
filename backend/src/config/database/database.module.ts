import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        port: config.get<number>('DB_PORT'),
        host: config.get<string>('DB_HOST'),
        username: config.get<string>('DB_USER'),
        database: config.get<string>('DB_NAME'),
        password: config.get<string>('DB_PASSWORD'),
        entities: [__dirname + '/../../modules/**/**/*.entity.{ts,js}'],
        synchronize: true, // Para inicios del desarrollo
      }),
    }),
  ],
})
export class DatabaseModule {}
