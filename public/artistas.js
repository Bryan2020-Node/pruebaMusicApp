async function verGeneros() {
    $("#dropGeneroArt").html("");
    await fetch('https://musicagratis.herokuapp.com/listaGeneros/', {
            method: 'GET',
            mode: 'cors',
            headers: cabezera,
        })
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data['results'].length; i++) {
                var tr =
                    `<option value="` + data['results'][i]._id + `">` + data['results'][i].nombre_genero + `</option>`;
                $("#dropGeneroArt").append(tr);
            }
        });
}

async function agregarArtista() {

    var artista = $('#txtArtista').val();
    var vocalista = $('#txtVocalista').val();
    var genero = $('#dropGeneroArt').val();
    var dara = {
        'nombre_artista': artista,
        'vocalista': vocalista,
        'idgenero': genero
    }
    await fetch('https://musicagratis.herokuapp.com/nuevoArtista', {
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