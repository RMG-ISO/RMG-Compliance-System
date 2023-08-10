import { DEFAULT_VALIDATION_BLUEPRINTS } from "@abp/ng.theme.shared";

export const  APP_VALIDATION_BLUEPRINTS = {
    ...DEFAULT_VALIDATION_BLUEPRINTS,
    minLength: '::Validations:MinLength[{{ minLength }}]',
    maxLength: '::Validations:MaxLength[{{ maxLength }}]',
    minToday: '::Validations:MinDateToday',
    minDate: '::Validations:MinDate[{{ minDate }}]',
    maxDate: '::Validations:MaxDate[{{ maxDate }}]',
    lessThanStart: '::Validations:DueDateLessThanStart',
    min: '::Validations:Min[{{ min }}]',
    max: '::Validations:Max[{{ max }}]',
  }