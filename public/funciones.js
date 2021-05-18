async function cargaArtistas() {
    await fetch('https://musicagratis.herokuapp.com/listaArtistas', {
            method: 'GET',
            mode: 'cors',
            headers: cabezera
        })
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data['results'].length; i++) {
                var tr =
                    `<option value="` + data['results'][i]._id + `">` + data['results'][i].nombre_artista + `</option>`;
                $("#dropArtistas").append(tr);
                $("#dropArtistaDisco").append(tr);
            }
        });
}

async function verDiscosArtista() {

    var id = $('#dropArtistas').val();
    if (idclon == id) {
        return false;
    }
    $("#dropDiscos").html("");
    idclon = id;
    await fetch('https://musicagratis.herokuapp.com/filtrarDiscoArtista/' + id, {
            method: 'GET',
            mode: 'cors',
            headers: cabezera,
        })
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data['results'].length; i++) {
                var tr =
                    `<option value="` + data['results'][i]._id + `">` + data['results'][i].nombre_disco + `</option>`;
                $("#dropDiscos").append(tr);
            }
        });
}



async function agregarGenero() {

    var genero = $('#txtNombreGenero').val();
    var dara = {
            'nombre_genero': genero
        }
        // alert('Hola');
    await fetch('https://musicagratis.herokuapp.com/nuevoGenero', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(dara)

        })
        .then(response => response.json())
        .then(data => {
            var res = data['results'].message;
            alert(res);
        })
        .catch(e => alert(e));
}