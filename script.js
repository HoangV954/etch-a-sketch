// Create the game board with certain number of boxes. Need a variable as max (for i <=) and utilize i as a separate variable since not just the width and height need to be changed
const container = document.querySelector('.container');
let size;
let modeR;
let modeC;

function clear() {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild)
    }
}

function userSelection() {
    return prompt('Choose your board size (maximum 100)')
}

//default mode
function defaultBoard() {
    for (let i = 1; i <= 256; i++) {
        const div = document.createElement('div');
        div.classList.add('grid');
        div.setAttribute('style', `width: calc(100%/16); height: calc(100%/16); border: solid 1px #696969; background-color: white;`);
        container.appendChild(div);
    }
    classicMode()
    
}
defaultBoard()

function colorControl() {
    if (modeC === 1) {
        classicMode()
    } else if (modeR === 1) {
        colorfulMode()
    } /* else if (modeC === 0 && modeR === 0) {
        classicMode()
    } */
}
// Utilize parseInt instead of Number() since Number tries to parse the entire argument as a number (fail when 1 of the character is NaN) while parseInt at least supports edge cases like ('12ab'). 2 methods: isNan and regex to check if user input is a number. regex is preferred since isNaN(parseInt(size)) is bad with white spaces (e.g. '  12' still counts as valid) 

let regex = /^[0-9]+$/
function createBoard() {
    size = userSelection();
    if (parseInt(size) > 100 || !regex.test(size)) {
        return alert('Wrong input! Choose a number from 0 - 100!')
    } else if (0 < parseInt(size) <= 100) {
        clear();
        let max = parseInt(size)**2;
        for (let i = 1; i <= max; i++) {
            const div = document.createElement('div');
            div.classList.add('grid');
            div.setAttribute('style', `width: calc(100%/${parseInt(size)}); height: calc(100%/${parseInt(size)}); border: solid 1px #696969; background-color: white;`);
            container.appendChild(div);
        } 
        
    }
    colorControl()

}

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
    const grids = document.querySelectorAll('.grid');
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
    modeC = 0;
    modeR = 1;
}


//Set a base number of items, increment with each time mouse hovers over. Utilizing black and white opacity vs rgba: rgba doesn't apply to border (opacity affects the whole element)

function classicMode() {  
    const grids = document.querySelectorAll('.grid'); 
    grids.forEach((grid) => {
        let rgb = '(112, 112, 112,'      
        grid.count = 0.1;
        grid.addEventListener('mouseenter', (e) => {
            e.target.count += 0.15;
            let rgba = 'rgba' + rgb + ' ' + e.target.count.toString() +')';
            e.target.style.backgroundColor = rgba;
            //e.target.style.opacity = 0.5*e.target.count;
               
        }, false)
    })
    modeC = 1;
    modeR = 0;    
}
    

function reset() {
    const grids = document.querySelectorAll('.grid');
    grids.forEach((grid) => {
        grid.style.backgroundColor = 'white'
        grid.style.filter = 'brightness(100%)'
    })
} 

const btn = document.querySelectorAll('button');
    btn.forEach((button) => {
        if (button.classList.contains('erase')) {
            button.addEventListener('click',reset)
        }
        
        if (button.classList.contains('classic')) {
            button.addEventListener('click',classicMode)
        } 
        
        if (button.classList.contains('color')) {
            button.addEventListener('click',colorfulMode)
        }

        if (button.classList.contains('size')) {
            button.addEventListener('click', createBoard)
        }
    })




