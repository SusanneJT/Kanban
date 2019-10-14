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

//NyttKort();
/*
AendraKortText("4","Denna text skickades med", 0);

//Funktion för att skapa nytt kort

function NyttKort(kategori) {

    console.log("inne i NyttKort-funktionen");

    // Div-element att fästas på befintlig html
    var divContainer = document.getElementById("container");
    var kortInfo = document.createElement('div');
    kortInfo.setAttribute('id', 'idKortInfo');
    divContainer.appendChild(kortInfo);

    // Formulär för kort
    var kortForm = document.createElement('FORM');
    kortForm.setAttribute('id', 'idForm');
    kortInfo.appendChild(kortForm); 

    // Redigerbar area för text
    var kortText = document.createElement('TEXTAREA');
    kortText.setAttribute('id', 'idKort');
    kortText.setAttribute('rows', '10');
    kortForm.appendChild(kortText);
    
    // Spara-knapp
    var btnSpara = document.createElement('BUTTON');
    btnSpara.setAttribute('id', 'btnSpara');
    btnSpara.innerHTML = 'Spara kort'; 
    kortForm.appendChild(btnSpara);
        
    // Händelsehanterare för spara-knapp
    btnSpara.addEventListener('click', function() { 

        // lägg till nytt kort 
        console.log("klickat på spara-knappen");
    });

    // Avsluta-knapp
    var btnAvsluta = document.createElement('BUTTON');
    btnAvsluta.setAttribute('id', 'btnAvsluta');
    btnAvsluta.innerHTML = 'Avsluta'; 
    kortForm.appendChild(btnAvsluta);
    
    // Händelsehanterare för avsluta-knapp
    btnAvsluta.addEventListener('click', function() { 
        kortInfo.removeChild(kortForm); 
    });
}

//Funktion för att ändra text på befintligt kort
function AendraKortText(kategori, text, ind) {

    // Div-element att fästas på befintlig html
    var divContainer = document.getElementById("container");
    var kortInfo = document.createElement('div');
    kortInfo.setAttribute('id', 'idKortInfo');
    divContainer.appendChild(kortInfo);

    // Formulär för kort
    var kortForm = document.createElement('FORM');
    kortForm.setAttribute('id', 'idForm');
    kortInfo.appendChild(kortForm); 

    // Redigerbar area för text
    var kortText = document.createElement('TEXTAREA');
    kortText.setAttribute('id', 'idKort');
    kortText.setAttribute('rows', '10');
    kortText.innerText = text;
    kortForm.appendChild(kortText);
    
    // Spara-knapp
    var btnSpara = document.createElement('BUTTON');
    btnSpara.setAttribute('id', 'btnSpara');
    btnSpara.innerHTML = 'Spara kort'; 
    kortForm.appendChild(btnSpara);
        
    // Händelsehanterare för spara-knapp
    btnSpara.addEventListener('click', function() { 
        console.log("klickat på spara-knappen");
        kortText.innerText = "texten har härmed ändrats";
        // Ta bort gammal post
        // Lägg dit ny post
        kortInfo.removeChild(kortForm); 
    });

    // Avsluta-knapp
    var btnAvsluta = document.createElement('BUTTON');
    btnAvsluta.setAttribute('id', 'btnAvsluta');
    btnAvsluta.innerHTML = 'Ångra'; 
    kortForm.appendChild(btnAvsluta);
    
    // Händelsehanterare för avsluta-knapp
    btnAvsluta.addEventListener('click', function() { 
        console.log("klickat på avsluta-knappen");
        kortInfo.removeChild(kortForm); 
    });
}

//Funktion för att ändra text på befintligt kort
function AendraKortKategori(kategori, text, ind) {

    // Ta bort gammal post
    // Lägg dit ny post
}

function LaesKort(ind) {
    fetch ("json/kort.json")
    .then (function(kortfil) {    
        return kortfil.json();                 
    })
    .then (function(kortfil) { 
        var korttext = kortfil[ind].korttext;
        ByggFormUppdatering(korttext, ind);                  
    })
    .catch(function(staderror) {
        console.log("fel vid inläsning av kort");
    });
}

function SkrivFil() {
    console.log("inne i NyttKort:");
    fetch ("json/kort.json", {
        method: 'POST', 
        headers: {
         //   'Accept':'application/json, text/plain, ',
            'Content-Type':'application/json'
            
        }, 
        body:JSON.stringify({
            kategori:"kategoritext", korttext:"testtext i ftech"})
    })
    .then (function(kortfil) {    
        return kortfil.json();                 
    })
    .then (function(kortfil) { 
        console.log ("efter post-fetch:");
        console.log(kortfil);                
    })
    .catch(function(staderror) {
        console.log("fel vid skapande av kort");
    });
}*/