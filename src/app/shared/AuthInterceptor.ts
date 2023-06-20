import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor {
//Cette une classe pour intercepeter les connexions
    intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem("token");
         //SI il ya token dans le store , on le met avec header
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                  }
            });

            return next.handle(req);
        }
        else {
            return next.handle(req);
        }
    }
}