const apiKey = 'aee60c4c39494c0c87e17ca748153884'
const blockContainer = document.getElementById("block-container");
async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;

    }
    catch (error) {
        console.error("Error", error);
        return []
    }
}

function displayBlogs(articles) {
    blockContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement('div');
        blogCard.classList.add('block-card');
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2")
        const truncatedTitle = article.title.length > 10 ? article.title.slice(0, 30) + "..." : articles.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        let truncatedDesc = '';
        if (article.description && article.description.length > 30) {
            truncatedDesc = article.description.slice(0, 130) + "...";

        } else {
            truncatedDesc = "No description available"; // Handle case where description is null

        }
        description.textContent = truncatedDesc;
        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
        blockContainer.appendChild(blogCard)
    })
}

(async () => {
    try {
        const articles = await fetchRandomNews()
        displayBlogs(articles)

    }
    catch (error) {
        console.error("Error", error);

    }
})();

async function searchNews(input) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${input}&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        return data.articles;

    }
    catch (error) {
        console.error("Error", error);
        return []
    }

}

document.getElementById("search-btn").addEventListener('click', async function () {

    const input = document.getElementById("search-input").value.toLowerCase();
    if (input !== "") {
        try {
            const articles = await searchNews(input);
            displayBlogs(articles);
            // Do something with the articles
        } catch (error) {
            console.error("Error Fetching news ", error);
        }

    }

})

