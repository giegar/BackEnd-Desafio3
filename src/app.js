import express from 'express';
import productManager from './productManager.js';

const puerto = 8080;
const server = app.listen(puerto, (req, res) => {
    res.send('Corriendo')
})
server.on(error, (error) => console.log(`Error del servidor ${error}`))

const app = express();
app.use(express.urlencoded({ extended: true }))

const productos = new productManager("../productos.txt");
const readProductos = productos.readProductos();

app.get('/products', async (req, res) => {

    let limit = paseInt(req.query.limit);
    if(!limit) return res.send(await readProductos);

    let allProductos = await readProductos;
    let productoLimit = allProductos.slice(0, limit) 

    res.send(productoLimit)
});

app.get('/products/:id', async (req, res) => {

    let id = parseInt(req.params.id);
    let allProductos = await readProductos;

    let productoID = allProductos.find(producto => producto.id === id);
    res.send(productoID);

});
