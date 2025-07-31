//dark mode style
let styleMode = localStorage.getItem('styleMode');
const styleToggle = document.querySelector('.header-mode-switcher');


const enableDarkStyle = () =>{
    document.body.classList.add('dark-mode-gamestore');
    localStorage.setItem('styleMode','dark');
}
const disableDarkStyle = () =>{
    document.body.classList.remove('dark-mode-gamestore');
    localStorage.setItem('styleMode',null);
}

if (styleToggle) {
    styleToggle.addEventListener('click',()=>{
        styleMode = localStorage.getItem('styleMode');
        if (styleMode !== 'dark') {
            enableDarkStyle()
        } else {
            disableDarkStyle()
        }
    })
}

if (styleMode === 'dark') {
    enableDarkStyle()
}

document.querySelector('#close-search').addEventListener('click',function(){
    document.querySelector('.popup-games-search-container').style.display = 'none'
})

document.addEventListener('DOMContentLoaded',function(){
    const searchContainer = document.querySelector('.popup-games-search-container'); 
    const searchResult = document.querySelector('.popup-search-results'); 
    const searchInput = document.querySelector('.popup-search-input'); 
    const openButton = document.querySelector('.header-search'); 
    const closeButton = document.querySelector('#close-search'); 
    const titleElement = document.querySelector('.search-popup-title'); 


    openButton.addEventListener('click',function(){
        searchContainer.style.display = 'block'
    })
 })