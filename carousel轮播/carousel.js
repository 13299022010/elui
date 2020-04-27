const css = ($node,style) => Object.assign($node.style,style)

const Animation = {
    slide($fromPage,$toPage,direction){
        $fromPage.style = ''
        $toPage.style = ''
        console.log('slide', arguments)
        css($fromPage,{
            transform:`translateX(0)`,
            zIndex:`10`
        })
        css($toPage,{
            transform:`translateX(${direction=="right"?'-':''}100%)`,
            zIndex:`10`
        })
        setTimeout(() => {
            css($fromPage,{
                transform:`translateX(${direction=="left"?'-':''}100%)`,
                transition:`all .4s`
            })
            css($toPage,{
                transform:`translateX(0)`,
                transition:`all .4s`
            })    
        });
    },
    zoom($fromPage,$toPage){
        $fromPage.style = ''
        $toPage.style = ''
        css($fromPage,{
            transform:`scale(1)`,
            opacity: 1,
            zIndex:10
        })
        css($toPage,{
            opacity:0,
            transform:`scale(5)`,
            zIndex:9
        })
        setTimeout(() => {
            css($fromPage,{
                transform:`scale(5)`,
                opacity:0,
                zIndex:9,
                transition:`all .4s`
            })
            css($toPage,{
                transform:`scale(1)`,
                opacity:1,
                zIndex:10,
                transition:`all .4s`
            })    
        },400)
    },
    rotate($fromPage,$toPage){
        $fromPage.style = ''
        $toPage.style = ''
        css($fromPage,{
            transform:`scale(1) rotate(0)`,
            opacity: 1,
            zIndex:10
        })
        css($toPage,{
            transform:`scale(2) rotate(-180deg)`,
            opacity:0,
            zIndex:9
        })
        setTimeout(() => {
            css($fromPage,{
                transform:`scale(2) rotate(-180deg)`,
                opacity:0,
                zIndex:9,
                transition:`all .4s`
            })
            css($toPage,{
                transform:`scale(1) rotate(0)`,
                opacity:1,
                zIndex:10,
                transition:`all .4s`
            })    
        },400)
    }
}

class Carousel{
    constructor($root,Animation){
        this.$root = $root
        this.$$pages = Array.from(this.$root.querySelectorAll(".page>img"))//必须选中到transition需要控制的元素
        this.$$pots = Array.from(this.$root.querySelectorAll(".pots li"))
        this.$ul = this.$root.querySelector('.pots')
        this.$pre = this.$root.querySelector('.left-btn')
        this.$next = this.$root.querySelector('.right-btn')
        this.$curPage = this.$$pages[0]
        this.Animation = Animation
        this.init()
    }

    init(){
        // let index = 1
        // let len = this.$$pages.length
        // this.setI_id = setInterval(() => {
        //     this.showPage(index++%len-1,index++%len)
        //     if(index>len){
        //         index = 1
        //     }
        // }, 2000);
        this.bind()
    }

    get index(){
        return this.$$pages.indexOf(this.$curPage)
    }

    showPage(fromIndex,toIndex,direction){
        this.$curPage = this.$$pages[toIndex]
        let $fromPage = this.$$pages[fromIndex]
        let $toPage = this.$$pages[toIndex]
        console.log(fromIndex,toIndex,direction)
        this.Animation($fromPage,$toPage,direction)
        // this.$curPage.classList.add('show')
        // this.$$pages.filter((item,i)=> i!==index).map(item=>item.classList.remove('show'))
        this.lightPot(toIndex)
    }

    lightPot(index){    
        this.$$pots.map(item => item.classList.remove('active'))
        this.$$pots[index].classList.add('active')
    }

    bind(){
        let self = this
        let len = this.$$pages.length
        this.$pre.addEventListener('click',function(e){
            let toIndex = (self.index - 1+len)%len
            self.showPage(self.index,toIndex,'right')
            clearInterval(self.setI_id)
        })
        this.$next.addEventListener('click',(e) => {
            let toIndex = (this.index + 1)%len
            this.showPage(this.index,toIndex,'left')
            clearInterval(this.setI_id)
        })
        this.$ul.addEventListener('click',function(e){
            let target = e.target
            let toIndex = self.$$pots.indexOf(target)
            if(toIndex > -1){
                let direction = self.index<toIndex?'left':'right'
                self.showPage(self.index,toIndex,direction)
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

        document.querySelector('[name="animation"]').onchange = (e)=>{
            this.Animation = Animation[e.target.value]
        }
    }

}

new Carousel(document.querySelector('.carousel'),Animation.slide)