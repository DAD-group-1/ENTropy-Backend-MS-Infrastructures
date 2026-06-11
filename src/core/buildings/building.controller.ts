import { Controller, Logger } from '@nestjs/common';
import { BuildingService } from './building.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateBuildingRequestDto,
  PaginationQueryDto,
  UpdateBuildingRequestDto,
} from '@dad-group-1/backend-common';

@Controller('buildings')
export class BuildingController {
  private readonly logger = new Logger(BuildingController.name);
  constructor(private readonly buildingService: BuildingService) {}

  @MessagePattern({ cmd: 'create_building' })
  async create(@Payload() data: CreateBuildingRequestDto) {
    this.logger.log('Creating a new building record');
    return this.buildingService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_buildings' })
  findAll(query: PaginationQueryDto) {
    this.logger.log('Retrieving all building records with pagination');
    return this.buildingService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_building' })
  findOne(@Payload() id: number) {
    this.logger.log('Retrieving building record with ID: ' + id);
    return this.buildingService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_building' })
  update(
    @Payload()
    payload: {
      id: number;
      updateData: UpdateBuildingRequestDto;
    },
  ) {
    this.logger.log('Updating building record with ID: ' + payload.id);
    return this.buildingService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_building' })
  remove(@Payload() id: number) {
    this.logger.log('Removing building record with ID: ' + id);
    return this.buildingService.remove(id);
  }
}
