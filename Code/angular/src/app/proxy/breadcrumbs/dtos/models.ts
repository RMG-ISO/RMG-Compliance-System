import type { BreadCrumbSettingsType } from '../bread-crumb-settings-type.enum';

export interface BreadCrumbSettingsDto {
  frameworkName?: string;
  frameworkUrl?: string;
  domainName?: string;
  domainUrl?: string;
  subDomainName?: string;
  subDomainUrl?: string;
  controlName?: string;
  controlUrl?: string;
  subControlName?: string;
  subControlUrl?: string;
}

export interface GetBreadCrumbSettingsDto {
  type: BreadCrumbSettingsType;
  id?: string;
}
