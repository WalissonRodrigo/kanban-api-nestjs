import { KanbanModule } from './Kanban/kanban.module';
import { KanbanController } from './Kanban/kanban.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { KanbanRepository } from './repositories/KanbanRepository';
import { PrismaKanbanRepository } from './repositories/prisma/PrismaKanbanRepository';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [KanbanModule, AuthModule, UsersModule],
  controllers: [KanbanController, AppController],
  providers: [
    PrismaService,
    {
      provide: KanbanRepository,
      useClass: PrismaKanbanRepository,
    },
  ],
})
export class AppModule {}
