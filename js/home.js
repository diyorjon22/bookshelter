let token = localStorage.getItem("token");

if(!token) {
    window.location.replace("./index.html")
}


let form = document.querySelector('.section-form');
let searchs = document.querySelector('.section-form__inp');
let logout = document.querySelector('.section-form__btn');
let bookL = document.querySelector('.section-item');
let bookBtn = document.querySelector('.section-btn__one');
let closeModal = document.querySelector(".modal-content");
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.querySelector(".close");
let rankBtn = document.querySelector(".rank-btn");
let elRankBox = document.querySelector(".ranking");
let elBookBtn = document.querySelector(".book");
let elBookmark = document.querySelector(".booked-books");
let elBookmarkBtn = document.querySelector(".bookmark-btn");
let readBtn = document.querySelector('.section-btn__three')

logout.addEventListener('click', function() {
    window.localStorage.removeItem("token");
    window.location.replace('./index.html')
})


span.onclick = function () {
    modal.style.display = "block";
};


let renderBooks = (arr,elem) => {
    let res = ''
    arr.map(book => {
        console.log(book.volumeInfo.imageLinks.thumbnail);
        res += `
    <li section-list>
        <div class="section-books">
            <img class="section-books__img" src="${book.volumeInfo.imageLinks.thumbnail}" alt="">
            <div class="section-title">
            <p class="section-title__one">${book.volumeInfo.title}</p>
            <p>${book.volumeInfo.authors}</p>
            <p>${book.volumeInfo.publishedDate}</p>
            </div>
            <div class="section-btn">
                <button class="section-btn__one" >Bookmark</button>
                <button class="section-btn__two">More Info</button>
            </div>
            <a class="section-btn__three" href="http://books.google.co.uz/books?id=eXd_eNdm_j8C&pg=PA254&dq=search+terms.thumbnail&hl=&cd=1&source=gbs_api" class="section-btn__three">Read</a>
        </div>
        </li>
        `
    })
    elem.innerHTML = res
}




bookL.addEventListener("click", function (evt) {
    if (evt.target.matches(".section-btn__two")) {
        modal.style.display = "block";
    }
});

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

rankBtn.addEventListener("click", () => {
    newest = "&orderBy=newest";
    elList.innerHTML = null;
    getBooks();
});

let URL = 'https://www.googleapis.com/books/v1/volumes?q=search+terms'
let data = []
let search = 'search&terms'
let order = ''

let getBooks = async() => {
    let res = await fetch(URL);
    data = await res.json()
    console.log(data);
    renderBooks(data.items,bookL);
}
getBooks()