export class CreateTodoDto {
  title: string;
  description?: string;
  dueDate: string | Date;
  priority?: boolean;
}

export class UpdateTodoDto {
  title?: string;
  description?: string;
  dueDate?: string | Date;
  priority?: boolean;
  done?: boolean;
}

export class ToggleDoneDto {
  done: boolean;
}

export class TogglePriorityDto {
  priority: boolean;
}

export class BulkMarkDoneDto {
  ids: string[];
}
