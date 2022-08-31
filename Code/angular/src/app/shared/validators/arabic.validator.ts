import { AbstractControl } from "@angular/forms";

export function ArabicLetters(control: AbstractControl) {
    if(!control.value) return null;
    if(!control.value.trim() || !/^[\u0621-\u064A\s\p{N}]+$/.test(control.value)) {
        return {
            onlyArabic: true
        }
    }
    return null;
  }

//   /^[\u0621-\u064A\s\p{N}]+$/