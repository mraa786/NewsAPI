const apiKey = "add305acba9b48b299a1c06a62bdfc85"; // Ensure this key is valid and unrestricted

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news:", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query); // Corrected function call
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        return data.articles;
    } catch (error) {
        console.error("Error fetching news by query:", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = ""; // Clear previous content
    if (articles.length === 0) {
        // Display "No articles found" message
        const noArticlesMessage = document.createElement("p");
        noArticlesMessage.textContent = "No articles found.";
        noArticlesMessage.classList.add("no-articles-message");
        blogContainer.appendChild(noArticlesMessage);
        return;
    }

    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-cards");

        const img = document.createElement("img");
        img.src = article.urlToImage || "https://via.placeholder.com/300"; // Placeholder image
        img.alt = article.title;

        const title = document.createElement("h2");
        title.textContent = article.title;

        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        blogContainer.appendChild(blogCard);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const articles = await fetchRandomNews();
        if (articles.length === 0) {
            console.log("No articles fetched.");
        }
        displayBlogs(articles);
    } catch (error) {
        console.error("Error displaying blogs:", error);
    }
});
