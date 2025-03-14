async function login() {
    let x = document.querySelector("#u").value;
    let y = document.querySelector("#p").value;
    let a=await fetch("https://toduslist.netlify.app/new",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(
            {id:x,
                p:y}
        )
    })
    if(a.ok)
    {
        let bl=await a.json();
        localStorage.setItem('tt',bl.token)
        window.location.href="list.html"
    }
    else
    {
        let dg=document.createElement("p");
        setTimeout(()=>{
            document.querySelector("body").removeChild(dg);
    },5000)
        dg.innerHTML="This username is already in use. Let's try something else";
        dg.style.color="white";
        dg.style.fontSize="26px";
        dg.style.textAlign="right"
        dg.style.marginRight="94px"
        dg.style.marginTop="1px"
        dg.style.fontWeight="bold"
        dg.style.fontFamily="Quintessential";
        document.querySelector("body").appendChild(dg);

    }


}