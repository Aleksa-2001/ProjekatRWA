import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = localStorage.getItem('auth')
    if (auth) {
        const token = JSON.parse(auth).token
        if (token) {
            const cloned = req.clone({
                headers: req.headers.set(
                    'Authorization', `Bearer ${token}`
                )
            })
            return next(cloned)
        }
    }

    return next(req)
}
