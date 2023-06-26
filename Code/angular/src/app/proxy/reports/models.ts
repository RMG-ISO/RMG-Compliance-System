
export interface ComplianceLevelTableDto {
  domainName?: string;
  notImplemented: number;
  intial: number;
  defined: number;
  effective: number;
  measurable: number;
  mature: number;
}

export interface CompliancePhaseTableDto {
  domainName?: string;
  documentedYes: number;
  documentedPartially: number;
  documentedNo: number;
  implementedYes: number;
  implementedNo: number;
  implementedPartially: number;
  effectiveYes: number;
  effectiveNo: number;
  effectivePartially: number;
              }
