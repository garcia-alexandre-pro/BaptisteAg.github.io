var DownloadList = new Vue({ 
    el: '#downloadList',
    data: {
        Message: 'La machine n\'a pas encore fonctionné...',
        Link : '',
        LinkReceived : false,
        CopyButton : 'Copier le lien'
    }
});

$(document).ready(function () {
    $("#submit").click(function (e) {
        e.preventDefault();
        var lien = $("#link").val();
        if (lien !== "") {
            DownloadList.LinkReceived = false
            DownloadList.Message = 'En cours de déchiffrement...'
            $.getJSON(
                'https://api.alldebrid.com/v4/link/unlock?agent=LinkOk&apikey=yzDd2zmszOk2lDbxsyeb&link=' + lien,
                function (data) {
                    if (data.data !== undefined) {
                        DownloadList.Message = data.data.filename
                        DownloadList.Link = data.data.link
                        DownloadList.LinkReceived = true
                    } else {
                        DownloadList.Message = 'Erreur : Lien invalide/hébergeur non supporté'
                    }
                },
            );
        } else {
            DownloadList.Message = 'Il est ou le lien ?'
        }
    });
});

function copyLink() {
    let tempInput = document.createElement("input");
    tempInput.value = DownloadList.Link;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    DownloadList.CopyButton = 'Lien copié';
}