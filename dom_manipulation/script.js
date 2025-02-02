
// Array of quote objects
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do what you can, with what you have, where you are.", category: "Motivation" },
    { text: "The best way to predict the future is to invent it.", category: "Innovation" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<strong>${randomQuote.text}</strong> <em>(${randomQuote.category})</em>`;
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      showRandomQuote(); // Optionally display the newly added quote
    } else {
      alert('Please fill in both the quote and category fields.');
    }
  }
  
  // Event listener for the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Display a random quote when the page loads
  showRandomQuote();


// document.addEventListener("DOMContentLoaded", function () {
//     const quotes = [
//         { text: "The best way to predict the future is to create it.", category: "Motivation" },
//         { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
//         { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" },
//         { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" }
//     ];

//     const quoteDisplay = document.getElementById("quoteDisplay");
//     const newQuoteBtn = document.getElementById("newQuote");
//     const addQuoteBtn = document.getElementById("addQuote");
//     const exportJsonBtn = document.getElementById("exportJson");
//     const importFileInput = document.getElementById("importFile");

//     function saveQuotes() {
//         localStorage.setItem("quotes", JSON.stringify(quotes));
//     }

//     function displayRandomQuote() {
//         if (quotes.length === 0) {
//             quoteDisplay.innerHTML = "No quotes available!";
//             return;
//         }
//         const randomIndex = Math.floor(Math.random() * quotes.length);
//         const randomQuote = quotes[randomIndex];
//         quoteDisplay.innerHTML = `"${randomQuote.text}" <br> <em>- ${randomQuote.category}</em>`;
//     }

//     function addQuote() {
//         const quoteText = document.getElementById("quoteText").value.trim();
//         const quoteCategory = document.getElementById("quoteCategory").value.trim();

//         if (quoteText === "" || quoteCategory === "") {
//             alert("Please enter both quote text and category.");
//             return;
//         }

//         quotes.push({ text: quoteText, category: quoteCategory });
//         quotes.push(newQuote);
//         saveQuotes();

//         document.getElementById("newQuoteText").value = "";
//         document.getElementById("newQuoteCategory").value = "";

//         quoteDisplay.innerHTML = `"${newQuote.text}" <br> <em>- ${newQuote.category}</em>`;
//         alert("Quote added successfully!");
//     }

//     function exportToJson() {
//         const dataStr = JSON.stringify(quotes, null, 2);
//         const blob = new Blob([dataStr], { type: "application/json" });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "quotes.json";
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//     }

//     function importFromJsonFile(event) {
//         const fileReader = new FileReader();
//         fileReader.onload = function (event) {
//             try {
//                 const importedQuotes = JSON.parse(event.target.result);
//                 if (Array.isArray(importedQuotes) && importedQuotes.every(q => q.text && q.category)) {
//                     quotes.push(...importedQuotes);
//                     saveQuotes();
//                     alert("Quotes imported successfully!");
//                 } else {
//                     alert("Invalid JSON format.");
//                 }
//             } catch (error) {
//                 alert("Error reading file. Please upload a valid JSON file.");
//             }
//         };
//         fileReader.readAsText(event.target.files[0]);
//     }


//     newQuoteBtn.addEventListener("click", displayRandomQuote);
//     addQuoteBtn.addEventListener("click", addQuote);
//     exportJsonBtn.addEventListener("click", exportToJson);
//     importFileInput.addEventListener("change", importFromJsonFile);

//    // Load last displayed quote from session storage
//    const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
//    if (lastQuote) {
//        quoteDisplay.innerHTML = `"${lastQuote.text}" <br> <em>- ${lastQuote.category}</em>`;
//    } else {
//        showRandomQuote();
//    }
// });
