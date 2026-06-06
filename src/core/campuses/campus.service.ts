import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campus } from './entities/campus.entity';
import { Repository } from 'typeorm';
import {
  CampusListResponseDto,
  CampusResponseDto,
  CreateCampusRequestDto,
  PaginationQueryDto,
  UpdateCampusRequestDto,
} from '@dad-group-1/backend-common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CampusService {
  private readonly logger = new Logger(CampusService.name);

  constructor(
    @InjectRepository(Campus)
    private campusRepository: Repository<Campus>,
  ) {}

  async create(createData: CreateCampusRequestDto): Promise<CampusResponseDto> {
    const campus = this.campusRepository.create({ ...createData });
    try {
      return await this.campusRepository.save(campus);
    } catch (error) {
      this.logger.error(
        `${error.constructor.name}: Failed to create campus record - ${error.message}`,
        error.stack,
      );
      throw new RpcException({
        message: `Failed to create campus record`,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findAll(query: PaginationQueryDto): Promise<CampusListResponseDto> {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await this.campusRepository.findAndCount({
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    return new CampusListResponseDto(data, total, page, limit);
  }

  async findOne(id: number): Promise<CampusResponseDto | null> {
    const campus = await this.campusRepository.findOne({
      where: { id: id },
    });

    if (!campus) {
      throw new RpcException({
        message: `Campus with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    return campus;
  }

  async update(
    id: number,
    updateData: UpdateCampusRequestDto,
  ): Promise<CampusResponseDto | null> {
    const campus = await this.campusRepository.findOne({
      where: { id: id },
    });
    if (!campus) {
      this.logger.error(`Campus with ID ${id} not found for update`);
      throw new RpcException({
        message: `Campus with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    this.campusRepository.merge(campus, updateData);
    return await this.campusRepository.save(campus);
  }

  async remove(id: number): Promise<CampusResponseDto | null> {
    const campus = await this.campusRepository.findOne({
      where: { id: id },
    });
    if (!campus) {
      this.logger.error(`Campus with ID ${id} not found for deletion`);
      throw new RpcException({
        message: `Campus with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    await this.campusRepository.remove(campus);
    return campus;
  }
}
