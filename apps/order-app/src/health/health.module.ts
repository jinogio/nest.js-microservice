// import { Module } from '@nestjs/common';
// import { HealthController } from './health.controller';

import { Module } from '@nestjs/common';
import { GRPCHealthIndicator, TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

// @Module({
//   imports: [],
//   controllers: [HealthController],
//   providers: [HealthController],
// })
// export class HealthModule {}

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [GRPCHealthIndicator],
})
export class HealthModule {}
