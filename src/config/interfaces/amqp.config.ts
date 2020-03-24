interface AmqpConfig {
  rmq: {
    url: string;
    queue: string;
    queueOptions?: {
      durable: boolean
    }
  }
}