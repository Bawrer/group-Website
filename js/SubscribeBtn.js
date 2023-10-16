   // Get references to the input field and the subscribe button
   const emailInput = document.getElementById('emailInput');
   const subscribeButton = document.getElementById('subscribeButton');



   // Add an event listener to the subscribe button
   subscribeButton.addEventListener('click', () => {
       // Get the email value from the input field
       const email = emailInput.value;



       // Perform some basic email validation
       if (isValidEmail(email)) {
           alert(`Subscribed with email: ${email}`);
           // You can send the email to your server for further processing here
       } else {
           alert('Please enter a valid email address');
       }
   });



   // Basic email validation function
   function isValidEmail(email) {
       // You can add more robust email validation logic here if needed
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       return emailRegex.test(email);
   }



   function showAlert() {
       alert("You have been successfully subscribed!");
   }