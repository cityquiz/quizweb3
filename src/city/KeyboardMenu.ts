import { KeyPressedListener } from "./KeyPressedListener";

export interface MenuOption{
    label: string;
    description: string;
    disabled?: boolean;
    handler: ()=>void;
    right?: ()=> void;
}

interface ConfigKeyboard{
    descriptionContainer?: HTMLDivElement;
    css?: string;
}
export class KeyboardMenu{
    element?: HTMLDivElement;
    descriptionElement?: HTMLDivElement;
    descriptionElementText?: HTMLParagraphElement;
    descriptionContainer: HTMLDivElement | null;

    options: MenuOption[];

    up: KeyPressedListener | null;
    down: KeyPressedListener | null;
    prevFocus: HTMLButtonElement | null;
    css?:string;

    constructor(config: ConfigKeyboard){
        this.options= []; //set by updater method
        this.up = null;
        this.down = null;
        this.prevFocus = null;
        this.descriptionContainer = config.descriptionContainer || null;
        this.css= config.css;
    }


    setOptions(options: MenuOption[]){
        this.options = options;
        this.element!.innerHTML = this.options.map((option, index)=>{
            const disabledAttr =  option.disabled ? "disabled" : "";

            

            const autoFocusAttr: string = index ===0 ? "autoFocus" : "";
            return (`
            <div class="option">
                <button ${disabledAttr} ${autoFocusAttr} data-button="${index}" data-description="${option.description}">
                    ${option.label}
                </button>
                <span class="right">${option.right ? option.right() : ""}</span>

            </div>
            `);
        }).join("");
        

        this.element!.querySelectorAll("button").forEach((button)=>{
            button.addEventListener("click",()=>{
                const choosenOption = this.options[Number(button.dataset.button)];
                choosenOption.handler();
            });

            button.addEventListener("mouseenter",()=>{
                button.focus();
            });

            button.addEventListener("focus", ()=>{
                this.prevFocus = button;
                this.descriptionElementText!.innerText!= button.dataset.description;
            });
        });

        setTimeout(()=>{
            (this.element!.querySelector("button[data-button]:not([disabled])") as HTMLButtonElement)!.focus();
        },10);
    }

    setTitle(title: string){
        const titleElement= this.element!.parentElement!.querySelector("h2")!;
        titleElement.innerHTML= (`${title}`);
    }

    createElement(){
        this.element=document.createElement("div");
        this.element.classList.add("KeyboardMenu");
        if(this.css){
            this.element.classList.add("space-evenly");
        }

        //description box element
        this.descriptionElement= document.createElement("div");
        this.descriptionElement.classList.add("DescriptionBox");
        this.descriptionElement.innerHTML = (`<p></p>`);
        this.descriptionElementText = this.descriptionElement.querySelector("p")!;
    }

    end(){

        //remove menu t and descritpion element
        this.element!.remove();
        this.descriptionElement!.remove();

        //clean bindings
        this.up!.unbind();
        this.down!.unbind();
    }

    init(container: HTMLDivElement){
        this.createElement();
        (this.descriptionContainer || container).appendChild(this.descriptionElement!);
        container.appendChild(this.element!);
        
        if(this.css){
            this.up = new KeyPressedListener("ArrowLeft", ()=>{
                const current = Number(this.prevFocus!.getAttribute("data-button"));
                const prevButton = Array.from(this.element!.querySelectorAll<HTMLButtonElement>("button[data-button]")).reverse().find((el)=>{
                    return Number(el.dataset.button) < current && !el.disabled;
                });

                prevButton?.focus();
            });

            this.down = new KeyPressedListener("ArrowRight", ()=>{
                const current = Number(this.prevFocus!.getAttribute("data-button"));
                const nextButton = Array.from(this.element!.querySelectorAll<HTMLButtonElement>("button[data-button]")).find((el)=>{
                    return Number(el.dataset.button) > current && !el.disabled;
                });
                nextButton?.focus();

            });
        }else{
            this.up = new KeyPressedListener("ArrowUp", ()=>{
                const current = Number(this.prevFocus!.getAttribute("data-button"));
                const prevButton = Array.from(this.element!.querySelectorAll<HTMLButtonElement>("button[data-button]")).reverse().find((el)=>{
                    return Number(el.dataset.button) < current && !el.disabled;
                });

                prevButton?.focus();
            });

            this.down = new KeyPressedListener("ArrowDown", ()=>{
                const current = Number(this.prevFocus!.getAttribute("data-button"));
                const nextButton = Array.from(this.element!.querySelectorAll<HTMLButtonElement>("button[data-button]")).find((el)=>{
                    return Number(el.dataset.button) > current && !el.disabled;
                });
                nextButton?.focus();

            });
        }
    }
}