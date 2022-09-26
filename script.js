const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// to show laoding 

function loading() {

    loader.hidden = false;
    quoteContainer.hidden = true;

}

// hide loading

function complete() {

    quoteContainer.hidden = false;
    loader.hidden = true;
}


// show new quote

function newQuote() {
    loading();
    // pick random quote from apiquotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // check if author is blank and replace it with 'Unknoiw
    if (!quote.author) {
        authorText.textContent = 'Uknown';

    } else { authorText.textContent = quote.author; }

    // check quote lenght to dertmine styling

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote, hife loder
    quoteText.textContent = quote.text;
    complete();
}


// Get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // catch error here

    }
}


// tweet a quote

function tweetQuote() {

    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - 
    ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}


// event listers

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);




// on load
getQuotes();