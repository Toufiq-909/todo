async function tasks()
{
    let a=document.querySelector("#u").value;
    let b=document.querySelector("#p").value;
    if(a==="")
    {
        alert("plz enter your username")
    }
    else
    {
        console.log("are we executing")
        let res=await fetch("https://toduslist.netlify.app/?id="+a+"&p="+b);
        if(res.status==200)
        {
            console.log("are we executing")
            let bh=await res.json();
            document.open();
            document.write(bh.doc);
            document.close();
            console.log(bh.id)
            localStorage.setItem('tt',bh.token)
            console.log(bh.token)


        }
        else if(res.status==401)
        {
           window.location.href="invalidpass.html"
        }
        else if(res.status==409){
            window.location.href="username.html"
        }

    }
}