
var loginForm = document.getElementById("main");

// skapar div för login form
let divLogin = document.createElement("div");
divLogin.setAttribute("id", "login-div");
loginForm.appendChild(divLogin);

// skapar input för användarnamn
let aNamn = document.createElement("input");
aNamn.setAttribute("type", "text");
aNamn.setAttribute("id", "a-namn");
aNamn.setAttribute("placeholder", "Användarnamn");
aNamn.setAttribute("autocomplete", "on");
divLogin.appendChild(aNamn);

// skapar input för lösenord
let losen = document.createElement("input");
losen.setAttribute("type", "password");
losen.setAttribute("id", "losen-ord");
losen.setAttribute("placeholder", "Lösenord");
divLogin.appendChild(losen);

// skapar login knapp
let loginBtn = document.createElement("button");
loginBtn.setAttribute("id", "login-knapp");
loginBtn.innerHTML = "Logga in";
divLogin.appendChild(loginBtn);

// skapar funktion för login knappen
loginBtn.addEventListener("click", function(){
    let aNamn = document.getElementById("a-namn").value;
    let losen = document.getElementById("losen-ord").value;
    //let checkInlog = [];

    fetch("json/check.json")
    .then(function(resp) {
        return resp.json();
    })

    .then(function(data) {
        // lägger datan från json i variabel
        checkInlog = data;
        
        // loopar genom json filen
        for (x in checkInlog){
            // kollar om användarnamn och lösen stämmer i json
            if(checkInlog.some(item => item.anvandarnamn === aNamn) && checkInlog.some(item => item.losenord === losen)){
                document.getElementById("mess-inlog").innerHTML = "Inloggad";
            }else {
                document.getElementById("mess-inlog").innerHTML = "Fel";
            }
        }
    })

    .catch(err => {
        document.write(err);
        console.log(err);
    });
});
// anrop av funktion som skapar kort
// SkapaKort();

// //Funktion för att skapa formulär
// function SkapaKort() {
//     //Skapar div-element att fästas på befintlig html
//     console.log("här byggs formuläret");
//     var divContainer = document.getElementById("container");
//     var kortInfo = document.createElement('div');
//     kortInfo.setAttribute('id', 'idContainer');
//     divContainer.appendChild(kortInfo);

//     //Skapar formulär för kort
//     var kortForm = document.createElement('FORM');
//     kortForm.setAttribute('id', 'idForm');
//     kortInfo.appendChild(kortForm); 

//     //Skapar input för kort
//     var kortText = document.createElement('TEXTAREA');
//     kortText.setAttribute('id', 'idKort');
//     kortText.setAttribute('rows', '10');
//     kortForm.appendChild(kortText);
    
//     //Skapar spara-knapp
//     let btnSpara = document.createElement('BUTTON');
//     btnSpara.setAttribute('id', 'btnSpara');
//     btnSpara.innerHTML = 'Spara kort'; 
//     kortForm.appendChild(btnSpara);

//     //Skapar händelsehanterare för spara-knapp
//     btnSpara.addEventListener('click', function() { 
//         // lägg post i kort.json

//         // hämta kategori från anropande funktion ???

//         // hämta kortets text från skärmen
//         var korttext = document.getElementById("idKort");

//         // skapa kortdata av text från skärmen
//         var kortPost = '{"kategori":"' + "1" + '"';
//         //var kortPost = '{"kategori":"' + idkort + '"';
//         kortPost += ', "korttext":"' + korttext + '"}';
//         console.log("färdigt för utskrift: ");
//         console.log(kortPost);
//     });

//     //Skapar avsluta-knapp
//     let btnAvsluta = document.createElement('BUTTON');
//     btnAvsluta.setAttribute('id', 'btnAvsluta');
//     btnAvsluta.innerHTML = 'Avsluta'; 
//     kortForm.appendChild(btnAvsluta);

//     //Skapar händelsehanterare för avsluta-knapp
//     btnAvsluta.addEventListener('click', function() { 
//         kortInfo.removeChild(kortForm); 
//     });
// }
