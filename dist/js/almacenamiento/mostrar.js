(function() {

    const config = {
        apiKey: "AIzaSyD41kp9ZBPJDX7-yfQJeAY_iajN0NiKZC0",
        authDomain: "compiladore2.firebaseapp.com",
        databaseURL: "https://compiladore2.firebaseio.com",
        projectId: "compiladore2",
        storageBucket: "compiladore2.appspot.com",
        messagingSenderId: "743813730441"
      };
      firebase.initializeApp(config);
      const preObject = document.getElementById('objeto')
      const ulList = document.getElementById('lecciones');
      

      const dbRefObject = firebase.database().ref().child('objeto');
      const dbRefList = dbRefObject.child('habilidades');
      const dbLenccion = dbRefObject.child('leccion');
      //dbRefObject.on('value',snap =>{preObject.innerHTML = JSON.stringify(snap.val(),null,3)});
      dbRefList.on('child_added',snap=> {
          const tr = document.createElement('tr');
          const th = document.createElement('th');
          const th2 = document.createElement('th');
          const button = document.createElement('a');
          th.innerText = snap.val().titulo ;
          th.id = snap.key;
          button.id = snap.key;
          button.className ="waves-effect waves-light btn";
          button.innerText = "practicar";
          button.href ="practica.html";
          button.type ="submit";
          button.onclick = function(){
              console.log(snap.key);
            fnProcesaPaciente (snap.key,dbLenccion);
          };
          th2.appendChild(button);
          tr.appendChild(th);
          tr.appendChild(th2);
          ulList.appendChild(tr);
          
      });

    dbRefList.on('child_changed',snap=> {
        const liChanged =document.getElementById('snap.key');
        liChanged.innerText = snap.val()
    });

    dbRefList.on('child_changed',snap=> {
        const liChanged =document.getElementById('snap.key');
        liChanged.innerText = snap.val()
    });

    dbRefList.on('child_removed',snap=> {
        const liToremove =document.getElementById('snap.key');
        liToremove.remove();
    });

}());

function fnProcesaPaciente(comp,bd){
    
    bd.set({
        leccion:comp, 
  });

}


