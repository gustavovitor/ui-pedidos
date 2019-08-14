import {ErrorMessage} from 'ng-bootstrap-form-validation';

export const CUSTOM_ERRORS: ErrorMessage[] = [
  {
    error: 'required',
    format: requiredFormat
  }, {
    error: 'email',
    format: emailFormat
  }
];

export function requiredFormat(label: string, error: any): string {
  return `${label} é obrigatório(a)!`;
}

export function emailFormat(label: string, error: any): string {
  return `${label} não parece um email válido.`;
}
