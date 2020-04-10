import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoFaltante } from '../../models/producto-faltante';

@Component({
  selector: 'app-disponibilidad-stock-modal',
  templateUrl: './disponibilidad-stock-modal.component.html',
  styleUrls: ['./disponibilidad-stock-modal.component.scss']
})
export class DisponibilidadStockModalComponent implements OnInit {
  data: ProductoFaltante[] = [];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}
