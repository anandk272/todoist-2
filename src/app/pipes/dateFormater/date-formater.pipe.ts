import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormater'
})
export class DateFormaterPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {
    const today=new Date()
    const lastDate=new Date(value)
    const days=lastDate.getDate()-today.getDate()
    const months=Math.abs(lastDate.getMonth()-today.getMonth())
    console.log('date formater pipe ',days)
    if(days<0 && months<1)
    {
      return 'Over Due'
    }else if(days===0 && months<1){
      return 'Today'
    }else if(days<7 && months<1){
      return lastDate.toLocaleString('default',{
        'weekday':'long'
      })
    }else{
      return lastDate.toLocaleString('default',{
        "dateStyle":'short'
      })
    }
    
  }

}
