import { Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../models/producto';
import { finalize } from 'rxjs/operators';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-cantidad-producto-modal',
  templateUrl: './cantidad-producto-modal.component.html',
  styleUrls: ['./cantidad-producto-modal.component.scss']
})
export class CantidadProductoModalComponent implements OnInit, AfterViewInit {
  cantidad = 1;
  producto: Producto = null;
  productoLoading = false;
  form: FormGroup;
  submitted = false;
  loading = false;

  @ViewChild('cantidadInput', { static: false }) cantidadInput: ElementRef;

  constructor(private fb: FormBuilder,
              public activeModal: NgbActiveModal,
              private productosService: ProductosService) { }

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit(): void {
    setTimeout(() => { if (this.cantidadInput) { this.cantidadInput.nativeElement.focus(); }}, 500);
  }

  public loadProducto(idProductoItem: number) {
    this.productoLoading = true;
    this.productosService.getProducto(idProductoItem)
      .pipe(finalize(() => this.productoLoading = false))
      .subscribe((p: Producto) => {
         this.producto = p;
      })
    ;
  }

  createForm() {
    this.form = this.fb.group({
      cantidad: [this.cantidad, [Validators.required, Validators.min(1)]]
    });
  }

  get f() { return this.form.controls; }

  submit() {
    this.submitted = true;
    if (this.form.valid) {
      const cant = this.form.value.cantidad;
      this.activeModal.close(cant);
    }
  }

  incrementarCantidad() {
    let cant = parseInt(this.form.get('cantidad').value, 10);
    if (!isNaN(cant)) {
      cant += 1;
      this.form.get('cantidad').setValue(cant);
    }
  }

  decrementarCantidad() {
    let cant = parseInt(this.form.get('cantidad').value, 10);
    if (!isNaN(cant) && cant > 1) {
      cant -= 1;
      this.form.get('cantidad').setValue(cant);
    }
  }
}