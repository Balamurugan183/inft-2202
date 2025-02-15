/* create.js 
Name : Balamurugan Santhosam 
*/

import productService from "./product.service.mock.js";

// Log message to indicate script execution on the add product page
console.log('We are on the add product page');

// Add event listener to handle form submission
// Listens for the submit event on the form with id 'product-form'
document.getElementById('product-form')
    .addEventListener('submit', submitProductForm);

/**
 * Handles the product form submission.
 * Prevents default form submission behavior, validates the form,
 * and attempts to save the product if valid.
 * @param {Event} event - The form submission event
 */
async function submitProductForm(event) {
    event.preventDefault(); // Prevent page reload
    const productForm = event.target;
    const valid = validateProductForm(productForm); // Validate form fields
    
    if (valid) {
        console.log('Form is valid');
        
        // Convert form data into an object
        const formData = new FormData(productForm);
        const productObject = {};
        formData.forEach((value, key) => {
            if (key === 'price' || key === 'stock') {
                productObject[key] = Number(value); // Convert numeric fields
            } else {
                productObject[key] = value;
            }
        });

        const eleNameError = productForm.name.nextElementSibling;
        try {
            // Attempt to save the product
            await productService.saveProduct(productObject);
            eleNameError.classList.add('d-none');
            productForm.reset(); // Reset form after successful submission
            window.location = './list.html'; // Redirect to product list page
        } catch (error) {
            console.log(error);
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "This product already exists!";
        }
    } else {
        console.log('Form is invalid');
    }
}

/**
 * Validates the product form fields before submission.
 * Ensures the name and price fields are not empty and price is a valid number.
 * @param {HTMLFormElement} form - The product form element
 * @returns {boolean} - True if valid, otherwise false
 */
function validateProductForm(form) {
    console.log('Validating form');
    let valid = true;
    
    // Validate product name
    const name = form.name.value;
    const eleNameError = form.name.nextElementSibling;
    if (name === "") {
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "You must name this product!";
        valid = false;
    } else {
        eleNameError.classList.add('d-none');
    }

    // Validate product price
    const price = form.price.value;
    const elePriceError = form.price.nextElementSibling;
    if (price === "") {
        elePriceError.classList.remove('d-none');
        elePriceError.textContent = "Enter product price!";
        valid = false;
    } else if (isNaN(price)) {
        elePriceError.classList.remove('d-none');
        elePriceError.textContent = "Price must be a number!";
        valid = false;
    } else {
        elePriceError.classList.add('d-none');
    }
    
    return valid;
}
