;
var addphotoDOM = function() {
    function addPhotoPost() {

        let perent = document.getElementById("perentid");
        while (perent.firstChild) {
            perent.removeChild(perent.firstChild);
        }

        let newpost = {};
        let div_addPhoto = document.createElement("div");
        div_addPhoto.className = "file-upload";
        let label = document.createElement("label");
        div_addPhoto.appendChild(label);

        let input = document.createElement("input");
        input.type = "file";
        label.appendChild(input);

        let span = document.createElement("span");
        span.innerHTML = "Choose file";
        label.appendChild(span);

        perent.appendChild(div_addPhoto);

        let div = document.createElement('div');
        div.style.width = "100%";
        perent.appendChild(div);
        let p = document.createElement("p");
        p.innerHTML = "descriprion";
        div.appendChild(p);

        let input_descr = document.createElement("input");
        input_descr.type = "text";
        input_descr.className = "input_for_edit";
        p.appendChild(input_descr);

        let p1 = document.createElement("p");
        p1.innerHTML = "tags";
        div.appendChild(p1);

        let input_tag = document.createElement("input");
        input_tag.type = "text";
        input_tag.className = "input_for_edit";
        p1.appendChild(input_tag);


        let button_ok = document.createElement("button");
        let button_cancel = document.createElement("button");
        button_ok.className = "button_ok";
        button_cancel.className = "button_cancel";
        button_ok.innerHTML = "Add";
        button_cancel.innerHTML = "Cancel";

        perent.appendChild(button_ok);
        perent.appendChild(button_cancel);

        input.onchange = function() {

            let fileList = this.files,
                textFile = fileList[0];
            if (textFile.type === 'image/jpeg' || textFile.type ==='image/png') {
                newpost["photoLink"] = "photo/" + textFile.name;
                div_addPhoto.className = "photo";
                div_addPhoto.style.backgroundImage = 'url(' + newpost["photoLink"] + ')';
                while (div_addPhoto.firstChild) {
                    div_addPhoto.removeChild(div_addPhoto.firstChild);
                }
            }
            else{
                mistake.messageMistake("wrong format");
            }
        }

        button_ok.onclick = function() {
            let str = input_tag.value.split(" #");
            newpost['tag'] = str;
            let str2 = input_descr.value;
            newpost['descriprion'] = str2;
            let user = localStorage.getItem("user");
            if (user != null)
                newpost["author"] = user;
            if(!camRollFunction.addPhotoPost(newpost))
                mistake.messageMistake("error adding");
            

            let perent = document.getElementById("perentid");
            while (perent.firstChild) {
                perent.removeChild(perent.firstChild);
            }
            workWithDOM.creatingPost(0, 10, workWithDOM.filterConfig)
        };
        button_cancel.onclick = function() {
            let perent = document.getElementById("perentid");
            while (perent.firstChild) {
                perent.removeChild(perent.firstChild);
            }
            workWithDOM.creatingPost(0, 10,workWithDOM.filterConfig)
        };
    };

    return {
        addPhotoPost: addPhotoPost
    }
}();