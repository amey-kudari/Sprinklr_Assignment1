var current = 1; // current active image
var pageData = []; // data will be filled here after being fetched from the Untitled file

// function to change the active image given id
function setActive(id){
    document.querySelectorAll(".item").forEach(item => {
        item.classList.remove("active");
    })
    const itemid = "#item" + id;
    document.querySelector(itemid).classList.add("active");
    current = id;
    document.querySelector("#caption").innerHTML = pageData[current-1].title;
    const display = document.querySelector("#display");
    display.src = pageData[current-1].previewImage;
    display.alt = pageData[current-1].title;
}

// function that creates elements and renders the page after data is fetched from Untitled file
function renderpage(data){
    pageData = data;
    const itemlist = document.querySelector(".nav");
    // assign a unique id to each list option
    data.forEach((element, itemid) => {
        let item = document.createElement("div");
        item.classList.add("item");
        item.setAttribute("data-filetype", "txt");
        item.id = "item" + String(itemid+1);

        let thumbnail = document.createElement("img");
        thumbnail.classList.add("thumbnail");
        thumbnail.src = element.previewImage;

        // split text into prefix and suffix so that 
        // when truncated, the suffix will be visible
        let title = document.createElement("p");
        let title1 = document.createElement("div");
        title1.innerHTML = element.title.slice(0,-5);
        title1.classList.add("prefix");
        let title2 = document.createElement("div");
        title2.innerHTML = element.title.slice(-5,);
        title.appendChild(title1);
        title.appendChild(title2);

        item.appendChild(thumbnail);
        item.appendChild(title);

        item.addEventListener('click', e=>{
            let target = e.target;
            // get the parent div with image id
            while(!target.classList.contains("item")){
                target = target.parentElement;
            }
            setActive(target.id.slice(4));
        })
        itemlist.appendChild(item);
    });
    setActive(current);
    window.addEventListener("keyup", e => {
        let n = data.length;
        if(e.key === "ArrowUp"){
            current = (current - 2 + n)%5 + 1; // code to decrease current id by 1, and rotate if needed
        } else if (e.key === "ArrowDown")  {
            current = current%n + 1; // code to increase current id by 1, and rotate if needed
        }
        setActive(current);
    })
}

// fetch data from given json file (name = 'Untitled')
fetch('Untitled')
.then(Response => Response.json())
.then(data => renderpage(data))
.catch(error => { // If an error occurs, switch to default data given
    console.log("ERROR WHILE FETCHING DATA : ", error);
    data = [
        {
            previewImage: "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            title: "cat.jpeg"
        },
        {
            previewImage: "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            title: "cooking couple shoot portofilio(1).jpg"
        },
        {
            previewImage: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            title: "bali-kelingking-beach-plastic-removal-drive.key"
        },
        {
            previewImage: "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            title: "NextByk Investor Pitch 2021.ppt"
        },
        {
            previewImage: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            title: "interns-performance-report-june-2021.key"
        }
    ]
    renderpage(data);
})