// om användare redan är inloggad och stänger webbläsaren så är man inloggad nästa gång man kommer tillbaka
if(window.location.href === "https://susannejt.github.io/Kanban/"){
    if(localStorage.getItem("inloggad") === "true"){
        window.location.href = "kanban.html";
    }
}

// här börjar kod för inloggning
function inLog(){
    let aNamn = document.getElementById("a-namn").value;
    let losen = document.getElementById("losen-ord").value;

    fetch("json/check.json")
    .then(function(resp) {
        return resp.json();
    })

    .then(function(data) {
        // lägger datan från json i variabel
        checkInlog = data;
        
        // loopar genom checkInlog å letar efter rätt användare
        for (x in checkInlog){
            // kollar om användarnamn och lösen stämmer i json
            if(checkInlog.some(item => item.anvandarnamn === aNamn) && checkInlog.some(item => item.losenord === losen)){
                localStorage.setItem("inloggad", true);
                window.location.href = "kanban.html";
            }else {
                document.getElementById("mess-inlog").innerHTML = "Fel användarnamn eller lösenord!";
            }
        }
    })

    .catch(err => {
        document.write(err);
        console.log(err);
    });
}
// funktion för att logga ut
function utLog(){
    localStorage.removeItem("inloggad");
    window.location.href = "index.html";
}