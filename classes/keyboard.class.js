class Keyboard {
    LEFT = false;
    UP = false;
    RIGHT = false;
    DOWN = false;
    SPACE = false;
    pressed;

    constructor(){
        window.addEventListener("keypress", (e)=>{
            console.log(e);
        
        })
    }
}