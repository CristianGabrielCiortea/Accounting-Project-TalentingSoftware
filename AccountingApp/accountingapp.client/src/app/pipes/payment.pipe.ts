import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentType'
})
export class PaymentPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value === "Hourly") return "Hourly";
    if (value === "FixedPrice") return "Fixed Price";
    return null;
  }

}
