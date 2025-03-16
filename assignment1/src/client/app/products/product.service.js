// Define the ProductService class to handle product-related API requests
class ProductService {
    constructor() {
        // API endpoint for product-related operations
        this.host = 'https://inft2202-server.onrender.com/api/products';
    }

    /**
     * Fetches a paginated list of products from the API.
     * @param {number} page - The page number to fetch.
     * @param {number} perPage - The number of items per page.
     * @returns {Object} An object containing products, pagination details, and metadata.
     */
    async getProducts(page = 1, perPage = 5) {
        try {
            console.log('Fetching from URL:', this.host); // Debugging log
            const response = await fetch(this.host);
            console.log('Raw response:', response); // Debugging log

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the response JSON
            const data = await response.json();
            console.log('Raw data:', data); // Debugging log

            // Return structured product data with pagination info
            return {
                products: data.records || [], // Extract product records
                total: data.pagination?.count || 0, // Total number of products
                totalPages: data.pagination?.pages || 1, // Total pages available
                currentPage: data.pagination?.page || 1, // Current page
                perPage: data.pagination?.perPage || 5 // Items per page
            };
        } catch (error) {
            console.error('API Error:', error);
            throw new Error(`Failed to fetch products: ${error.message}`);
        }
    }

    /**
     * Updates a specific product in the API.
     * @param {string} id - The product ID.
     * @param {Object} product - The updated product object.
     * @returns {Object} The updated product response from the API.
     */
    async updateProduct(id, product) {
        try {
            const url = `${this.host}/${id}`; // Construct the API endpoint
            const request = new Request(url, {
                method: 'PUT', // Use PUT method for updating
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors', // Enable cross-origin requests
                body: JSON.stringify({
                    name: product.name,
                    description: product.description,
                    price: parseFloat(product.price), // Ensure price is a float
                    stock: parseInt(product.stock) // Ensure stock is an integer
                })
            });

            // Send the request
            const response = await fetch(request);

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Return the updated product data
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw new Error(`Failed to update product: ${error.message}`);
        }
    }

    /**
     * Deletes a specific product from the API.
     * @param {string} id - The product ID to delete.
     * @returns {null|Object} Returns null if deletion is successful, otherwise API response.
     */
    async deleteProduct(id) {
        try {
            const url = `${this.host}/${id}`; // Construct the API endpoint
            const request = new Request(url, {
                method: 'DELETE', // Use DELETE method to remove the product
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors' // Enable cross-origin requests
            });

            // Send the request
            const response = await fetch(request);

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // If the server returns a 204 (No Content), return null, else return response JSON
            return response.status === 204 ? null : await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw new Error(`Failed to delete product: ${error.message}`);
        }
    }
}

// Export a single instance of ProductService
export default new ProductService();
