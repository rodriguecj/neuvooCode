   /*-------------------------------------------------------------------------------------*/
        /*----------------------------VALIDACION FECHA-----------------------------------------*/
        /*-------------------------------------------------------------------------------------*/
        var month = aux.split(" ")[1];
        var day = aux.split(" ")[0];
        var year = aux.split(" ")[2];

        if(month.indexOf("Jan")>-1)       month = 0;
        else if(month.indexOf("Feb")>-1)  month = 1;
        else if(month.indexOf("Mar")>-1)  month = 2;
        else if(month.indexOf("Apr")>-1)  month = 3;
        else if(month.indexOf("May")>-1)  month = 4;
        else if(month.indexOf("Jun")>-1)  month = 5;
        else if(month.indexOf("Jul")>-1)  month = 6;
        else if(month.indexOf("Aug")>-1)  month = 7;
        else if(month.indexOf("Sep")>-1)  month = 8;
        else if(month.indexOf("Oct")>-1)  month = 9;
        else if(month.indexOf("Nov")>-1)  month = 10;
        else if(month.indexOf("Dec")>-1)  month = 11;


        if(month.indexOf("January")>-1)         month = 0;
        else if(month.indexOf("February")>-1)   month = 1;
        else if(month.indexOf("March")>-1)      month = 2;
        else if(month.indexOf("April")>-1)      month = 3;
        else if(month.indexOf("May")>-1)        month = 4;
        else if(month.indexOf("June")>-1)       month = 5;
        else if(month.indexOf("July")>-1)       month = 6;
        else if(month.indexOf("August")>-1)     month = 7;
        else if(month.indexOf("September")>-1)  month = 8;
        else if(month.indexOf("October")>-1)    month = 9;
        else if(month.indexOf("November")>-1)   month = 10;
        else if(month.indexOf("December")>-1)   month = 11;


        boo.msg('[I] Dia: '+day);
        boo.msg('[I] month: '+month);
        boo.msg('[I] year: '+year);
        
        var fechaJob = new Date(year.trim(), month, day.trim()); // Ano, Mes (comenzando de 0) y dia numericos todos
        var fechaActual = new Date();
        var diasTranscurridos = fechaActual.getTime() - fechaJob.getTime();
        diasTranscurridos = diasTranscurridos/86400000; //Asi calculas la cantidad de dias,  86.400.000 (1.000 milisegundos x 60 segundos x 60 minutos x 24 horas).
        boo.msg("[I] Dias transcurridos: " + diasTranscurridos);      

        if(diasTranscurridos < 180 )
            page.pagejobs.push(job);
        else
          boo.msg('[W] Job Expirado: '+fechaJob);




      /*-------------------------------------------------------------------------------------*/
      /**********************************OTROS IDIOMAS****************************************/
      /*-------------------------------------------------------------------------------------*/

        //ESPANOL
         if(month.indexOf("Ene")>-1)
            month = 0;
            else if(month.indexOf("Feb")>-1)
              month = 1;
              else if(month.indexOf("Mar")>-1)
                month = 2;
                else if(month.indexOf("Abr")>-1)
                  month = 3;
                  else if(month.indexOf("May")>-1)
                    month = 4;
                    else if(month.indexOf("Jun")>-1)
                      month = 5;
                      else if(month.indexOf("Jul")>-1)
                        month = 6;
                        else if(month.indexOf("Ago")>-1)
                          month = 7;
                          else if(month.indexOf("Sep")>-1)
                            month = 8;
                            else if(month.indexOf("Oct")>-1)
                              month = 9;
                              else if(month.indexOf("Nov")>-1)
                                month = 10;
                                else if(month.indexOf("Dic")>-1)
                                  month = 11;

          //Frances
         if(month.indexOf("janvier")>-1)
            month = 0;
            else if(month.indexOf("février")>-1)
              month = 1;
              else if(month.indexOf("mars")>-1)
                month = 2;
                else if(month.indexOf("avril")>-1)
                  month = 3;
                  else if(month.indexOf("mai")>-1)
                    month = 4;
                    else if(month.indexOf("juin")>-1)
                      month = 5;
                      else if(month.indexOf("juillet")>-1)
                        month = 6;
                        else if(month.indexOf("août")>-1)
                          month = 7;
                          else if(month.indexOf("septembre")>-1)
                            month = 8;
                            else if(month.indexOf("octobre")>-1)
                              month = 9;
                              else if(month.indexOf("novembre")>-1)
                                month = 10;
                                else if(month.indexOf("décembre")>-1)
                                  month = 11;

            //Aleman
            if(month.indexOf("januar")>-1) month = 0;
            else if(month.indexOf("februar")>-1) month = 1;
            else if(month.indexOf("märz")>-1) month = 2;
            else if(month.indexOf("april")>-1) month = 3;
            else if(month.indexOf("mai")>-1) month = 4;
            else if(month.indexOf("juni")>-1) month = 5;
            else if(month.indexOf("juli")>-1) month = 6;
            else if(month.indexOf("august")>-1) month = 7;
            else if(month.indexOf("september")>-1) month = 8;
            else if(month.indexOf("oktober")>-1) month = 9;
            else if(month.indexOf("november")>-1) month = 10;
            else if(month.indexOf("dezember")>-1) month = 11;

            if(month.indexOf("jan")>-1) month = 0;
            else if(month.indexOf("febr")>-1) month = 1;
            else if(month.indexOf("mär")>-1) month = 2;
            else if(month.indexOf("apr")>-1) month = 3;
            else if(month.indexOf("mai")>-1) month = 4;
            else if(month.indexOf("jun")>-1) month = 5;
            else if(month.indexOf("jul")>-1) month = 6;
            else if(month.indexOf("aug")>-1) month = 7;
            else if(month.indexOf("sep")>-1) month = 8;
            else if(month.indexOf("okt")>-1) month = 9;
            else if(month.indexOf("nov")>-1) month = 10;
            else if(month.indexOf("dez")>-1) month = 11;

            if(month.indexOf("Jan")>-1) month = 0;
            else if(month.indexOf("Febr")>-1) month = 1;
            else if(month.indexOf("Mär")>-1) month = 2;
            else if(month.indexOf("Apr")>-1) month = 3;
            else if(month.indexOf("Mai")>-1) month = 4;
            else if(month.indexOf("Jun")>-1) month = 5;
            else if(month.indexOf("Jul")>-1) month = 6;
            else if(month.indexOf("Aug")>-1) month = 7;
            else if(month.indexOf("Sep")>-1) month = 8;
            else if(month.indexOf("Okt")>-1) month = 9;
            else if(month.indexOf("Nov")>-1) month = 10;
            else if(month.indexOf("Dez")>-1) month = 11;




        if(month.indexOf("มกราคม")>-1)       month = 0;
        else if(month.indexOf("กุมภาพันธ์")>-1)  month = 1;
        else if(month.indexOf("มีนาคม")>-1)  month = 2;
        else if(month.indexOf("เมษายน")>-1)  month = 3;
        else if(month.indexOf("พฤษภาคม")>-1)  month = 4;
        else if(month.indexOf("มิถุนายน")>-1)  month = 5;
        else if(month.indexOf("กรกฎาคม")>-1)  month = 6;
        else if(month.indexOf("สิงหาคม")>-1)  month = 7;
        else if(month.indexOf("กันยายน")>-1)  month = 8;
        else if(month.indexOf("ตุลาคม")>-1)  month = 9;
        else if(month.indexOf("พฤศจิกายน")>-1)  month = 10;
        else if(month.indexOf("ธันวาคม")>-1)  month = 11;

        if(date[1].indexOf("ม.ค.") > -1){date[1] = "01";}
        if(date[1].indexOf("ก.พ.") > -1){date[1] = "02";}
        if(date[1].indexOf("มี.ค.") > -1){date[1] = "03";}
        if(date[1].indexOf("เม.ย.") > -1){date[1] = "04";}
        if(date[1].indexOf("พ.ค.") > -1){date[1] = "05";}
        if(date[1].indexOf("มี.ย.") > -1){date[1] = "06";}
        if(date[1].indexOf("ก.ค.") > -1){date[1] = "07";}
        if(date[1].indexOf("ส.ค.") > -1){date[1] = "08";}
        if(date[1].indexOf("ก.ย.") > -1){date[1] = "09";}
        if(date[1].indexOf("ต.ค.") > -1){date[1] = "10";}
        if(date[1].indexOf("พ.ย.") > -1){date[1] = "11";}
        if(date[1].indexOf("ธ.ค.") > -1){date[1] = "12";}


          year =parseInt(year)-543;








 

 

















