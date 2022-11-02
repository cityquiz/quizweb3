class SubmissionMenu{
    constructor({caster, enemy, onComplete, items, replacements}){
        this.caster= caster;
        this.enemy= enemy;
        this.replacements= replacements;
        this.onComplete= onComplete;
        
        
        let quentityMap = {};
        items.forEach((item) => {
            if(item.team === caster.team){
                let existing = quentityMap[item.actionId];
                if(existing){
                    existing.quantity += 1;
                }else {
                    quentityMap[item.actionId]={
                        actionId: item.actionId,
                        quantity: 1,
                        instanceId: item.instanceId
                    }
                }
            }
        });
        this.items = Object.values(quentityMap);
        console.log(this.items);
    }
    
    
    getPages(){
        const backOption= {
            label: "To Back",
            description: "Return to previus page",
            handler:()=>{
                this.keyboardMenu.setOptions(this.getPages().root);
            }
        }

        return {
            root: [
                {
                    label: "Attack",
                    description: "Choose an attack",
                    handler: ()=>{
                        // go items page .. 
                        //console.log("GO TO ATTACK PAGE")
                        this.keyboardMenu.setOptions(this.getPages().attacks);
                    },
                    
                },
                {
                    label: "Items",
                    description: "Choose an item",
                    //disabled: true,
                    handler: ()=>{
                        //see pizza options
                        this.keyboardMenu.setOptions(this.getPages().items);
                    }
                },
                {
                    label: "Swap",
                    description: "Change another pizza",
                    
                    handler: ()=>{
                        //see pizza options
                        this.keyboardMenu.setOptions(this.getPages().replacements);
                    }
                }
            ],
            attacks: [
                ...this.caster.actions.map((key)=>{
                    const action = Actions[key];
                    return {
                        label: action.name,
                        description: action.description,
                        handler: ()=>{
                            this.menuSubmit(action);
                        }
                    }
                }),
                backOption
            ],
            items: [
                ...this.items.map((item)=>{
                    const action = Actions[item.actionId];
                    return {
                        label: action.name,
                        description: action.description,
                        handler: ()=>{
                            this.menuSubmit(action, item.instanceId);
                        },
                        right: ()=>{
                            return `x${item.quantity}`;
                        }
                    }
                }),
                backOption
            ],
            replacements: [
                ...this.replacements.map((replacement)=>{
                    
                    return {
                        label: replacement.name,
                        description: replacement.description,
                        handler:()=>{
                            //swap me pizza in coach !
                            this.menuSubmitReplacement(replacement);
                        }
                    }
                }),
                backOption
            ]
        }
    }

    menuSubmitReplacement(replacement){
        this.keyboardMenu?.end();
        this.onComplete({
            replacement
        });
    }

    menuSubmit(action, instanceId=null){
        this.keyboardMenu?.end();

        this.onComplete({
            action,
            target: action.targetType === "friendly" ? this.caster :this.enemy,
            instanceId
        })
    }

    decide(){
        this.menuSubmit(Actions[this.caster.actions[0]]);
    }

    showMenu(container){
        this.keyboardMenu = new KeyboardMenu();
        this.keyboardMenu.init(container);
        this.keyboardMenu.setOptions(this.getPages().root);
    }

    init(container){
        if(this.caster.isPlayerControlled){
            //show some UI
            this.showMenu(container);
        }else{
            this.decide();
        }
    }
}