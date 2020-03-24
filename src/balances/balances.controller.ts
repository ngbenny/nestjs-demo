import { Controller, Get, Res, Query, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { BalancesService } from './balances.service';
import { Balance } from './interfaces/balance.interface';

@ApiTags('Balances')
@Controller('balances')
export class BalancesController {
  constructor(private readonly balanceService: BalancesService) {}

  @Get()
  @ApiQuery({ name: 'userId', required: true })
  async findAll(@Res() res, @Query() query): Promise<Balance[]> {
    const balances = await this.balanceService.findAll(query);
    return res.status(HttpStatus.OK).json({
      data: balances,
    });
  }
}
