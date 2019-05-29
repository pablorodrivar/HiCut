import { ApiController } from '../classes/api.controller';
import { HttpClient } from '@angular/common/http';

export class Globals {
    public static api:ApiController;
    public static http: HttpClient;
}