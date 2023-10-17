const fs = require ("fs");

export default class productManager {
    constructor(path) {
        this.path = path;
        this.format = "utf-8";
        this.productos = [];
    };

    static id = 0;

    addProducto = async (titulo, descripcion, precio, imagen, codigo, stock) => {

        try {
            if (!titulo || !descripcion || !precio || !imagen || !codigo || !stock) {
                return console.log("Todos los campos son requeridos.");
            }
    
            if (this.productos.codigo((prod) => prod.codigo === codigo)) {
                return console.log("El codigo ya existe");
            } 
    
            productManager.id++;
    
            let nuevoProd = {
                titulo,
                descripcion,
                precio,
                imagen,
                codigo,
                stock,
                id: productManager.id
            }
    
            this.productos.push(nuevoProd);
            await fs.promises.writeFile(this.path, JSON.stringify(this.productos));
        } catch (error) {
            console.error("Error addProducto")}
    };

    readProductos = async () => {

        try{
            let respuestaA = await fs.promises.readFile(this.path, this.format);
            return JSON.parse(respuestaA);
        }catch(error){
            console.error("Error readProductos")}  
    };

    getProductos = async () => {
        try{
            let respuestaB =  await this.readProductos();
            return console.log(respuestaB) ;  
        }catch(error){
            console.error("Error getProductos")}
    };

    productoExistente = async (id) => {
        try{
            let respuestaC =  await this.readProductos();
            return respuestaC.find (producto => producto.id === id)
        }catch(error){
            console.error("Error productoExistente")}
    };

    getProductoById = async (id) => {
        try{
            !this.productoExistente(id) ? console.log("No existe") : console.log(this.productoExistente(id));
        }catch(error){
            console.error("Error getProductoById")}
    };
    
    deleteProductoById = async (id) => {
        try{
            let respuestaD = await this.readProductos();
            let filterProd = respuestaD.filter(producto => productos.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(filterProd));
            console.log("Producto eliminado")
        }catch(error){
            console.error("Error deleteProductoById")}
    };

    updateProducto = async ({id, ...producto}) => {
        try{
            await this.deleteProductoById(id);
        let prodAntes = await this.readProductos();
        let prodDesp =  [{id, ...producto}, ...prodAntes];
        await fs.promises.writeFile(this.path, JSON.stringify(prodDesp));
        }catch(error){
            console.error("Error updateProducto")}
    };
    
};

/* const productos = new productManager( "./productos.txt")

productos.addProducto('Jabon', 'Fragancia de rosas', 1800, 'none', 'abc123', 10);
productos.addProducto('Esponja', 'Vegetal', 500, 'none', 'bcd234', 20);
productos.addProducto('Shampoo', 'Solido', 1100, 'none', 'bcd234', 15);
productos.addProducto('Locion', 'Descontracturante con árnica y jarilla', 2000, 'none', 'abc123', 10);
productos.addProducto('Espuma facial', 'Para pieles sensibles', 1600, 'none', 'bcd234', 20);
productos.addProducto('Bomba de baño', 'Efervescente. Aroma relajante', 950, 'none', 'bcd234', 15);
productos.addProducto('Jabonera madera', 'Madera ecologica', 2200, 'none', 'abc123', 10);
productos.addProducto('Acondicionador', 'Solido con aceite de lavanda', 1150, 'none', 'bcd234', 20);
productos.addProducto('Jabon exfoliante', 'A base de cafe', 1900, 'none', 'bcd234', 15);
productos.addProducto('Crema hidratante', 'Con extracto de calendula', 3500, 'none', 'abc123', 10);

productos.getProductos();

productos.getProductoById(1);

productos.deleteProductoById(2); */



