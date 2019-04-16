var fecha = $(this).find("div.sjb-col-md-2:eq(2) > div#sjb_job-bolits").text();
        if (fecha.indexOf("day")>-1){
          if (fecha.indexOf("a day")>-1){
            var dia = 1;
          }else{
             var dia = fecha.replace(/[^0-9]+/g,"").trim();
          }         
          var d = new Date();
          d.setDate(d.getDate() - dia);
        }
           
        if (fecha.indexOf("month")>-1){
          if (fecha.indexOf("a month")>-1){
            var mes = 1;
          }else{
             var mes = fecha.replace(/[^0-9]+/g,"").trim();
          }         
          var d = new Date();
          d.setMonth(d.getMonth() - mes);
        }
        if (fecha.indexOf("year")>-1){
          if (fecha.indexOf("a year")>-1){
            var year = 1;
          }else{
             var year = fecha.replace(/[^0-9]+/g,"").trim();
          }             
          var d = new Date();
          d.setFullYear(d.getFullYear() - year);
        }

        
        var job_date = d;
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