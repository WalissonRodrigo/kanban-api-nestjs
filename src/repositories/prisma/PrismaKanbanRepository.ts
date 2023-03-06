import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { KanbanRepository } from '../KanbanRepository';
import { BadRequestException, NotFoundException } from 'src/exceptions';
import { Debug } from 'src/logs/debug.log';
import { Kanban } from 'src/dtos/kanban';

@Injectable()
export class PrismaKanbanRepository implements KanbanRepository {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const kanbans = await this.prisma.kanban.findMany();
    return kanbans;
  }
  async findOne(id: string) {
    try {
      const kanban = await this.prisma.kanban.findFirst({
        where: {
          id,
        },
      });
      if (!kanban.id) throw new NotFoundException();
      return kanban;
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async create(payload: object) {
    try {
      const Kanban: Kanban = payload as Kanban;
      const kanban = await this.prisma.kanban.create({
        data: { ...Kanban },
      });
      Debug({
        id: kanban.id,
        type: 'Kanban',
        action: 'Created',
        description: JSON.stringify(kanban),
      });
      return kanban;
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async update(id: string, payload: object) {
    try {
      const Kanban: Kanban = payload as Kanban;
      delete Kanban.createdAt;
      Kanban.updatedAt = new Date().toISOString();
      const kanban = await this.prisma.kanban.update({
        where: {
          id,
        },
        data: { ...Kanban },
      });
      Debug({
        id,
        type: 'Kanban',
        action: 'Updated',
        description: JSON.stringify(kanban),
      });
      return kanban;
    } catch (error) {
      console.error(error);
      throw new NotFoundException();
    }
  }
  async remove(id: string) {
    try {
      await this.prisma.kanban.delete({
        where: {
          id,
        },
      });
      Debug({ id, type: 'Kanban', action: 'Removed' });
      return this.findAll();
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
