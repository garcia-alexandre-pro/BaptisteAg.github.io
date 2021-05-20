var LinkSection = new Vue({
    el: '#linkSection',
    data: {
        Message: 'En attente du lien...',
        InputLink: null,
    },
    methods: {
        getLink: function () {
            vm = this
            if (vm.InputLink !== "") {
                DownloadList.LinkReceived = false
                DownloadList.CopyButton = 'Copier le lien'
                vm.Message = 'En cours de déchiffrement...'
                $.getJSON(
                    'https://api.alldebrid.com/v4/link/unlock?agent=LinkOk&apikey=yzDd2zmszOk2lDbxsyeb&link=' + vm.InputLink,
                    function (data) {
                        if (data.data !== undefined) {
                            vm.Message = 'OK'
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
        }
    }
})
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
        StreamQualityReceived: false,
        VisiblePlayer: false
    },
    methods: {
        getLink: function () {
            $.getJSON(
                'https://api.alldebrid.com/v4/link/streaming?agent=LinkOk&apikey=yzDd2zmszOk2lDbxsyeb&id=' + StreamingList.Id + '&stream=' + $("#streamqual").val(),
                function (data) {
                    if (typeof videoplayer === 'undefined') {
                        StreamingList.LinkClear = data.data.link
                        StreamingList.VisiblePlayer = true
                    } else {
                        videoplayer.src({ type: "video/mp4", src: data.data.link });
                    }
                    StreamingList.StreamQualityReceived = false
                    DownloadList.LinkReceived = false
                    StreamingList.Message = 'Pour changer de qualité/changer d\'épisode, la page doit étre rechargé (Réglé dans la prochaine maj).'
                    DownloadList.Message = 'Pour télécharger le ficher, le lien doit être re générer.'
                    $("#streamingList").css("width", "95vw")
                    document.querySelector('#streamingList').scrollIntoView({
                        behavior: 'smooth'
                    });
                },
            )
        }
    },
    updated: function () {
        if (typeof videoplayer === 'undefined') {
            this.$nextTick(function () {
                var videoplayer = videojs('videoplayerid').ready(function () {
                    this.hotkeys({
                        volumeStep: 0.1,
                        seekStep: 5,
                        enableModifiersForNumbers: false
                    });
                });
            })
        }
    }
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