module.exports = {
    HOME:function(authStatusUI='<a href="/auth/login">login</a> | <a href="/auth/register">Register</a>'){
      return `
        <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="author" content="colorlib.com">
            <link href=https://fonts.googleapis.com/css?family=Poppins rel="stylesheet" />
            <link href="/css/main.css" rel="stylesheet"/>
        </head>
        <body>
            <div class="s003">
            ${authStatusUI}
            <form action="/topic" method="get">
                <div class="inner-form">
                <div class="input-field first-wrap">
                    <div class="input-select">
                    <select data-trigger="" name="category">
                        <option placeholder="">Category</option>
                        <option>Movie</option>
                        <option>Actor</option>
                        <option>Director</option>
                    </select>
                    </div>
                </div>
                <div class="input-field second-wrap">
                    <input name="search" type="text" placeholder="Enter Keywords?" />
                </div>
                <div class="input-field third-wrap">
                    <button class="btn-search" type="submit">
                    <svg class="svg-inline--fa fa-search fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                    </svg>
                    </button>
                </div>
                </div>
            </form>
            </div>
            <script src="js/extention/choices.js"></script>
            <script>
            const choices = new Choices('[data-trigger]',
            {
                searchEnabled: false,
                itemSelectText: '',
            });

            </script>
        </body>
        </html>
      `;
    },HOME_LOGIN:function(){
        return`
        <html>
        <head>

        </head>
        <body>
            <p>LOGIN</p>
            <form action="/auth/login_process" method="post">
                <p><input type="text" name="ID" placeholder="ID"></p>
                <p><input type="password" name="password" placeholder="PASSWORD"></p>
                <p>
                    <input type="submit" value="login">
                </p>
                 </form>
        
        </body>
        </html>
      `;
      },HOME_REGISTER:function(){
        return`
        <html>
        <head>

        </head>
        <body>
            <p>REGISTER</p>
            <form action="/auth/register_process" method="post">
                <p><input type="text" name="ID" placeholder="ID" ></p>
                <p><input type="password" name="password" placeholder="PASSWORD"" ></p>
                <p><input type="text" name="displayName" placeholder="Nick Name" ></p>
                <p>
                    <input type="submit" value="register">
                </p>
                 </form>
        
        </body>
        </html>
      `;
      },m_resultTable: function(movie_info, movie_distributor, movie_review_sum,authStatusUI='<a href="/auth/login">login</a> | <a href="/auth/register">Register</a>'){
        var temp_avg_point;
        var temp_review_num;

        if(movie_review_sum.length == 0){
            temp_avg_point = 'not yet';
            temp_review_num = 'not yet'; 
        } else{
            temp_avg_point = movie_review_sum[0].avg_point
            temp_review_num = movie_review_sum[0].review_num
        }

        return `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <link href="/css/search.css" rel="stylesheet"/>
        </head>
        <body>
            <div id="demo">
                ${authStatusUI}
                <h1>Movie Information Table</h1>
                <h2>Movies mojo site list was updated 11.2019</h2>
                </br>
                <div class="table-responsive-vertical shadow-z-1">
                <table id="table" class="table table-hover table-mc-light-blue">
                <tbody>
                    <tr><th>Title</th><td>${movie_info[0].title}</td></tr>
                    <tr><th>Summary</th><td>${movie_info[0].summary}</td></tr>
                    <tr><th>Distributor</th><td><a href=/topic?category=Distributor&id=${movie_distributor[0].id}>${movie_distributor[0].distributor}</a></td></tr>
                    <tr><th>Release Date</th><td>${movie_info[0].release_date}</td></tr>
                    <tr><th>Genres</th><td>${movie_info[0].genres}</td></tr>
                    <tr><th>Runtime</th><td>${movie_info[0].runtime}</td></tr>
                    <tr><th>Revenue</th><td>$ ${movie_info[0].revenue}</td></tr>
                    <tr><th>Average of Points</th><td>${temp_avg_point}</td></tr>
                    <tr><th>Number of Reviewers</th><td>${temp_review_num}</td></tr>
                    <tr><td></td><td><a href=/topic/review?category=star_report&id=${movie_info[0].id}>Check Reviews!</a></td></tr>
                </tbody>
                </table>
                </div>
            </div>
        </body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js"></script>
        <script src="https://codepen.io/mimikos/pen/GvpJYQ.js"></script>
        <script src="https://codepen.io/mimikos/pen/rzOOgG.js"></script>
        </html>
        `;
    },dr_resultTable: function(direc_info,authStatusUI='<a href="/auth/login">login</a> | <a href="/auth/register">Register</a>'){
        return `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <link href="/css/search.css" rel="stylesheet"/>
        </head>
        <body>
        
            <div id="demo">
            ${authStatusUI}
                <h1>Movie Director Information Table</h1>
                <h2>Director sample data was updated 11.2019</h2>
                </br>
                <div class="table-responsive-vertical shadow-z-1">
                    <table id="table" class="table table-hover table-mc-light-blue">
                    <tbody>
                        <tr><th>Director</th><td>${direc_info[0].director_name}</td></tr>
                        <tr><th>Gender</th><td>${direc_info[0].gender}</td></tr>
                        <tr><th>Age</th><td>${direc_info[0].age}</td></tr>
                        <tr><th>Number of Movies</th><td>${direc_info[0].direct_number}</td></tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js"></script>
        <script src="https://codepen.io/mimikos/pen/GvpJYQ.js"></script>
        <script src="https://codepen.io/mimikos/pen/rzOOgG.js"></script>
        </html>
        `;
    },ac_resultTable: function(actor_info,authStatusUI='<a href="/auth/login">login</a> | <a href="/auth/register">Register</a>'){
        return `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <link href="/css/search.css" rel="stylesheet"/>
        </head>
        <body>
        
            <div id="demo">
            ${authStatusUI}
                <h1>Movie Actor Information Table</h1>
                <h2>Actor sample data was updated 11.2019</h2>
                </br>
                <div class="table-responsive-vertical shadow-z-1">
                <table id="table" class="table table-hover table-mc-light-blue">
                <tbody>
                    <tr><th>Actor</th><td>${actor_info[0].actor_name}</td></tr>
                    <tr><th>Gender</th><td>${actor_info[0].gender}</td></tr>
                    <tr><th>Age</th><td>${actor_info[0].age}</td></tr>
                    <tr><th>Number of Movies</th><td>${actor_info[0].act_number}</td></tr>
                    <tr><td></td><td><a href=/topic/reputation?category=act_report&id=${actor_info[0].id}>Check Reviews!!</a></td></tr>
                </tbody>
                </table>
                </div>
            </div>
        </body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js"></script>
        <script src="https://codepen.io/mimikos/pen/GvpJYQ.js"></script>
        <script src="https://codepen.io/mimikos/pen/rzOOgG.js"></script>
        </html>
        `;
    },ds_resultTable: function(distributor_info,authStatusUI='<a href="/auth/login">login</a> | <a href="/auth/register">Register</a>'){
        return `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <link href="/css/search.css" rel="stylesheet"/>
        </head>
        <body>
            <div id="demo">
            ${authStatusUI}
                <h1>Movie Distributor Information Table</h1>
                <h2>Distributor sample data was updated 11.2019</h2>
                </br>
                <div class="table-responsive-vertical shadow-z-1">
                <table id="table" class="table table-hover table-mc-light-blue">
                <tbody>
                <tr><th>Distributor</th><td>${distributor_info[0].distributor}</td></tr>
                <tr><th>Location</th><td>${distributor_info[0].location}</td></tr>
                <tr><th>Foundation Date</th><td>${distributor_info[0].foundation_date}</td></tr>
                <tr><th>Number of Employees</th><td>${distributor_info[0].employee_number}</td></tr>
                </table>
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