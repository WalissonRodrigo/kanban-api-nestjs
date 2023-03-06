/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Kanban as KanBan, StatusKanban } from '../dtos/kanban';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { KanbanRepository } from '../repositories/KanbanRepository';

class Kanban extends KanBan {}

@ApiBearerAuth('jwt')
@ApiTags('Kanban')
@UseGuards(JwtAuthGuard)
@Controller('cards')
export class KanbanController {
  constructor(private kanbanRepository: KanbanRepository) {}

  @Get()
  @ApiOperation({ summary: 'Get all Cards Kanban' })
  @ApiResponse({
    status: 200,
    description: 'Array with all Cards Kanban',
    type: [Kanban],
  })
  async findAll() {
    const kanban = await this.kanbanRepository.findAll();
    return kanban;
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new Kanban' })
  @ApiResponse({
    status: 200,
    description: 'Object Kanban created is returned',
    type: Kanban,
  })
  @ApiBadRequestResponse({
    description: 'Something bad has sended or happened. Verify and try again',
  })
  async create(@Body() body: Kanban) {
    const { title, content } = body;
    const kanban = await this.kanbanRepository.create({
      title,
      content,
      status: StatusKanban.ToDo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return kanban;
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get Card Kanban using your id unique' })
  @ApiResponse({
    status: 200,
    description: 'Object Card Kanban is returned',
    type: Kanban,
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const kanban = await this.kanbanRepository.findOne(uuid);
    return kanban;
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Update fields in Card Kanban register' })
  @ApiResponse({
    status: 200,
    description: 'Object Card Kanban is returned',
    type: Kanban,
  })
  @ApiBadRequestResponse({
    description: 'Something bad has sended or happened. Verify and try again',
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() body: Kanban,
  ) {
    const { title, content, status } = body;
    const updated = await this.kanbanRepository.update(uuid, {
      title,
      content,
      status: StatusKanban[status],
      updatedAt: new Date().toISOString(),
    });
    return updated;
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete permanently record of Kanban' })
  @ApiResponse({
    status: 200,
    description: 'After remove card list all cards is returned',
    type: [Kanban],
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const deleted = await this.kanbanRepository.remove(uuid);
    return deleted;
  }
}
