
// category
fetch("https://openapi.programming-hero.com/api/videos/categories")
.then(res => res.json())
.then(data => displayCategory(data.data))
.catch(error => console.log(error))

function displayCategory(categories){
    const categoryContainer = document.getElementById("category-container");
    categories.forEach(item => {
        const button = document.createElement("button");
        button.classList.add("border");
        button.classList.add("border-0");
        
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

function displaySingle(info_data){
     console.log(info_data)
    // single.forEach(item => {
    //     console.log(item)
    // })
    
    // sorted by views
    // sort_dsc_by_views(single);
    if(info_data.length != 0){
        const singleContainer = document.getElementById("single-container");
     singleContainer.innerHTML = "";
    info_data.forEach(item => {
        const div = document.createElement("div");
        // div.classList.add("col-lg-4");
        // div.classList.add("col-sm-12");
        div.innerHTML=`
        <div class="card" style="width: 18rem; height: 20rem;">
        <img class="img-fluid" style="height:12rem"   src=${item?.thumbnail} class="card-img-top" alt="...">
        <p class="card-text published_date"> <span class="text-dark bg-white p-1">

         ${publish(item?.others.posted_date)}
        </span> </p>
        <div class="card-body row mt-3">

            <div class="col-4">
            <img  src=${item?.authors[0].profile_picture} class="rounded-5 w-100 img-fluid" alt="...">
            </div>
            <div class="col-8">
            <div>
            <h5 class="card-title">${item.title}</h5>
            ${verified(item)}
            </div>
            
            <p class="card-text">${item?.others.views} views</p>
            
    
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

// function sort_dsc_by_views(single){
//     if(Array.isArray(single)){
//         console.log("unsorted singl :",single);
//         single.sort((a,b)=>( parseInt(b.others.views)-parseInt(a.others.views)))
//         console.log("sorted single :",single);
//         if(single.length != 0){
//             const singleContainer = document.getElementById("single-container");
//         singleContainer.innerHTML = "";
//         single.forEach(item => {
//             const div = document.createElement("div");
//             div.classList.add("col-lg-4");
//             div.classList.add("col-sm-12");
//             div.innerHTML=`
//             <div class="card col-lg-4 col-sm-12" style="width: 18rem; height: 32rem;">
//             <img style="height:12rem"   src=${item?.thumbnail} class="card-img-top" alt="...">
//             <p class="card-text published_date"> <span class="text-dark bg-white p-1">
//             ${publish(item?.others.posted_date)}
//             // ${parseInt(parseInt(item?.others.posted_date)/3600)} hrs ${parseInt(parseInt(item?.others.posted_date)/1800)} min ago
//             </span> </p>
//             <div class="card-body d-flex  align-items-center">
    
//                 <div>
//                 <img src=${item?.authors[0].profile_picture} class="rounded-5 w-25" alt="...">
//                 </div>
//                 <div>
//                 <h5 class="card-title">${item.title}</h5>
    
//                 if(${item?.authors[0].verified==""} && ${item?.authors[0].verified==false}){
//                     <p class="card-text">${item?.authors[0].profile_name}</p>
//                 }
//                 else{
//                     <div class="d-flex justify-content-between align-items-center">
//                     <p class="card-text">${item?.authors[0].profile_name}</p>
//                     <i class="fa-solid fa-circle-check fa-beat" style="color: #0557e6;"></i>
//                     </div>
//                 }
                
                    
//                 <p class="card-text">${item?.others.views}views</p>
                
        
//                 </div>
                
               
//             </div>
//             </div>
//             `
//             singleContainer.appendChild(div)
//         });
    
//         }
//         else{
//            const singleContainer = document.getElementById("single-container");
//            singleContainer.innerHTML = `
//            <img class="img-fluid w-25"  src=${"./PHero-Tube/Icon.png"} alt="...">
//            <h1>Oops!! Sorry, There is no content here.</h1>
//            `
//         }
//     }
     

//     else{
//         console.error("it is not an array")
//     }
// }


const sortByViews = () => {
    // console.log(tracker);
    console.log("sort");
    // fetch(`https://openapi.programming-hero.com/api/videos/category/1001`)
    // .then((res) => res.json())
    // .then((data) => {
    //     data.data.sort(function(a, b) {
    //         var viewsA = parseInt(a.others.views);
    //         var viewsB = parseInt(b.others.views);

    //         return viewsB - viewsA; 
    //     });

    //     displaySingle(data.data);
    // });

    
    const singleContainer = document.getElementById("single-container");
    // singleContainer.innerHTML = "";
    const singleContainerArray=Array.from(singleContainer.children);
    console.log("before sorted :",singleContainerArray);
    singleContainerArray.sort((a,b)=>{
        const viewsA = parseViews(a.querySelector('.card-text').innerText) ;
        const viewsB = parseViews(b.querySelector('.card-text').innerText);
        console.log(viewsA, viewsB);
        return viewsB - viewsA;
    
    });
    console.log("after sorted :",singleContainerArray);
    singleContainer.innerHTML = "";
    singleContainerArray.forEach(item => {
        singleContainer.appendChild(item);
    
    });
    console.log("sorting completed");

    
    
};
const parseViews = (viewsString) => {
    const viewsMatch = viewsString.match(/(\d+)/);
    console.log(viewsMatch);
    return viewsMatch ? parseInt(viewsMatch[0]) : 0;
};

// publish time
function publish(seconds) {
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
     if (hours != 0){
            return `${hours} hrs ${minutes} min ago`;
        }
        if(minutes != 0){
            return `${minutes} min ago`;
        }
        return "";
    };

// veirfied
function verified(item){
    if(item.authors[0].verified=="" && item.authors[0].verified==false){
        return `
        <div class="d-flex gap-2">
        <div>
        <p class="card-text ">${item?.authors[0].profile_name}</p></div>
        <div>
        <i class="fa-solid fa-circle-check " style="color: #0557e6;"></i></div>
        </div>
        
        
        
        `
    }
    else{
        return `<p class="card-text">${item?.authors[0].profile_name}</p>
        `
    }
}
// by default
 single(1000);


