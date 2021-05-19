var DownloadList = new Vue({
    el: '#downloadList',
    data: {
        Message: 'La machine n\'a pas encore fonctionné...',
        CopyButton: 'Copier le lien',
        Link: null,
        LinkReceived: false
    }
});

var StreamingList = new Vue({
    el: '#streamingList',
    data: {
        Message: 'La machine n\'a pas encore fonctionné...',
        Id: null,
        LinkClear: null,
        QualitysList: [],
        SubtitlesList: [],
        VisiblePlayer: false,
        StreamQualityReceived: false
    },
    methods: {
        getLink: function () {
            $.getJSON(
                'https://api.alldebrid.com/v4/link/streaming?agent=LinkOk&apikey=yzDd2zmszOk2lDbxsyeb&id=' + StreamingList.Id + '&stream=' + $("#streamqual").val(),
                function (data) {
                    StreamingList.LinkClear = data.data.link
                    StreamingList.StreamQualityReceived = false
                    DownloadList.LinkReceived = false
                    StreamingList.VisiblePlayer = true
                    StreamingList.Message = 'Pour changer de qualité, le lien doit être re générer.'
                    DownloadList.Message = 'Pour télécharger le ficher, le lien doit être re générer.'
                },
            )
        }
    },
    updated: function () {
        if (typeof videoplayer === 'undefined' && StreamingList.VisiblePlayer) {
            this.$nextTick(function () {
                var videoplayer = videojs('videoplayer');
            })
        }
    }
});

$(document).ready(function () {
    $("#submitlink").click(function (e) {
        e.preventDefault();
        var lien = $("#linkInput").val();
        if (lien !== "") {
            DownloadList.LinkReceived = false
            DownloadList.CopyButton = 'Copier le lien'
            DownloadList.Message = 'En cours de déchiffrement...'
            StreamingList.Message = 'En cours de déchiffrement...'
            $.getJSON(
                'https://api.alldebrid.com/v4/link/unlock?agent=LinkOk&apikey=yzDd2zmszOk2lDbxsyeb&link=' + lien,
                function (data) {
                    if (data.data !== undefined) {
                        DownloadList.Message = data.data.filename
                        DownloadList.Link = data.data.link
                        DownloadList.LinkReceived = true
                        if (data.data.streams !== undefined) {
                            StreamingList.VisiblePlayer = false
                            StreamingList.Message = "Qualité et langue (qual-lang) :"
                            StreamingList.QualitysList = []
                            StreamingList.QualitysList.push(data.data.streams)
                            StreamingList.SubtitlesList.push(data.data.subtitles)
                            StreamingList.Id = data.data.id
                            StreamingList.StreamQualityReceived = true
                        } else {
                            StreamingList.Message = 'Erreur : Streaming non supporté'
                        }
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