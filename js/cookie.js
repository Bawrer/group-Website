
    
  // Function to set a cookie with a specified name and value
  function setCookie(name, value) {
    document.cookie = `${name}=${value}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/`;
  }

  // Function to close the cookie consent modal
  function closeCookieModal() {
    document.querySelector('.cookie-consent-modal').style.display = 'none';
  }

  // Function to handle the "Accept" button click
  function acceptCookies() {
    setCookie('cookieConsent', 'accepted'); // Set a cookie to record the user's consent
    closeCookieModal(); // Close the modal
  }

  // Function to handle the "Cancel" button click
  function cancelCookies() {
    setCookie('cookieConsent', 'cancelled'); // Set a cookie to record the user's cancellation
    closeCookieModal(); // Close the modal
  }

  // Check if the user has previously accepted or cancelled cookies
  const cookieConsent = document.cookie.replace(/(?:(?:^|.*;\s*)cookieConsent\s*=\s*([^;]*).*$)|^.*$/, '$1');

  // If the user hasn't previously accepted or cancelled cookies, show the modal
  if (cookieConsent !== 'accepted' && cookieConsent !== 'cancelled') {
    document.querySelector('.cookie-consent-modal').style.display = 'block';
  }

  // Attach click event handlers to the "Accept" and "Cancel" buttons
  document.querySelector('.button.accept').addEventListener('click', acceptCookies);
  document.querySelector('.button.cancel').addEventListener('click', cancelCookies);


  