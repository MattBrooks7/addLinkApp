const body = document.body;
const input = document.querySelector('input[type=text]');
const overlay = document.querySelector('.overlay');

function showFloater() {
    body.classList.add('show-floater');
}

function closeFloater() {
    if (body.classList.contains('show-floater')) {
        body.classList.remove('show-floater');
    }
}


input.addEventListener('focusin', showFloater);
input.addEventListener('focusout', closeFloater);
overlay.addEventListener('click', closeFloater);

//===================================================



const bookmarksList = document.querySelector('.bookmarks-list');
const bookmarkForm = document.querySelector('.bookmark-form');
const bookmarkInput = bookmarkForm.querySelector('input[type=text]');
const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

fillBookmarksList(bookmarks);

function createBookmark(e) {
    e.preventDefault();

    // add a new bookmark to the bookmarks
   const title = bookmarkInput.value;
   const bookmark = {
    title: title
   };
   bookmarks.push(bookmark);
   fillBookmarksList(bookmarks)
   storeBookmarks(bookmarks);
   bookmarkForm.reset();

   console.table(bookmarks)


    //save that bookmarks list to localStorage
    // const title = bookmarkInput.value;
    // const bookmark = document.createElement('a');
    // bookmark.className = 'bookmark';
    // bookmark.innerText = title;
    // bookmark.href = '#';
    // bookmark.target = '_blank';
    // bookmarksList.appendChild(bookmark)



}

function fillBookmarksList(bookmarks = []) {
    const bookmarksHtml = bookmarks.map((bookmark, i) => {
        return `        
        <a href="#" class="bookmark" data-id="${i}">
        <div class="img"></div>
        <div class="title">${bookmark.title}</div>
        <span class="glyphicon.glyphicon-remove"></span>
        </a>
        `;
    }).join('');

    bookmarksList.innerHTML = bookmarksHtml;

    // let bookmarksHtml = 'bookmarks.'
    // for (let i = 0; i < bookmarks.length; i++) {
    //     bookmarksHtml +=
    //     `<a href="#" class="bookmark">
    //     ${bookmarks[i].title}
    //     </a>`
    // }
    // console.log(bookmarksHtml);
}

function removeBookmark(e) {
    console.log(e);

    if (!e.target.matches('.glyphicon-remove')) return;
    // find the index
    // remove from the bookmarks using splice
    // fill the list
    //store back to localStorage

    const index = e.target.parentNode.dataset.id;
    bookmarks.splice(index, 1);
    fillBookmarksList(bookmarks);
    storeBookmarks(bookmarks);

}

function storeBookmarks(bookmarks = []) {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}



bookmarkForm.addEventListener('submit', createBookmark);
bookmarksList.addEventListener('click', removeBookmark)