/* product.service.js */

/**
 * Service constructor to manage products in local storage.
 */
function ProductService() {
    // If no products exist in local storage, initialize an empty array.
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify([]));
    }
}

/**
 * Retrieves the list of products from local storage.
 * @returns {Array} - Array of stored products.
 */
ProductService.prototype.getProducts = function() {
    return JSON.parse(localStorage.getItem('products'));
};

/**
 * Saves a new product to local storage.
 * @param {Object} product - The product object to be saved.
 * @throws {Error} - If a product with the same name already exists.
 * @returns {boolean} - Returns true if the product was successfully saved.
 */
ProductService.prototype.saveProduct = function(product) {
    const products = this.getProducts();
    if (products.find(item => item.name === product.name)) {
        throw new Error('A product with this name already exists!');
    }
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    return true;
};

/**
 * Finds a specific product by name.
 * @param {string} productName - The name of the product to find.
 * @throws {Error} - If the product does not exist.
 * @returns {Object} - The found product object.
 */
ProductService.prototype.findProduct = function(productName) {
    const products = this.getProducts();
    const product = products.find(item => item.name === productName);
    if (!product) {
        throw new Error('This product does not exist!');
    }
    return product;
};

/**
 * Updates an existing product in local storage.
 * @param {Object} product - The updated product object.
 * @throws {Error} - If the product does not exist.
 * @returns {boolean} - Returns true if the product was successfully updated.
 */
ProductService.prototype.updateProduct = function(product) {
    const products = this.getProducts();
    const index = products.findIndex(item => item.name === product.name);
    if (index === -1) {
        throw new Error('This product does not exist!');
    }
    products[index] = product;
    localStorage.setItem('products', JSON.stringify(products));
    return true;
};

/**
 * Deletes a product from local storage.
 * @param {Object} product - The product to delete.
 * @throws {Error} - If the product does not exist.
 * @returns {boolean} - Returns true if the product was successfully deleted.
 */
ProductService.prototype.deleteProduct = function(product) {
    const products = this.getProducts();
    const index = products.findIndex(item => item.name === product.name);
    if (index === -1) {
        throw new Error('This product does not exist!');
    }
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    return true;
};

export default new ProductService();
