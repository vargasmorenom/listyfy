import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from '../interfaces/formFields';
import { matchPasswords } from '../utilities/matchPasswords';

@Injectable({ providedIn: 'root' })
export class DynamicFormService {
  constructor(private fb: FormBuilder) {}

  createForm(fields: FormField[],initialValues: any = {}): FormGroup {
    let group: any = {};

    fields.forEach(field => {
      let validations: any[] = [];

      if (field.validations) {
        field.validations.forEach(validation => {
          if (validation.type === 'required') validations.push(Validators.required);
          if (validation.type === 'minlength') validations.push(Validators.minLength(validation.value));
          if (validation.type === 'maxlength') validations.push(Validators.maxLength(validation.value));
          if (validation.type === 'pattern') validations.push(Validators.pattern(validation.value));
        });
      }
      const initialValue = initialValues[field.name] ?? '';
      group[field.name] = [initialValue, validations];
    });

    const formGroup = this.fb.group(group);

    const hasPassword = fields.find(f => f.name === 'password');
    const hasConfirm = fields.find(f => f.name === 'confirmPassword');
    if (hasPassword && hasConfirm) {
      formGroup.setValidators(matchPasswords('password', 'confirmPassword'));
    }

    return formGroup;
  }
}
