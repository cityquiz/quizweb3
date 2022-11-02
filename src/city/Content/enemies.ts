import type { Enemy } from "../interfaces/Enemy"

export const Enemies = new Map<string, Enemy>()
    .set("erio",
    {
        name: "Erio",
        src: "/assets/images/characters/people/erio.png",
        questions:[
            {   
                id:"1",
                question: "Qual es tu nombre?",
                options: [
                    { response: "Michael", id: "a1" },
                    { response: "Rose", id: "a2" },
                    { response: "Rolando", id: "a3" },
                    { response: "Guzman", id: "a4" },

                ]
            },
            {
                id:"2",
                question: "Capital de italia?",
                options: [
                    { response: "Milano", id: "a5" },
                    { response: "Torino", id: "a6" },
                    { response: "Firenze", id: "a7" },
                    { response: "Roma", id: "a8" },

                ]
            },
        ]
    })
    .set("beth",
    {
        name: "Beth",
        src: "/assets/images/characters/people/npc1.png",
        questions:[
            {
                id:"3",
                question: "Cuba capital?",
                options: [
                    { response: "La habana", id: "a9" },
                    { response: "Los alamos", id: "a10" },
                    { response: "Lima", id: "a11" },
                    { response: "Santa fe", id: "a12" },

                ]
            },
            {
                id:"4",
                question: "Capital de italia?",
                options: [
                    { response: "Milano", id: "a15" },
                    { response: "Torino", id: "a6" },
                    { response: "Firenze", id: "a7" },
                    { response: "Roma", id: "a8" },

                ]
            },
        ]
    })
    
    /* {
    "erio": {
        name: "Erio",
        src: "/images/characters/people/erio.png",
        questions:[
            {   
                id:"1",
                question: "Qual es tu nombre?",
                options: [
                    { response: "Michael", id: "a1" },
                    { response: "Rose", id: "a2" },
                    { response: "Rolando", id: "a3" },
                    { response: "Guzman", id: "a4" },

                ]
            },
            {
                id:"2",
                question: "Capital de italia?",
                options: [
                    { response: "Milano", id: "a5" },
                    { response: "Torino", id: "a6" },
                    { response: "Firenze", id: "a7" },
                    { response: "Roma", id: "a8" },

                ]
            },
        ]
    },
    "beth": {
        name: "Beth",
        src: "/images/characters/people/npc1.png",
        questions:[
            {
                id:"3",
                question: "Cuba capital?",
                options: [
                    { response: "La habana", id: "a9" },
                    { response: "Los alamos", id: "a10" },
                    { response: "Lima", id: "a11" },
                    { response: "Santa fe", id: "a12" },

                ]
            },
            {
                id:"4",
                question: "Capital de italia?",
                options: [
                    { response: "Milano", id: "a15" },
                    { response: "Torino", id: "a6" },
                    { response: "Firenze", id: "a7" },
                    { response: "Roma", id: "a8" },

                ]
            },
        ]
    }
} */