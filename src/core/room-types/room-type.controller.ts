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
    return this.roomTypeService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_room_types' })
  findAll(query: PaginationQueryDto) {
    return this.roomTypeService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_room_type' })
  findOne(@Payload() id: number) {
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
    return this.roomTypeService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_room_type' })
  remove(@Payload() id: number) {
    return this.roomTypeService.remove(id);
  }
}
