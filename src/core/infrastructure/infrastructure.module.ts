import { Module } from '@nestjs/common';
import { InfrastructureService } from './infrastructure.service';
import { InfrastructureController } from './infrastructure.controller';

@Module({
  providers: [InfrastructureService],
  controllers: [InfrastructureController]
})
export class InfrastructureModule {}
