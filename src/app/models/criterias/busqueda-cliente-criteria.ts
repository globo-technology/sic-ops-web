export interface BusquedaClienteCriteria {
  nombreFiscal?: string;
  nombreFantasia?: string;
  idFiscal?: number;
  idViajante?: number;
  idProvincia?: number;
  idLocalidad?: number;
  nroDeCliente?: string;
  pagina: number;
  ordenarPor?: string;
  sentido?: string;
}
