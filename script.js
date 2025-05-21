document.getElementById("cargar").addEventListener("click", pedirDatos);    

function pedirDatos() {
    document.getElementById("cargar").style.display = "none";

    // Cargar Dreamland (XML)
    let xhttp1 = new XMLHttpRequest();
    xhttp1.onload = function () {
        mostrarDreamland(this);
    }
    xhttp1.open("GET", "Dreamland.xml");
    xhttp1.send();

    // Cargar Badalona (JSON)
    let xhttp2 = new XMLHttpRequest();
    xhttp2.onload = function () {
        mostrarBadalona(this);
    }
    xhttp2.open("GET", "Badalona.txt");
    xhttp2.send();
}

function mostrarDreamland(xml) {
    // Parse XML response
    let xmlDoc = xml.responseXML;
    let jugadores = xmlDoc.getElementsByTagName("jugador");
    let equipo = xmlDoc.getElementsByTagName("equipo")[0];
    let nombreEquipo = equipo.getElementsByTagName("name")[0].textContent;
    let escudo = equipo.getElementsByTagName("image")[0].textContent;

    // Totales
    let totales = { puntos: 0, rebotes: 0, asistencias: 0, valoracion: 0 };

    let table = `
        <img src="${escudo}" height="50"><br>
        <b>${nombreEquipo}</b>
        <table>
        <thead>
            <tr>
                <th></th><th>NO.</th><th>JUGADOR</th><th>PTS</th><th>RT</th><th>AS</th><th>VAL</th>
            </tr>
        </thead>
        <tbody>
    `;

    for (let i = 0; i < jugadores.length; i++) {
        let jugador = jugadores[i];
        let foto = jugador.getElementsByTagName("foto")[0].textContent;
        let numero = jugador.getElementsByTagName("numero")[0].textContent;
        let nombre = jugador.getElementsByTagName("nombre")[0].textContent;
        let puntos = parseInt(jugador.getElementsByTagName("puntos")[0].textContent);
        let rebotes = parseInt(jugador.getElementsByTagName("rebotes")[0].textContent);
        let asistencias = parseInt(jugador.getElementsByTagName("asistencias")[0].textContent);
        let valoracion = parseInt(jugador.getElementsByTagName("valoracion")[0].textContent);

        totales.puntos += puntos;
        totales.rebotes += rebotes;
        totales.asistencias += asistencias;
        totales.valoracion += valoracion;

        table += `
            <tr>
                <td><img src="${foto}" height="40"></td>
                <td>${numero}</td>
                <td>${nombre}</td>
                <td>${puntos}</td>
                <td>${rebotes}</td>
                <td>${asistencias}</td>
                <td>${valoracion}</td>
            </tr>
        `;
    }
        
        table += `
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3"><b>Totales</b></td>
                <td>${totales.puntos}</td>
                <td>${totales.rebotes}</td>
                <td>${totales.asistencias}</td>
                <td>${totales.valoracion}</td>
            </tr>
        </tfoot>
        </table>
    `;

    document.getElementById("dreamland").innerHTML = table;
} 
    function mostrarBadalona(json) {
    let data = JSON.parse(json.responseText);
    let equipo = data.equipo;
    let jugadores = data.jugadores;

    let totales = { puntos: 0, rebotes: 0, asistencias: 0, valoracion: 0 };

    let table = `
        <img src="${equipo.escudo}" height="50"><br>
        <b>${equipo.nombre}</b>
        <table>
        <thead>
            <tr>
                <th></th><th>NO.</th><th>JUGADOR</th><th>PTS</th><th>RT</th><th>AS</th><th>VAL</th>
            </tr>
        </thead>
        <tbody>
    `;

    for (let i = 0; i < jugadores.length; i++) {
        let jugador = jugadores[i];
        totales.puntos += jugador.puntos;
        totales.rebotes += jugador.rebotes;
        totales.asistencias += jugador.asistencias;
        totales.valoracion += jugador.valoracion;

        table += `
            <tr>
                <td><img src="${jugador.foto}" height="40"></td>
                <td>${jugador.numero}</td>
                <td>${jugador.nombre}</td>
                <td>${jugador.puntos}</td>
                <td>${jugador.rebotes}</td>
                <td>${jugador.asistencias}</td>
                <td>${jugador.valoracion}</td>
            </tr>
        `;
    }

    table += `
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3"><b>Totales</b></td>
                <td>${totales.puntos}</td>
                <td>${totales.rebotes}</td>
                <td>${totales.asistencias}</td>
                <td>${totales.valoracion}</td>
            </tr>
        </tfoot>
        </table>
    `;

    document.getElementById("badalona").innerHTML = table;
}
