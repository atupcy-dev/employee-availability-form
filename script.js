  const form = document.querySelector('.availability-form');
  const successMessage = document.querySelector('.success-message');

  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      alert('Please fill out all required fields.');
      return;
    }

    const formData = new FormData(form);

    const dataObject = Object.fromEntries(formData.entries());
    localStorage.setItem('employeeAvailability', JSON.stringify(dataObject));

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        successMessage.hidden = false;
      } else {
        alert('There was a problem submitting your availability. Please try again later.');
      }
    } catch (error) {
      alert('There was a problem submitting your availability. Please try again later.');
    }
  });