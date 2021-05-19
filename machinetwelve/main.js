var DownloadList = new Vue({
    el: '#downloadList',
    data: {
        Message: 'La machine n\'a pas encore fonctionné...',
        Link: '',
        LinkReceived: false,
        CopyButton: 'Copier le lien'
    }
});

var StreamingList = new Vue({
    el: '#streamingList',
    data: {
        Message: 'La machine n\'a pas encore fonctionné...',
        Id: null,
        QualitysList: [],
        SubtitlesList: [],
        StreamClear: false,
        LinkClear: null,
        VisiblePlayer: false
    },
    methods: {
        getLink: function () {
            $.getJSON(
                'https://api.alldebrid.com/v4/link/streaming?agent=LinkOk&apikey=yzDd2zmszOk2lDbxsyeb&id=' + StreamingList.Id + '&stream=' + $("#streamqual").val(),
                function (data) {
                    StreamingList.LinkClear = data.data.link
                    StreamingList.VisiblePlayer = true
                    StreamingList.StreamReceived = false
                    DownloadList.LinkReceived = false
                    StreamingList.Message = 'Pour changer de qualité, le lien doit être re générer.'
                    DownloadList.Message = 'Pour télécharger le ficher, le lien doit être re générer.'
                },
            )
        }
    },
    updated: function () {
        this.$nextTick(function () {
            var videoplayer = videojs('videoplayer');
        })
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
                        StreamingList.Message = "Qualité et langue (qual-lang) :"
                        DownloadList.Link = data.data.link
                        StreamingList.QualitysList = []
                        StreamingList.QualitysList.push(data.data.streams)
                        StreamingList.SubtitlesList.push(data.data.subtitles)
                        StreamingList.Id = data.data.id
                        DownloadList.LinkReceived = true
                        StreamingList.StreamReceived = true
                        StreamingList.VisiblePlayer = false
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