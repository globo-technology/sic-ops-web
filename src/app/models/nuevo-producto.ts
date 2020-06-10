export interface NuevoProducto {
  codigo: string;
  descripcion: string;
  cantidadEnSucursal: { [key: number]: number };
  hayStock: boolean;
  cantMinima: number;
  bulto: number;
  precioCosto: number;
  gananciaPorcentaje: number;
  gananciaNeto: number;
  precioVentaPublico: number;
  ivaPorcentaje: number;
  ivaNeto: number;
  oferta: boolean;
  imagen: any;
  porcentajeBonificacionOferta: number;
  porcentajeBonificacionPrecio: number;
  precioBonificado: number;
  precioLista: number;
  ilimitado: boolean;
  publico: boolean;
  fechaUltimaModificacion: Date;
  estanteria: string;
  estante: string;
  nota: string;
  fechaVencimiento: Date;
}

/*
  private String codigo;
  @NotNull(message = "{mensaje_producto_vacio_descripcion}")
  @NotEmpty(message = "{mensaje_producto_vacio_descripcion}")
  private String descripcion;
  @NotEmpty(message = "{mensaje_producto_cantidad_en_sucursales_vacia}")
  private Map<Long,BigDecimal> cantidadEnSucursal;
  private boolean hayStock;
  @DecimalMin(value = "0", message = "{mensaje_producto_cantidadMinima_negativa}")
  private BigDecimal cantMinima;
  @DecimalMin(value = "1", message = "{mensaje_producto_cantidad_venta_minima_invalida}")
  @NotNull(message = "{mensaje_producto_cantidad_venta_minima_invalida}")
  private BigDecimal bulto;
  @DecimalMin(value = "0", message = "{mensaje_producto_precioCosto_negativo}")
  private BigDecimal precioCosto;
  @DecimalMin(value = "0", message = "{mensaje_producto_gananciaPorcentaje_negativo}")
  private BigDecimal gananciaPorcentaje;
  @DecimalMin(value = "0", message = "{mensaje_producto_gananciaNeto_negativo}")
  private BigDecimal gananciaNeto;
  @DecimalMin(value = "0", message = "{mensaje_producto_venta_publico_negativo}")
  private BigDecimal precioVentaPublico;
  @DecimalMin(value = "0", message = "{mensaje_producto_IVAPorcentaje_negativo}")
  private BigDecimal ivaPorcentaje;
  @DecimalMin(value = "0", message = "{mensaje_producto_IVANeto_negativo}")
  private BigDecimal ivaNeto;
  private boolean oferta;
  private byte[] imagen;
  @DecimalMax(value = "100", inclusive = false, message = "{mensaje_producto_oferta_superior_100}")
  private BigDecimal porcentajeBonificacionOferta;
  @DecimalMax(value = "100", inclusive = false, message = "{mensaje_producto_bonificacion_superior_100}")
  private BigDecimal porcentajeBonificacionPrecio;
  @DecimalMin(value = "0",message = "{mensaje_producto_precio_bonificado_igual_menor_cero}")
  private BigDecimal precioBonificado;
  @DecimalMin(value = "0", message = "{mensaje_producto_precioLista_negativo}")
  private BigDecimal precioLista;
  private boolean ilimitado;
  private boolean publico;
  private LocalDateTime fechaUltimaModificacion;
  private String estanteria;
  private String estante;
  private String nota;
  private LocalDate fechaVencimiento;
*/
