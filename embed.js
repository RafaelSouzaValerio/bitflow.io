(function () {
    window.addEventListener('scroll', function() {
        let shadeOpacity = this.window.scrollY / 500;
        let bgScale = (this.window.scrollY * .0004) + 1; // higher number for more zoom
        let textMarginTop = (this.window.scrollY * .2) + 1; // Title speed

        this.document.querySelector('.shade').style.opacity = shadeOpacity;
        this.document.querySelector('.bg').style.transform = `scale(${bgScale})`;
        this.document.querySelector('.text').style.marginTop = textMarginTop;
        
        let header = this.document.querySelector('header');
        let menu = this.document.querySelector('menu');
        if (window.scrollY >= (header.clientHeight - (header.clientHeight*5/100))) {
            menu.classList.remove('fadeOutUp');
            menu.classList.add('fadeInDown');
        } else {
            menu.classList.remove('fadeInDown');
            menu.classList.add('fadeOutUp');
        }
    });
}.call(this));
