// Books Data - Sample inventory
const booksData = [
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        category: "fiction",
        price: 16.99,
        description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
        cover: "📚",
        featured: true,
        rating: 4.8
    },
    {
        id: 2,
        title: "Educated",
        author: "Tara Westover",
        category: "nonfiction",
        price: 18.99,
        description: "A memoir about a young woman who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
        cover: "📖",
        featured: true,
        rating: 4.9
    },
    {
        id: 3,
        title: "Project Hail Mary",
        author: "Andy Weir",
        category: "scifi",
        price: 15.99,
        description: "A lone astronaut must save the earth from disaster in this incredible new science-based thriller from the author of The Martian.",
        cover: "🚀",
        featured: true,
        rating: 4.7
    },
    {
        id: 4,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        category: "mystery",
        price: 14.99,
        description: "Alicia Berenson's life is seemingly perfect. Then one evening, she shoots her husband and never speaks another word.",
        cover: "🕵️",
        featured: false,
        rating: 4.5
    },
    {
        id: 5,
        title: "Atomic Habits",
        author: "James Clear",
        category: "nonfiction",
        price: 17.99,
        description: "An easy and proven way to build good habits and break bad ones with tiny changes that deliver remarkable results.",
        cover: "⚡",
        featured: false,
        rating: 4.8
    },
    {
        id: 6,
        title: "The House in the Cerulean Sea",
        author: "TJ Klune",
        category: "scifi",
        price: 16.99,
        description: "A magical island. An orphanage. Six dangerous children. A journey that will change one caseworker's life forever.",
        cover: "🏰",
        featured: false,
        rating: 4.6
    },
    {
        id: 7,
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        category: "fiction",
        price: 18.99,
        description: "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove. She's a beautiful, mysterious outcast who raised herself in the marshes.",
        cover: "🦋",
        featured: false,
        rating: 4.7
    },
    {
        id: 8,
        title: "The Thursday Murder Club",
        author: "Richard Osman",
        category: "mystery",
        price: 15.99,
        description: "Four unlikely friends meet weekly to investigate unsolved murders in a peaceful retirement village.",
        cover: "🔍",
        featured: false,
        rating: 4.6
    },
    {
        id: 9,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        category: "nonfiction",
        price: 19.99,
        description: "A brief history of humankind, exploring how Homo sapiens came to dominate the world.",
        cover: "🌍",
        featured: false,
        rating: 4.8
    },
    {
        id: 10,
        title: "The Invisible Life of Addie LaRue",
        author: "V.E. Schwab",
        category: "fiction",
        price: 17.99,
        description: "A woman makes a Faustian bargain to live forever but is cursed to be forgotten by everyone she meets.",
        cover: "⏳",
        featured: false,
        rating: 4.5
    },
    {
        id: 11,
        title: "Dune",
        author: "Frank Herbert",
        category: "scifi",
        price: 20.99,
        description: "Set on the desert planet Arrakis, Dune is the story of Paul Atreides and his journey toward a destiny greater than he could ever have imagined.",
        cover: "🏜️",
        featured: false,
        rating: 4.9
    },
    {
        id: 12,
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        category: "fiction",
        price: 16.99,
        description: "Aging Hollywood icon Evelyn Hugo finally tells the truth about her glamorous and scandalous life.",
        cover: "🌟",
        featured: false,
        rating: 4.7
    },
    {
        id: 13,
        title: "The Maid",
        author: "Nita Prose",
        category: "mystery",
        price: 15.99,
        description: "A charmingly eccentric hotel maid discovers a guest murdered in his bed, turning her world upside down.",
        cover: "🏨",
        featured: false,
        rating: 4.4
    },
    {
        id: 14,
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        category: "nonfiction",
        price: 18.99,
        description: "A groundbreaking exploration of the two systems that drive the way we think and make choices.",
        cover: "🧠",
        featured: false,
        rating: 4.6
    },
    {
        id: 15,
        title: "The Starless Sea",
        author: "Erin Morgenstern",
        category: "fiction",
        price: 17.99,
        description: "A love letter to stories and storytelling itself, painted upon a mythic canvas.",
        cover: "🌊",
        featured: false,
        rating: 4.3
    },
    {
        id: 16,
        title: "Circe",
        author: "Madeline Miller",
        category: "fiction",
        price: 16.99,
        description: "In the house of Helios, god of the sun, a daughter is born. But Circe is a strange child—not powerful, like her father, nor viciously alluring like her mother.",
        cover: "🏺",
        featured: false,
        rating: 4.8
    },
    {
        id: 17,
        title: "The Body Keeps the Score",
        author: "Bessel van der Kolk",
        category: "nonfiction",
        price: 19.99,
        description: "A pioneering researcher transforms our understanding of trauma and offers a bold new paradigm for healing.",
        cover: "💚",
        featured: false,
        rating: 4.7
    },
    {
        id: 18,
        title: "Ready Player One",
        author: "Ernest Cline",
        category: "scifi",
        price: 16.99,
        description: "In the year 2045, reality is an ugly place. The only time Wade Watts really feels alive is when he's jacked into the OASIS.",
        cover: "🎮",
        featured: false,
        rating: 4.5
    }
];

// Function to get all books
function getAllBooks() {
    return booksData;
}

// Function to get featured books
function getFeaturedBooks() {
    return booksData.filter(book => book.featured);
}

// Function to get book by ID
function getBookById(id) {
    return booksData.find(book => book.id === parseInt(id));
}

// Function to filter books by category
function filterBooksByCategory(category) {
    if (category === 'all') return booksData;
    return booksData.filter(book => book.category === category);
}

// Function to filter books by price range
function filterBooksByPrice(books, priceRange) {
    if (priceRange === 'all') return books;
    
    const [min, max] = priceRange.split('-').map(Number);
    
    if (max) {
        return books.filter(book => book.price >= min && book.price <= max);
    } else {
        return books.filter(book => book.price >= min);
    }
}

// Function to search books
function searchBooks(query) {
    const lowerQuery = query.toLowerCase();
    return booksData.filter(book => 
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.description.toLowerCase().includes(lowerQuery)
    );
}

// Function to sort books
function sortBooks(books, sortBy) {
    const sorted = [...books];
    
    switch(sortBy) {
        case 'title':
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        default:
            return sorted;
    }
}
