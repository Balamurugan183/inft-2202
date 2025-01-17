// Attach the submit event handler to the form
document.getElementById('animal-form').addEventListener('submit', submitAnimalForm);

/**
 * Handles the form submission.
 * @param {Event} event - The form submission event.
 */
function submitAnimalForm(event) {
  // Prevent the default form submission
  event.preventDefault();

  // Get the form element from the event
  const form = event.target;

  // Validate the form
  if (validateAnimalForm(form)) {
    // If valid, log the form values to the console
    const animalData = {
      name: form.name.value,
      breed: form.breed.value,
      eyes: form.eyes.value,
      legs: form.legs.value,
      sound: form.sound.value,
    };
    console.log('Animal Data:', animalData);

    // Reset the form
    form.reset();

    // Hide the general error message if it's visible
    const messageBox = document.getElementById('message-box');
    messageBox.classList.add('d-none');
  } else {
    // If invalid, show a general error message
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = 'Please correct the errors in the form.';
    messageBox.classList.remove('d-none');
  }
}

/**
 * Validates the animal form.
 * @param {HTMLFormElement} form - The form element to validate.
 * @returns {boolean} - True if the form is valid, false otherwise.
 */
function validateAnimalForm(form) {
  let isValid = true;

  // List of field names to validate
  const fields = ['name', 'breed', 'eyes', 'legs', 'sound'];

  fields.forEach((fieldName) => {
    // Get the input field and its associated error message element
    const field = form[fieldName];
    const errorElement = field.nextElementSibling;

    // Check if the field is empty
    if (!field.value.trim()) {
      isValid = false;
      errorElement.textContent = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
      errorElement.classList.remove('d-none');
      field.classList.add('is-invalid');
      field.classList.remove('is-valid');
    } else {
      // Hide the error message and mark the field as valid
      errorElement.classList.add('d-none');
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
    }

    // Additional validation for numerical fields (eyes and legs)
    if (['eyes', 'legs'].includes(fieldName)) {
      const value = Number(field.value);
      if (isNaN(value) || value < 0) {
        isValid = false;
        errorElement.textContent = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be a non-negative number.`;
        errorElement.classList.remove('d-none');
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
      }
    }
  });

  return isValid;
}
