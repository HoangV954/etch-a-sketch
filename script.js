const container = document.querySelector('.container');


    function createBoard() {
    for (let i = 1; i <= 256; i++) {
        const div = document.createElement('div');
        div.classList.add('grid');
        div.setAttribute('style', 'width: calc(100%/16); height: calc(100%/16); border: solid 1px black');
        container.appendChild(div);
    } 
}

createBoard()

