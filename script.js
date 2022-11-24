// Create the game board with certain number of boxes. Need a variable as max (for i <=) and utilize i as a separate variable since not just the width and height need to be changed
const container = document.querySelector('.container');

function createBoard() {
    for (let i = 1; i <= 256; i++) {
        const div = document.createElement('div');
        div.classList.add('grid');
        div.setAttribute('style', 'width: calc(100%/16); height: calc(100%/16); border: solid 1px #808080; background-color: white');
        container.appendChild(div);
    } 
}

createBoard()

// Create random color variable. #ffffff is hexadecimal (base 16) compared to (255,255,255) <can't be inject directly into js> (base 10 - decimal). Sometimes the random math will return less than the standard length (e.g.: #00FF00) so it needs to be patched with a string on top of it (or refer to solution 2). Also, the number of colors that can be represented by this system is 16^6 or 256^3 or 2^24 = 16,777,216 (see sol. 2 for more usage of this info). What we learned here is it's good to research the underlying mechanics of the web before solving a logic puzzle.

//sol-alternative for random colors:
//let randomColor = '#' + (Math.floor(Math.random()*2**24)).toString(16).padStart(6, '0')

let color = '';
let percent = 100;



function randomColor() {
    let x = Math.round(0xffffc0*Math.random()).toString(16);
    let y = 6 - x.length;
    let z = "000000";
    let z1 = z.substring(0, y);
    color = '#' + z1 + x;  
}

const grids = document.querySelectorAll('.grid');


//Do not run this function with extensions that change color props. Also filter: brightness(20%); will make darker color
grids.forEach((grid) => {   
        grid.addEventListener('mouseenter', function coloring() {
            if (percent < 0) {   
                this.removeEventListener('mouseenter', coloring);    
            }

            if (this.style.backgroundColor === 'white') {
                percent = 100;
                randomColor()
            } else {
                percent -= 5;
            }

            this.style.backgroundColor = color;
            let dark = 'brightness(' + percent + '%)';               
            this.style.filter = dark;        
        })
})


    



