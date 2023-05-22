import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class NFTMetadataUpdateDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  tokenId: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  nftContractAddress: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  providerAddress: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  nftData: any;
}
