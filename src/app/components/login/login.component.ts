import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario';
import { debounceTime, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SucursalesService } from '../../services/sucursales.service';
import { Sucursal } from "../../models/sucursal";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  private errors = new Subject<string>();
  errorMessage: string;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private sucursalesService: SucursalesService) { }

  ngOnInit() {
    this.errors.subscribe((message) => this.errorMessage = message);
    this.errors
      .pipe(debounceTime(3000))
      .subscribe(() => this.errorMessage = null);

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
    this.createForm();
  }

  get f() { return this.form.controls; }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.submitted = true;
    if (this.form.valid) {
      const data = this.form.value;
      this.loading = true;
      this.form.disable();
      this.authService.login(data.username, data.password)
        .subscribe(
        () => {
          this.authService.getLoggedInUsuario()
            .pipe(
              finalize(() => { this.loading = false; this.form.enable(); })
            )
            .subscribe((usuario: Usuario) => {
              this.sucursalesService.getSucursales().subscribe(sucs => {
                if (sucs.length)  {
                  this.sucursalesService.seleccionarSucursal(sucs[0]);
                  this.router.navigate(['']);
                } else {
                  this.showErrorMessage('No se pudieron obtener sucursales.');
                  this.authService.logout();
                }
              });
            });
        },
        err => {
          this.showErrorMessage(err);
          this.loading = false;
          this.form.enable();
        });
    }
  }

  showErrorMessage(message: string) {
    this.errors.next(message);
  }
}
