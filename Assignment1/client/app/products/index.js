/* index.js 
Name : Balamurugan Santhosam 
Student_ID : 100925240
Date : 2025-02-14
*/

import productService from "./product.service.mock.js";

/**
 * Creates a product form dynamically and manages the form submission.
 * @param {string} name - Name of the product (optional for updates)
 * @returns {Object} - Contains form description and form element
 */
function product(name) {
    const form = document.createElement('form');
    let description = 'Add Product';
    let product = null;
    
    /**
     * Generates the form content dynamically based on product data.
     * @returns {HTMLElement} - The form container element
     */
    function createContent() {
        const container = document.createElement('div');
        container.classList.add('mb-2');
        
        const mb3Name = document.createElement('div');
        mb3Name.classList.add('mb-3');
        let editableInput = `<input type="text" class="form-control" id="name" name="name">`;
        let readonlyInput = `<input type="text" class="form-control" id="name" name="name" value="${product ? product.name : ""}" readonly>`;
        mb3Name.innerHTML = '<label for="name" class="form-label">Product Name</label>' +
            (product ? readonlyInput : editableInput) +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Name);

        const mb3Price = document.createElement('div');
        mb3Price.classList.add('mb-3');
        mb3Price.innerHTML = '<label for="price" class="form-label">Price</label>' +
            `<input type="text" class="form-control" id="price" name="price" value="${product ? product.price : ""}">` +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Price);
        
        const mb3Stock = document.createElement('div');
        mb3Stock.classList.add('mb-3');
        mb3Stock.innerHTML = '<label for="stock" class="form-label">Stock</label>' +
            `<input type="text" class="form-control" id="stock" name="stock" value="${product ? product.stock : ""}">` +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Stock);
        
        const mb3Description = document.createElement('div');
        mb3Description.classList.add('mb-3');
        mb3Description.innerHTML = '<label for="desc" class="form-label">Description</label>' +
            `<input type="text" class="form-control" id="desc" name="desc" value="${product ? product.desc : ""}">` +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Description);

        const submitBtn = document.createElement('div');
        submitBtn.innerHTML = '<button type="submit" class="btn btn-primary">' +
            'Save Product <i class="fa-solid fa-check"></i>' +
            '</button>';
        container.append(submitBtn);
        
        form.append(container);
        return form;
    }

    /**
     * Validates the form inputs before submission.
     * @returns {boolean} - True if valid, otherwise false
     */
    function validate() {
        let valid = true;
        const name = form.name.value;
        const eleNameError = form.name.nextElementSibling;
        
        if (name === "") {
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "You must name this product!";
            valid = false;
        } else {
            eleNameError.classList.add('d-none');
        }
        
        const price = form.price.value;
        const elePriceError = form.price.nextElementSibling;
        if (price === "" || isNaN(price)) {
            elePriceError.classList.remove('d-none');
            elePriceError.textContent = "Enter a valid price!";
            valid = false;
        } else {
            elePriceError.classList.add('d-none');
        }
        
        return valid;
    }
    
    /**
     * Handles form submission and product data processing.
     * @param {string} action - Defines whether it's a new product or an update
     */
    function submit(action) {
        const valid = validate();
        if (valid) {
            const formData = new FormData(form);
            const productObject = {};
            formData.forEach((value, key) => {
                if (key === 'stock' || key === 'price') {
                    productObject[key] = Number(value);
                } else {
                    productObject[key] = value;
                }
            });
            
            const eleNameError = form.name.nextElementSibling;
            try {
                if (action === "new") {
                    productService.saveProduct(productObject);
                } else {
                    productService.updateProduct(productObject);
                }
                eleNameError.classList.add('d-none');
                form.reset();
                window.location = './list.html';
            } catch (error) {
                eleNameError.classList.remove('d-none');
                eleNameError.textContent = "This product already exists!";
            }
        }
    }
    
    if (!name) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            submit("new");
        });
    } else {
        description = 'Update Product';
        product = productService.findProduct(name);
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            submit("update");
        });
    }
    
    return {
        description,
        element: createContent()
    };
}

export default product;
