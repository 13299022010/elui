class Dialog{
    constructor({title,html,callback}){
        this.title = title
        this.html = html
        this.callback = callback
        this.$dialog = document.querySelector(".dialog")
        this.$dialogBg = document.querySelector(".dialog-bg")
        this.init()
    }

    init(){
        this.$dialog.firstElementChild.firstElementChild.innerText = this.title
        this.$dialog.children[1].innerHTML = this.html
        this.$dialog.classList.add('show')
        this.$dialogBg.classList.add('show')
        setTimeout(()=>{
            this.$dialog.classList.add('in-sight')
            this.$dialogBg.classList.add('in-sight')
        },0)
        this.bind()
    }

    bind(){
        let self = this
        this.$dialog.lastElementChild.lastElementChild.onclick = function(){
            self.callback()
            self.close()
        }
        this.$dialog.lastElementChild.firstElementChild.onclick = function(){
            self.close()
        }
        this.$dialog.firstElementChild.lastElementChild.onclick = function(){
            self.close()
        }
        this.$dialogBg.addEventListener('click',function(e){
            self.close()
        })
    }

    close(){
        this.$dialog.classList.remove('in-sight')
        this.$dialogBg.classList.remove('in-sight')
        setTimeout(()=>{
            this.$dialog.classList.remove('show')
            this.$dialogBg.classList.remove('show') 
        },500)
    }
}
document.querySelector(".btn").addEventListener('click',function(e){
    new Dialog(
        {
            title:'哈哈',
            html:'hehe',
            callback:function(){console.log("this is callback")}
        }
    )
})
