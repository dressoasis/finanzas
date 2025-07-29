
const endpointCategorias = "http://localhost:3000/categories"
const btnLogout = document.getElementById("logout-btn")
const form = document.getElementById("form-categoria")
const inputNombre = document.getElementById("nombre-categoria")
const listaCategorias = document.getElementById("lista-categorias")

btnLogout.addEventListener("click", function () {
    localStorage.removeItem("currentUser")
    window.location.href = "/"
})



let categoriaEditando = null

document.addEventListener('DOMContentLoaded', cargarCategorias);

async function cargarCategorias() {
    listaCategorias.innerHTML = '';

    try {
        const res = await fetch(endpointCategorias);
        const categorias = await res.json();

        categorias.forEach(categoria => {

            const li = document.createElement('li');
            li.innerHTML = `
                <span>${categoria.nombre}</span>
                <div>
                    <button class="btn-edit" data-id="${categoria.id}" data-nombre="${categoria.nombre}">Editar</button>
                    <button class="btn-eliminar" data-id="${categoria.id}">Eliminar</button>
                </div>
                `;
            listaCategorias.appendChild(li);
        });
    } catch (err) {
        console.log('Error al cargar categoria', err);
    }

}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = inputNombre.value.trim();

    if (!nombre) return alert('El nombre no puede estar vacio');

    try {
        if (categoriaEditando) {
            await fetch(`${endpointCategorias}/${categoriaEditando}`, {
                method: 'PUT',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify({ nombre })
            });
            categoriaEditando = null;
        } else {
            await fetch(endpointCategorias, {
                method: 'POST',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify({ nombre })
            });
        }

        form.reset();
        cargarCategorias();
    } catch (err) {
        console.error('Error al cargar categoria', err);
    }
});

listaCategorias.addEventListener('click', async (event) => {

    if (event.target.classList.contains('btn-edit')) {

        const id = event.target.dataset.id;
        const nombre = event.target.dataset.nombre;
        inputNombre.value = nombre;
        categoriaEditando = id;
    }

    if (event.target.classList.contains('btn-eliminar')) {
        const id = event.target.dataset.id;

        if (confirm('Estas seguro de eliminar esta categoria?')) {
            try {
                await fetch(`${endpointCategorias}/${id}`, { method: 'DELETE' });
                cargarCategorias();
            } catch (err) {
                console.error('Error al eliminar', err);

            }
        }
    }

})
