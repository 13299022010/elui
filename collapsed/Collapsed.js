function Collapsed($container,type){
    const $$ = s => $container.querySelectorAll(s)
    const $ = s => $container.querySelector(s)
    this.$container = $container
    this.type = type
    this.index = -1
    this.$$pannels = Array.from($$('.pannel'))
    this.$$headers = Array.from($$('.pannel header'))
    this.init()
}

Collapsed.prototype.openPannel = function(index){
    if(index < 0){
        return
    }
    let item = this.$$headers[index]
    item.lastElementChild.classList.toggle('to-down')
    item.nextElementSibling.classList.toggle('show')
    if(this.type === 1){
        this.$$headers.filter((item,i)=>index!==i).map(item=>{
            item.nextElementSibling.classList.remove('show')
            item.lastElementChild.classList.remove('to-down')
        })
    }
}

Collapsed.prototype.bind = function(){
    let self = this
    this.$container.addEventListener('click',function(e){
        self["$target"] = e.target
        if(self.$target.nodeName === "FONT"){
            self.$target = self.$target.parentElement.parentElement.parentElement
        }
        if(self.$target.nodeName === "SPAN"){
            self.$target = self.$target.parentElement
        }
        self.index = self.$$headers.indexOf(self.$target)
        if(self.index > -1){
            self.openPannel(self.index)
        }
    })
}

Collapsed.prototype.init = function(){
    this.bind()
}

new Collapsed(document.querySelectorAll('.container')[0],1)
new Collapsed(document.querySelectorAll('.container')[1],2)
