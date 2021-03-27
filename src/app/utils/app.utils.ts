export class AppUtils{
    constructor() {}
    public static saveDataToCookies(key, value): void {
        document.cookie = `${key}=${value};domain=localhost`;
    }

    public static saveDataToLocalStorage(key, value): void {
        localStorage.setItem(key, value);
    }

    public static getDataFromCookies(key): any{
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${key}=`);
        if (parts.length === 2) { return parts.pop().split(';').shift(); }
    }

    public static getDataFromLocalstorage(key): any{
        const data = localStorage.getItem(key);
        return data;
    }

    public static clearCookies(key): void {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=localhost`;
    }

    public static clearLocalStorage(key): void {
        localStorage.removeItem(key);
    }
}
