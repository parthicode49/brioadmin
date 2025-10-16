import React from "react"
export  const formStructure=[
    {
        id:"1",
        type:"inputBox",
        maxLength:30,
        title:"Avatar Name",
        name:"avatarName",
        required:true
    },
    {
        id:"4",
        type:"image",
        title:"Upload Image",
        name:"avatarImage",
        subtitle:"(Resolution : 512px x 512px) *",
        subsubtitle:"Max File Size 1MB",
        subsubsubtitle:"Support only JPG,PNG,JPEG",
    },
    {
        id:"6",
        type:"button",
        title:"Create",
        
    }
]