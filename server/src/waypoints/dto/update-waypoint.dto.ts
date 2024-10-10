import { PartialType } from '@nestjs/mapped-types';
import { CreateWaypointDto } from './create-waypoint.dto';

export class UpdateWaypointDto extends PartialType(CreateWaypointDto) {}
