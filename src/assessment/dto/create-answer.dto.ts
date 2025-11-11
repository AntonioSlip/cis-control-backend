export class CreateAnswerDto {
  controlNumber: number;
  safeguardCode: string;
  score: number;
  applicable?: boolean;
  assetType?: string;
  securityFunction?: string;
  ig1?: number;
  ig2?: number;
  ig3?: number;
}
