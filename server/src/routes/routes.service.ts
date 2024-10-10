import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Route, Prisma } from '@prisma/client';

@Injectable()
export class RoutesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RouteCreateInput): Promise<Route> {
    return this.prisma.route.create({ data });
  }

  async findAll(): Promise<Route[] | null> {
    return await this.prisma.route.findMany({
      include: {
        waypoints: true,
      },
    });
  }

  async findOne(id: string): Promise<Route | null> {
    return this.prisma.route.findUnique({
      where: {
        id: id,
      },
      include: {
        waypoints: true,
      },
    });
  }

  async update(id: string, data: Prisma.RouteUpdateInput) {
    return this.prisma.route.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async remove(id: string) {
    return this.prisma.route.delete({
      where: {
        id: id,
      },
    });
  }
}
