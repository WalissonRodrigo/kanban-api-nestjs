import { PrismaService } from 'src/database/prisma.service';
import { KanbanController } from './kanban.controller';
import { Module } from '@nestjs/common';
import { KanbanRepository } from 'src/repositories/KanbanRepository';
import { PrismaKanbanRepository } from 'src/repositories/prisma/PrismaKanbanRepository';

@Module({
  controllers: [KanbanController],
  providers: [
    PrismaService,
    {
      provide: KanbanRepository,
      useClass: PrismaKanbanRepository,
    },
  ],
  exports: [KanbanModule],
})
export class KanbanModule {}
/*
    https://docs.nestjs.com/modules
*/
