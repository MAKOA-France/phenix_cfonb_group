(function($, Drupal, drupalSettings) {

    Drupal.behaviors.phenix = {
      attach: function(context, settings) {

        $(document).ready(function() {


          /*********** asset injector */


          /*************Enlever "index.php" dans les lien de documents   GLOBAL ********************/
          // Get the current href attribute
          var currentHref = jQuery('.path-media .field--type-file.field--name-field-media-document.field--widget-file-generic span a').attr('href');

          // Remove "index.php" from the href attribute
          var modifiedHref = currentHref.replace('index.php/', '');

          // Update the href attribute with the modified value
          jQuery('.path-media .field--type-file.field--name-field-media-document.field--widget-file-generic span a').attr('href', modifiedHref);


          /*****************configureHourEvent     /civicrm-event/* ***********/
          let pageEvent = window.location.href.includes('civicrm-event');
          if (pageEvent) {
            document.addEventListener("DOMContentLoaded", function(event) { 

              // Listener user get date
              document.getElementById("edit-start-date-0-value-date").addEventListener('input', function(){
                 //get time put by user
                 var dateToBegin = document.getElementById('edit-start-date-0-value-date').value;
                  document.getElementById('edit-end-date-0-value-date').value = dateToBegin;
              
              }, true);
              
              
              
              
              // Listener user get time
              document.getElementById("edit-start-date-0-value-time").addEventListener('input', function(){
              
               //add duration format => '00:00'
               var duration  = '01:30';
              
              //transform time add to Array
              var durationArray = duration.split(':');
              
              
              
              //get time put by user
              var timeToBegin = document.getElementById('edit-start-date-0-value-time').value;
              
              //transform to Array
              var timeToBeginArray = timeToBegin.split(':'); 
              
              var timeToBeginFinal;
                      
              //get hour
              var hour = +timeToBeginArray[0];
              
               //get minute
              var minutes = +timeToBeginArray[1];
              
              //add hour begining to hour duration
              hour+=+durationArray[0]
              
              //add minute begining to minute duration
              minutes+=+durationArray[1];
              
              console.log(hour);
              
              if (+minutes > 59)
              {
                  hour+=1;
                  console.log(+minutes);
                   minutes = minutes - 60;
                   console.log(+minutes);
              
                   if (minutes === 0) {
                      minutes = "00";
                      minutes.toString();
              
                      // timeToBeginFinal = hour + ':'+minutes;
                   }
                   else
                   if (minutes < 9) {
                      minutes = '0'+minutes;
                      minutes.toString();
                      // timeToBeginFinal = hour + ':'+minutes;
                   }
              
              }
              if (hour < 10) {
                  hour = '0'+hour;
                  hour.toString();
              }else if (hour > 23) {
                  hour = hour - 24;
                  hour = '0'+hour;
                  hour.toString();
              }
              timeToBeginFinal = hour + ':'+minutes;
              document.getElementById('edit-end-date-0-value-time').value = timeToBeginFinal.toString();
              
              }, true);
              
              });
          }


          /**************End asset injector  */




          $('#printerParticipants').on('click', function () {
            printContent() 
          });

          function printContent() {

            // Get all elements with the class "hidden"
var elementsToRemove = document.querySelectorAll('.hidden');

  // Remove each element
  elementsToRemove.forEach(function(element) {
      element.remove();
  });
            let logo = `
            <img class="img-logoo hahhhhhh" src="https://cfonbmaj.dev.makoa.net/sites/cfonbmaj.dev.makoa.net/files/logo-cfonb.jpg" alt="CFONB">
                <a href="/" title="CFONB" rel="home" class="site-logo">
                </a>
              `;

            var contentToPrint = $('#printerParticipants').attr('data-content-to-print'); // Replace 'elementId' with the ID of the element you want to print.

            
                        // Convert the HTML string to a jQuery object
            var $content = $(contentToPrint);

            // Remove all elements with class "hidden"
            $content.find('.hidden').remove();
            $content.find('#vbo-action-form-wrapper').remove();
            $content.find('.form-actions.js-form-wrapper.form-wrapper').remove();

            // Update the data-content-to-print attribute with the modified HTML
            $('#printerParticipants').attr('data-content-to-print', $content.html());
            contentToPrint = $content.html();

            var printWindow = window.open('', '_blank');
            if (printWindow) {
              // printWindow.document.write('<html><head><title>Print</title><style>table {     border-collapse: collapse;    width: 100%;    margin-bottom: 1rem;    border-radius: 3px; } tbody th, tbody td {padding: 1rem 0.625rem 0.625rem;}  thead th, thead td, tfoot th, tfoot td {    padding: 0.5rem 0.625rem 0.625rem;} .menu--account h2, a {     color: #af1f7b;text-decoration: none;transition: all .5s ease-in; } tbody tr:nth-child(even){    background-color: #f1f1f1;    border-bottom: 0;} tbody th, tbody td {padding :0.5rem 0.625rem 0.625rem;}thead th, thead td, tfoot th, tfoot td {    padding: 0.5rem 0.625rem 0.625rem;    text-align: left;}.to-print thead,.to-print  tbody,.to-print  tfoot {    border: 1px solid #f1f1f1;    background-color: #fefefe;  } .to-print .form-actions.js-form-wrapper.form-wrapper, .hidden {display:none} #view-register-date-table-column {padding-right: 30px;}</style></head><body><div class="to-print">');
              let htmlHead = '<html><head><title>Print</title><style>table {    border: 1px solid #93838329}th, td{border: 1px solid gray;}.to-print thead,.to-print  tbody,.to-print  tfoot {    border: 1px solid #f1f1f1;    background-color: #fefefe;  } .to-print .form-actions.js-form-wrapper.form-wrapper, .hidden {display:none} #view-register-date-table-column {padding-right: 30px;}</style></head><body><div class="to-print">';
              let htmlFeet = '</div></body></html>';
              contentToPrint =  htmlHead + logo + contentToPrint + htmlFeet ;
              printWindow.document.write(contentToPrint);
              // printWindow.document.write('</div></body></html>');
              printWindow.document.close();
              includeCSSInline(customCSS, printWindow);
              //adding custom css
              var customCSS = `
              thead {
              background: #f8f8f8;
              color: #0a0a0a;
            }
            tbody tr:nth-child(even) {
              border-bottom: 0 !important;
              background-color: #f1f1f1 !important;
            }
            
            `;
            function includeCSSInline(cssCode, printWindow) {
              var style = printWindow.document.createElement('style');
              style.type = 'text/css';
              style.appendChild(printWindow.document.createTextNode(cssCode));
              printWindow.document.head.appendChild(style);
            }
            printWindow.print();
            

            // Attach an event listener to the 'afterprint' event
            window.addEventListener('afterprint', function() {
              // Call the performAjaxRequest function after the print operation is complete
              alert(' window')
            });
            // Attach an event listener to the 'afterprint' event
            printWindow.addEventListener('afterprint', function() {
              // Call the performAjaxRequest function after the print operation is complete
              alert(' print window')
            });

            $.ajax({
              url: '/meeting/savepdf',
              type: "POST",
              data: {contentToPrint: contentToPrint, idEvent : window.location.href.split('/feuille-de-presence/')[1]},
              success: (successResult, val, ee) => {
                
                console.log('valeur : ', successResult)
              },
              error: function(error) {
                console.log(error, 'ERROR')
              }
            });
          }

          }
          
        });



        

      }
    }
})(jQuery, Drupal, drupalSettings);    