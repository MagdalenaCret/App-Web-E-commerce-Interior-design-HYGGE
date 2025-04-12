// Product Management Script
class ProductManager {
    constructor() {
        this.storageKey = 'hyggeProducts';
        this.initializeStorage();
    }

    // Initialize local storage if not exists
    initializeStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
    }

    // Get all products
    getProducts() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    // Get products by category
    getProductsByCategory(category) {
        const products = this.getProducts();
        return products.filter(p => p.category === category);
    }

    // Add a new product
    addProduct(product) {
        const products = this.getProducts();
        // If editing existing product
        if (product.id) {
            const index = products.findIndex(p => p.id === product.id);
            if (index !== -1) {
                products[index] = product;
            }
        } else {
            // New product - generate unique ID
            product.id = Date.now();
            products.push(product);
        }
        this.saveProducts(products);
        return product;
    }

    // Update a product
    updateProduct(product) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === product.id);
        if (index !== -1) {
            products[index] = product;
            this.saveProducts(products);
        }
    }

    // Delete a product
    deleteProduct(productId) {
        let products = this.getProducts();
        products = products.filter(p => p.id !== productId);
        this.saveProducts(products);
    }

    // Save products to local storage
    saveProducts(products) {
        localStorage.setItem(this.storageKey, JSON.stringify(products));
    }

    // Get product by ID
    getProductById(productId) {
        const products = this.getProducts();
        return products.find(p => p.id === productId);
    }
}

// Initialize product manager
const productManager = new ProductManager();