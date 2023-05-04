import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { catchError, tap } from 'rxjs/operators';


export interface ITypeProbleme {
    id: number;
    descriptionTypeProbleme: string;
}