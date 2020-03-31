let navElements = document.querySelector('.nav ul').children

for(let i=0; i< navElements.length; i++) {
    navElements[i].addEventListener('click', function() {
        //prevent user from reloading the page after clicking nav link
        event.preventDefault()

        scrollToPos(navElements[i].getAttribute('scroll-to'))

        // this.children[0].classList.add('active')
        for(let x=0; x< navElements.length; x++) {
            if(navElements[x].children[0].classList.contains('active')) {
                navElements[x].children[0].classList.remove('active')
            }
        }
        navElements[i].children[0].classList.add('active')
        // console.log(navElements[i])
        
    })
}


let nav = document.querySelector('.nav')
let navAnimation = anime.timeline({
    autoplay: false,
})
navAnimation.add({
    // autoplay: false,
    targets: nav,
    translateY: [-70, 0],
    duration: 900
})
.add({
    targets: '.nav ul li',
    opacity: [0, 1],
    easing: 'easeInOutSine',
    delay: function(el, i, l) {
        if( i > 0) {
            return i * 100
        }
        return 0
    }
}, '-=800')


let lastScroll = 0
const body = document.body

window.addEventListener('scroll', function() {

    const currentScroll = window.pageYOffset

    if(currentScroll == 0) {
        body.classList.remove('scroll-up')
        nav.classList.remove('open')
        anime({
            targets: nav, 
            translateY: [0, -80],
            duration: 700
        })
        return
    }
    if(currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
        //scrolling down
        body.classList.remove('scroll-up')
        body.classList.add('scroll-down')
        navAnimation.play()
        nav.classList.add('open')
        } else if (currentScroll < lastScroll && body.classList.contains('scroll-down')) {
            nav.classList.remove('open')
        body.classList.remove('scroll-down')
        body.classList.add('scroll-up')
        
    } else if ( nav.classList.contains('open')) {
        return
    }
    lastScroll= currentScroll



    // if(window.pageYOffset >= 150 && body.classList.contains('scroll-down')) {
    //     if(!navAnimation.completed) {
    //         navAnimation.play()
    //     }
    // } 
    // if(this.window.pageYOffset <= 10 && body.classList.contains('scroll-up')) {
    //     navAnimation.reverse()
    //     navAnimation.play()
    //     navAnimation.reset()
    //     // if(navAnimation.completed) {
            
    //     //     navAnimation.reverse()
    //     //     console.log(0, 'animate out')
    //     // }
    // }
    nav.classList.add('scrolling')

 
    let elemPos1 = document.querySelector('#services').offsetTop
    let elem1Height = document.querySelector('#services').clientHeight
    // console.log(window.pageYOffset, elemPos1)
    if( window.pageYOffset >= elemPos1  - nav.clientHeight) {
        if(window.pageYOffset <= (elemPos1 + elem1Height) - nav.clientHeight) {
            // setActiveNavElement('services')
            // console.log('add class here')
        } else {
            // console.log('remove class here')
            // removeActiveNavElement('services')

        }
    } 
    if(window.pageYOffset <= elemPos1 - nav.clientHeight) {
        let navElements = document.querySelector('.nav .nav-container').children[1].children
        // console.log(element)
        for(let i=0; i< navElements.length; i++) {
            if(navElements[i].children[0].classList.contains('active')) {
                // console.log(navElements[i], navElements[i].children[0])
                navElements[i].children[0].classList.remove('active')
            } 
        }
    }
    
})

// function removeActiveNavElement(element) {
//     let navElements = document.querySelector('.nav .nav-container').children[1].children
//     // console.log(element)
//     for(let i=0; i< navElements.length; i++) {
//         if(navElements[i].children[0].classList.contains('active')) {
//             // console.log(navElements[i], navElements[i].children[0])
//             navElements[i].children[0].classList.remove('active')
//         } 
//     }
// }
// function setActiveNavElement(element) {
//     let navElements = document.querySelector('.nav .nav-container').children[1].children
//     // console.log(element)
//     for(let i=0; i< navElements.length; i++) {
//         if(navElements[i].getAttribute('scroll-to') == element) {
//             // console.log(navElements[i], navElements[i].children[0])
//             navElements[i].children[0].classList.add('active')
//         } else {
            
//         }
//     }
// }

function scrollToPos(attribute) {
    let ele = document.getElementById(attribute)
    let pos = ele.offsetTop
    let currentPos = window.pageYOffset
    let navHeight = document.querySelector('.nav').clientHeight
    
    anime({
        targets: 'html, body',
        scrollTop: [currentPos, pos - navHeight + 5],
        duration: 500,
        easing: 'easeInOutQuint',
    })
}
let logo = document.querySelector('.logo')
function scrollToTop(callback) {
    let currentPos = window.pageYOffset
    if(currentPos > 0) {
        logo.classList.add('returning-to-top')
        anime({
            targets: 'html,body',
            scrollTop: [currentPos, 0],
            duration: 1200,
            easing: 'easeInOutQuint',
            complete: function() {
                return callback()
            }
        })
    }
}

logo.addEventListener('click', function() {
    // anime({
    //     targets: '.a',
    //     strokeDashoffset: [0, anime.setDashoffset, 0],
    //     direction: 'alternate',
    //     easing: 'easeInOutQuint',
    //     duration: 1000
    // })
    scrollToTop(function() {
        logo.classList.remove('returning-to-top')
    })
})

// load some images
let unsplashImgs = document.getElementsByClassName('video-thumbnail')
// console.log(unsplashImgs.length)
for(let i=0; i < unsplashImgs.length; i++) {
    
    // getUnsplashImg(function(unsplashImg) {
    //     unsplashImgs[i].style.backgroundImage = "url('" + unsplashImg.urls.small + "')"
    // })
    // changeBg(unsplashImgs[i])

    // getUnsplashImg('small', unsplashImgs[i])

}




function changeBg(el, url) {
    el.style.backgroundImage = "url('" + url + "')"
}

function getUnsplashImg(size, el) {
    let xhr = new XMLHttpRequest
    xhr.open('get', 'https://api.unsplash.com/photos/random?client_id=ZLplvXD6IlppCSowrMqmXmvPLgGqUNenhlzBYXAEJUM', true)
    xhr.onload = function() {
        let parseResponse = JSON.parse(this.responseText)
        // console.log(parseResponse)
        changeBg(el, parseResponse.urls.small)
        // return parseResponse
    }
    xhr.send()
}




