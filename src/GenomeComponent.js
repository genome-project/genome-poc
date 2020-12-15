class GenomeComponent {
    constructor ( darwinString ) {
        this.darwinString = darwinString
        this.html = ''
        this.styles = {}
    }

    render(values) {
        /* const possibleHTMLElements = ['a','abbr','address','area','article','aside','audio','b','base','bdi','bdo','blockquote','body','br','button','canvas','caption','cite','code','col','colgroup','data','datalist','dd','del','details','dfn','dialog','div','dl','dt','em','embed','fieldset','figcaption','figure','footer','form','h1','h2','h3','h4','h5','h6','head','header','hgroup','hr','html','i','iframe','img','input','ins','kbd','label','legend','li','link','main','map','mark','menu','meta','meter','nav','noscript','object','ol','optgroup','option','output','p','param','picture','pre','progress','q','rp','rt','ruby','s','samp','script','section','select','slot','small','source','span','strong','style','sub','summary','sup','table','tbody','td','template','textarea','tfoot','th','thead','time','title','tr','track','u','ul','var','video','wbr'] */
        this.html = this.darwinString.join('')
        ;(this.html.match(/<{(.*)}>/g) || []).forEach((key, i) => {
            this.html = this.html.replace(key, values[key.slice(2,-2).trim()])
        })

        ;(this.html.match(/style\=\"([A-Za-z0-9 _#.]*)\"/g) || []).forEach((key, i) => {
            let classes = []
            let ids = []
            key.slice(7, -1).trim().split(' ').forEach((key2, i2) => {
                if (key2.startsWith('.')) {
                    classes.push(key2.slice(1))
                }
                if (key2.startsWith('#')) {
                    ids = [key2.slice(1)]
                }
            })
            this.html = this.html.replace(key, `id="${ids[0] || ''}" class="${classes.join(' ') || ''}"`)
        })

        this.html += '\n<style>\n'
        for (let i in this.styles) {
            this.html += `\t${Object.keys(this.styles)} {\n`
            for (let i2 in this.styles[i]) {
                this.html += `\t\t${Object.keys(this.styles[i])}: ${this.styles[i][i2]};\n`
            }
            this.html += `\t}`
        }
        this.html += '\n</style>'

        return this.html
    }
}

module.exports = ( darwinString ) => {
    return new GenomeComponent( darwinString )
}
