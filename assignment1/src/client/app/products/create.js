// Importing the mock product service for handling product data operations
import ProductService from './product.mock.service.js'; // Changed to mock service
import Product from './product.js';

// Retrieve query parameters from the URL to check if we are editing an existing product
const params = new URLSearchParams(window.location.search);
const editId = params.get('edit'); // Get the product ID from the query parameter if in edit mode
let currentProduct = null; // Store the product being edited

// Function to validate the form inputs before submission
function validateForm(name, description, stock, price) {
    let isValid = true; // Flag to track validation status

    // Clear previous error messages before validating
    document.getElementById('productNameError').textContent = '';
    document.getElementById('productDescriptionError').textContent = '';
    document.getElementById('productStockError').textContent = '';
    document.getElementById('productPriceError').textContent = '';

    // Validate product name (Required field)
    if (!name) {
        document.getElementById('productNameError').textContent = 'Product name is required.';
        isValid = false;
    }

    // Validate product description (Required field)
    if (!description) {
        document.getElementById('productDescriptionError').textContent = 'Product description is required.';
        isValid = false;
    }

    // Validate product stock (Required and must be a non-negative number)
    if (!stock) {
        document.getElementById('productStockError').textContent = 'Stock is required.';
        isValid = false;
    } else if (isNaN(stock)) {
        document.getElementById('productStockError').textContent = 'Stock must be a number.';
        isValid = false;
    } else if (stock < 0) {
        document.getElementById('productStockError').textContent = 'Stock must be a positive number.';
        isValid = false;
    }

    // Validate product price (Required and must be a non-negative number)
    if (!price) {
        document.getElementById('productPriceError').textContent = 'Price is required.';
        isValid = false;
    } else if (isNaN(price)) {
        document.getElementById('productPriceError').textContent = 'Price must be a number.';
        isValid = false;
    } else if (price < 0) {
        document.getElementById('productPriceError').textContent = 'Price must be a positive number.';
        isValid = false;
    }

    return isValid; // Return the validation result
}

// Function to auto-fill the form fields when editing an existing product
function autoFillForm(product) {
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productPrice').value = product.price.toFixed(2); // Ensure price is displayed with two decimal places

    // Update form UI to reflect editing mode
    document.querySelector('h1').textContent = 'Edit Product';
    document.querySelector('button[type="submit"]').textContent = 'Save Changes';
}

// If in edit mode, fetch the product data and auto-fill the form
if (editId) {
    ProductService.getProducts()
        .then(products => {
            // Find the product that matches the editId
            currentProduct = products.find(p => p.id === editId);
            if (currentProduct) {
                autoFillForm(currentProduct); // Populate form fields with existing product data
            }
        })
        .catch(error => {
            console.error('Error loading product:', error);
            alert('Failed to load product data. Please try again.'); // Notify user if product data can't be loaded
        });
}

// Handle form submission
document.getElementById('create-product-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Retrieve input values from form fields
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const stock = parseInt(document.getElementById('productStock').value);
    const price = parseFloat(document.getElementById('productPrice').value);

    // Validate input values before proceeding
    if (!validateForm(name, description, stock, price)) {
        return; // Stop submission if validation fails
    }

    // Create a new Product object
    const product = new Product(name, description, stock, price);

    try {
        if (editId) {
            // If editing an existing product, update it
            product.id = editId;
            await ProductService.updateProduct(editId, product);
            alert('Product updated successfully!');
        } else {
            // Otherwise, add a new product
            await ProductService.addProduct(product);
            alert('Product created successfully!');
        }

        // Redirect to the product listing page after successful save
        window.location.href = 'list.html';
    } catch (error) {
        console.error('Error saving product:', error);
        alert('Failed to save product. Please try again.'); // Notify user of save failure
    }
});
