$(document).ready(function () {
    $("#submit").click(function (e) {
        e.preventDefault();
        var lien = $("#link").val();
        if (lien !== "") 
        {
            window.alert("Attends un peu...");
            $("#resultat").text("En cours de déchiffrement");
            $.getJSON(
                'https://api.alldebrid.com/v4/link/unlock?agent=LinkOk&apikey=yzDd2zmszOk2lDbxsyeb&link=' + lien,
                function (data) {
                    $("#resultat").text(data.data.filename);
                    $("#resultat").attr("href", data.data.link);
                },
            );
        } else {
            alert("Il est ou le lien ?" + lien);
        }
    });

    $("#copy").click(function () {
        let copyText = $("#resultat").attr("href");
        if (copyText !== "")
        {
            let tempInput = document.createElement("input");
            tempInput.value = copyText;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            document.execCommand("copy");
        } else {
            alert("La machine n'a trouvé aucun lien :C");
        }
        
    });
});