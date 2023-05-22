import { Controller, Get } from "@nestjs/common";
import { Ok } from "src/utils";

@Controller()
export class GeneralController {
  constructor() {}

  @Get()
  async healthCheck(): Promise<Ok> {
    return new Ok();
  }
}
