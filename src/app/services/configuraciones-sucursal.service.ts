import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {SucursalesService} from './sucursales.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesSucursalService {
  url = environment.apiUrl + '/api/v1/configuraciones-sucursal';
  constructor(private http: HttpClient,
              private sucursalesService: SucursalesService) { }

  isFacturaElectronicaHabilitada(): Observable<boolean> {
    const idSucursal = this.sucursalesService.getIdSucursal();
    return this.http.get<boolean>(`${this.url}/${idSucursal}/factura-electronica-habilitada`);
  }
}
