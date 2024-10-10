import { Injectable } from '@nestjs/common';
import { CreateWaypointDto } from './dto/create-waypoint.dto';
import { UpdateWaypointDto } from './dto/update-waypoint.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WaypointsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createWaypointDto: CreateWaypointDto) {
    return 'This action adds a new waypoint';
  }

  findAll() {
    return this.prisma.waypoint.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} waypoint`;
  }

  update(id: number, updateWaypointDto: UpdateWaypointDto) {
    return `This action updates a #${id} waypoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} waypoint`;
  }
}
