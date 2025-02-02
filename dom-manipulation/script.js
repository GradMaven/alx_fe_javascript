
// Array of quote objects
let quotes = [];

// Load quotes from local storage when the page loads
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    // Default quotes if local storage is empty
    quotes = [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
      { text: "Do what you can, with what you have, where you are.", category: "Motivation" },
      { text: "The best way to predict the future is to invent it.", category: "Innovation" }
    ];
    saveQuotes();
  }

  populateCategories(); // Populate categories after loading quotes
  restoreFilter(); // Restore the last selected filter
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

  // Function to display a random quote
  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<strong>${randomQuote.text}</strong> <em>(${randomQuote.category})</em>`;

  }

  // Function to dynamically create the "Add Quote" form
 function createAddQuoteForm() {
  const formContainer = document.createElement('div');
  formContainer.id = 'addQuoteForm';

  const quoteInput = document.createElement('input');
  quoteInput.id = 'newQuoteText';
  quoteInput.type = 'text';
  quoteInput.placeholder = 'Enter a new quote';

  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      saveQuotes(); // Save updated quotes to local storage
      populateCategories(); // Update the category dropdown
      filterQuotes(); // Refresh the displayed quotes

      // Send the new quote to the server
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST', // Use POST method
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify({
          title: newQuote.text, // Map 'text' to 'title' for the server
          body: newQuote.category, // Map 'category' to 'body' for the server
          userId: 1, // Default user ID for the mock API
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add quote to server');
      }

      const serverQuote = await response.json();
      console.log('Quote added to server:', serverQuote);
      showNotification('Quote added successfully!');
    } catch (error) {
      console.error('Failed to add quote to server:', error);
      showNotification('Failed to add quote to server. Please try again later.');
    }
      
    } else {
      alert('Please fill in both the quote and category fields.');
    }
  }
  
  // Function to populate the category dropdown
  function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Extract unique categories
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset dropdown
    categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes based on the selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = selectedCategory === 'all'
    ? quotes
    : quotes.filter(quote => quote.category === selectedCategory);

  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = filteredQuotes.map(quote =>
    `<div><strong>${quote.text}</strong> <em>(${quote.category})</em></div>`
  ).join('');

  // Save the selected filter to local storage
  localStorage.setItem('lastSelectedFilter', selectedCategory);
}

// Function to restore the last selected filter
function restoreFilter() {
  const lastSelectedFilter = localStorage.getItem('lastSelectedFilter');
  if (lastSelectedFilter) {
    document.getElementById('categoryFilter').value = lastSelectedFilter;
    filterQuotes(); // Apply the filter
  }
}

 // Function to export quotes to a JSON file
  function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes(); // Save updated quotes to local storage
    alert('Quotes imported successfully!');
    showRandomQuote(); // Display a random quote after import
  };
  fileReader.readAsText(event.target.files[0]);
}

 
  // Add export button
  const exportButton = document.createElement('button');
  exportButton.textContent = 'Export Quotes';
  exportButton.onclick = exportQuotes;
  document.body.appendChild(exportButton);

  // Add import file input
  const importInput = document.createElement('input');
  importInput.type = 'file';
  importInput.id = 'importFile';
  importInput.accept = '.json';
  importInput.onchange = importFromJsonFile;
  document.body.appendChild(importInput);

  // Function to fetch quotes from the server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const serverQuotes = await response.json();
    return serverQuotes.map(quote => ({
      id: quote.id,
      text: quote.title, // Using 'title' as the quote text
      category: 'Server' // Default category for server quotes
    }));
  } catch (error) {
    console.error('Failed to fetch quotes from server:', error);
    return [];
  }
}

// Function to sync quotes with the server
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  if (serverQuotes.length > 0) {
    const serverQuoteIds = new Set(serverQuotes.map(quote => quote.id));
    const localQuotes = quotes.filter(quote => !serverQuoteIds.has(quote.id));
    quotes = [...serverQuotes, ...localQuotes];

    saveQuotes();
    showNotification('Quotes synced with server!');
  }
}

  // Function to sync quotes with the server
async function syncWithServer() {
  try {
    // Fetch quotes from the server
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const serverQuotes = await response.json();

    // Merge server quotes with local quotes (server data takes precedence)
    const serverQuoteIds = new Set(serverQuotes.map(quote => quote.id));
    const localQuotes = quotes.filter(quote => !serverQuoteIds.has(quote.id));
    quotes = [...serverQuotes, ...localQuotes];

    // Save merged quotes to local storage
    saveQuotes();
      // Notify the user of the update
      showNotification('Quotes have been updated from the server.');
    } catch (error) {
      console.error('Failed to sync with server:', error);
      showNotification('Failed to sync with server. Please try again later.');
    }
  }

  // Function to show a notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.padding = '10px';
  notification.style.backgroundColor = '#333';
  notification.style.color = '#fff';
  notification.style.borderRadius = '5px';
  notification.style.zIndex = '1000';
  document.body.appendChild(notification);

  // Remove the notification after 3 seconds
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}

  // Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
 
 // Create the "Add Quote" form dynamically

 createAddQuoteForm();


// Load quotes and display a random quote when the page loads
  loadQuotes();

  // Sync with the server every 30 seconds
  setInterval(syncWithServer, 30000);

  // Display a random quote when the page loads
  showRandomQuote();

