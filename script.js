// Create the game board with certain number of boxes. Need a variable as max (for i <=) and utilize i as a separate variable since not just the width and height need to be changed
const container = document.querySelector('.container');
let size = 1;

function userSelection() {
    return prompt('Choose your board size')
}

function createBoard() {
    size = false;//Number(userSelection());
    if (!size) {
        for (let i = 1; i <= 256; i++) {
            const div = document.createElement('div');
            div.classList.add('grid');
            div.setAttribute('style', `width: calc(100%/16); height: calc(100%/16); border: solid 1px #696969; background-color: white;`);
            container.appendChild(div);
        } 

    }

    if (size > 100) {
        console.log('ERROR')
    } else if (size <= 100 && size > 0) {
        let max = size**2;
        for (let i = 1; i <= max; i++) {
            const div = document.createElement('div');
            div.classList.add('grid');
            div.setAttribute('style', `width: calc(100%/${size}); height: calc(100%/${size}); border: solid 1px #696969; background-color: white;`);
            container.appendChild(div);
        } 
        
    }
}

createBoard()

// Create random color variable. #ffffff is hexadecimal (base 16) compared to (255,255,255) <can't be inject directly into js> (base 10 - decimal). Sometimes the random math will return less than the standard length (e.g.: #00FF00) so it needs to be patched with a string on top of it (or refer to solution 2). Also, the number of colors that can be represented by this system is 16^6 or 256^3 or 2^24 = 16,777,216 (see sol. 2 for more usage of this info). What we learned here is it's good to research the underlying mechanics of the web before solving a logic puzzle.

//sol-alternative for random colors:
//let randomColor = '#' + (Math.floor(Math.random()*2**24)).toString(16).padStart(6, '0')

let color = '';
let percent = 150;



function randomColor() {
    let x = Math.round(0xffffc0*Math.random()).toString(16);
    let y = 6 - x.length;
    let z = "000000";
    let z1 = z.substring(0, y);
    color = '#' + z1 + x;  
}

const grids = document.querySelectorAll('.grid');


//Do not run this function with extensions that change color props. Also filter: brightness(20%); will make darker color. Anonymous function can be removed like below
/*  if (percent < 0) {   
    this.removeEventListener('mouseenter', coloring);    
}

if (this.style.backgroundColor === 'white') {
    percent = 150;
    randomColor()
} else {
    percent -= 5;
}

this.style.backgroundColor = color;
let dark = 'brightness(' + percent + '%)';               
this.style.filter = dark;  */


//Revised version of the colorful mode
function colorfulMode() {
    grids.forEach((grid) => {
        let percent;   
        grid.addEventListener('mouseenter', (e) => {
            randomColor()
            e.target.style.backgroundColor = color;
            let dark = 'brightness(' + percent + '%)'
            e.target.style.filter = dark;
            if (!e.target.style.filter) {
                percent = 100;
            } else if (e.target.style.filter) {
                percent -= 10;
            }
            
        })
    })
}

//Set a base number of items, increment with each time mouse hovers over. Utilizing black and white opacity vs rgba: rgba doesn't apply to border (opacity affects the whole element)

function classicMode() {
    grids.forEach((grid) => {
        let rgb = '(112, 112, 112,'      
        grid.count = 0;
        grid.addEventListener('mouseenter', (e) => {
            e.target.count += 0.1;
            let rgba = 'rgba' + rgb + ' ' + e.target.count.toString() +')';
            e.target.style.backgroundColor = 'red';
            //e.target.style.opacity = 0.5*e.target.count;
            console.log(e.target.style)   
        }, false)
    })    
}
    
colorfulMode()

function reset() {
    div.style.backgroundColor = 'white'
    createBoard()
    colorfulMode()
}

reset()
