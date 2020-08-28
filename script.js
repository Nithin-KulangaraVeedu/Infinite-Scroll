const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded =0;
let totalImages =0;
//Unsplash API

const count=20;
const apiKey ='8lJhj2btD8t-n602KsvrxNIzSeE-tpnrSHg_NOaYk_A';
//T7lgc4kuYYVdFKzRS7sh1ZQgJc8xuRK7JuV0mduF1dE

const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
//check if images are loaded

function imageLoaded(){
    console.log('image loaded');
    imagesLoaded ++;
    if(imagesLoaded === totalImages){
        ready =true;
        loader.hidden=true;
        console.log('ready=',ready);
    }
}

//Helper function to Set Attributes on DOM Elements
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }

}

//Create Elements foe links,photos, add to DOM

function displayPhotos(){
    totalImages = photosArray.length;
    console.log('totalimages',totalImages);
    //Run function for each object in photosArray
    photosArray.forEach((photo)=>{
        //Create <a></a> to link unsplash
         const item= document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        })
        //Create <img> for Photo
        const img= document.createElement('img');
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        })
        img.addEventListener('load',imageLoaded);
        //Put <img> inside <a>,Put both inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);


    });
}
async function getPhotos(){

    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        //console.log(photosArray);
        displayPhotos();
    }
    catch(error){
        console.log(error,'error');
    }
}

//check to see if scrolling near bottom of page,Load more photos

window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight -1000 && ready){
        ready=false;
        imagesLoaded=0;
        getPhotos();
    }
});

//on Load

getPhotos();