import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  GRPCHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private grpc: GRPCHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    console.log('🔍 Health endpoint called');
    return this.health.check([
      () => this.grpc.checkService('users', 'localhost:50051'),
    ]);
  }
}
