var jugadores = localStorage.getItem("jugadores");
jugadores = JSON.parse(jugadores);



document.getElementById("TablaR").innerHTML = "";
                
var tabla="<tr><th>NickName</th><th>Puntaje</th><th>Tiempo</th></tr><br>";
for(var i in jugadores){

    var jugador = JSON.parse(jugadores[i]);
        
    tabla += "<tr>";

    tabla += "<td>"+ jugador.Nombre + "</td>";
    tabla += "<td>"+ jugador.Puntaje +"</td>";
    tabla += "<td>"+ jugador.Tiempo + "</td>";
    
    tabla += "</tr>";

}
document.getElementById("TablaR").innerHTML = tabla;

