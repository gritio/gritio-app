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
  title?: string;
  content?: string;
}

export class UpdateJournalPageDto {
  date?: string;
  title?: string;
  content?: string;
}
