import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaypointsModule } from './waypoints/waypoints.module';
import { RoutesModule } from './routes/routes.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [WaypointsModule, RoutesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
