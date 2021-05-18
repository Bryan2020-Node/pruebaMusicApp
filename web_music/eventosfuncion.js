function verModalGenero() {
    $('#modalGeneros').modal('show');
}


function verModalArtista() {
    $('#txtArtista').val(null);
    $('#txtVocalista').val(null);
    $('#dropGeneroArt').val(1);
    $('#modalArtistas').modal('show');
    verGeneros();
}

function verModalDiscos() {
    $('#txtDisco').val(null);
    $('#txtAnio').val(null);
    $('#dropArtistaDisco').val(1);
    $('#txtUrlDisco').val(null);
    $('#modalDiscos').modal('show');
}