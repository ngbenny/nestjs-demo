import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Request,
  HttpStatus,
  Query,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { Transaction } from './interfaces/transaction.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ClientProxy } from '@nestjs/microservices';
import { TransactionCreatedEvent } from './events/transaction.events';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// TODO refactor
const RMQ_CLIENT = 'RMQ_CLIENT';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionsService,
    @Inject(RMQ_CLIENT)
    private readonly rmqClient: ClientProxy,
  ) {}

  @Get()
  @ApiQuery({ name: 'userId', required: false })
  async getAll(@Res() res, @Query() query): Promise<Transaction[]> {
    const transactions = await this.transactionService.findAll(query);
    return res.status(HttpStatus.OK).json({
      data: transactions,
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Res() res,
    @Request() req,
    @Body() dto: CreateTransactionDto,
  ): Promise<Transaction> {
    console.log('creating transaction', req.user)
    dto.userId = req.user._id;
    const transaction = await this.transactionService.create(dto);

    const createdEvent = new TransactionCreatedEvent(
      transaction.userId,
      transaction.amount,
    );
    this.rmqClient.emit(createdEvent.pattern, createdEvent.payload);

    return res.status(HttpStatus.CREATED).json({
      message: 'Transaction has been created successfully',
      data: transaction,
    });
  }
}
