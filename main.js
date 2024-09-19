const demo_div = document.getElementById('Demo');
const input = document.getElementById('User');
const btn = document.getElementById('btn');

class Wishlist {
    constructor() {
        this.items = [];
    }

    addItem(movie) {
        if (!this.items.find(item => item.id === movie.id)) {
            this.items.push(movie);
            console.log(`${movie.title} has been added to your wishlist.`);
            alert(`${movie.title} has been added to your wishlist.`);
        } else {
            console.log(`${movie.title} is already in your wishlist.`);
            alert(`${movie.title} is already in your wishlist.`);
        }
    }

    viewWishlist() {
        if (this.items.length === 0) {
            console.log("Your wishlist is empty.");
            alert("Your wishlist is empty.");
        } else {
            console.log("Your Wishlist:");
            this.items.forEach(item => {
                console.log(`${item.title}`);
            });
            alert("Your Wishlist:\n" + this.items.map(item => item.title).join("\n"));
        }
    }
}

const wishlist = new Wishlist();

const popularMovies = async () => {
    let api = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=105b3449e54997efc78dbad890bf50dc`);
    let data = await api.json();

    demo_div.innerHTML = data.results.map((item) => 
        `<div class="posters">
            <img src="https://image.tmdb.org/t/p/w1280${item.poster_path}">
            <h3>${item.title}</h3>
            <div class="details"> 
                <p><b> Views : ${item.vote_average}K</b></p>
                <p><b> Date : ${item.release_date}</b></p>
                <button class="add-to-wishlist" data-id="${item.id}" data-title="${item.title}">Add to wishlist</button>
            </div>
        </div>`
    ).join('');

    // Attach event listeners to wishlist buttons
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', () => {
            const movie = {
                id: button.getAttribute('data-id'),
                title: button.getAttribute('data-title'),
            };
            wishlist.addItem(movie);
        });
    });
};

popularMovies();

const SearchMovies = async () => {
    demo_div.innerHTML = "";
    let searchApi = await fetch(`https://api.themoviedb.org/3/search/movie?&api_key=105b3449e54997efc78dbad890bf50dc&query=${input.value}`);
    let data = await searchApi.json();

    demo_div.innerHTML = data.results.map((item) => 
        `<div class="main">
            <img src="https://image.tmdb.org/t/p/w1280${item.poster_path}">
            <h3>${item.title}</h3>
            <div class="details"> 
                <p><b> Views : ${item.vote_average}K</b></p>
                <p><b> Date : ${item.release_date}</b></p>
                <button class="add-to-wishlist" data-id="${item.id}" data-title="${item.title}">Add to wishlist</button>
            </div>
        </div>`
    ).join('');

    // Attach event listeners to wishlist buttons
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', () => {
            const movie = {
                id: button.getAttribute('data-id'),
                title: button.getAttribute('data-title'),
            };
            wishlist.addItem(movie);
        });
    });
};

// Optional: Add a button to view the wishlist
const viewWishlistButton = document.createElement('button');
viewWishlistButton.textContent = "View Wishlist";
viewWishlistButton.addEventListener('click', () => {
    wishlist.viewWishlist();
});
document.body.appendChild(viewWishlistButton);
