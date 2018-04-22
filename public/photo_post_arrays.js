var photoPostsModule = function() {

    function fillLocalStorege(){
     if (localStorage.getItem("arrayPhotoPosts") === null) {
        this.photoPosts=JSON.parse(datajson,function(key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;});
        
        localStorage.setItem("arrayPhotoPosts",JSON.stringify(this.photoPosts));
    }
    else{
        this.photoPosts=JSON.parse(localStorage.getItem("arrayPhotoPosts"),function(key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;});
        
    }
    };
    
    function updatelocalStorage() {
        localStorage.setItem("arrayPhotoPosts",JSON.stringify(this.photoPosts));
    }

    let photoPosts = [];
    return {
        photoPosts: photoPosts,
        fillLocalStorege: fillLocalStorege,
        updatelocalStorage: updatelocalStorage
    }
}();
