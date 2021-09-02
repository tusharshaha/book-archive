// global variable
const resultArea = document.getElementById('result-area');
// error message
const errorMessage = error =>{
    const div = document.createElement('div');
    div.classList.add('mx-auto', 'w-75')
    if(error === 'empty'){
        div.innerHTML = `<h2  class=" text-center bg-warning text-white">Search Field Can not be Empty</h2`;
        resultArea.appendChild(div);
    }else{
        div.innerHTML = `<h2  class="text-center text-white bg-warning">No Result Found</h2`
        resultArea.appendChild(div);
    }
}
// search and load data
const loadBooks = () => {
    const searchField = document.getElementById('search-field');
    document.getElementById('spinner').classList.remove('d-none');
    if(searchField.value === ''){
        document.getElementById('found-result').innerHTML = '';
        resultArea.textContent = '';
        errorMessage('empty')
        document.getElementById('spinner').classList.add('d-none')
    }else{
    document.getElementById('found-result').innerHTML = '';
    resultArea.textContent = '';
    const url = `https://openlibrary.org/search.json?q=${searchField.value}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayBooks(data))
    searchField.value = '';
    }
}
// display data in website
const displayBooks = data => {
    const result = data.docs
    const foundResult = data.numFound
    if(result.length === 0){
        errorMessage('server')
        document.getElementById('spinner').classList.add('d-none')
    }
    result.forEach(book => {
        const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${imgUrl ? imgUrl:''}" height="300px" class="card-img-top " alt="...">
                <div class="card-body">
                    <small class="fw-bold">Book Name: <span class="text-info">${book.title}</span></small><br>
                    <small>Author Name: <span class="text-info">${book.author_name}</span></small><br>
                    <small>Publisher: <span class="text-info">${book.publisher}</span></small><br>
                    <small>First Publish Year: <span class="text-info">${book.first_publish_year}</span></small>
                </div>
            </div>
        `
        resultArea.appendChild(div)
        document.getElementById('found-result').innerHTML = `
        <h3 class = "text-success">Search Result Found (${foundResult})</h3>
        `
        document.getElementById('spinner').classList.add('d-none')
    });
}