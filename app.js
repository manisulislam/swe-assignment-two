
// category
fetch("https://openapi.programming-hero.com/api/videos/categories")
.then(res => res.json())
.then(data => displayCategory(data.data))
.catch(error => console.log(error))

function displayCategory(categories){
    const categoryContainer = document.getElementById("category-container");
    categories.forEach(item => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-outline-success");
        button.innerHTML=`
        <button onclick="single(${item?.category_id})" type="button" class="btn btn-outline-danger">
            ${item?.category}
            </button>
        `
        categoryContainer.appendChild(button)
    });

}

function single(id){
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then(res => res.json())
    .then(data => displaySingle(data.data))
    // .then(data => console.log(data.data))
    
    .catch(error => console.log(error))
}

function displaySingle(single){
     console.log(single)
    // single.forEach(item => {
    //     console.log(item)
    // })
    
    // sorted by views
    sort_dsc_by_views(single);
    if(single.length != 0){
        const singleContainer = document.getElementById("single-container");
    singleContainer.innerHTML = "";
    single.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("col-lg-4");
        div.classList.add("col-sm-12");
        div.innerHTML=`
        <div class="card col-lg-4 col-sm-12" style="width: 18rem; height: 35rem;">
        <img style="height:12rem"   src=${item?.thumbnail} class="card-img-top" alt="...">
        <p class="card-text published_date"> <span class="text-dark bg-white p-1">
        ${parseInt(parseInt(item?.others.posted_date)/3600)} hrs ${parseInt(parseInt(item?.others.posted_date)/1800)} min ago
        </span> </p>
        <div class="card-body d-flex  align-items-center">

            <div>
            <img src=${item?.authors[0].profile_picture} class="rounded-5 w-25" alt="...">
            </div>
            <div>
            <h5 class="card-title">${item.title}</h5>
            ${(item?.authors[0].verified=="") && (item?.authors[0].verified=="")}?
            
            
            <div class="d-flex justify-content-between align-items-center">
            <p class="card-text">${item?.authors[0].profile_name}</p>
            <i class="fa-solid fa-circle-check fa-beat" style="color: #0557e6;"></i>
            </div>
            :
            <p class="card-text">${item?.authors[0].profile_name}</p>
                
            <p class="card-text">${item?.others.views}views</p>
            
    
            </div>
            
           
        </div>
        </div>
        `
        singleContainer.appendChild(div)
    });

    }
    else{
       const singleContainer = document.getElementById("single-container");
       singleContainer.innerHTML = `
       <img class="img-fluid w-25"  src=${"./PHero-Tube/Icon.png"} alt="...">
       <h1>Oops!! Sorry, There is no content here.</h1>
       `
    }
    
}

function sort_dsc_by_views(single){
    if(Array.isArray(single)){
        console.log("unsorted singl :",single);
        single.sort((a,b)=>( parseInt(b.others.views)-parseInt(a.others.views)))
        console.log("sorted single :",single);
        if(single.length != 0){
            const singleContainer = document.getElementById("single-container");
        singleContainer.innerHTML = "";
        single.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("col-lg-4");
            div.classList.add("col-sm-12");
            div.innerHTML=`
            <div class="card col-lg-4 col-sm-12" style="width: 18rem; height: 32rem;">
            <img style="height:12rem"   src=${item?.thumbnail} class="card-img-top" alt="...">
            <p class="card-text published_date"> <span class="text-dark bg-white p-1">
            ${parseInt(parseInt(item?.others.posted_date)/3600)} hrs ${parseInt(parseInt(item?.others.posted_date)/1800)} min ago
            </span> </p>
            <div class="card-body d-flex  align-items-center">
    
                <div>
                <img src=${item?.authors[0].profile_picture} class="rounded-5 w-25" alt="...">
                </div>
                <div>
                <h5 class="card-title">${item.title}</h5>
    
                if(${item?.authors[0].verified==""} && ${item?.authors[0].verified==false}){
                    <p class="card-text">${item?.authors[0].profile_name}</p>
                }
                else{
                    <div class="d-flex justify-content-between align-items-center">
                    <p class="card-text">${item?.authors[0].profile_name}</p>
                    <i class="fa-solid fa-circle-check fa-beat" style="color: #0557e6;"></i>
                    </div>
                }
                
                    
                <p class="card-text">${item?.others.views}views</p>
                
        
                </div>
                
               
            </div>
            </div>
            `
            singleContainer.appendChild(div)
        });
    
        }
        else{
           const singleContainer = document.getElementById("single-container");
           singleContainer.innerHTML = `
           <img class="img-fluid w-25"  src=${"./PHero-Tube/Icon.png"} alt="...">
           <h1>Oops!! Sorry, There is no content here.</h1>
           `
        }
    }
     

    else{
        console.error("it is not an array")
    }
}
// by default
single(1000);


