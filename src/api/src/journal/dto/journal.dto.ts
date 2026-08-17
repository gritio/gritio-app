export class CreateJournalSectionDto {
  name: string;
  color?: string;
}

export class UpdateJournalSectionDto {
  name?: string;
  color?: string;
  content?: string;
}
