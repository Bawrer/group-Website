JAVASCRIPT
function searchContent() {
      const searchPattern = document.getElementById('searchPattern').value;
      const bodyContent = document.body.innerHTML;

      // Escape special characters in the search pattern
      const escapedPattern = searchPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Create a regular expression with the escaped pattern and 'gi' flags for global, case-insensitive search
      const regex = new RegExp(escapedPattern, 'gi');

      // Replace matches with the pattern highlighted
      const highlightedContent = bodyContent.replace(regex, match => `<span class="highlight">${match}</span>`);

      // Update the body content with highlighted matches
      document.body.innerHTML = highlightedContent;

      // Scroll to the first occurrence of the highlighted element
      const highlightedElement = document.querySelector('.highlight');
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }