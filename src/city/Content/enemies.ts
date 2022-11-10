import type { Enemy } from "../interfaces/Enemy"

export const Enemies = new Map<string, Enemy>()
    .set("erio",
    {
        name: "Erio",
        src: "/assets/images/characters/people/erio.png",
        quiz_id:1,
        quiz_name:'Arquitectura Polkadot y Kusama',
        project_id: "1",
        project_name:'Polkadot',
        questions:[
            {
                id:"1",
                question: "¿Cuándo fue fundada la red de Polkadot?",
                response_correct_id: "a1",
                options: [
                    { response: "2017", id: "a1" },
                    { response: "2015", id: "a2" },
                    { response: "2018", id: "a3" },
                    { response: "202", id: "a4" },

                ]
            },
            {
                id:"2",
                question: "¿La red de Polkadot funciona de manera fragmentada?",
                response_correct_id: "a1",
                options: [
                    { response: "Verdadero", id: "a1" },
                    { response: "Falso", id: "a2" },
                ]
            },
            {
                id:"3",
                question: "¿Cuál es el protocolo de consenso para la Blockchain de Polkadot?",
                response_correct_id: "a3",
                options: [
                    { response: "Proof of work", id: "a1" },
                    { response: "Proof of state", id: "a2" },
                    { response: "Nominated proof of stake", id: "a3" },
                    { response: "Leased proof of stake", id: "a4" },

                ]
            },
            /* {
                id:"4",
                question: "Completa la frase: Kusama viene siendo una...",
                response_correct_id: "a4",
                options: [
                    { response: "Red popular", id: "a1" },
                    { response: "Red principal", id: "a2" },
                    { response: "Red de estimación", id: "a3" },
                    { response: "Red de prueba", id: "a4" },

                ]
            },
            {
                id:"5",
                question: "¿Qué son las Parachains de Polkadot?",
                response_correct_id: "a3",
                options: [
                    { response: "Son wallets centralizadas", id: "a1" },
                    { response: "Redes de interconexión de bloques", id: "a2" },
                    { response: "Son las redes de capa 1 que se conectarán a la Relay Chain principal", id: "a3" },
                    { response: "Es la tecnología implementada por Kusama", id: "a4" },

                ]
            },
            {
                id:"6",
                question: "¿Para qué participan distintos proyectos criptográficos en las subastas de Parachains?",
                response_correct_id: "a1",
                options: [
                    { response: "Para ganar 1 de los 100 slot", id: "a1" },
                    { response: "Para ganar 1000 DOTs", id: "a2" },
                    { response: "Para obtener promoción y tokens", id: "a3" },
                    { response: "Para ganar 100 slots", id: "a4" },

                ]
            },
            {
                id:"7",
                question: "¿Cuáles son los componentes similares que tienen el Kusama Blockchain y Polkadot?",
                response_correct_id: "a4",
                options: [
                    { response: "Descentralización y escalabilidad", id: "a1" },
                    { response: "Conectividad y adopción", id: "a2" },
                    { response: "Código y lenguaje de programación", id: "a3" },
                    { response: "Relay Chain y Parachains", id: "a4" },

                ]
            },
            {
                id:"8",
                question: "En Kusama, ¿cómo se llama el programa que permite a los validadores de la comunidad ascender en la jerarquía de la red?",
                response_correct_id: "a2",
                options: [
                    { response: "Network program validators", id: "a1" },
                    { response: "Thousand Validators", id: "a2" },
                    { response: "Facilities program Kusama", id: "a3" },
                    { response: "Validators Kusama flying", id: "a4" },

                ]
            },
            {
                id:"9",
                question: "¿Cómo se llama la hermandad de Kusama?",
                response_correct_id: "a3",
                options: [
                    { response: "Kusama Omega", id: "a1" },
                    { response: "Brothers Kusama Pi", id: "a2" },
                    { response: "Kappa Sigma Mu", id: "a3" },
                    { response: "Fans Kusama Plus", id: "a4" },

                ]
            },
            {
                id:"10",
                question: "¿Cuáles son las funciones en el Kusama red?",
                response_correct_id: "a1",
                options: [
                    { response: "Build, Validation, Join", id: "a1" },
                    { response: "Governance, Validation, Join", id: "a2" },
                    { response: "Consensus, Validation, Payment", id: "a3" },
                    { response: "Change, Action, Execution", id: "a4" },

                ]
            }, */                                                                                    
        ]
    })
    .set("beth",
    {
        name: "Beth",
        src: "/assets/images/characters/people/npc1.png",
        quiz_id:2,
        quiz_name:'Substrate of Polkadot',
        project_name:'Polkadot',
        questions:[
            {
                id:"1",
                question: "¿Qué es Substrate dentro de Polkadot?",
                response_correct_id: "a1",
                options: [
                    { response: "Una herramienta", id: "a1" },
                    { response: "Una conexión", id: "a2" },
                    { response: "Un sobrenombre", id: "a3" },
                    { response: "Una sidechain", id: "a4" },

                ]
            },
            {
                id:"2",
                question: "¿Cuáles son los 2 beneficios que trae Substrate a la red Polkadot?",
                response_correct_id: "a1",
                options: [
                    { response: "Concentración y enfoque", id: "a1" },
                    { response: "Apertura y modelado", id: "a2" },
                    { response: "Cambio y ayuda", id: "a3" },
                    { response: "Dinero y gasto", id: "a4" },                    
                ]
            },
            {
                id:"3",
                question: "¿Con qué blockchains posee Polkadot puentes de conexión?",
                response_correct_id: "a1",
                options: [
                    { response: "Bitcoin y Ethereum", id: "a1" },
                    { response: "Bitcoin y Conflux", id: "a2" },
                    { response: "Bitcoin y Near", id: "a3" },
                    { response: "Bitcoin y Cardano", id: "a4" },

                ]
            },
            {
                id:"4",
                question: "¿Qué evitan las actualizaciones dentro de la propia cadena de Polkadot?",
                response_correct_id: "a4",
                options: [
                    { response: "Comunidad dividida", id: "a1" },
                    { response: "Limpieza administrativa", id: "a2" },
                    { response: "Volatilidad de tokens", id: "a3" },
                    { response: "Todas las anteriores", id: "a4" },

                ]
            },
            {
                id:"5",
                question: "¿Qué proyecto es de Polkadot?",
                response_correct_id: "a1",
                options: [
                    { response: "Moonbeam", id: "a1" },
                    { response: "Astrochain", id: "a2" },
                    { response: "Nativo NFT", id: "a3" },
                    { response: "RioDefi", id: "a4" },

                ]
            },
            {
                id:"6",
                question: "¿Qué red debo usar para depositar DOT en mi wallet?",
                response_correct_id: "a3",
                options: [
                    { response: "Red ethereum", id: "a1" },
                    { response: "Red Parachain", id: "a2" },
                    { response: "Red Polkadot", id: "a3" },
                    { response: "Todas las anteriores", id: "a4" },

                ]
            },
            {
                id:"7",
                question: "¿Cuál es el mínimo de DOTs que debo tener para tener activo mi wallet?",
                response_correct_id: "a2",
                options: [
                    { response: "Nada", id: "a1" },
                    { response: "1 DOT", id: "a2" },
                    { response: "0.5 DOT", id: "a3" },
                    { response: "0.25 DOT", id: "a4" },

                ]
            },
            {
                id:"8",
                question: "En lugar de competir con otras cadenas, Polkadot busca:",
                response_correct_id: "a2",
                options: [
                    { response: "Cambiar su red", id: "a1" },
                    { response: "Conectarlas", id: "a2" },
                    { response: "Manejarlas", id: "a3" },
                    { response: "Liberarlas", id: "a4" },

                ]
            },
            {
                id:"9",
                question: "¿Polkadot es una red que conecta soluciones de qué tipo de capa?",
                response_correct_id: "a3",
                options: [
                    { response: "Capa universal", id: "a1" },
                    { response: "Capa dimensional", id: "a2" },
                    { response: "Capa 1", id: "a3" },
                    { response: "Capa testnet", id: "a4" },

                ]
            },
            {
                id:"10",
                question: "¿Cuál es el nombre del Token oficial dentro de la red de Polkadot?",
                response_correct_id: "a4",
                options: [
                    { response: "Ether", id: "a1" },
                    { response: "USDC", id: "a2" },
                    { response: "Polka", id: "a3" },
                    { response: "DOT", id: "a4" },

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