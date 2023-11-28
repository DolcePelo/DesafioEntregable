import fs from "fs";

class ProductManager {
    products;
    static ultimoCode = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async getProducts() {
        if (fs.existsSync(this.path)) {
            const savedProducts = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(savedProducts)
        } else {
            return []
        }
    }

    async addProducts(product) {
        const savedProducts = await this.getProducts()
        let id;
        if (!savedProducts.length) {
            id = 1
        } else {
            id = savedProducts[savedProducts.length - 1].id + 1
        }
        savedProducts.push({ id, ...product })
        await fs.promises.writeFile(this.path, JSON.stringify(savedProducts))
        console.log('Product saved')
    }

    async editProduct(idProduct, fieldToEdit, newData) {
        const savedProducts = await this.getProducts()
        const productToUpdate = savedProducts.find(u => u.id === idProduct);
        if (productToUpdate) {
            productToUpdate[fieldToEdit] = newData
            await fs.promises.writeFile(this.path, JSON.stringify(savedProducts))
        } else {
            return 'Product not found'
        }
    }

    async deleteProductById(idProduct) {
        const savedProducts = await this.getProducts()
        const savedProductsAux = savedProducts.filter(u => u.id !== idProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(savedProductsAux))
    }

    async getProductById(idProduct) {
        const savedProducts = await this.getProducts()
        const productAux = savedProducts.find(u => u.id === idProduct)
        if(productAux){
            return productAux
        }else {
            return 'Product not found'
        }
    }

    async deleteFile(){
        await fs.promises.unlink(this.path)
    }
}

const product1 = {
    title: "Televisor",
    description: "HD pantalla curva",
    price: 2000,
    image: "Sin imagen",
    code: "00001",
    stock: 10
}

const product2 = {
    title: "Laptop",
    description: "Portátil de ultima generación",
    price: 3500,
    image: "Sin imagen",
    code: "00002",
    stock: 7
}

const product3 = {
    title: "Smartphone",
    description: "Móvil con cámara y batería de última generación",
    price: 4000,
    image: "Sin imagen",
    code: "00003",
    stock: 8    
}

const product4 = {
    title: "Tablet para niños",
    description: "Pantalla táctil para ver videos",
    price: 2500,
    image: "Sin imagen",
    code: "00004",
    stock: 6
}

const path = './products.json';
async function test () {
    const PM = new ProductManager(path)
    await PM.addProducts(product1)
    await PM.addProducts(product2)
    await PM.addProducts(product3)
    await PM.addProducts(product4)
    console.log('-----Obtener Productos-----')
    const aux1 = await PM.getProducts()
    console.log(aux1)
    console.log('----Obtener productos por ID(3)----')
    const aux2 = await PM.getProductById(3)
    console.log(aux2)
    console.log('----Borrar un producto(2)----')
    await PM.deleteProductById(2)
    const aux3 = await PM.getProducts()
    console.log(aux3)
    console.log('----Editar un producto(4)----')
    await PM.editProduct(4,'code', 'pppp p')
    const aux4 = await PM.getProducts()
    console.log(aux4)
    console.log('----Borrar archivo----')
    // await PM.deleteFile()
}
test()

