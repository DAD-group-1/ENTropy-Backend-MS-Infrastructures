import { Module } from '@nestjs/common';
import { CampusController } from './campus.controller';
import { CampusService } from './campus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campus } from './entities/campus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campus])],
  controllers: [CampusController],
  providers: [CampusService],
})
export class CampusModule {}
