module.exports = {
    IsOwner:function(request,response){
        if(request.session.is_logined){
            return true;
        } else {
            return false; 
        }
}, StatusUI:function(request, response){
    var authStatusUI = '<a href="/auth/login">login</a> | <a href="/auth/register">Register</a> '
        if(this.IsOwner(request,response)){
        authStatusUI=`<a href="/auth/logout">logout</a>`  
        };
        return authStatusUI;
    }
}

