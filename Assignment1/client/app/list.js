/* list.js */

import productService from "./product.service.mock.js";

// Log message to indicate script execution on the product list page
console.log('We are on the product list page');

// Retrieve URL parameters to determine how many products to create
const params = new URL(document.location).searchParams;
let recCount = params.get("records");
if (recCount !== null) {
    let index = 0;
    while (recCount-- > 0) {
        productService.saveProduct({
            "name": `Product ${index++}`,
            "price": 10,
            "stock": 5,
            "desc": "Sample product description."
        });
    }
}

// Get references to the table and empty message elements
const eleEmpty = document.getElementById('empty-message');
const eleTable = document.getElementById('product-list');

// Define pagination settings
let recordPage = {
    page: Number(params.get('page') ?? 1),
    perPage: Number(params.get('perPage') ?? 7)
};
const { records, pagination } = productService.getProductPage(recordPage);

// Show or hide the table based on product records
if (!records.length) {
    eleEmpty.classList.remove('d-none');
    eleTable.classList.add('d-none');
} else {
    eleEmpty.classList.add('d-none');
    eleTable.classList.remove('d-none');
    drawProductTable(records);
    drawPagination(pagination);
}

/**
 * Generates pagination controls and appends them to the page.
 * @param {Object} pagination - Pagination data including page number and total pages.
 */
function drawPagination({ page = 1, perPage = 5, pages = 10 }) {
    const pagination = document.getElementById('pagination');
    if (pages > 1) {
        pagination.classList.remove('d-none');
    }
    const ul = document.createElement("ul");
    ul.classList.add('pagination');
    ul.insertAdjacentHTML('beforeend', addPage(page - 1, 'Previous', (page == 1) ? 'disabled' : ''));
    for (let i = 1; i <= pages; i++) {
        ul.insertAdjacentHTML('beforeend', addPage(i, i, (i == page) ? 'active' : ''));
    }
    ul.insertAdjacentHTML('beforeend', addPage(page + 1, 'Next', (page == pages) ? 'disabled' : ''));
    pagination.append(ul);

    function addPage(number, text, style) {
        return `<li class="page-item ${style}">
            <a class="page-link" href="./list.html?page=${number}&perPage=${perPage}">${text}</a>
        </li>`;
    }
}

/**
 * Populates the product table with data retrieved from local storage.
 * @param {Array} products - List of products to display.
 */
function drawProductTable(products) {
    for (let product of products) {
        const row = eleTable.insertRow();
        row.insertCell().textContent = product.name;
        row.insertCell().textContent = product.price;
        row.insertCell().textContent = product.stock;
        row.insertCell().textContent = product.desc;

        // Create buttons for editing and deleting products
        const eleBtnCell = row.insertCell();
        const eleBtnDelete = document.createElement('button');
        eleBtnDelete.classList.add('btn', 'btn-danger', 'mx-1');
        eleBtnDelete.innerHTML = `<i class="fa fa-trash"></i>`;
        eleBtnDelete.addEventListener('click', onDeleteButtonClick(product));
        eleBtnCell.append(eleBtnDelete);

        const eleBtnEdit = document.createElement('a');
        eleBtnEdit.classList.add('btn', 'btn-primary', 'mx-1');
        eleBtnEdit.innerHTML = `<i class="fa fa-edit"></i>`;
        eleBtnEdit.href = `./product.html?name=${product.name}`;
        eleBtnCell.append(eleBtnEdit);
    }
}

/**
 * Handles the deletion of a product when the delete button is clicked.
 * Refreshes the page after deletion.
 * @param {Object} product - The product object to be deleted.
 * @returns {Function} - Event handler function.
 */
function onDeleteButtonClick(product) {
    return event => {
        productService.deleteProduct(product);
        window.location.reload();
    };
}
