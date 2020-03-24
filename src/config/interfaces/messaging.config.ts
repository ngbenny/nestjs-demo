interface MessagingConfig {
  transport: 'rmq' | 'tcp';
  rmq: {
    url: string;
    queue: string;
    queueOptions?: {
      durable: boolean
    }
  }
}