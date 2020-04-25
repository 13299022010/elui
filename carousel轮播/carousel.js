const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)
class Carousel{
    constructor($root){
        this.$root = $root
        this.$$pages = Array.from(this.$root.querySelectorAll(".page"))
        this.$$pots = Array.from(this.$root.querySelectorAll(".pots li"))
        this.$ul = this.$root.querySelector('.pots')
        this.$pre = this.$root.querySelector('.left-btn')
        this.$next = this.$root.querySelector('.right-btn')
        this.$curPage = this.$$pages[0]
        this.init()
    }

    init(){
        let index = 1
        let len = this.$$pages.length
        this.setI_id = setInterval(() => {
            this.showPage(index++%len)
            if(index>len){
                index = 1
            }
        }, 2000);
        this.bind()
    }

    get index(){
        return this.$$pages.indexOf(this.$curPage)
    }

    showPage(index){
        this.$curPage = this.$$pages[index]
        this.$curPage.classList.add('show')
        this.$$pages.filter((item,i)=> i!==index).map(item=>item.classList.remove('show'))
        this.lightPot(index)
    }

    lightPot(index){    
        this.$$pots.map(item => item.classList.remove('active'))
        this.$$pots[index].classList.add('active')
    }

    bind(){
        let self = this
        let len = this.$$pages.length
        this.$pre.addEventListener('click',function(e){
            let index = (self.index - 1+len)%len
            self.showPage(index)
            clearInterval(self.setI_id)
        })
        this.$next.addEventListener('click',(e) => {
            let index = (this.index + 1)%len
            this.showPage(index)
            clearInterval(this.setI_id)
        })
        this.$ul.addEventListener('click',function(e){
            let target = e.target
            let index = self.$$pots.indexOf(target)
            if(index > -1){
                self.showPage(index)
                clearInterval(self.setI_id)
            }
        })
        this.$root.addEventListener('mouseenter',function(e){
            self.$pre.classList.add('show')
            self.$next.classList.add('show')
        })
        this.$root.addEventListener('mouseleave',function(e){
            self.$pre.classList.remove('show')
            self.$next.classList.remove('show')
        })
    }

}

new Carousel(document.querySelector('.carousel'))