import { createApp, h, withModifiers } from "vue";

import Account from "./../components/account/Account.vue"

export class Hud{

    element?: HTMLDivElement;
    username?: string;
    //user: User;
    constructor(username: string| null=null){
        this.username = username!;
        
        
        /* this.user = stateWallet.getUser;
        
        
       
        watch(this.user,(newUser,OldUser)=>{
            debugger
            if(newUser.username){
                console.log("hub", this.username);
                this.username=newUser.username;
                this.createElement();
            }
        }) */
    }

    update(){
        
        
        /* this.scoreboards.forEach((s)=>{
            //update me
            s.update(window.playerState.pizzas[s.id]);
        }); */
    }

    setUsername(username: string){
        this.username= username;
    }

    createElement(){
        

        /* if(this.element ){
            this.element.remove();
        } */
        this.element= document.createElement("div");
        
        this.element.classList.add("Hud");
        this.element.innerHTML=(``);
        createApp(Account).mount(this.element);

        //const {playerState} = window;
        //if(this.username){
            /* const vnode = h('button', {
                onClick: withModifiers(() => {
                  alert("Hola manito")
                }, ['stop', 'prevent'])
              },'Clicame');
              
              const C = { 
                name: 'C',
                data() {
                  return { foo: 'bar' }
                },
                render() {
                  return vnode;
                }
              } */
              
            /* this.element.innerHTML=(`
                <p class="Combatant_name">${this.username}</p>
                
                `); */
                
                /* <p class="Combatant_level"></p>
                <svg viewBox="0 0 26 2" class="Combatant_xp-container">
                    <rect x="0" y="0" width="0%" height="1" fill="#ffd76a" />
                    <rect x="0" y="1" width="0%" height="1" fill="#ffc934" />
                </svg>
                <p class="Combatant_status"></p> */
                //createApp(Account).mount(this.element);
        /* }else{
            this.element.innerHTML=(``);
        } */
        
        


        this.update();


    }


    init(container: HTMLDivElement){
        this.createElement();
        container.appendChild(this.element!);

        document.addEventListener("PlayerStateUpdated", ()=>{
            
            this.update();
        });
        /*

        document.addEventListener("LineupChanged", ()=>{
            this.createElement();
            container.appendChild(this.element!);
        }); */

    }
}