const About = {
    render() {
      const container = document.createElement('div');
      container.className = 'container';
      
      const title = document.createElement('h1');
      title.className = 'page-title';
      title.textContent = 'About Us';
      
      const content = document.createElement('div');
      content.innerHTML = `
        <p>Product Manager is a lightweight, single-page CRUD application developed using only modern JavaScript, HTML5, and CSS3—without any external frameworks.</p>
        <p>This project showcases core web development skills such as:</p>
        <ul style="margin-left: 20px; list-style-type: disc;">
          <li>HTML5</li>
          <li>Client-side routing and dynamic UI rendering</li>
          <li>DOM manipulation with JavaScript</li>
          <li>Modular code bundled with Webpack</li>
          <li>Local Storage for data persistence</li>
        </ul>
        <p style="margin-top: 20px;">It’s designed as a practical example of how to build and manage application state, navigation, and component updates purely on the client side.</p>
      `;
      
      container.appendChild(title);
      container.appendChild(content);
      
      return container;
    }
  };
  
  export default About;