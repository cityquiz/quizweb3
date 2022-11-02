window.PizzaTypes = {
    normal: "normal",
    apicy: "apicy",
    veggie: "veggie",
    fungi: "fungi",
    chill: "chill"
}


window.Pizzas = {
    "s001": {
        name:"Slice Samurai",
        description: "Pizza desc here",
        type: PizzaTypes.apicy,
        src: "/images/characters/pizzas/s001.png",
        icon: "/images/icons/spicy.png",
        actions: ["saucyStatus", "clumsyStatus", "damage1"]
    },
    "s002": {
        name:"Bacon Brigade",
        description: "A salty warrior who fears nothing",
        type: PizzaTypes.apicy,
        src: "/images/characters/pizzas/s002.png",
        icon: "/images/icons/spicy.png",
        actions: ["saucyStatus", "clumsyStatus", "damage1"]
    },
    "v001": {
        name:"Call me kale",
        description: "Pizza desc here",
        type: PizzaTypes.veggie,
        src: "/images/characters/pizzas/v001.png",
        icon: "/images/icons/veggie.png",
        actions: ["damage1"]
    },
    "f001": {
        name:"Portobello",
        description: "Pizza desc here",
        type: PizzaTypes.fungi,
        src: "/images/characters/pizzas/f001.png",
        icon: "/images/icons/fungi.png",
        actions: ["damage1"]
    }

}