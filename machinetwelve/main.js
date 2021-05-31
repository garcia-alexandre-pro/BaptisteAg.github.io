var LinkSection = new Vue({
    el: '#linkSection',
    data: {
        Message: 'En attente du lien...',
        InputLink: null,
    },
    methods: {
        getLink: function () {
            vm = this
            if (vm.InputLink !== ("" || null)) {
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
                                StreamingList.Message = "Qualité et langue (qual-lang) :"
                                StreamingList.QualitysList = []
                                StreamingList.QualitysList.push(data.data.streams)
                                StreamingList.SubtitlesList.push(data.data.subtitles)
                                StreamingList.Id = data.data.id
                                StreamingList.StreamQualityReceived = true
                                StreamingList.DownloadLink = LinkSection.InputLink
                                StreamingList.FileName = data.data.filename
                                document.title = 'La12M. - ' + data.data.filename
                            } else {
                                StreamingList.Message = 'Erreur : Streaming non supporté'
                            }
                        } else {
                            vm.Message = 'Erreur : Lien invalide/hébergeur non supporté'
                        }
                    },
                );
            } else {
                vm.Message = 'Il est ou le lien ?'
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
        FileName: '---',
        DownloadLink: '---',
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
                    if (!StreamingList.VisiblePlayer) {
                        StreamingList.LinkClear = data.data.link
                        StreamingList.VisiblePlayer = true
                    } else {
                        videojs('videoplayerid').src({ type: "video/mp4", src: data.data.link });
                    }
                    StreamingList.StreamQualityReceived = false
                    DownloadList.LinkReceived = false
                    StreamingList.Message = 'Pour changer de qualité/changer d\'épisode, le lien doit être re générer.'
                    DownloadList.Message = 'Pour télécharger le ficher, le lien doit être re générer.'
                    $("#streamingList").css("width", "95vw")
                    document.querySelector('#streamingList').scrollIntoView({
                        behavior: 'smooth'
                    });
                },
            )
        }
    },
    watch: {
        VisiblePlayer: function (val) {
            this.$nextTick(function () {
                videojs('videoplayerid').ready(function () {
                    this.hotkeys({
                        volumeStep: 0.1,
                        seekStep: 5,
                        enableVolumeScroll: false,
                        enableMute: false,
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