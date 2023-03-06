/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export enum StatusKanban {
  ToDo = 'ToDo',
  Doing = 'Doing',
  Done = 'Done',
  Dropped = 'Dropped',
}

export class Kanban {
  @ApiProperty({
    example: '5909aaee-5d40-46d4-bf4a-e38314a77827',
    description: 'This field is unique string using UUID pattern.',
  })
  id: string;

  @ApiProperty({
    example: 'Schedule Important',
    description: 'A title sugestive for your card on your board kanban',
  })
  @IsNotEmpty({
    message: 'The title field should not be empty',
  })
  @Length(3, 150)
  title: string;

  @ApiProperty({
    example:
      'Schedule about requirements to developer a new modules in internal systems of company',
    description:
      'All informations to describe your card and your actions when change to progress the card.',
  })
  @IsNotEmpty({
    message: 'The content field should not be empty',
  })
  content: string;

  @ApiProperty({
    example: 'ToDo',
    description: 'Is the status present in this card',
  })
  status: StatusKanban;

  @ApiProperty({
    example: '01/10/2002 10:01:10',
    description: 'Date and Time to register creation of card',
  })
  createdAt: string;

  @ApiProperty({
    example: '10/01/2020 01:10:01',
    description: 'Date and Time to register last update in card register',
  })
  updatedAt: string;
}
