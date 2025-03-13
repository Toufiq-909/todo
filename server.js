const exp=require('express');
const cheerio=require('cheerio');
const cors = require('cors');
const jwt=require('jsonwebtoken')
let JWT_SECERT="ASDF";
let app=exp();

app.use(cors());
app.use(exp.json()); // Middleware for JSON parsing
let username="";

const fs=require("fs");
let data=JSON.parse(fs.readFileSync("db.json","UTF-8"));
app.get("/",(req,res)=>{
    console.log("do we get the requeses")

    let n=req.query.id;
    let p=req.query.p;
    for(let j=0;j<data.length;j++)
    {
        if(data[j].id===n)
        {
            username=n;
            console.log("username"+username)
            if(data[j].password===p)
            {
                let token=jwt.sign({
                    username:n
                },JWT_SECERT)
                let a=data[j].tasks;
                let dom=cheerio.load(fs.readFileSync('list.html','utf-8'))
                for(let i=0;i<a.length;i++)
                {

                    dom('#po').attr('style','opacity:1')
                    dom('.list').append("<div class='new' style='display:flex;align-items:center;border-radius:10px;height:56.8px;width:320px;background-color:#074799'><input class='me' style='width:15px;height:15px;margin-right:10px;margin-left:10px;' type='checkbox'><p class='wemen' style='font-family:Quintessential;color:white;display:inline'>"+a[i]+"</p><button class='men' style='font-family:Quintessential;color:white;border:2px solid white;width:32px;height:32px;margin:0;margin-left:180px;display:flex;align-items:center;justify-content:center'> x</button></div>")
                }

               return res.status(200).json({
                   token:token,
                   doc:dom.html()
               })

            }
            else
            {
                return res.status(401).send("invlaid password")
            }

        }
    }
    return res.sendStatus(409);




});
app.put("/add",(req,res)=>{
    console.log("i got the reques");
    let jk=req.headers.a;
    let gh=jwt.verify(jk,JWT_SECERT);
    let me=gh.username;
    let c=req.body.task;

    console.log(c)
    for(let i=0;i<data.length;i++)
    {
        if(data[i].id===me)
        {
         
            data[i].tasks.push(c)
            console.log(data)
            fs.writeFileSync("db.json",JSON.stringify(data));
            return res.sendStatus(200)
        }
    }
    return res.send("somethinbg wrong")
})
app.put("/check",(req,res)=>{

    let jk=req.headers.a;
    let gh=jwt.verify(jk,JWT_SECERT);
    let a=gh.username;
    let b=req.body.task;
    console.log(a)
    console.log(b)
    for(let i=0;i<data.length;i++)
    {
        if(data[i].id===a)
        {
            data[i].check.push(b);
            fs.writeFileSync("db.json",JSON.stringify(data));
            return res.sendStatus(200)
        }
    }
})
app.put("/uncheck",(req,res)=>{
    let jk=req.headers.a;
    let gh=jwt.verify(jk,JWT_SECERT);
    let a=gh.username;
    let b=req.body.task;
    console.log(a)
    console.log(b)
    for(let i=0;i<data.length;i++)
    {
        if(data[i].id===a)
        {
            let op;
            for(let k=0;k<data[i].check.length;k++)
            {
                if(data[i].check[k]===b)
                {
                    op=k;
                    break;
                }
            }
            data[i].check.splice(op,1);
            fs.writeFileSync("db.json",JSON.stringify(data));
            return res.sendStatus(200)
        }
    }

});
app.get("/data",(req,res)=>{
    let jk=req.headers.a;
    let gh=jwt.verify(jk,JWT_SECERT);
    let me=gh.username;


    for(let i=0;i<data.length;i++)
    {
        if(data[i].id===me)
        {
            res.send(data[i].check)
        }
    }

})
app.delete("/remove",(req,res)=>{
    let jk=req.headers.a;
    let gh=jwt.verify(jk,JWT_SECERT);
    let a=gh.username;
    for(let i=0;i<data.length;i++)
    {
        if(data[i].id===a)
        {
            data[i].tasks=[];
            data[i].check=[];
            fs.writeFileSync("db.json",JSON.stringify(data));
           return res.sendStatus(200);
        }
    }
})
app.put('/rm',(req,res)=>{
    let jk=req.headers.a;
    let gh=jwt.verify(jk,JWT_SECERT);
    let a=gh.username;
    let b=req.body.task;
    for(let i=0;i<data.length;i++)
    {
        if(data[i].id===a)
        {
            let ki;
            for(let k=0;k<data[i].tasks.length;k++)
            {
                if(data[i].tasks[k]===b)
                {
                    ki=k;
                }
            }
            data[i].tasks.splice(ki,1);
            let kj;
            for(let k=0;k<data[i].check.length;k++)
            {
                if(data[i].check[k]===b)
                {
                    kj=k;
                }
            }
            data[i].check.splice(kj,1);
            fs.writeFileSync('db.json',JSON.stringify(data))

        }
    }
})
app.post("/new",(req,res)=>{
    let a=req.body.id;
    let b=req.body.p;
    for(let i=0;i<data.length;i++)
    {
        if(data[i].id===a)
        {
            return res.sendStatus(409)
        }
    }
    console.log(b);
    let c={
        id:a,
        password:b,
        tasks:[],
        check:[]
    }
    console.log(c)
    data.push(c);
    fs.writeFileSync("db.json",JSON.stringify(data))
    let token=jwt.sign({
        username:a
    },JWT_SECERT)
    res.status(200).json({
        token:token
    });
});

app.listen("3000")
