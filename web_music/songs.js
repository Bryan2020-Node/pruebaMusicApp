async function agregarCancion() {

    var titulo = $('#txtTitulo').val();
    var url = $('#txtUrlSong').val();
    var artista = $('#dropArtistas').val();
    var disco = $('#dropDiscos').val();
    var dara = {
        'titulo': titulo,
        'urlSong': url,
        'iddisco': disco,
        'idartista': artista
    }
    await fetch('https://musicagratis.herokuapp.com/nuevaCancion', {
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
            $('#txtTitulo').val(null);
            $('#txtUrlSong').val(null);
            $('#dropArtistas').val(1);
            $('#dropDiscos').val(null);
        })
        .catch(e => alert(e));
}