import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ubicacion } from '../../models/ubicacion';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UbicacionModalComponent } from '../ubicacion-modal-component/ubicacion-modal.component';
import { Cliente } from '../../models/cliente';
import { ClientesService } from '../../services/clientes.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-ubicacion-envio-component',
  templateUrl: './ubicacion-envio.component.html',
  styleUrls: ['./ubicacion-envio.component.scss']
})
export class UbicacionEnvioComponent implements OnInit {
  ubicacion: Ubicacion = null;
  updating = false;

  private _cliente: Cliente = null;

  @Input()
  set cliente(c: Cliente) {
    this._cliente = c;
    this.setUbicacion(c);
  }

  get cliente(): Cliente {
    return this._cliente;
  }

  @Output() updated = new EventEmitter<Cliente>();

  constructor(private modalService: NgbModal,
              private clientesService: ClientesService) { }

  ngOnInit() {}

  private setUbicacion(c: Cliente) {
    this.ubicacion = c && c.ubicacionEnvio ? c.ubicacionEnvio : null;
  }

  showUbicacionModal() {
    const modalRef = this.modalService.open(UbicacionModalComponent, { size: 'lg' });
    modalRef.componentInstance.ubicacion = this.ubicacion;
    modalRef.componentInstance.title = 'Ubicación de Envio';
    modalRef.result.then((u: Ubicacion) => {
      this.updating = true;
      this.cliente.ubicacionEnvio = u;
      this.clientesService.saveCliente(this.cliente)
        .pipe(finalize(() => this.updating = false))
        .subscribe(
          (c: Cliente) => {
            this.cliente = c;
            this.updated.emit(this.cliente);
          },
          err => { this.updating = false; alert(err.error); }
        );
    }, (reason) => { /*console.log(reason);*/ });
  }

  getUbicacionStr() {
    const u = this.ubicacion;

    const str = [];
    if (u) {
      str.push(u.calle ? u.calle : '');
      str.push(u.numero ? u.numero : '');
      str.push(u.piso ? u.piso : '');
      str.push(u.departamento ? u.departamento : '');
      str.push(u.nombreLocalidad + ' ' + u.nombreProvincia);
    }

    return str.join(' ');
  }
}