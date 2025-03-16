// Import the Product class
import Product from './product.js';

// Define the ProductService class to handle product data operations
class ProductService {
    constructor() {
        // Load existing products from local storage when the service is initialized
        this.products = this.loadProducts();
    }

    // Load products from localStorage and parse them into Product instances
    loadProducts() {
        const products = localStorage.getItem('products');
        return products ? JSON.parse(products).map(p => {
            const product = new Product(p.name, p.description, p.stock, p.price);
            product.id = p.id; // Assign stored product ID
            product.createdAt = p.createdAt; // Maintain original creation date
            product.owner = p.owner; // Maintain product owner
            return product;
        }) : []; // Return an empty array if no products are found
    }

    // Save the current product list to localStorage
    saveProducts() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    // Add a new product to the storage
    async addProduct(product) {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Assign a unique ID for the new product
            product.id = Math.random().toString(36).substr(2, 9);
            product.createdAt = new Date().toISOString(); // Store creation timestamp
            product.owner = 'current_user'; // Simulate the current user as the product owner

            // Add the product to the list
            this.products.push(product);
            this.saveProducts(); // Save updated products list to localStorage

            return product; // Return the added product
        } catch (error) {
            throw new Error(`Failed to add product: ${error.message}`);
        }
    }

    // Fetch paginated products
    async getProducts(page = 1, perPage = 10) {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const start = (page - 1) * perPage; // Calculate start index for pagination
            const end = start + perPage; // Calculate end index

            return {
                products: this.products.slice(start, end), // Return paginated products
                total: this.products.length // Return total product count
            };
        } catch (error) {
            throw new Error(`Failed to fetch products: ${error.message}`);
        }
    }

    // Update an existing product
    async updateProduct(id, updatedProduct) {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Find the index of the product to be updated
            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                throw new Error('Product not found');
            }

            // Retain original product metadata
            updatedProduct.id = id;
            updatedProduct.createdAt = this.products[index].createdAt;
            updatedProduct.owner = this.products[index].owner;

            // Update the product in the list
            this.products[index] = updatedProduct;
            this.saveProducts(); // Save updated products list to localStorage

            return updatedProduct; // Return updated product
        } catch (error) {
            throw new Error(`Failed to update product: ${error.message}`);
        }
    }

    // Delete a product from storage
    async deleteProduct(id) {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Find the index of the product to be deleted
            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                throw new Error('Product not found');
            }

            // Remove the product from the list
            this.products.splice(index, 1);
            this.saveProducts(); // Save updated products list to localStorage

            return null; // Return null to indicate successful deletion
        } catch (error) {
            throw new Error(`Failed to delete product: ${error.message}`);
        }
    }
}

// Create an instance of ProductService and export it as the default export
const productService = new ProductService();
export default productService;
