import { Controller, Logger } from '@nestjs/common';
import { RoomService } from './room.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateRoomRequestDto,
  PaginationQueryDto,
  UpdateRoomRequestDto,
} from '@dad-group-1/backend-common';

@Controller('rooms')
export class RoomController {
  private readonly logger = new Logger(RoomController.name);
  constructor(private readonly roomService: RoomService) {}

  @MessagePattern({ cmd: 'create_room' })
  async create(@Payload() data: CreateRoomRequestDto) {
    return this.roomService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_rooms' })
  findAll(query: PaginationQueryDto) {
    return this.roomService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_room' })
  findOne(@Payload() id: number) {
    return this.roomService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_room' })
  update(
    @Payload()
    payload: {
      id: number;
      updateData: UpdateRoomRequestDto;
    },
  ) {
    return this.roomService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_room' })
  remove(@Payload() id: number) {
    return this.roomService.remove(id);
  }
}
