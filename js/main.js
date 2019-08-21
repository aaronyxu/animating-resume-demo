var result = `/*
* 面试官你好，我是XXX
* 我将以动画的形式来介绍自己
* 只用文字介绍太单薄了
* 我就用代码来介绍吧
* 首先准备一些样式
*/

*{
    transition: all 1s;
}
html{
    background: #2d2d2d;
    font-size: 16px;
}

/* 抱歉让你的眼睛难受了，很快就好了 */

#code{
    padding: 16px;
    border: 2px solid white;
    margin: 10px;
    box-shadow: -4px 4px 2px 0 rgba(0,0,0,0.3);
    width: 44%;
    height: 90%;
}

/* 我需要一些代码高亮 */
*{
    color: #ccc;
}
.token.selector{
    color: #cc99cd;
} 
.token.function{
    color: #f08d49;
}
.token.punctuation{
    color: #ccc;
}
.token.property{
    color: #f8c555;
}

/* 加点3D效果 */
#code{
    position: fixed;
    left: 4%;
    transform: perspective(1000px) rotateY(10deg);
}


/* 不玩了，我来介绍一下我自己吧 */
/* 我需要一张白纸 */
`

var result2 = `
#paper{
    position: fixed;
    right: 0;
    width: 44%;
    height: 90%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    margin: 10px;
    box-shadow: -4px 4px 2px 0 rgba(0,0,0,0.3);
    right: 4%;
    transform: perspective(1000px) rotateY(-10deg);
}
#paper > .content{
    background: white;
    height: 100%;
    width: 100%;
}

/* 现在 我就可以在右边的白纸上写我的简历了，请看页面右边 */
`


var md = `
# About XX

My name is XX, born in December, 1992 and graduated from XXX. 

I am look for a job of front-end development engineer.




# Skills

- Javascript
- CSS
- HTML/HTML5
- Node.js



# Works

1. Canvas
2. Navigation Website
3. Apple-like Slideshow



# Contact

- Email: XXXXX@XXXXX.COM
- City: XXXXXXXXXXX
- Phone: XXXXXXXXXXXX




`

var result3 = `
/* 接下里我们引用一个库 marked.js 把我们写的Markdow 变成 HTML */
`

var result4 = `
/* 这就是我用代码写的会动的简历
 * 谢谢观看
 */
`

writeCode('', result, () => {
    createPaper(() => {
        writeCode(result, result2, () => {
            writeMarkdown(md, () => {
                writeCode(result + result2, result3, () => {
                    MarkdownToHtml(() => {
                        writeCode(result + result2 + result3, result4, () => {
                            console.log('Done')
                        })
                    })
                })
            })
        })
    })
})

function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    let n = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 50)

}

function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}


function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper > .content')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n);
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 50)
}

function MarkdownToHtml(fn) {

    var div = document.createElement('div')
    div.className = 'resume-content'
    var converter = new showdown.Converter()
    converter.setFlavor('github')
    div.innerHTML = converter.makeHtml(md)
    let markdownContainer = document.querySelector('#paper >.content')
    markdownContainer.replaceWith(div)
    fn.call()
}