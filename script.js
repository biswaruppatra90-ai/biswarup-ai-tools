const tools = [
{
    name: "ChatGPT",
    category: "Chat",
    description: "AI assistant for writing, coding, learning and productivity.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    link: "https://chatgpt.com"
},
{
    name: "Gemini",
    category: "Chat",
    description: "Google AI assistant for research and creativity.",
    image: "https://images.unsplash.com/photo-1676299081847-824916de030a",
    link: "https://gemini.google.com"
},
{
    name: "Claude",
    category: "Chat",
    description: "Advanced conversational AI from Anthropic.",
    image: "https://images.unsplash.com/photo-1675557009875-436f2a7a42f4",
    link: "https://claude.ai"
},
{
    name: "Midjourney",
    category: "Image",
    description: "Create amazing AI-generated artwork.",
    image: "https://images.unsplash.com/photo-1682687982501-1e58ab814714",
    link: "https://www.midjourney.com"
},
{
    name: "Leonardo AI",
    category: "Image",
    description: "Generate game assets and creative visuals.",
    image: "https://images.unsplash.com/photo-1686191128892-3dbcf2e80e57",
    link: "https://leonardo.ai"
},
{
    name: "Runway",
    category: "Video",
    description: "AI-powered video editing and generation.",
    image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb",
    link: "https://runwayml.com"
},
{
    name: "Pika",
    category: "Video",
    description: "Generate videos from text prompts.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    link: "https://pika.art"
},
{
    name: "GitHub Copilot",
    category: "Coding",
    description: "AI coding assistant for developers.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    link: "https://github.com/features/copilot"
},
{
    name: "Canva AI",
    category: "Design",
    description: "Design graphics with AI assistance.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    link: "https://www.canva.com"
},
{
    name: "Notion AI",
    category: "Productivity",
    description: "AI-powered note taking and organization.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    link: "https://www.notion.so"
}
];

const toolsContainer = document.getElementById("toolsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const darkModeBtn = document.getElementById("darkModeBtn");
const toolCount = document.getElementById("toolCount");
const favoriteCount = document.getElementById("favoriteCount");

let favorites =
JSON.parse(localStorage.getItem("favorites")) || [];

function displayTools(toolArray){

    toolsContainer.innerHTML = "";

    toolArray.forEach(tool => {

        const isFavorite =
        favorites.includes(tool.name);

        const card = document.createElement("div");

        card.classList.add("tool-card");

        card.innerHTML = `
        <img src="${tool.image}" alt="${tool.name}">

        <div class="tool-content">

            <span class="category">
                ${tool.category}
            </span>

            <h3>${tool.name}</h3>

            <p>${tool.description}</p>

            <div class="tool-buttons">

                <a
                    href="${tool.link}"
                    target="_blank"
                    class="visit-btn"
                >
                    Visit
                </a>

                <button
                    class="favorite-btn"
                    onclick="toggleFavorite('${tool.name}')"
                >
                    ${isFavorite ? "❤️" : "🤍"}
                </button>

            </div>

        </div>
        `;

        toolsContainer.appendChild(card);

    });

    toolCount.textContent = toolArray.length;

    updateFavoriteCount();
}

function filterTools(){

    const searchValue =
    searchInput.value.toLowerCase();

    const categoryValue =
    categoryFilter.value;

    const filteredTools =
    tools.filter(tool => {

        const matchesSearch =
        tool.name.toLowerCase()
        .includes(searchValue);

        const matchesCategory =
        categoryValue === "all" ||
        tool.category === categoryValue;

        return matchesSearch &&
        matchesCategory;

    });

    displayTools(filteredTools);
}

function toggleFavorite(toolName){

    if(favorites.includes(toolName)){

        favorites =
        favorites.filter(
            item => item !== toolName
        );

    }else{

        favorites.push(toolName);

    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    filterTools();
}

function updateFavoriteCount(){

    favoriteCount.textContent =
    favorites.length;
}

searchInput.addEventListener(
    "input",
    filterTools
);

categoryFilter.addEventListener(
    "change",
    filterTools
);

darkModeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );

        localStorage.setItem(
            "theme",
            document.body.classList.contains(
                "dark"
            )
            ? "dark"
            : "light"
        );

    }
);

const savedTheme =
localStorage.getItem("theme");

if(savedTheme === "dark"){

    document.body.classList.add("dark");

}

displayTools(tools);
