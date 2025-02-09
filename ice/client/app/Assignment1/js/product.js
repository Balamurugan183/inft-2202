document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const product = {
        name: "Cool Guy Fedora",
        description: "A hat to wear on your head to attract people.",
        stock: 35,
        price: 39.95
    };

    document.getElementById("product-details").innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <p>Stock: ${product.stock}</p>
    `;
});
