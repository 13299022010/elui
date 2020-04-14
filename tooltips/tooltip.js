class Tooltip{
    constructor($root){
        this.$root = $root
        this.type = this.$root.dataset.type
        this.text = this.$root.dataset.text
        this.$root.tooltip = this
        this.render()
        this.bindRoot()
    }

    render(){
        const $div = document.createElement('div')
        this.$tipDiv = $div
        $div.classList.add('tooltip')
        $div.classList.add(this.type)
        $div.innerText = this.text
        this.$root.appendChild($div)
    }

    bindRoot(){
        this.$root.showToolTop = this.show.bind(this)
        this.$root.hideToolTop = this.hide.bind(this)
    }

    show(){
        this.$tipDiv.classList.add('show')
    }

    hide(){
        console.log(111)
        this.$tipDiv.classList.remove('show')
    }
}

const $$btns = document.querySelectorAll('[data-name="tooltip"]')
$$btns.forEach($node => {
    $node.onmouseenter = function(){
        if($node.tooltip){
            $node.showToolTop()
        }else{
            new Tooltip($node)
            $node.showToolTop()
        }
    }
    $node.onmouseleave = function(){
        $node.hideToolTop()
    }
})