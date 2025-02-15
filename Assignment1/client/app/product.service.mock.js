/* product.service.mock.js 
Name : Balamurugan Santhosam 
*/

/**
 * ProductService class provides methods to manage products using local storage.
 */
class ProductService {
    constructor() {
        // Initialize local storage for products if not already set.
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify([]));
        }
    }

    /**
     * Retrieves all products from local storage.
     * @returns {Array} - List of stored products.
     */
    getProducts() {
        return JSON.parse(localStorage.getItem('products'));
    }

    /**
     * Retrieves a paginated list of products.
     * @param {Object} options - Pagination options.
     * @param {number} options.page - Current page number.
     * @param {number} options.perPage - Number of records per page.
     * @returns {Object} - An object containing paginated product records and pagination info.
     */
    getProductPage({ page = 1, perPage = 15 }) {
        let records = this.getProducts();
        let pagination = {
            page: page,
            perPage: perPage,
            pages: Math.ceil(records.length / perPage)
        };
        if (pagination.page < 1) pagination.page = 1;
        if (pagination.page > pagination.pages) pagination.page = pagination.pages;
        let start = (pagination.page - 1) * perPage;
        let end = start + perPage;
        return {
            records: records.slice(start, end),
            pagination
        };
    }

    /**
     * Saves a new product to local storage.
     * @param {Object} product - Product details to save.
     * @throws {Error} - If a product with the same name already exists.
     * @returns {boolean} - Returns true on success.
     */
    saveProduct(product) {
        const products = this.getProducts();
        if (products.find(p => p.name === product.name)) {
            throw new Error('A product with that name already exists!');
        }
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    }

    /**
     * Finds a product by its name.
     * @param {string} productName - The name of the product to find.
     * @returns {Object|null} - The found product or null if not found.
     */
    findProduct(productName) {
        return this.getProducts().find(p => p.name === productName) || null;
    }

    /**
     * Updates an existing product in local storage.
     * @param {Object} updatedProduct - The product object with updated details.
     * @returns {boolean} - Returns true if the update was successful, false otherwise.
     */
    updateProduct(updatedProduct) {
        let products = this.getProducts();
        let index = products.findIndex(p => p.name === updatedProduct.name);
        if (index === -1) return false;
        products[index] = updatedProduct;
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    }

    /**
     * Deletes a product from local storage.
     * @param {Object} product - The product to delete.
     * @throws {Error} - If the product does not exist.
     * @returns {boolean} - Returns true if deletion was successful.
     */
    deleteProduct(product) {
        let products = this.getProducts();
        let idx = products.findIndex(p => p.name === product.name);
        if (idx === -1) {
            throw new Error('That product does not exist!');
        }
        products.splice(idx, 1);
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    }
}

export default new ProductService();
