document.addEventListener("DOMContentLoaded", function () {
    const products = [
        {
            name: "Cool Guy Fedora",
            description: "A stylish hat for the modern gentleman.",
            stock: 35,
            price: 39.95
        },
        {
            name: "Trendy Sunglasses",
            description: "UV-protected glasses for sunny days.",
            stock: 20,
            price: 29.99
        }
    ];

    let output = "<ul>";
    products.forEach(product => {
        output += `
            <li>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <p>Stock: ${product.stock}</p>
            </li>
        `;
    });
    output += "</ul>";

    document.getElementById("product-list").innerHTML = output;
});
