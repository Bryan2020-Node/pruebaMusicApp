async function cargaCanciones() {
    await fetch('https://musicagratis.herokuapp.com/listaCanciones', {
            method: 'GET',
            mode: 'cors',
            headers: cabezera
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data['results']);
            // console.log(data['results'][0].iddisco.nombre_disco);
            for (var i = 0; i < data['results'].length; i++) {
                var tr =
                    `<tr>
                        <td class="value"><img width="100" src="`  + data['results'][i].iddisco.urlPortada + `"</td>
                        <td>` + data['results'][i].titulo + `</td>
                        <td>` + data['results'][i].iddisco.nombre_disco + `</td>
                        <td>` + data['results'][i].idartista.nombre_artista + `</td>
                        <td style="display: none;">` + data['results'][i].urlSong + `</td>
                    </tr>`;
                $("#tblCanciones").append(tr);

                $(".value").click(function () {
                    var _title = $(this).parents("tr").find("td")[1].innerHTML;
                    var _url = '';
                    _url = $(this).parents("tr").find("td")[4].innerHTML;
                    title = _title;
                    canciones = [];
                    console.log(_url);
                    canciones.push(_url);
                    loadMusic(canciones[0]);
                    togglePlay();
                    // toggleIcon();
                    $('#modalPlaySong').modal('show');
                });
            }
        });
}
