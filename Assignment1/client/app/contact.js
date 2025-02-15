/* contact-form.js 
Name : Balamuruagan Santhosam 

*/

/**
 * Ensure that local storage is set up for messages.
 * If no messages exist in storage, initialize an empty array.
 */
if (!localStorage.getItem('messages')) {
    localStorage.setItem('messages', JSON.stringify([]));
}
const store = JSON.parse(localStorage.getItem('messages'));

/**
 * Retrieve the message container element.
 * If messages exist in storage, display them.
 * Otherwise, display an error message.
 */
const container = document.getElementById('message-container');
if (store.length) {
    // Loop through stored messages and display them
    const elements = store.map(drawMessageCard);
    elements.forEach(element => container.appendChild(element));  // Append to container
} else {
    // Display an error message if no messages are available
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'No messages available.';
    container.appendChild(errorMessage);
}

/**
 * Get a reference to the contact form element and attach an event listener.
 */
const formElement = document.getElementById('contact-form');
formElement.addEventListener('submit', formSubmitHandler);

/**
 * Handles form submission.
 * Prevents default behavior and logs values.
 * Stores the submitted message in local storage.
 * @param {Event} event - The form submission event
 */
function formSubmitHandler(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Log form values in the console
    console.log(`name: ${event.target.name.value}`);
    console.log(`phone: ${event.target.phone.value}`);
    console.log(`email: ${event.target.email.value}`);
    console.log(`message: ${event.target.message.value}`);

    // Create a new ContactMessage object
    const message = new ContactMessage({
        name: event.target.name.value,
        phone: event.target.phone.value,
        email: event.target.email.value,
        message: event.target.message.value,
    });

    // Add the new message to local storage
    store.push(message);
    localStorage.setItem('messages', JSON.stringify(store));
}

/**
 * Creates a message card element for displaying stored messages.
 * @param {Object} message - The message object containing user input
 * @returns {HTMLElement} - A message card element
 */
function drawMessageCard(message) {
    // Create a card container element
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');

    // Add content to the card
    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${message.name}</h5>
            <p class="card-text"><strong>Phone:</strong> ${message.phone}</p>
            <p class="card-text"><strong>Email:</strong> ${message.email}</p>
            <p class="card-text"><strong>Message:</strong> ${message.message}</p>
        </div>
    `;

    return card;
}

/**
 * Constructor function for creating a ContactMessage object.
 * @param {Object} param0 - Object containing message details
 * @param {string} param0.name - Sender's name
 * @param {string} param0.phone - Sender's phone number
 * @param {string} param0.email - Sender's email
 * @param {string} param0.message - Message content
 */
function ContactMessage({ name, phone, email, message }) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.message = message;
}
