import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BalancesService } from './balances.service';
import { Balance } from './interfaces/balance.interface';

@ApiTags('Balances')
@Controller('balances')
export class BalancesController {
  constructor(private readonly balanceService: BalancesService) {}

  @Get()
  async getAll(@Res() res): Promise<Balance[]> {
    return res.status(HttpStatus.OK).json({
      data: [],
    });
  }
}
