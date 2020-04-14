class Message{
    constructor({type='success',msg='这是一个成功信息'}){
        this.html = `
        <section class="msg ${type}">
        <span class="iconfont icon-${type}"></span>
        <span>${msg}</span>
        </section>
        `
        this.init()
    }

    init(){
        const body = document.querySelector('body')
        const child = document.createElement('div')
        child.innerHTML = this.html
        body.appendChild(child)
        this.showMsg(body,child)
    }

    showMsg(parent,child){
        setTimeout(()=>{
            child.firstElementChild.classList.add('active')    
        },0)
        setTimeout(()=>{
            child.firstElementChild.classList.remove('active')
            this.close(parent,child)
        },3000)
    }

    close(p,c){
        setTimeout(()=>{
            p.removeChild(c)
        },400)
        
    }
}

const $$ = s => document.querySelectorAll(s)
const $ = s => document.querySelector(s)
const $$btns = Array.from($$('span.btn'))

$$btns.map(item => {
    item.addEventListener('click',function(){
        const type = this.id
        let msg
        switch(type){
            case "success":
                msg = "恭喜你，这是一条成功信息"
                break
            case "alert":
                msg = "警告哦，这是一条警告信息"
                break
            case "info":
                msg = "这是一条提示信息"
                break
            case "error":
                msg = "错了哦，这是一条错误信息"
                break
        }
        new Message({type:type,msg:msg})
    })
})
