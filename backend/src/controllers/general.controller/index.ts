import { Module } from "@nestjs/common";
import { GeneralController } from "./general.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [GeneralController],
  providers: [],
})
export class GeneralModule {}
