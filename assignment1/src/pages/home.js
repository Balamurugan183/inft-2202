const Home = {
    render() {
      const container = document.createElement('div');
      container.className = 'container';
      
      const title = document.createElement('h1');
      title.className = 'page-title';
      title.textContent = 'Welcome to Product Tracker';
      
      const content = document.createElement('div');
      content.innerHTML = `
        <p>Manage your product inventory with ease. This lightweight CRUD application lets you handle everything directly in your browser — no backend needed!</p>
        <ul style="margin-left: 20px; list-style-type: disc;">
          <li>Browse and search your product catalog</li>
          <li>Add new items with custom details</li>
          <li>Edit existing entries on the products</li>
          <li>Remove products you no longer need</li>
        </ul>
        <p style="margin-top: 20px;">
          <a href="#/products" class="btn">View Products</a>
          <a href="#/products/create" class="btn">Add New Product</a>
        </p>
      `;
      
      container.appendChild(title);
      container.appendChild(content);
      
      return container;
    }
  };
  
  export default Home;