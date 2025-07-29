const endpointCategories = "http://localhost:3000/categories"
const endpointMovimientos = "http://localhost:3000/movimientos"


// crear un nuevo movimiento:
const formMovimientos = document.getElementById("form-movimiento")
const tbodyMovimientos = document.getElementById("tbody-movimientos")
let selectCategorias = formMovimientos.categoria
let editandoMovimiento = null


document.addEventListener("DOMContentLoaded", function () {
    pintarCategorias()
    pintarMovimientos()
})

console.log(editandoMovimiento);
formMovimientos.addEventListener("submit", async (event) => {
    event.preventDefault()

    const newMovimiento = {
        tipo: formMovimientos.tipo.value,
        descripcion: formMovimientos.descripcion.value,
        importe: formMovimientos.importe.value,
        fecha: formMovimientos.fecha.value,
        categoryId: formMovimientos.categoria.value,
    }

    try {
        if (editandoMovimiento) {
            await fetch(`${endpointMovimientos}/${editandoMovimiento}`, {
                method: 'PUT',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify(newMovimiento),
            });
        } else {
            await fetch(endpointMovimientos, {
                method: 'POST',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify(newMovimiento)
            });
        }
        pintarMovimientos(newMovimiento)
    } catch (err) {
        console.error('Error al cargar Movimiento', err);
    }


});

tbodyMovimientos.addEventListener('click', async (event) => {

    if (event.target.classList.contains('btn-editar')) {

        const id = event.target.dataset.id;
        const tipo = event.target.dataset.tipo;
        const descripcion = event.target.dataset.descripcion;
        const importe = event.target.dataset.importe;
        const fecha = event.target.dataset.fecha;
        const category = event.target.dataset.category;

        formMovimientos.tipo.value = tipo;
        formMovimientos.descripcion.value = descripcion;
        formMovimientos.importe.value = importe;
        formMovimientos.fecha.value = fecha;
        formMovimientos.categoria.value = category;

        editandoMovimiento = id
        console.log(editandoMovimiento);
    }

    if (event.target.classList.contains('btn-eliminar')) {

        const id = event.target.dataset.id;

        if (confirm('Estas seguro de eliminar el movimiento?')) {
            try {
                await fetch(`${endpointMovimientos}/${id}`, { method: 'DELETE' });
                pintarMovimientos();
            } catch (err) {
                console.error('Error al eliminar movimiento', err);

            }
        }
    }
})
// pintarCategorias
async function pintarCategorias() {
    selectCategorias.innerHTML = ""

    let response = await fetch(endpointCategories)
    let datas = await response.json()

    if (datas.length === 0) {
        selectCategorias.innerHTML += `
            <option disabled>Sin Categorias, por favor registre almenos una</option>
        `
    }

    datas.forEach(categoria => {
        selectCategorias.innerHTML += `
            <option value="${categoria.id}">${categoria.nombre}</option>
        `
    });

}


async function pintarMovimientos() {
    let movimientos = await traerMovimientos()

    tbodyMovimientos.innerHTML = "";

    for (const movimiento of movimientos) {
        tbodyMovimientos.innerHTML += `
        <tr>
            <td>${movimiento.tipo}</td>
            <td>${movimiento.descripcion}</td>
            <td>${movimiento.importe}</td>
            <td>${movimiento.fecha}</td>
            <td>${movimiento.category.nombre}</td>
            <td>
              <button class="btn-editar" 
              data-id="${movimiento.id}" 
              data-tipo="${movimiento.tipo}" 
              data-descripcion="${movimiento.descripcion}" 
              data-importe="${movimiento.importe}" 
              data-fecha="${movimiento.fecha}" 
              data-category="${movimiento.categoryId}">Editar</button>
              <button class="btn-eliminar" data-id="${movimiento.id}">Eliminar</button>
            </td>
        </tr>
        `
    }



}



// traer llamar a los movimiento de la base de datos
async function traerMovimientos() {
    let response = await fetch(`${endpointMovimientos}?_embed=category`);
    let data = await response.json();

    return data
}