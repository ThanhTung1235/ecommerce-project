export class CustomerAddress{
    city_id: string;
    district_id: string;
    ward_id: string;
    phone_number: string;
    address: string;

    constructor() {
        this.city_id = '0';
        this.district_id = '0';
        this.ward_id = '0';
        this.phone_number = '';
        this.address = '';
    }
}