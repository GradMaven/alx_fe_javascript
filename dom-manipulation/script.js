
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

  // Event listener for the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);

 
  // Create the "Add Quote" form dynamically
 
  createAddQuoteForm();

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

  // Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);



// Load quotes and display a random quote when the page loads
  loadQuotes();

  // Display a random quote when the page loads
  showRandomQuote();
