const cards1 = document.getElementsByClassName("card mb-4 shadow-sm")
const slider = document.getElementById("userSlider")

slider.addEventListener('input', highlightContainer)
console.log('slider');
let cards = Array.from(cards1)
console.log(cards);


function highlightContainer() {
    const sliderValue = parseInt(slider.value)
    cards.forEach((card, index) => {
        console.log(card.classList);

        const cardMin = index * 10;
        const cardMax = (index + 1) * 10;
        if(index==0 && sliderValue==0){
            card.classList.add('highlight')
        }
        else if (sliderValue > cardMin && sliderValue <=cardMax ) {
            card.classList.add('highlight')
        } else {
            card.classList.remove('highlight')
        }
        
    })
}

// lazy loading
const postContainer = document.getElementById('post-container');
        let page = 1;

        function fetchPosts() {
            fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=2`)
                .then(response => response.json())
                .then(posts => {
                    if (posts.length === 0) {
                        // No more posts to load
                        return;
                    }
                    posts.forEach(post => {
                        const postElement = document.createElement('div');
                        postElement.classList.add('post');
                        postElement.innerHTML = `
                            <h5>${post.title}</h5>
                            <p>${post.body}</p>
                        `;
                        postContainer.appendChild(postElement);
                    });

                    // Increment the page number for the next request
                    page++;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }

        // Function to check if the user has scrolled to the bottom
        function isScrolledToBottom() {
            return window.innerHeight + window.scrollY >= document.body.offsetHeight;
        }
  // Function to load more posts when the user reaches the end of the page
  function loadMorePosts() {
    if (isScrolledToBottom()) {
        fetchPosts();
    }
}

// Attach the loadMorePosts function to the scroll event
window.addEventListener('scroll', loadMorePosts);

// Initial load of posts
fetchPosts();