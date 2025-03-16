// Import the ProductService for fetching, updating, and deleting products
import ProductService from './product.service.js';

class ProductList {
    constructor() {
        this.products = []; // Array to store products
        this.currentPage = 1; // Default page number
        this.itemsPerPage = 5; // Items per page, matching API default
        this.productList = document.querySelector('#product-list tbody'); // Reference to the product table body
        this.paginationElement = document.getElementById('pagination'); // Reference to pagination container
        this.itemsPerPageSelect = document.getElementById('itemsPerPage'); // Dropdown for selecting items per page
        this.loadingSpinner = document.getElementById('loadingSpinner'); // Loading spinner element
        this.messageContainer = document.getElementById('messageContainer'); // Container for displaying messages
        this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal')); // Bootstrap modal for delete confirmation
        this.productToDelete = null; // Store the product ID to delete

        // Initialize event listeners and load data
        this.setupEventListeners();
        this.loadFromQueryParams();
        this.loadProducts();
    }

    // Get current page products (already paginated from service)
    getCurrentPageProducts() {
        return this.products;
    }

    // Read query parameters to set pagination values
    loadFromQueryParams() {
        const params = new URLSearchParams(window.location.search);
        this.currentPage = parseInt(params.get('page')) || 1; // Get page from query or default to 1
        this.itemsPerPage = parseInt(params.get('perPage')) || 10; // Get perPage value or default to 10
        this.itemsPerPageSelect.value = this.itemsPerPage; // Set the dropdown value
    }

    // Update the URL with current pagination parameters
    updateQueryParams() {
        const url = new URL(window.location.href);
        url.searchParams.set('page', this.currentPage);
        url.searchParams.set('perPage', this.itemsPerPage);
        window.history.pushState({}, '', url); // Update the browser's URL
    }

    // Show loading spinner when fetching data
    showSpinner() {
        this.loadingSpinner.style.display = 'block';
        this.productList.style.display = 'none';
    }

    // Hide loading spinner after data is loaded
    hideSpinner() {
        this.loadingSpinner.style.display = 'none';
        this.productList.style.display = '';
    }

    // Display success/error messages
    showMessage(message, type = 'success') {
        const alert = this.messageContainer.querySelector('.alert');
        alert.className = `alert alert-${type}`; // Set alert type (success/danger)
        alert.textContent = message;
        this.messageContainer.style.display = 'block';
        
        // Auto-hide message after 3 seconds
        setTimeout(() => {
            this.messageContainer.style.display = 'none';
        }, 3000);
    }

    // Set up event listeners for UI interactions
    setupEventListeners() {
        // Update items per page when dropdown value changes
        this.itemsPerPageSelect.addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1; // Reset to first page
            this.updateQueryParams();
            this.loadProducts();
        });

        // Confirm delete button inside the modal
        document.getElementById('confirmDelete').addEventListener('click', () => {
            this.deleteModal.hide();
            this.performDelete();
        });
    }

    // Load products from API with pagination
    async loadProducts() {
        try {
            this.showSpinner(); // Show spinner while fetching

            console.log('Fetching products from:', ProductService.host); // Debugging log
            const response = await ProductService.getProducts(this.currentPage, this.itemsPerPage);
            console.log('Raw API Response:', response); // Debugging log

            if (!response) {
                throw new Error('No response from API'); // Error if no response
            }

            this.products = response.products || []; // Store fetched products
            this.totalItems = response.total || 0; // Total items from API
            this.totalPages = response.totalPages || 1; // Total pages

            console.log('Processed products:', this.products); // Debugging log
            this.render(); // Render UI
            this.hideSpinner(); // Hide spinner after loading
        } catch (error) {
            console.error('Detailed error:', error);
            this.hideSpinner();
            this.showMessage('Error loading products: ' + error.message, 'danger'); // Show error message
        }
    }

    // Render the list of products in the table
    renderProducts() {
        if (!this.products || this.products.length === 0) {
            this.productList.innerHTML = '<tr><td colspan="7" class="text-center">No products available.</td></tr>';
            return;
        }

        this.productList.innerHTML = ''; // Clear the table
        this.products.forEach(product => {
            console.log('Rendering product:', product); // Debugging log
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name || 'N/A'}</td>
                <td>${product.description || 'N/A'}</td>
                <td>${product.sound || 'N/A'}</td>
                <td>$${product.price || '0'}</td>
                <td>${product.user || 'N/A'}</td>
                <td>${product.createTime ? new Date(product.createTime * 1000).toLocaleString() : 'N/A'}</td>
                <td>
                    ${product.user === 'your student id' ? `
                        <button class="btn btn-warning btn-sm edit-btn" data-id="${product.id}">Update</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${product.id}">Delete</button>
                    ` : ''}
                </td>
            `;

            // Add event listeners for edit and delete buttons if user owns the product
            if (product.user === 'your student id') {
                row.querySelector('.edit-btn')?.addEventListener('click', () => this.editProduct(product.id));
                row.querySelector('.delete-btn')?.addEventListener('click', () => this.showDeleteModal(product.id));
            }

            this.productList.appendChild(row);
        });
    }

    // Render pagination controls
    renderPagination() {
        const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        let paginationHtml = '';

        // Previous button
        paginationHtml += `
            <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage - 1}">Previous</a>
            </li>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `
                <li class="page-item ${this.currentPage === i ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
        }

        // Next button
        paginationHtml += `
            <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage + 1}">Next</a>
            </li>
        `;

        this.paginationElement.innerHTML = paginationHtml;

        // Add event listeners to pagination buttons
        this.paginationElement.querySelectorAll('.page-link').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const newPage = parseInt(e.target.dataset.page);
                if (newPage >= 1 && newPage <= totalPages && newPage !== this.currentPage) {
                    this.currentPage = newPage;
                    this.updateQueryParams();
                    this.loadProducts();
                }
            });
        });
    }

    // Navigate to edit product page
    async editProduct(id) {
        window.location.href = `create.html?edit=${id}`;
    }

    // Show delete confirmation modal
    showDeleteModal(productId) {
        this.productToDelete = productId;
        this.deleteModal.show();
    }

    // Perform product deletion
    async performDelete() {
        if (!this.productToDelete) return;

        try {
            this.showSpinner();
            await new Promise(resolve => setTimeout(resolve, 1000));
            await ProductService.deleteProduct(this.productToDelete);
            await this.loadProducts();
            this.showMessage('Product deleted successfully');
        } catch (error) {
            this.hideSpinner();
            this.showMessage('Failed to delete product: ' + error.message, 'danger');
        }
        this.productToDelete = null;
    }

    // Render the complete UI
    render() {
        this.renderProducts();
        this.renderPagination();
        this.updateQueryParams();
    }
}

// Initialize the product list class
const productList = new ProductList();
