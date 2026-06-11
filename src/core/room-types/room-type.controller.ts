import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoomTypeService } from './room-type.service';
import {
  CreateRoomTypeRequestDto,
  PaginationQueryDto,
  UpdateRoomTypeRequestDto,
} from '@dad-group-1/backend-common';

@Controller('room-type')
export class RoomTypeController {
  private readonly logger = new Logger(RoomTypeController.name);
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @MessagePattern({ cmd: 'create_room_type' })
  async create(@Payload() data: CreateRoomTypeRequestDto) {
    this.logger.log('Received create room type request');
    return this.roomTypeService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_room_types' })
  findAll(query: PaginationQueryDto) {
    this.logger.log('Received find all room types request');
    return this.roomTypeService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_room_type' })
  findOne(@Payload() id: number) {
    this.logger.log('Received find one room type request for id: ' + id);
    return this.roomTypeService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_room_type' })
  update(
    @Payload()
    payload: {
      id: number;
      updateData: UpdateRoomTypeRequestDto;
    },
  ) {
    this.logger.log('Received update room type request for id: ' + payload.id);
    return this.roomTypeService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_room_type' })
  remove(@Payload() id: number) {
    this.logger.log('Received remove room type request for id: ' + id);
    return this.roomTypeService.remove(id);
  }
}
