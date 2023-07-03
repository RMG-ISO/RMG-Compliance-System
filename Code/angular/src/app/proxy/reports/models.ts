import type { PriorityType } from '../assessments/priority-type.enum';

export interface ComplianceControllerDto {
  domainName?: string;
  controllersCount: number;
  complianceCount: number;
}

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

export interface CompliancePriorityTableDto {
  priority: PriorityType;
  domains: ComplianceControllerDto[];
}
