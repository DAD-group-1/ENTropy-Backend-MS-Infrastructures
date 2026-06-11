import { Controller, Logger } from '@nestjs/common';
import { CampusService } from './campus.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateCampusRequestDto,
  PaginationQueryDto,
  UpdateCampusRequestDto,
} from '@dad-group-1/backend-common';

@Controller('campuses')
export class CampusController {
  private readonly logger = new Logger(CampusController.name);
  constructor(private readonly campusService: CampusService) {}

  @MessagePattern({ cmd: 'create_campus' })
  async create(@Payload() data: CreateCampusRequestDto) {
    this.logger.log('Creating a new campus record');
    return this.campusService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_campuses' })
  findAll(query: PaginationQueryDto) {
    this.logger.log('Retrieving all campus records with pagination');
    return this.campusService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_campus' })
  findOne(@Payload() id: number) {
    this.logger.log('Retrieving campus record with ID: ' + id);
    return this.campusService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_campus' })
  update(
    @Payload()
    payload: {
      id: number;
      updateData: UpdateCampusRequestDto;
    },
  ) {
    this.logger.log('Updating campus record with ID: ' + payload.id);
    return this.campusService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_campus' })
  remove(@Payload() id: number) {
    this.logger.log('Removing campus record with ID: ' + id);
    return this.campusService.remove(id);
  }
}
