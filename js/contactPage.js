function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('text').value.trim();
  
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
      return false; // Prevent form submission if validation fails
    }
  
    // You can add additional validation here, such as checking the email format
  
    // If validation passes, you can submit the form or perform other actions here
    // Example: Send the form data to a server using AJAX
  
    // Clear the form inputs after submission (optional)
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('text').value = '';
  
    alert('Message sent successfully!');
    return true; // Allow form submission
  }
  
  function send() {
    // Add any additional actions you want to perform when the "SEND" button is clicked
    // You can use this function to add custom functionality
  }
  
  function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const text = document.getElementById("text").value;


    // Simple validation for the name and email fields
    if (name === "" || email === "" || subject ==="" || text ==="") {
      emailError.textContent ="Name and Email fields are required!";
        return false; // Prevent form submission
    }

    // You can add more complex validation here, e.g., email format, etc.

    return true; // Allow form submission
}

        // Function to validate an email address using a regular expression
        function validateEmail(email) {
            var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

        // Function to validate the form
        function validateForm() {
            var name = document.getElementById("name").value;
            var email = document.getElementById("email").value;
            var emailError = document.getElementById("emailError");

            // Simple validation for the name field
            if (name === "") {
                alert("All fields are required!");
                return false; // Prevent form submission
            }

            // Email validation
            if (email === "") {
                emailError.textContent = "Email field is required!";
                return false; // Prevent form submission
            } else if (!validateEmail(email)) {
                emailError.textContent = "Invalid email address!";
                return false; // Prevent form submission
            } else {
                emailError.textContent = ""; // Clear any previous error message
            }

            // You can add more complex validation here if needed.

            return true; // Allow form submission
        }

        var emailInput = document.getElementById("email");
        emailInput.addEventListener("input", function() {
            var emailError = document.getElementById("emailError");
            emailError.textContent = ""; // Clear the error message
        });
        // Add an event listener to the form
        document.getElementById("formbox").addEventListener("submit", function(event) {
            if (!validateForm()) {
                event.preventDefault(); // Prevent the form from submitting if validation fails
            }
        });
 
        