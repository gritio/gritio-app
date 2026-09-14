export class CreateJournalNotebookDto {
  name: string;
  color?: string;
}

export class UpdateJournalNotebookDto {
  name?: string;
  color?: string;
}

export class CreateJournalPageDto {
  date?: string; // ISO date; defaults to now if omitted
  content?: string;
}

export class UpdateJournalPageDto {
  date?: string;
  content?: string;
}
