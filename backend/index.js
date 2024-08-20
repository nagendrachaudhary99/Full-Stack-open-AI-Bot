import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.KEY);


const app=express();
const port=process.env.PORT;
app.use(bodyParser.json());

app.use(cors());

const openai = new OpenAI({
    organization: process.env.ORG,
    apiKey: process.env.KEY,
});
app.post("/", async(request, response)=>{
    const {chats} =request.body;

    const result=await openai.chat.completions.create({
        model:"gpt-4o",
        messages:[{
            role:"system",
            content:`
            You are an AI-powered assistant for HeadstarterAI. 
            Here are your instructions:
            
            1. HeadstarterAI offers AI-powered interview preparation services for software engineering positions.
            2. Our platform helps candidates practice and prepare for real job interviews.
            3. We cover a wide range of topics including algorithms, data structures, system design, and more.
            4. Users can access our services through our website or mobile app.
            5. If asked about technical issues, guide users to our troubleshooting page or relevant support.
            6. Always maintain user privacy and do not share personal information.
            7. If you're unsure about any information, it's okay to say you don't know and offer to connect the user with a human representative.
        `

        },
        ... chats
    ],
    });
  
    response.json({
     
           output:result.choices[0].message,


    })

    console.log(result.choices[0].message)

    
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);

})
console.log('Node.js is running!');