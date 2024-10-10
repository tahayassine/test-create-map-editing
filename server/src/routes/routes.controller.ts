import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    console.log(createRouteDto);

    return this.routesService.create({
      name: createRouteDto.name,
      waypoints: {
        create: createRouteDto.waypoints.map((waypoint) => {
          return {
            name: waypoint.name,
            lat: waypoint.lat,
            lng: waypoint.lng,
          };
        }),
      },
    });
  }

  @Get()
  findAll() {
    return this.routesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routesService.update(id, {
      name: updateRouteDto.name,
      waypoints: {
        create: updateRouteDto.waypoints.map((waypoint) => {
          return {
            name: waypoint.name,
            lat: waypoint.lat,
            lng: waypoint.lng,
          };
        }),
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routesService.remove(id);
  }
}
