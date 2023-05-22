import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { GeneralModule, NFTModule } from "./controllers";
import { DareNFTModule } from "./global_modules";
import { HealthModule } from "./modules/health";

const loadConditionModules = () => {
  const conditionModules = [] as any[];

  return conditionModules;
};

@Module({
  imports: [
    GeneralModule,
    NFTModule,
    HealthModule,

    // Global module
    DareNFTModule,

    // Background jobs
    ScheduleModule.forRoot(),
    ...loadConditionModules(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
