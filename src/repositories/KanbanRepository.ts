export abstract class KanbanRepository {
  abstract findAll();
  abstract findOne(id: string);
  abstract create(kanban: object);
  abstract update(id: string, kanban: object);
  abstract remove(id: string);
}
