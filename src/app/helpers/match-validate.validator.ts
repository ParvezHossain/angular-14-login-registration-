import { FormGroup } from "@angular/forms";

export function Mustmatch (controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingGontrol = formGroup.controls[matchingControlName];

        // return if another validator has already found an error on the matchingControl
        if (matchingGontrol.errors && !matchingGontrol.errors['mustMatch']) return

        // set error on matchingControl if validation fails
        if (control.value !== matchingGontrol.value) {
            matchingGontrol.setErrors({ mustmatch: true})
        }else {
            matchingGontrol.setErrors(null)
        }
    }
}