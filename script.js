function SearchMovie()
{
    $('#Movie-List').html('');
    $.ajax({
        url:'http://omdbapi.com',
        type:'get',
        dataType:'json',
        data:{
            'apikey':'feeec417',
            's':$('#Search-Input').val()

        },
        success:function(result){
            if(result.Response=="True"){
                let movies=result.Search;
                $.each(movies,function(i,data){
                    $('#Movie-List').append(`
                    <div class="col-md-4">
                    <div class="card-md-3" >
                        <img src="`+data.Poster+`" class="card-img-top" alt="...">
                     <div class="card-body">
                     <h5 class="card-title">`+data.Title+`</h5>
                     <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                     <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+data.imdbID+`">See Details</a>
                    </div>
                    </div>
                    </div>

                    `);

                });
                $('#Search-Input').val('');

            }else{
                $('#Movie-List').html(`
                <div class="col">
                    <h1 class="text-center">`+result.Error+`</h1>
                </div>
                `)
            }
        }

    });

};


$('#Search-Button').on('click',function(){
    SearchMovie();

});

$('#Search-Input').on('keyup',function(e){
    if(e.which === 13){
        SearchMovie();
    }

});

$('#Movie-List').on('click','.see-detail',function(){
    $.ajax({
        url:'http://omdbapi.com',
        dataType:'json',
        type:'get',
        data:{
            'apikey':'feeec417',
            'i':$(this).data('id')
        },
        success:function(movie){
            if(movie.Response === "True"){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4>
                                <img src="`+movie.Poster+`"class="img-fluid">
                            </div>
                            <div class="col-md-8>
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+movie.Title+`</h3></li>
                                </ul>
                            </div>
                        </div>
                    </div>                
                `);
            }
        }
    });

});

