export class CreateAnswerDto {
  controlNumber: number;
  safeguardCode: string;
  score: number;
  applicable?: boolean;
  maturityLevel?: string;
}
