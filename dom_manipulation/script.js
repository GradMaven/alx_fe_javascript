
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt", category: "Inspirational" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt", category: "Motivational" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "Life" },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay", category: "Inspirational" }
];

// DOM Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const addQuoteButton = document.getElementById("addQuote");
const quoteTextInput = document.getElementById("quoteText");
const quoteAuthorInput = document.getElementById("quoteAuthor");
const quoteCategoryInput = document.getElementById("quoteCategory");

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available. Add a new quote!";
        return;
    }

    // Get a random quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Display the quote
    quoteDisplay.innerHTML = `
        <p>"${randomQuote.text}"</p>
        <p><em>- ${randomQuote.author}</em></p>
        <p><strong>Category: ${randomQuote.category}</strong></p>
    `;
}

// Function to add a new quote
function addNewQuote() {
    const text = quoteTextInput.value.trim();
    const author = quoteAuthorInput.value.trim();
    const category = quoteCategoryInput.value;

    // Validate input
    if (!text || !author) {
        alert("Please fill out both the quote text and author fields.");
        return;
    }

    // Create a new quote object
    const newQuote = { text, author, category };

    // Add the new quote to the array
    quotes.push(newQuote);

     // Clear input fields
     quoteTextInput.value = "";
     quoteAuthorInput.value = "";
 
     // Show a confirmation message
     alert("Quote added successfully!");
 
     // Display the new quote
     showRandomQuote();
 }
 
 // Event Listeners
 newQuoteButton.addEventListener("click", showRandomQuote);
 addQuoteButton.addEventListener("click", addNewQuote);
 
 // Display a random quote when the page loads
window.onload = showRandomQuote;


