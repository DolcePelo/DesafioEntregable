class ProductManager {
    products;
    static ultimoCode = 0;
    static instances = []

    constructor() {
        this.products = [];
        ProductManager.instances.push(this)
    }
    
    static getAllProducts() {
        return ProductManager.instances.reduce((allProducts, instance) => {
            allProducts.push(...instance.getProducts())
            return allProducts;
        }, [])
    }

    getProducts (){
        return this.products;
    }

    addProducts(title, description, price, thumbnail, stock, ) {
        ProductManager.ultimoCode ++;
        const product = {
            id: ProductManager.ultimoCode,
            title,
            description,
            price,
            thumbnail,
            stock,
        }
        this.products.push(product);
    }

    getProductById(idProduct){
        if(!idProduct){
            throw new Error("Id no encontrado");
        }

        const product = this.products.find((datos) => datos.id === idProduct)

        return product;
    }
}

const productoUno = new ProductManager();
const productoDos = new ProductManager();

productoUno.addProducts(
    'Televisor',
    'HD pantalla curva',
    1500,
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.muycomputer.com%2F2016%2F01%2F20%2Ftelevisores-pantalla-curva-ventajas%2F&psig=AOvVaw2Ga2vJSbmwDAyzjynjknQu&ust=1700262772492000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCCj8XSyYIDFQAAAAAdAAAAABAH',
    20,
);

productoDos.addProducts(
    'Celular',
    'Samsung A53',
    600,
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.elespanol.com%2Felandroidelibre%2Fmoviles-android%2F20220330%2Fmotivos-comprar-samsung-galaxy-a53-ventajas-inconvenientes%2F661184245_0.html&psig=AOvVaw2lT_I2_FHE2J1Hn9AsXzRM&ust=1700264648075000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPiv7sLZyYIDFQAAAAAdAAAAABAF',
    23,
);

// console.log(productoUno.getProducts())
// console.log(productoDos.getProducts())
console.log('Todos los productos:', ProductManager.getAllProducts());

console.log(productoUno.getProductById(1))