import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateRoomRequestDto,
  PaginationQueryDto,
  RoomListResponseDto,
  RoomResponseDto,
  UpdateRoomRequestDto,
} from '@dad-group-1/backend-common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RoomService {
  private readonly logger = new Logger(RoomService.name);

  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(createData: CreateRoomRequestDto): Promise<RoomResponseDto> {
    const room = this.roomRepository.create({ ...createData });
    try {
      return await this.roomRepository.save(room);
    } catch (error) {
      this.logger.error(
        `${error.constructor.name}: Failed to create room record - ${error.message}`,
        error.stack,
      );
      throw new RpcException({
        message: `Failed to create room record`,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findAll(query: PaginationQueryDto): Promise<RoomListResponseDto> {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await this.roomRepository.findAndCount({
      relations: { roomType: true },
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    return new RoomListResponseDto(data, total, page, limit);
  }

  async findOne(id: number): Promise<RoomResponseDto | null> {
    const room = await this.roomRepository.findOne({
      where: { id: id },
      relations: { roomType: true },
    });

    if (!room) {
      throw new RpcException({
        message: `Room with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    return room;
  }

  async update(
    id: number,
    updateData: UpdateRoomRequestDto,
  ): Promise<RoomResponseDto | null> {
    const room = await this.roomRepository.findOne({
      where: { id: id },
    });
    if (!room) {
      this.logger.error(`Room with ID ${id} not found for update`);
      throw new RpcException({
        message: `Room with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    this.roomRepository.merge(room, updateData);
    return await this.roomRepository.save(room);
  }

  async remove(id: number): Promise<RoomResponseDto | null> {
    const room = await this.roomRepository.findOne({
      where: { id: id },
    });
    if (!room) {
      this.logger.error(`Room with ID ${id} not found for deletion`);
      throw new RpcException({
        message: `Room with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    await this.roomRepository.remove(room);
    return room;
  }
}
