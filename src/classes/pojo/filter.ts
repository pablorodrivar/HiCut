export class Filter {
    public id: number;
    public text: string;
    public genre: number;
    public lat: number;
    public lng: number;
    public max_km: number;

    constructor() {
        this.genre = 0;
        this.max_km = 20;
    }
}
