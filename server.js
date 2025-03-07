const exp=require('express');
const cheerio=require('cheerio');
let app=exp();
const cors = require('cors');

app.use(cors());
app.use(exp.json()); // Middleware for JSON parsing


const fs=require("fs");
let data=JSON.parse(fs.readFileSync("db.json","UTF-8"));
app.get("/",(req,res)=>{

    let n=req.query.id;
    let p=req.query.p;
    for(let j=0;j<data.length;j++)
    {
        if(data[j].id===n)
        {
            if(data[j].password===p)
            {
                let a=data[j].tasks;
                let dom=cheerio.load(fs.readFileSync('list.html','utf-8'))
                for(let i=0;i<a.length;i++)
                {

                    dom('#po').attr('style','opacity:1')
                    dom('.list').append("<div class='new' style='display:flex;align-items:center;border-radius:10px;height:56.8px;width:320px;background-color:#074799'><input class='me' style='width:15px;height:15px;margin-right:10px;margin-left:10px;' type='checkbox'><p class='wemen' style='font-family:Quintessential;color:white;display:inline'>"+a[i]+"</p><button class='men' style='font-family:Quintessential;color:white;border:2px solid white;width:32px;height:32px;margin:0;margin-left:180px;display:flex;align-items:center;justify-content:center'> x</button></div>")
                }

               return res.send(dom.html())
            }
            else
            {
               return res.send("Invalid password");
            }
        }
    }
     return res.send("Invalid username if your a new user click on create account");



});
app.put("/add",(req,res)=>{
    console.log("i got the reques");
    let a=req.body.id;
    console.log(a)
    let c=req.body.task;

    console.log(c)
    for(let i=0;i<data.length;i++)
    {
        if(data[i].id===a)
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

    let a=req.body.id;
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
    let a=req.body.id;
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
    for(let i=0;i<data.length;i++)
    {
        if(data[i].id===req.query.id)
        {
            res.send(data[i].check)
        }
    }

})
app.delete("/remove",(req,res)=>{
    for(let i=0;i<data.length;i++)
    {
        if(data[i].id===req.body.id)
        {
            data[i].tasks=[];
            data[i].check=[];
            fs.writeFileSync("db.json",JSON.stringify(data));
           return res.sendStatus(200);
        }
    }
})
app.put('/rm',(req,res)=>{
    let a=req.body.id;
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
app.listen("3000")
