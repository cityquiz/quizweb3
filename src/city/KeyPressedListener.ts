export class KeyPressedListener{
    keydownFunction: (event: any)=> void;
    keyupFunction:(event: any)=> void;

    constructor(keyCode: string, callback:()=>void){
        let keySafe= true;
        this.keydownFunction=(event)=>{
            if(event.code===keyCode){
                if(keySafe){
                    keySafe=false;
                    callback();
                }
            }
        };

        this.keyupFunction=(event)=>{
            if(event.code===keyCode){
                keySafe=true;
            }
        }


        document.addEventListener("keydown",this.keydownFunction);
        document.addEventListener("keyup",this.keyupFunction);
    }

    unbind(){
        document.removeEventListener("keydown", this.keydownFunction);
        document.removeEventListener("keyup", this.keyupFunction);
    }
}