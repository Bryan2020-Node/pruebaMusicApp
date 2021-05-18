async function agregarDisco() {

    var nombre = $('#txtDisco').val();
    var anio = $('#txtAnio').val();
    var artista = $('#dropArtistaDisco').val();
    var url = $('#txtUrlDisco').val();
    var dara = {
            'nombre_disco': nombre,
            'idartista': artista,
            'urlPortada': url,
            'anio': anio,
            'artista': artista
        }
        // alert('Hola');
    await fetch('https://musicagratis.herokuapp.com/nuevoDisco', {
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