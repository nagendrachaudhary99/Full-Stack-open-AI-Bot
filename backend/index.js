import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app=express();
const port=3000;
app.use(bodyParser.json());

app.use(cors());

const openai = new OpenAI({
    organization: "org-Wst3W6xz30Mmkj5s5F4JdNsU",
    apiKey: "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"
});
app.post("/", async(request, response)=>{
    const {chats} =request.body;
    console.log("heart");

    const result=await openai.chat.completions.create({
        model:"gpt-4o",
        messages:[{
            role:"assistant",
            content:"You are NagendraGPT. You can write emails and letter"

        },
        ... chats
    ],
    });
  
    response.json({
     
           output:result.choices[0].message.content,


    })
    
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);

})