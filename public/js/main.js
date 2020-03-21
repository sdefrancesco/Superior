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


window.addEventListener('scroll', function() {
    let nav = document.querySelector('.nav')
    nav.classList.add('scrolling')

    let elemPos1 = document.querySelector('#services').offsetTop
    let elem1Height = document.querySelector('#services').clientHeight
    // console.log(window.pageYOffset, elemPos1)
    if( window.pageYOffset >= elemPos1  - nav.clientHeight) {
        if(window.pageYOffset <= (elemPos1 + elem1Height) - nav.clientHeight) {
            setActiveNavElement('services')
            // console.log('add class here')
        } else {
            // console.log('remove class here')
            removeActiveNavElement('services')

        }
    } 
    if(window.pageYOffset <= elemPos1 - nav.clientHeight) {
        let navElements = document.querySelector('.nav').children[1].children
        // console.log(element)
        for(let i=0; i< navElements.length; i++) {
            if(navElements[i].children[0].classList.contains('active')) {
                // console.log(navElements[i], navElements[i].children[0])
                navElements[i].children[0].classList.remove('active')
            } 
        }
    }
    
})

function removeActiveNavElement(element) {
    let navElements = document.querySelector('.nav').children[1].children
    // console.log(element)
    for(let i=0; i< navElements.length; i++) {
        if(navElements[i].children[0].classList.contains('active')) {
            // console.log(navElements[i], navElements[i].children[0])
            navElements[i].children[0].classList.remove('active')
        } 
    }
}
function setActiveNavElement(element) {
    let navElements = document.querySelector('.nav').children[1].children
    // console.log(element)
    for(let i=0; i< navElements.length; i++) {
        if(navElements[i].getAttribute('scroll-to') == element) {
            // console.log(navElements[i], navElements[i].children[0])
            navElements[i].children[0].classList.add('active')
        } else {
            
        }
    }
}

function scrollToPos(attribute) {
    let ele = document.getElementById(attribute)
    let pos = ele.offsetTop
    let currentPos = window.pageYOffset
    let navHeight = document.querySelector('.nav').clientHeight

    anime({
        targets: 'html, body',
        scrollTop: [currentPos, pos - navHeight + 5],
        duration: 1200,
        easing: 'easeInOutQuint',
    })
}