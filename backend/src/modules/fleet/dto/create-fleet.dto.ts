import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FleetEnum } from '../../../common/enums/fleet.enum';

export class CreateFleetDto {
  @IsNotEmpty()
  @IsString()
  patent: string;

  @IsNotEmpty()
  @IsEnum(FleetEnum)
  type: FleetEnum;
}
