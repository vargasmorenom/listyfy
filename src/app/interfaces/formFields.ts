export interface FormField {
  name: string;
  label: string;
  explicacion?:string;
  type: 'text' | 'email' | 'password' | 'number'| 'select' | 'textarea' | 'checkbox' | 'file' | 'custom';
  content?: any[];
  htmlType?:any;
  link?:string;
  value: any;
  placeholder?: string;
  validations: any[];
}
