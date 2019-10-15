// -------------------------------------------------------------------------------
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
        
        // loopar genom json filen
        for (x in checkInlog){
            // kollar om användarnamn och lösen stämmer i json
            if(checkInlog.some(item => item.anvandarnamn === aNamn) && checkInlog.some(item => item.losenord === losen)){
                window.location.href = "kanban.html";
                //SkapaKort();
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

// -------------------------------------------------------------------------------
// här börjar kod för hantering av kort



// Funktion som kollar av vad som finns i local storage anropas
kollaLocalStorage();


//Funktionen går igenom localstorage och skapar kort
function kollaLocalStorage() {

    //Innehåll från "lskort" i localstorage hämtas
    var hamtaLocalStorage = localStorage.getItem("lsKort");
    
    //string från localstorage görs om till array
    var hamtadeKort = JSON.parse(hamtaLocalStorage );

    //Denna array lagrar tillfälligt alla kort från ls
    var kort = [];

    //Om ls inte är tomt
    if (hamtadeKort != null) {
        //För varje position i arrayn
        for (i=0; i<hamtadeKort.length; i++) {
            
            //kort med position från 'i' får värdet från "local storage"
            kort[i] = hamtadeKort[i] 

            //Funktion för att skapa ett kort anropas med parametrar för innehåll
            visaKort(kort[i].kolumnNamn, kort[i].kortId, kort[i].text);
        }
    }
}
    
    
    
//Denna funktion anropas när någon trycker på knappen 'skapa kort', den valda kolumnen bifogas som parameter
function skapaKort(kolumnId) {
    
    // Div-element att fästas i vald kolumn
    //var kolumnContainer = document.getElementById("kolumnId");
    var divForkortForm = document.createElement('div');
    divForkortForm.setAttribute('id', 'divForkortForm');
    document.getElementById(kolumnId).appendChild(divForkortForm);

    // Redigerbar area för text
    var kortText = document.createElement('TEXTAREA');
    kortText.setAttribute('id', 'idKort');
    kortText.setAttribute('rows', '10');
    divForkortForm.appendChild(kortText);

    // Spara-knapp
    var btnSpara = document.createElement('BUTTON');
    btnSpara.setAttribute('id', 'btnSpara');
    btnSpara.innerHTML = 'Spara kort'; 
    divForkortForm.appendChild(btnSpara);

    // Ångra-knapp
    var btnAngra = document.createElement('BUTTON');
    btnAngra.setAttribute('id', 'btnAngra');
    btnAngra.innerHTML = 'Ångra'; 
    divForkortForm.appendChild(btnAngra);


    // Händelsehanterare för spara-knapp
    btnSpara.addEventListener('click', function() { 
        
        //Texten som användaren skrivit in lagras 
        var textIKort = kortText.value;

        //Tar bort div med "formulär"
        document.getElementById(kolumnId).removeChild(divForkortForm); 

        //Innehållet från localstorage hämtas och görs om till array
        var hamtaLocalStorage = localStorage.getItem("lsKort");
        var hamtadeKort = JSON.parse(hamtaLocalStorage );

        //kort lagrar alla kort tillfälligt
        var kort = [];

        //raknare håller reda på hur många kort som finns och lägger det nyskapade sist i arrayn
        var raknare = 0;

        if (hamtadeKort != null) {

            //'hämtade' kort sparas till arrayn kort
            for (i=0; i<hamtadeKort.length; i++) {
                kort[i] = hamtadeKort[i]
                raknare ++;
            }
        }

        //Det aktuella kortet sparas till arrayn kort
        kort[raknare] = {kortId:raknare, text:textIKort, kolumnNamn:kolumnId};

        //Hela arrayn kort lagras om till local storage
        localStorage.setItem("lsKort", JSON.stringify(kort));

        //funktion för att skapa kortet anropas med data för kortet
        visaKort(kolumnId, kort[raknare].kortId, kort[raknare].text);
    });

    // Händelsehanterare för Ångra-knapp
    btnAngra.addEventListener('click', function() { 
        //Tar bort div med "formulär"
        document.getElementById(kolumnId).removeChild(divForkortForm); 
    });
}


function visaKort(kolumnId, kortId, kortText) {

    //Ett unikt id för divven skapas med "kortId"
    var divId = "divForKort" + kortId;

    // Div-element att fästas i vald kolumn
    //var kolumnContainer = document.getElementById("kolumnId");
    var divForkort = document.createElement('div');
    divForkort.setAttribute('id', divId);
    document.getElementById(kolumnId).appendChild(divForkort);

    //Paragraf skapas i den nyskapade divven
    let paragraf = document.createElement('p'); 
    paragraf.setAttribute('id', 'paragraf');
    paragraf.innerHTML =  kortText; 
    divForkort.appendChild(paragraf); 
}