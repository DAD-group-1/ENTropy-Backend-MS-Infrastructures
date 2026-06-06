import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import { BuildingController } from './building.controller';
import { Campus } from '../campuses/entities/campus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Building, Campus])],
  providers: [BuildingService],
  controllers: [BuildingController],
})
export class BuildingModule {}
