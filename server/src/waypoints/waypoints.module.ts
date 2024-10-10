import { Module } from '@nestjs/common';
import { WaypointsService } from './waypoints.service';
import { WaypointsController } from './waypoints.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [WaypointsController],
  providers: [WaypointsService, PrismaService],
})
export class WaypointsModule {}
