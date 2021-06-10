var current = 1; // current active image
var pageData = [] // data will be filled here after being fetched from the Untitled file

// function to change the active image given id
function setActive(id){
    document.querySelectorAll('.item').forEach(item => {
        item.classList.remove('active');
    })
    const itemid = "#item" + id;
    document.querySelector(itemid).classList.add('active');
    current = id;
    document.querySelector("#caption").innerHTML = pageData[current-1].title;;
    const display = document.querySelector("#display");
    display.src = pageData[current-1].previewImage;
    display.alt = pageData[current-1].title;
}

// function that creates elements and renders the page after data is fetched from Untitled file
function renderpage(data){
    pageData = data;
    const itemlist = document.querySelector('.nav');
    itemid = 1
    data.forEach(element => {
        let item = document.createElement('div');
        item.classList.add("item");
        item.id = "item" + String(itemid);

        let thumbnail = document.createElement('img');
        thumbnail.classList.add("thumbnail");
        thumbnail.src = element.previewImage;

        let title = document.createElement('p');
        title.innerHTML = element.title;

        item.appendChild(thumbnail);
        item.appendChild(title);

        item.addEventListener('click', e=>{
            let target = e.target;
            if(e.target.tagName != "DIV") target = e.target.parentElement;
            setActive(target.id.slice(4))
        })
        itemlist.appendChild(item);
        itemid+=1;
    });
    setActive(current);
    window.addEventListener("keyup", e => {
        let n = data.length;
        if(e.key === "ArrowUp"){
            current = (current - 2 + n)%5 + 1;
        } else if (e.key === "ArrowDown")  {
            current = current%n + 1;
        }
        setActive(current);
    })
}

// fetch data from given json file (name = 'Untitled')
fetch('Untitled')
.then(Response => Response.json())
.then(data => renderpage(data))
.catch(error => console.log("ERROR WHILE FETCHING DATA : ", error))
