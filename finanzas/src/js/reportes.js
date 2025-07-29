const endpointCategories = "http://localhost:3000/categories"
const endpointMovimientos = "http://localhost:3000/movimientos"

const tbCategoriaVentas = document.getElementById("categoria-mayor-venta")
const tbCategoriaCompras = document.getElementById("categoria-mayor-compra")
const tbProductventas = document.getElementById("producto-mas-vendido")
const tbProductoCompras = document.getElementById("producto-mas-comprado")

document.addEventListener("DOMContentLoaded", function() {
    pintarventas()
    pintarCompras()
    pintarproductv()
    pintarproductC()
})

async function traerMovimientos() {
    let response = await fetch(`${endpointMovimientos}?_embed=category`);
    let data = await response.json();

    return data
}


async function categoriaConMasVentas() {
let movimientos = await traerMovimientos()

let contadorCategorias = {};

  movimientos.forEach(movovimiento => {
    if (movovimiento.tipo === "venta") { // Solo ventas
      const nombreCat = movovimiento.category.nombre;
      if (!contadorCategorias[nombreCat]) {
        contadorCategorias[nombreCat] = 0;
      }
      contadorCategorias[nombreCat] += 1; // Contar uno más
    }
  });

  let categoriaMayor = "-";
  let maxCantidad = 0;

  for (const nombreCat in contadorCategorias) {
    if (contadorCategorias[nombreCat] > maxCantidad) {
      maxCantidad = contadorCategorias[nombreCat];
      categoriaMayor = nombreCat;
    }
  }

return categoriaMayor;
}

async function categoriaConMasCompras() {
let movimientos = await traerMovimientos()

let contadorCategorias = {};

  movimientos.forEach(movovimiento => {
    if (movovimiento.tipo === "compra") { // Solo ventas
      const nombreCat = movovimiento.category.nombre;
      if (!contadorCategorias[nombreCat]) {
        contadorCategorias[nombreCat] = 0;
      }
      contadorCategorias[nombreCat] += 1; // Contar uno más
    }
  });

  let categoriaMayor = "-";
  let maxCantidad = 0;

  for (const nombreCat in contadorCategorias) {
    if (contadorCategorias[nombreCat] > maxCantidad) {
      maxCantidad = contadorCategorias[nombreCat];
      categoriaMayor = nombreCat;
    }
  }

return categoriaMayor;
}
async function productoConMasCompras() {
let movimientos = await traerMovimientos()

let contadorProductosC = {};

  movimientos.forEach(movimiento => {
    if (movimiento.tipo === "compra") {
      const nombreProduct = movimiento.descripcion;
      if (!contadorProductosC[nombreProduct]) {
        contadorProductosC[nombreProduct] = 0;
      }
      contadorProductosC[nombreProduct] += 1; // Contar uno más
    }
  });

  let productoMayorC = "-";
  let maxCantidad = 0;

  for (const nombreProduct in contadorProductosC) {
    if (contadorProductosC[nombreProduct] > maxCantidad) {
      maxCantidad = contadorProductosC[nombreProduct];
      productoMayorC = nombreProduct;
    }
  }

return productoMayorC;
}


async function productoConMasVentas() {
let movimientos = await traerMovimientos()

let contadorProductos = {};

  movimientos.forEach(movimiento => {
    if (movimiento.tipo ==="venta") { 
      const nombreProd = movimiento.descripcion;
      if (!contadorProductos[nombreProd]) {
        contadorProductos[nombreProd] = 0;
      }
      contadorProductos[nombreProd] += 1; 
    }
  });

  let ProductoMayor = "-";
  let maxCantidad = 0;

  for (const nombreProd in contadorProductos) {
    if (contadorProductos[nombreProd] > maxCantidad) {
      maxCantidad = contadorProductos[nombreProd];
      ProductoMayor = nombreProd;
    }
  }

return ProductoMayor;
}

async function pintarproductv() {
    const ProductoMasV = await productoConMasVentas()
    tbProductventas.innerHTML = "";
    tbProductventas.innerHTML = `
    <span>${ProductoMasV}</span> 
    `  
    
}

async function pintarproductC() {
    const ProductoMasC = await productoConMasCompras()
    tbProductoCompras.innerHTML = "";
    tbProductoCompras.innerHTML = `
    <span>${ProductoMasC}</span>
    `
}

async function pintarventas() {

    const ProductoMasV = await categoriaConMasVentas()
    tbCategoriaVentas.innerHTML = "";
    tbCategoriaVentas.innerHTML = `
    <span>${ProductoMasV}</span> 
    `  
}

async function pintarCompras() {

    const categoriaMasC = await categoriaConMasCompras()
    tbCategoriaCompras.innerHTML = "";
    tbCategoriaCompras.innerHTML = `
    <span>${categoriaMasC}<span>
    `
}