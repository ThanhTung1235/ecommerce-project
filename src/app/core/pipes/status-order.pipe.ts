import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusOrder'
})
export class StatusOrderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return status_order[value];
  }

}

const status_order = {
  0: 'Đang xử lý đơn hàng',
  1: 'Xác nhận đơn hàng',
  2: 'Đang giao hàng',
  3: 'Giao hàng thành công',
  4: 'Đơn hàng hủy',
  5: 'Đơn hàng hủy'
}
