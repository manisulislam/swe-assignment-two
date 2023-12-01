function parseViews(viewsString) {
    const viewsMatch = viewsString.match(/(\d+)/);
    return viewsMatch ? parseInt(viewsMatch[0]) : 0;
}
 
function displayCategory(categories) {
    const categoryContainer = document.getElementById("category-container");
    categories.forEach(item => {
        const button = document.createElement("button");
        button.classList.add("border");
        button.classList.add("border-0");
 
        button.innerHTML = `
            <button onclick="single(${item?.category_id})" type="button" class="btn btn-outline-danger">
                ${item?.category}
            </button>
        `;
        categoryContainer.appendChild(button);
    });
}
 
function single(id) {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then(res => res.json())
        .then(data => displaySingle(data.data))
        .catch(error => console.log(error));
}
 
function displaySingle(info_data) {
    if (info_data.length != 0) {
        const singleContainer = document.getElementById("single-container");
        singleContainer.innerHTML = "";
        info_data.forEach(item => {
            const div = document.createElement("div");
            div.innerHTML = `
                <div class="card" style="width: 18rem; height: 20rem;">
                    <img class="img-fluid" style="height:12rem" src=${item?.thumbnail} class="card-img-top" alt="...">
                    <p class="card-text published_date"> 
                        <span class="text-dark bg-white p-1">
                            ${publish(item?.others.posted_date)}
                        </span>
                    </p>
                    <div class="card-body row mt-3">
                        <div class="col-4">
                            <img src=${item?.authors[0].profile_picture} class="rounded-5 w-100 img-fluid" alt="...">
                        </div>
                        <div class="col-8">
                            <div>
                                <h5 class="card-title">${item.title}</h5>
                                ${verified(item)}
                            </div>
                            <p class="card-text views">${item?.others.views} views</p>
                        </div>
                    </div>
                </div>
            `;
            singleContainer.appendChild(div);
        });
    } else {
        const singleContainer = document.getElementById("single-container");
        singleContainer.innerHTML = `
            <img class="img-fluid w-25" src=${"./PHero-Tube/Icon.png"} alt="...">
            <h1>Oops!! Sorry, There is no content here.</h1>
        `;
    }
}
 
const sortByViews = () => {
    const singleContainer = document.getElementById("single-container");
    console.log(singleContainer);
    const singleContainerArray = Array.from(singleContainer.children);
    console.log(singleContainerArray);
    singleContainerArray.sort((a, b) => {
        
        console.log(a.querySelector('.views').innerText);
        
        console.log(b.querySelector('.views').innerText);
        const viewsA = parseViews(a.querySelector('.views').innerText);
        const viewsB = parseViews(b.querySelector('.views').innerText);
        // console.log(viewsA);
        // console.log(viewsB);
        return viewsB - viewsA;
    });
 
    singleContainer.innerHTML = "";
 
    singleContainerArray.forEach(item => {
        singleContainer.appendChild(item);
    });
 
    console.log("Sorting completed");
};
 
function publish(seconds) {
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours != 0) {
        return `${hours} hrs ${minutes} min ago`;
    }
    if (minutes != 0) {
        return `${minutes} min ago`;
    }
    return "";
}
 
function verified(item) {
    return item.authors[0].verified === false ?
        `<div class="d-flex gap-2">
            <div>
                <p class="card-text">${item?.authors[0].profile_name}</p>
            </div>
            <div>
                <i class="fa-solid fa-circle-check" style="color: #0557e6;"></i>
            </div>
        </div>` :
        `<p class="card-text">${item?.authors[0].profile_name}</p>`;
}
 
fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then(res => res.json())
    .then(data => displayCategory(data.data))
    .catch(error => console.log(error));
 
single(1000);