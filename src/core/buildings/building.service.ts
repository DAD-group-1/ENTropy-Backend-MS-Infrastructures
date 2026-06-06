import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Building } from './entities/building.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BuildingListResponseDto,
  BuildingResponseDto,
  CreateBuildingRequestDto,
  PaginationQueryDto,
  UpdateBuildingRequestDto,
} from '@dad-group-1/backend-common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class BuildingService {
  private readonly logger = new Logger(BuildingService.name);

  constructor(
    @InjectRepository(Building)
    private buildingRepository: Repository<Building>,
  ) {}

  async create(
    createData: CreateBuildingRequestDto,
  ): Promise<BuildingResponseDto> {
    const building = this.buildingRepository.create({ ...createData });
    try {
      return await this.buildingRepository.save(building);
    } catch (error) {
      this.logger.error(
        `${error.constructor.name}: Failed to create building record - ${error.message}`,
        error.stack,
      );
      throw new RpcException({
        message: `Failed to create building record`,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findAll(query: PaginationQueryDto): Promise<BuildingListResponseDto> {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await this.buildingRepository.findAndCount({
      relations: { campus: true },
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    return new BuildingListResponseDto(data, total, page, limit);
  }

  async findOne(id: number): Promise<BuildingResponseDto | null> {
    const building = await this.buildingRepository.findOne({
      where: { id: id },
      relations: { campus: true },
    });

    if (!building) {
      throw new RpcException({
        message: `Building with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    return building;
  }

  async update(
    id: number,
    updateData: UpdateBuildingRequestDto,
  ): Promise<BuildingResponseDto | null> {
    const building = await this.buildingRepository.findOne({
      where: { id: id },
    });
    if (!building) {
      this.logger.error(`Building with ID ${id} not found for update`);
      throw new RpcException({
        message: `Building with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    this.buildingRepository.merge(building, updateData);
    return await this.buildingRepository.save(building);
  }

  async remove(id: number): Promise<BuildingResponseDto | null> {
    const building = await this.buildingRepository.findOne({
      where: { id: id },
    });
    if (!building) {
      this.logger.error(`Building with ID ${id} not found for deletion`);
      throw new RpcException({
        message: `Building with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    await this.buildingRepository.remove(building);
    return building;
  }
}
