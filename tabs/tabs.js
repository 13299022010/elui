const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

class TabObj {
    constructor($container){
        this.$$tabs = Array.from($container.querySelectorAll(".tab-tag"))
        this.$$contents = Array.from($container.querySelectorAll(".tab-content"))
        this.$tabPart = $container.querySelector(".tab-head")
        this.$actLine = $container.querySelector(".tab-head>.line")
        this.index = 0

        this.init()
        this.bind()
    }

    init(){
        this.clickTab(0)
        this.moveLine(this.$$tabs[0])
    }

    bind(){
        console.log(this.index)
        let _this = this
        this.$tabPart.addEventListener("click",function(e){
            let target = e.target
            _this.index = _this.$$tabs.indexOf(target)
            if(_this.index > -1){
                _this.moveLine(target)
                _this.clickTab(_this.index) 
            }
        })
    }

    clickTab(index){
        this.$$contents[index].classList.add("show")
        this.$$tabs[index].classList.add("active")
        this.$$tabs.filter((item,i)=>{return index != i}).map(item=>item.classList.remove('active'))
        this.$$contents.filter((item,i)=>{return index != i}).map(item=>item.classList.remove('show'))
    }

    moveLine($target){
        let _this = this
        _this.$actLine.style.width = $target.offsetWidth+"px"
        _this.$actLine.style.transform = `translateX(${$target.offsetLeft}px)`
    }
}

new TabObj(document.querySelectorAll(".container")[0])
 
new TabObj(document.querySelectorAll(".container")[1])

new TabObj(document.querySelectorAll(".container")[2])




