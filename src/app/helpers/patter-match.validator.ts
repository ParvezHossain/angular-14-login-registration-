import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidPattern (nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valid = nameRe.test(control.value);
        return valid? null : {invalidPatter: true}
    }
}