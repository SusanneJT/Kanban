// -------------------------------------------------------------------------------
// En liten check så man inte kan gå in via kanban.html utan att vara inloggad
if(window.location.href === "https://susannejt.github.io/Kanban/kanban.html"){
    if(localStorage.getItem("inloggad") === null){
        window.location.href = "index.html";
    }
}

// funktion för att logga ut
function utLog(){
    localStorage.removeItem("inloggad");
    window.location.href = "index.html";
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
    
//Denna funktion anropas när någon trycker på knappen 'skapa kort', 
//den valda kolumnen bifogas som parameter tillsammans med buttonid
function skapaKort(kolumnId) {

    // Div-element att fästas i vald kolumn
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
    
    // "Lägg till kort"-knapparna sätts ur funktion medan 
    // redigerbart formulär finns öppet
    BtnDisabled('ja');

    // Händelsehanterare för spara-knapp
    btnSpara.addEventListener('click', function() { 
        
        //Texten som användaren skrivit in lagras 
        var textIKort = kortText.value;

        //Tar bort div med "formulär"
        document.getElementById(kolumnId).removeChild(divForkortForm); 

        // "lägg till kort" tillåts igen
        BtnDisabled('nej');

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
        
        // "lägg till kort" tillåts igen
        BtnDisabled('nej');
    });
}

//Denna funktion skapar själva kortet
function visaKort(kolumnId, kortId, kortText) {

    //Ett unikt id för divven skapas med "kortId"
    var divId = "divForKort" + kortId;

    //Ett unikt id för paragrafen skapas med "kortId"
    var paraId = "paragraf" + kortId;

    // Div-element att fästas i vald kolumn
    var divForkort = document.createElement('div');
    divForkort.setAttribute('id', divId);
    document.getElementById(kolumnId).appendChild(divForkort);

    //Paragraf skapas i den nyskapade divven
    let paragraf = document.createElement('p'); 
    paragraf.setAttribute('id', paraId);
    paragraf.innerHTML =  kortText; 
    divForkort.appendChild(paragraf);

   // lagt till för att dra kort och gör så att paragrafen får .card
    paragraf.classList.add("card");
    divForkort.setAttribute("draggable", true);
    divForkort.addEventListener('dragstart', function(e) {

        drag(event);   
    
    })
  
 paragraf.addEventListener('click', function() { 
        andraKort(kortId);
    });
}

   // flytta kort function

   function allowDrop(ev) {
    ev.preventDefault();
   
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    sparaFlytt(ev.target.id, data);
  }

//När någon klickar på ett kort anropas denna funktion för ändring
function andraKort(kortId) {

    // om annat formulär finns öppet ska inte ändrings-signalen fångas upp
    if (document.getElementsByClassName("btnDisabled")[0].disabled === true) {
        return;
    }
    
    //Divnamn för valt kort lagras till divNamn
    var divNamn = "divForKort" + kortId;

    //Paragraf-id i valt kort lagras till paragrafId
    var paragrafID = "paragraf" + kortId;

    // Skapar textarea i vald div för att kunna ändra
    var kortText = document.createElement('TEXTAREA');
    kortText.setAttribute('id', 'idKort');
    kortText.setAttribute('rows', '10');
    document.getElementById(divNamn).appendChild(kortText);  

    //Den gamla texten hämtas med hjälp av id från p och läggs in i ändringsrutan
    kortText.value = document.getElementById(paragrafID).innerHTML;    

    //Gamla paragrafen döljs
    document.getElementById(paragrafID).hidden = true; 

    // Spara ändringar knapp
    var btnSparaAndringar = document.createElement('BUTTON');
    btnSparaAndringar.setAttribute('id', 'btnSparaAndringar');
    btnSparaAndringar.innerHTML = 'Spara ändringar'; 
    document.getElementById(divNamn).appendChild(btnSparaAndringar);

    // Ångra ändringar knapp
    var btnAngraAndringar = document.createElement('BUTTON');
    btnAngraAndringar.setAttribute('id', 'btnAngraAndringar');
    btnAngraAndringar.innerHTML = 'Ångra ändringar'; 
    document.getElementById(divNamn).appendChild(btnAngraAndringar);
  
        
    // "Lägg till kort"-knapparna sätts ur funktion medan 
    // redigerbart formulär finns öppet
    BtnDisabled('ja');

    // Händelsehanterare för Spara ändringar-knapp
    btnSparaAndringar.addEventListener('click', function() { 
              
        // ta bort formulär för ändring
        document.getElementById(divNamn).removeChild(idKort);
        document.getElementById(divNamn).removeChild(btnSparaAndringar); 
        document.getElementById(divNamn).removeChild(btnAngraAndringar); 

        //Texten som användaren skrivit in lagras 
        var textIKort = kortText.value;
        
        //Innehållet från localstorage hämtas och görs om till array
        var hamtaLocalStorage = localStorage.getItem("lsKort");
        var hamtadeKort = JSON.parse(hamtaLocalStorage );
        
        //kort lagrar alla kort tillfälligt
        var kort = [];
        
        //'hämtade' kort sparas till arrayn kort
        for (i=0; i<hamtadeKort.length; i++) {
        
            if (hamtadeKort[i].kortId === kortId) {
                hamtadeKort[i].text = textIKort;
            } 
            kort[i] = hamtadeKort[i]
        }

        //Hela arrayn kort lagras om till local storage
        localStorage.setItem("lsKort", JSON.stringify(kort));
        
        //Den existerande paragrafen ändras och visas igen
        document.getElementById(paragrafID).innerHTML = textIKort;
        document.getElementById(paragrafID).hidden = false; 
    
        // "lägg till kort" tillåts igen
        BtnDisabled('nej');
    });
    
    // Händelsehanterare för Ångra ändringar-knapp
    btnAngraAndringar.addEventListener('click', function() { 

        // ta bort formulär för ändring
        document.getElementById(divNamn).removeChild(idKort);
        document.getElementById(divNamn).removeChild(btnSparaAndringar); 
        document.getElementById(divNamn).removeChild(btnAngraAndringar); 
      
        //Den ursprungliga paragrafen visas igen
        document.getElementById(paragrafID).hidden = false; 
        
        // "lägg till kort" tillåts igen
        BtnDisabled('nej');
    });
}

// funktion för att spärra vissa knappar medan ett formulär är öppet
// när forumläret är färdigbehandlat kan knapparna öppnas igen
// variabeln 'paragraf' kommer in med värde 'ja' eller 'nej'
function BtnDisabled(paragraf) {

    console.log("paragraf = " + paragraf);
    if (paragraf === 'ja') {
        document.getElementsByClassName("btnDisabled")[0].disabled = true;
        document.getElementsByClassName("btnDisabled")[1].disabled = true;
        document.getElementsByClassName("btnDisabled")[2].disabled = true;
        document.getElementsByClassName("btnDisabled")[3].disabled = true;
    } else {
        document.getElementsByClassName("btnDisabled")[0].disabled = false;
        document.getElementsByClassName("btnDisabled")[1].disabled = false;
        document.getElementsByClassName("btnDisabled")[2].disabled = false;
        document.getElementsByClassName("btnDisabled")[3].disabled = false;
    }

}

function sparaFlytt(targetId, data) {
    //Innehållet från localstorage hämtas och görs om till array
    var hamtaLocalStorage = localStorage.getItem("lsKort");
    var hamtadeKort = JSON.parse(hamtaLocalStorage );
    
    //kort lagrar alla kort tillfälligt
    var kort = [];
    
    var hittaDiv = [];
    

    //'hämtade' kort sparas till arrayn kort
    for (i=0; i<hamtadeKort.length; i++) {

        hittaDiv[i] = "divForKort" + hamtadeKort[i].kortId
        if (hittaDiv[i] === data && targetId != "") {
            hamtadeKort[i].kolumnNamn = targetId;
        } 
        kort[i] = hamtadeKort[i]
    }

    //Hela arrayn kort lagras om till local storage
    localStorage.setItem("lsKort", JSON.stringify(kort));
}