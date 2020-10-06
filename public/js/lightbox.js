//lightbox for homepage
// console.log('hi')
var imgs = document.querySelector('.sd-lightbox').children


function createLightbox(imgSrc, i, callback) {
    //create lightbox
   let lightbox =  document.createElement('div')
   //create lightbox container for img
   let lightboxContainer = document.createElement('div')
   //create lightbox image
   let lightboxImg = document.createElement('img')
   //define body element
   let body = document.querySelector('body')
   //add styles
   lightbox.className = 'lightbox'
   lightboxContainer.className = 'lightbox-container'
   lightboxImg.src = imgSrc
   lightboxImg.className = 'lightbox-img'
   //add css transition for fade
   //append lightbox and lightbox images to body element
   body.appendChild(lightbox)
   lightbox.appendChild(lightboxContainer)
   lightboxContainer.appendChild(lightboxImg)


    //animate lightbox
    anime({
        targets: lightbox,
        opacity: [0, 1],
        easing: 'easeOutQuart',
        duration: 900,
    })
    //close lightbox
    lightbox.addEventListener('click', function(e) {
        // console.log(e.target)
        if(e.target !== lightboxImg) {
            closeLightbox()
        } 
    })
    // handle next image in lightbox
    lightboxImg.addEventListener('click', function(e) {
        // getNextImage(i, function(i, nextImg) {
        //     // console.log('current img' +  i ,'next img ' , i + 1)
        //     changeLightboxImg(nextImg)
        // })
        // console.log(e.target)
        getNextImage(e.target, function(nextImg) {
            changeLightboxImg(nextImg.getAttribute('src'))
            // console.log(nextImg)
        })
    })
 
   console.log('lightbox created', 'img:' + imgSrc, i)
   if(!callback) {
    //    console.log('no callback.')
   }
}
// change lightbox image function
function changeLightboxImg(nextImg) {
    let lightboxImg = document.querySelector('.lightbox-img')
    lightboxImg.src = nextImg
}

function getNextImage(currentImg, callback) {
    let img = document.querySelector('.sd-lightbox').children
    for(var i=0; i < img.length; i++) {
        // console.log(img[i], currentImg)
        if(img[i].getAttribute('src') == currentImg.getAttribute('src')) {
            // console.log('equal')
            
            if(i + 1 == img.length) {
                return callback(img[0])
            }
            return callback(img[i + 1])
        } else {
            // console.log('not equal')
        }
    //  return callback(value , imgs[i + 1].src)     
    }
}

function getCurrentImage() {
    let img = document.querySelector('.lightbox-img')
    return img.src
    // console.log('current img' + img.src)
}

function handleClickEvent(element, i) {
    element.addEventListener('click', function() {
        // console.log(this)
        let getImg = element.getAttribute('src')
        createLightbox(getImg, i)
    })
}

function closeLightbox() {
    let lightbox = document.querySelector('.lightbox')
    anime({
        targets: lightbox,
        opacity: [1,0],
        duration: 300,
        easing: 'easeOutQuart',
        complete: function() {
            lightbox.remove()
        }
    })
    // console.log('closing lightbox')
}
for(let i=0; i < imgs.length; i++) {
    handleClickEvent(imgs[i], i)
}

