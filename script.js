var peticion = new XMLHttpRequest();
peticion.open("GET", "./productos.json", true);
var total = 0;
var contador = 0;

//Obtener productos del json//
peticion.addEventListener("readystatechange", function () {
  if (this.readyState == 4 && this.status == 200) {
    var productos = JSON.parse(this.responseText);

    //PRODUCTOS OBTENIDOS//
    productos.forEach((p) => {
      var div = document.querySelector(".productos");
      var card = document.createElement("div");
      div.appendChild(card);

      var link = document.createElement("a");
      link.setAttribute("href", "#");
      link.innerText = p.nombre;
      card.appendChild(link);

      var imagen = document.createElement("img");
      imagen.setAttribute("alt", "imagen del producto");
      imagen.setAttribute("src", p.url_foto);
      card.appendChild(imagen);

      var description = document.createElement("p");
      description.innerText = p.descripcion;
      card.appendChild(description);

      var precio = document.createElement("p");
      precio.innerText = p.precio;
      card.appendChild(precio);

      //CALCULOS//
      var preciofinal = document.querySelector("#total");
      var contadorDiv = document.querySelector("#contador");

      //Cantidad de productos//
      link.addEventListener("click", function (event) {
        event.preventDefault();
        contador = contador + 1;
        contadorDiv.innerText = contador;
      });

      //Precio en carro//
      link.addEventListener("click", function () {
        console.log(p.nombre, p.precio);
        total = total + p.precio;
        console.log("total: ", total);
        preciofinal.innerText = total;

        //Click y armado o agregado de fila de productos//
        var fila = document.createElement("tr");
        var tdnombre = document.createElement("td");
        tdnombre.innerText = p.nombre;

        var tdprecio = document.createElement("td");
        tdprecio.innerText = p.precio;

        fila.appendChild(tdnombre);
        fila.appendChild(tdprecio);

        //Boton de borrado de un producto//
        var tdborrar = document.createElement("td");
        var linkborrar = document.createElement("a");
        linkborrar.setAttribute("href", "#");
        linkborrar.innerText = "x";
        tdborrar.appendChild(linkborrar);
        fila.appendChild(tdborrar);

        linkborrar.addEventListener("click", function (event) {
          event.preventDefault();
          contador = contador - 1;
          console.log("contador: ", contador);
          contadorDiv.innerText = contador;
        });

        //Funcionalidad y logica de la X para eliminar//
        linkborrar.addEventListener("click", function (event) {
          event.preventDefault();
          console.log(event.target.parentElement.parentElement.remove());
          total = total - p.precio;
          console.log("total:", total);
          preciofinal.innerText = total;
        });

        document.querySelector("tbody").appendChild(fila);
      });

      document.querySelector(".productos").appendChild(link);
    });
  }
});

peticion.open("GET", "./productos.json", true);
peticion.send();

var botonCaro = document.querySelector("#caro");

botonCaro.addEventListener("click", function () {
  var productosCarrito = document.querySelector(".carrito tbody").children;

  for (let index = 0; index < productosCarrito.length; index++) {
    const productoRow = productosCarrito[index];

    let productoNombre = productoRow.children[0].innerText;
    let productoPrecio = Number(productoRow.children[1].innerText);
    console.log(productoNombre, productoPrecio);
  }

  console.log("El mas caro es: ");
});
