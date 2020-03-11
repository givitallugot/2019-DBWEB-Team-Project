module.exports = {
    r_resultTable: function(movie_info, movie_review,authStatusUI='<a href="/auth/login">login</a> | <a href="/auth/register">Register</a>'){
        var review = `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <link href="css/review.css" rel="stylesheet"/>
        </head>
        <body>
            </br>
            <div id="demo">
            ${authStatusUI}
            <h1>Movie Review Table</h1>
            <h2>Last Update: 25.11.2019   <a href=/topic/review?category=star_new&id=${movie_info[0].id}>Write New Reviews Now</a></h2>
            </br></br></br></br>
            <div class="table-responsive-vertical shadow-z-1">
            <table id="table" class="table table-hover table-mc-light-blue">
            <thead>
                <tr>
                <th>Points</th>
                <th>Comment</th>
                <th>Update</th>
                <th>Delete</th>
                </tr>
            </thead>
            </tbody>`;
        var i = 0;
        while(i < movie_review.length){
            review += `
                <tr>
                <td data-title="ID">${movie_review[i].points}</td>
                <td data-title="Name">${movie_review[i].comment}</td>
                <td data-title="Link"><a href="/topic/review?category=star_upd&id=${movie_review[i].id}">update</a></td>
                <td data-title="Link"><a href="/topic/review?category=star_del&m_id=${movie_info[0].id}&id=${movie_review[i].id}">delete</a></td>
                </tr>
            `
            i++;
        }
        review += `
                </tbody>
                </table>
                </div>
            </body>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js"></script>
            <script src="https://codepen.io/mimikos/pen/GvpJYQ.js"></script>
            <script src="https://codepen.io/mimikos/pen/rzOOgG.js"></script>
        </html>
        `
        return review;
    },new_formTable: function(id, movie_info,authStatusUI='<a href="/auth/login">login</a> | <a href="/auth/register">Register</a>'){
        var option = `<label for="field4"><span>Points </span></br><select name="points" class="select-field">`;
        var selected = '';
        var i = 1;
        while(i <= 10){
            if(i == 10){
                selected = 'selected';
            }
            option += `<option value=${i} ` + selected + `>${i}</option>`;
            i++;
        }
        option += `</select></label>`;
        return `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <link href="css/form.css" rel="stylesheet"/>
        </head>
        <body>
            <div id="demo">
            ${authStatusUI}
                <div class="form-style-2">
                    <h1>NEW REVIEW - ${movie_info[0].title}</h1>
                    </br></br></br></br>
                    <form action="/topic/new_review? method="get">
                        <input type="hidden" name="category" value="star_new_process">
                        <input type="hidden" name="id" value=${id}>
                        <label for="field5"><span>Comment <textarea name="comment" class="textarea-field" placeholder="write comments"></textarea></label>
                        ${option} </br>
                        <label><span> </span><input type="submit" value="Submit" /></label>
                    </form>
                </div>
            </div>
        </body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js"></script>
        <script src="https://codepen.io/mimikos/pen/GvpJYQ.js"></script>
        <script src="https://codepen.io/mimikos/pen/rzOOgG.js"></script>
        </html>
        `;
    },update_formTable: function(id, movie_review,authStatusUI='<a href="/auth/login">login</a> | <a href="/auth/register">Register</a>'){
        var option = `<label for="field4"><span>Points </span></br><select name="points" class="select-field">`;
        var selected = '';
        var i = 1;
        while(i <= 10){
            selected = '';
            if(i == movie_review[0].points){
                selected = 'selected';
            }
            option += `<option value=${i} ` + selected + `>${i}</option>`;
            i++;
        }
        option += `</select></label>`;
        return `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <link href="css/form.css" rel="stylesheet"/>
        </head>
        <body>
            <div id="demo">
            ${authStatusUI}
                <div class="form-style-2">
                    <h1>UPDATE REVIEW - ${movie_review[0].title}</h1>
                    </br></br></br></br>
                    <form action="/topic/update_review? method="get">
                        <input type="hidden" name="category" value="star_upd_process">
                        <input type="hidden" name="m_id" value=${id}>
                        <input type="hidden" name="id" value=${movie_review[0].id}>
                        <label for="field5"><span>Comment <textarea name="comment" class="textarea-field">${movie_review[0].comment}</textarea></label>
                        ${option} </br>
                        <label><span> </span><input type="submit" value="Submit" /></label>
                    </form>
                    </div>
                </div>
        </body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js"></script>
        <script src="https://codepen.io/mimikos/pen/GvpJYQ.js"></script>
        <script src="https://codepen.io/mimikos/pen/rzOOgG.js"></script>
        </html>
        `;
    }
}