        var day = fecha.split(" ")[1];
        var month = fecha.split(" ")[0];
        var year = fecha.split(" ")[2];
		
		var date = month+"/"+day+"/"+year;

        var job_date = new Date(date);
        var actual_date = new Date();
        var result_date = actual_date.getTime() - job_date.getTime() ;
        var miliseconds_in_six_months = (1000 * 60 * 60 * 24* 365)/ 2;
        result_date = result_date/miliseconds_in_six_months;
        if (result_date < 1){
          if( job.title.length > 0 && job.location.length > 0)
            page.pagejobs.push(job);
          //boo.msg("[I] Job no vencido  "+job_date);
        }
        else{
          boo.msg("[W] Job vencido  "+job_date);
        }


//CLOSING DATE

        var day = fecha.split(" ")[1];
        var month = fecha.split(" ")[0];
        var year = fecha.split(" ")[2];
        
        var date = month+"/"+day+"/"+year;

        var job_date = new Date(date);
        var actual_date = new Date();        
        if (actual_date < job_date){
          if( job.title.length > 0 && job.location.length > 0)
            page.pagejobs.push(job);
          boo.msg("[I] Job no vencido -> vence:  "+job_date);
        }
        else{
          boo.msg("[W] Job vencido -> vence:  "+job_date);
        }



        var day = fecha.split("-")[2];
        var month = fecha.split("-")[1];
        var year = fecha.split("-")[0];
        
        var date = month+"/"+day+"/"+year;

        var job_date = new Date(date);
        var actual_date = new Date();
        var result_date = actual_date.getTime() - job_date.getTime() ;
        var miliseconds_in_six_months = (1000 * 60 * 60 * 24* 365)/ 2;
        result_date = result_date/miliseconds_in_six_months;
        if (result_date < 1){
          if( job.title.length > 0 && job.location.length > 0)
            page.pagejobs.push(job);
          //boo.msg("[I] Job no vencido  "+job_date);
        }
        else{
          boo.msg("[W] Job vencido  "+job_date);
        }




























