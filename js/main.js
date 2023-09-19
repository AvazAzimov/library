var elList = document.querySelector(".list");
var elForm = document.querySelector(".js-form");
var elInput = document.querySelector(".js-input");
var elSelect = document.querySelector(".js-select");

function bookFunc(info) { 
    elList.innerHTML = null;
    var fragment = document.createDocumentFragment()
    for (const book of info) {
        elItem = document.createElement("li");
        elItem.classList.add("books__item");
        elImg = document.createElement("img");
        elImg.classList.add("books__img");
        elTitle = document.createElement("h3");
        elTitle.classList.add("books__title");
        elWriter = document.createElement("p");
        elWriter.classList.add("books__writer");
        elBox = document.createElement("div");
        elBox.classList.add("books__date");
        elYear = document.createElement("time");
        elYear.classList.add("books__time");
        elBookSheet = document.createElement("span");
        elBookSheet.classList.add("books__sheet");
        elLanguage = document.createElement("span");
        elLanguage.classList.add("books__state");
        elInfo = document.createElement("a");
        elInfo.classList.add("books__info");
        
        elImg.src = book.imageLink;
        elImg.alt = book.title;
        elTitle.textContent = book.title;
        elWriter.textContent = book.author;
        elYear.textContent = book.year;
        elBookSheet.textContent = book.pages;
        elLanguage.textContent = book.language;
        elInfo.textContent = "Wikipediya";
        console.log(book);
        elBox.append(elYear,elBookSheet,)
        elItem.append(elImg,elTitle,elWriter,elBox,elLanguage,elInfo)
        fragment.append(elItem)
    }
    elList.appendChild(fragment);
}

function selectArr() {
    var optionArr = []
    books.forEach(itemes => {
        itemes.language.split("|").forEach(function (cate){
            if(!optionArr.includes(cate)){
                optionArr.push(cate)
            }
        })
    })
    
    
    optionArr.forEach(lang => {
        var elOption = document.createElement("option");
        elOption.textContent = lang;
        elOption.value = lang
        elSelect.appendChild(elOption);
    })
}

selectArr()

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault(); 
    
    var inputValue = elInput.value;
    var selectVal = elSelect.value;
    var newRegex = new RegExp(inputValue , "gi")
    
    var resultArr = books.filter(item => {
        return item.title.match(newRegex) && (item.language.includes(selectVal) ||  selectVal == "all");
    });
    console.log(selectVal);
    

    if(resultArr.length > 0) {
        return bookFunc(resultArr)
    }else {
        elList.textContent = "Not found 404"
        elList.style.color = "#fff";
    }    
    
    
});

bookFunc(books);