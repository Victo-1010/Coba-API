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
                    <div class="card" >
                        <img src="`+data.Poster+`" class="card-img-top" alt="...">
                     <div class="card-body">
                     <h5 class="card-title">`+data.title+`</h5>
                     <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                     <a href="#" class="card-link"data-id=`+data.imdbID+`>See Details</a>
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


