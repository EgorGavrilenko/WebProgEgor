;
var removephotoDOM = function() {
    function removePhoto() {
        workWithDOM.bloсk();
        let div_delete_message = document.createElement('div');
        div_delete_message.className = "delete_message";
        div_delete_message.innerHTML = "delete photo?";
        let button_yes = document.createElement("button");
        let button_no = document.createElement("button");
        button_yes.className = "button_yes";
        button_no.className = "button_no";
        button_yes.innerHTML = "Yes";
        button_no.innerHTML = "No";
        let elem = window.event.srcElement;
        button_yes.onclick = function() {
            camRollFunction.removePhotoPost(elem.parentNode.id);
            elem.parentNode.parentNode.removeChild(elem.parentNode);
            
            workWithDOM.setLast(workWithDOM.getLast() - 1);
            document.body.removeChild(div_delete_message);
            workWithDOM.cleanBlock();
            loadMorePhoto();
        };
        button_no.onclick = function() {
            document.body.removeChild(div_delete_message);
            workWithDOM.cleanBlock();
        };
        div_delete_message.appendChild(button_yes);
        div_delete_message.appendChild(button_no);
        document.body.appendChild(div_delete_message);
    };
    function loadMorePhoto() {
        let perent = document.getElementById("perentid");
        let morePhoto = document.getElementById("morePhoto");
        perent.removeChild(morePhoto);
        workWithDOM.creatingPost(workWithDOM.getLast(), 1, workWithDOM.filterConfig);
    };
    return {
        removePhoto: removePhoto
    }
}();