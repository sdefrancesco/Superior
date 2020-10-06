//slider js
let slider = document.querySelector('.hero-slider')
let sliderImgs = slider.children
let sliderImgAmt = slider.children.length


// console.log(slider, sliderImgs, sliderImgAmt)
for(let i=0; i < sliderImgAmt; i++) {
    setTimeout(function() {
        changeSlider(sliderImg[i])
    }, 1000)
}

function changeSlider(slide) {
    anime({
        targets: slide,
        opacity: [1, 0],
        easing: 'easeInOutQuint'
    })
}