export class Customer{
    name :string;
    password: string;
    phone: string;

    constructor(){
        this.name = '';
        this.password;
        this.phone = ''
    }
}
export interface CustomerInfo {
  avatar: string;
  login_name: string;
  uid: string;
  name: string;
}