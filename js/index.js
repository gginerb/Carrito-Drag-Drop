//Creando objeto Producto

class Producto {
    constructor(id, nombre, categoria, imgUrl, descripcion, precio) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.imgUrl = imgUrl;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

//Cargando datos en el objeto

const loadData = () => {
    const producto1 = new Producto(1, 'Aroa 2017', 'Vino Tinto', 'css/img/vinos/masia-serra-aroa2017.jpg', 'Vino tinto nacido fruto del deseo de elaborar un vino muy íntimo y personal, inspirado en el carácter y personalidad de nuestra hija Aroa.', 22);
    const producto2 = new Producto(2, 'Vall de Molinás', 'Vino Tinto', 'css/img/vinos/hugas-Vall-de-molinas-negre.png', 'De nariz elegante fruto de la combinación de la delicada Garnacha Tinta envejecida en roble: fina, perfumada glamorosa.', 30.50);
    const producto3 = new Producto(3, 'Hugas 3070', 'Vino Blanco', 'css/img/vinos/hugas-3070.png', 'Dos de las variedades más tradicionales del Empordà: la Garnacha Blanca y el Moscatel de Grano Gordo. La una aporta el cuerpo y el volumen gracias a su perfecta adaptación al clima de Colera;', 13);
    const producto4 = new Producto(4, 'Picapoll', 'Vino Blanco', 'css/img/vinos/faixo-picapoll.jpg', 'Vino de color amarillo pálido brillante. Con alta intensidad aromática de notas florales y de fruta blanca madura. Es un vino fresco, con agradable y acentuada acidez que le da estructura.', 17);
    const producto5 = new Producto(5, 'Perafita Rosat', 'Vino Rosado', 'css/img/vinos/faixo-perafita-rosat.jpg', 'Vino de color rosa intenso y atractivo con matices violetas. Aroma franca que recuerda las frutas rojas, como la fresa, la grosella o los arándanos.', 19);
    const producto6 = new Producto(6, 'Mosst', 'Vino Rosado', 'css/img/vinos/masia-serra-mosst_rosat.jpg', 'Mosst Rosado es la interpretación rosa de la vida. Es un vino que nace para enamorarte y ser tu compañero de viaje.', 9.50);

    const products = [producto1, producto2, producto3, producto4, producto5, producto6];
    printProducts(products);
}

//Imprimir productos en formato card

 const printProducts = (products) => {
    document.querySelector('div.deck').innerHTML='';

    for (const product of products) {
        document.querySelector('div.deck').innerHTML+=
        `   
            <div class="col-12 mb-4" draggable="true" ondragstart=onDragStart(event); id="${product.id}">
                <div class="card w-100 h-100 border-0">
                    <h6 class="card-header card-subtitle text-center">${product.categoria}</h6>
                    <h5 class="card-title text-center">${product.nombre}</h5>
                    <img src="${product.imgUrl}" class="card-img-top" alt="product-image">
                    <div class="card-body">
                        <p class="card-text text-justify">${product.descripcion}</p>  
                    </div>
                    <div class="card-footer">
                        <h5 class="card-text precio">${product.precio}€</h5>
                    </div>
                </div>
            </div>
        `
    } 
}  

//Imprimir precio total

const printTotal = (precio) => {
    const total = (parseFloat(document.getElementById('total').innerHTML.slice(7, -1)) + precio).toFixed(2);
    document.querySelector('.total').innerHTML=`Total: ${total}€`;
}

//Eliminar producto del carrito

const deleteProduct = (idProductoEnCarrito, precio) => {
    const producto = document.getElementById(idProductoEnCarrito);
    const padre = producto.parentNode;
    padre.removeChild(producto);
    printTotal(-precio);
}

//Drag and Drop del producto

const onDragStart = (event) => {
    //Reiniciar dataTransfer
    event.dataTransfer.clearData();

    //Pasando id del producto que esta siendo arrastrado
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.dropEffect = "move";
}

//GEstionar acciones de Arrastrar evento
const onDragOver = (event) => {
    if (event.preventDefault) {
        event.preventDefault(); 
    }

    event.dataTransfer.dropEffect = 'copy';
    return false;
} 

//Soltar evento
const onDrop = (event) => {
    event.preventDefault();
    if (event.stopPropagation) {
        event.stopPropagation(); 
    }

    //Recibiendo id del producto arrastrado
    const id = event.dataTransfer.getData('text');

    //Accediento al card del producto
    const containerProducto = document.getElementById(id);
    const producto = containerProducto.firstElementChild;
    //Accediendo a los elementos hijo para conseguir su contenido HTML
    const nombre = producto.childNodes[3].innerHTML;
    const precioTexto = producto.childNodes[9].lastElementChild.innerHTML;
    const precio = parseFloat(precioTexto.slice(0, -1));

    //Fragmento HTML con información del producto, se establece nuevo id en caso de querer eliminar el producto del carrito
    const formatoHtml = `
        <li class="list-group-item d-flex justify-content-between" id="productoEnCarrito${id}">
            <span class="w-50">${nombre}</span>
            <button class="btn btn-danger badge" onclick=deleteProduct("productoEnCarrito${id}",${precio})>X</button>
            <span>${precioTexto}</span>
        </li>
    `;
    
    //Definiendo la zona donde el producto será soltado
    const box = document.getElementById('carrito-lista');
    
    //Añadiendo informacion del producto arrastrado
    box.insertAdjacentHTML('beforeend', formatoHtml);

    //Modificando el total
    printTotal(precio);

    return false;
}