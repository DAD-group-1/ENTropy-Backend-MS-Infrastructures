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
    return this.campusService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_campuss' })
  findAll(query: PaginationQueryDto) {
    return this.campusService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_campus' })
  findOne(@Payload() id: number) {
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
    return this.campusService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_campus' })
  remove(@Payload() id: number) {
    return this.campusService.remove(id);
  }
}
