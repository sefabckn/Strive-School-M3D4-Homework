const bookWrapper = document.querySelector('#card-Container')
const cartList = document.querySelector('#cartList')
window.onload = () =>{
    loadBooks()
    
    displaySelectedCard()
    removeBook()
    countCard()
}
let loadedBooks = []
let shoppingCartList = [] // working fine i can display selected cards on console screen
let filteredBooks = []

    const loadBooks = ()=>{
        //let cardRow = document.getElementById("card-Container")
        fetch("https://striveschool-api.herokuapp.com/books")
        .then(response => response.json())
        .then((receivedData) => {
            loadedBooks = receivedData
            console.log(loadedBooks)
            displayBooks()
        })
        .catch((error) => console.log(error.message))
    }
    
    const displayBooks = (receivedData = loadedBooks) =>{//working fine
        bookWrapper.innerHTML =''
        receivedData.forEach((book) =>{
            bookWrapper.innerHTML += 
                `
                <div class = "col-12 col-md-4 col-lg-3">
                <div class="card mt-3" id ='main-card'style="width: 18rem;">
                    <img src="${book.img}"  onclick ="window.location.assign('./card.html?bookId='+ ${book.asin})"class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Price: ${book.price} $</p>
                        <button id='add-to-cart' onclick="addToCart('${ String(book.asin) }', this)" class='btn btn-info'>Add to card</button>
                        <button id ='deleteBtn' onclick="removeBook(event)" class='btn btn-info'>Skip</button>
                    </div>
                </div>
            </div>       
                `
       })
       
    }

    const addToCart = (asin) =>{
        const addedbooks = loadedBooks.find((book)=>book.asin == asin)
        if(!shoppingCartList.includes(addedbooks)){//preventing add the same item in the list
            shoppingCartList.push(addedbooks)
            console.log(shoppingCartList)
        }
        if(shoppingCartList.length !=0){
            let styling = document.querySelector('#main-card')
            styling.style.border = '1px solid red' //1 problem is here
        }
    }

    const displaySelectedCard = () =>{ //another problem
        let grabSelector = document.querySelector('#detail-page')
        shoppingCartList.forEach((list) =>{
            grabSelector.innerHTML +=`
                <div class = "col-12 col-md-4 col-lg-3">
                <div class="card mt-3" id ='main-card'style="width: 18rem;">
                    <img src="${list.img}"class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${list.title}</h5>
                        <p class="card-text">Price: ${list.price} $</p>
                        <button class='btn btn-info'>Add to card</button>
                        <button class='btn btn-info'>Skip</button>
                    </div>
                </div>
            </div> 
            `
        })
    }

    const searchBooks = (query) =>{ //working fine
        if (query.length < 3) {
            filteredBooks = loadedBooks
            displayBooks()
            return
        }else{
            filteredBooks = loadedBooks.filter((book) => book.title.toLowerCase().includes(query.toLowerCase()))
            console.log(filteredBooks)
            displayBooks(filteredBooks)
        }
       
    }

    const removeBook = (event) =>{
        let getButton = document.querySelector('#deleteBtn')
        getButton.addEventListener('click', (event)=>{
            let grabCard = document.querySelector('#main-card')
            grabCard.classList.add('d-none')
        })
    }

    const countCard = (loadedBooks) =>{
        return loadedBooks.length
    }
    
    /* const hidePics = (event) => {
        event.path[4].remove()
      } */