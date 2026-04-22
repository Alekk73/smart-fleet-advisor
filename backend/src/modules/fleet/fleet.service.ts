import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFleetDto } from './dto/create-fleet.dto';
import { UpdateFleetDto } from './dto/update-fleet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fleet } from './entities/fleet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FleetService {
  constructor(
    @InjectRepository(Fleet)
    private readonly fleetsRepository: Repository<Fleet>,
  ) {}

  async create(createFleetDto: CreateFleetDto) {
    const fleetCreated = this.fleetsRepository.create(createFleetDto);
    if (!fleetCreated) throw new BadRequestException('Error at create fleet');

    return await this.fleetsRepository.save(fleetCreated);
  }

  async findAll() {
    const fleets = await this.fleetsRepository.find();
    if (!fleets) throw new NotFoundException('Not found fleets');

    return fleets;
  }

  findOne(id: number) {
    return `This action returns a #${id} fleet`;
  }

  update(id: number, updateFleetDto: UpdateFleetDto) {
    return `This action updates a #${id} fleet`;
  }

  remove(id: number) {
    return `This action removes a #${id} fleet`;
  }
}
