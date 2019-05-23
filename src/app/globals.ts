import { ApiController } from '../classes/api.controller';
import { HttpClient } from '@angular/common/http';

export class Globals {
    public static api:ApiController;
    public static http: HttpClient;
    public static url: string  = "http://80.211.65.79:8000/";
}