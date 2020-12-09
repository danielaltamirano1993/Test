function getData(spreadsheetid, sheet) {
  //rango de la columna desde la A hasta la Z
  var rangename = sheet+'!A1:Z';
  //Datos de la hoja de calculo(id hoja de calculo y el rango de la columna)
  var values = Sheets.Spreadsheets.Values.get(spreadsheetid, rangename).values;
  //Comprobando que exista la variable values
  if(!values){
    return {error: 'No hay datos'};
  }//En el caso de que exista, recorremos las filas de la hoja de calculo
    else{
      var responsejson = []
    //Recorremos desde la fila 1, hasta la columna Z por posibles datos
    for (var row=1; row <values.length; row++){
      var item ={};
      for (var column = 0; column < 26; column++){
        item[values[0][column]] = values[row][column]
      }
      //variable que contiene cada uno de los datos recorridos en la iteracion 
      responsejson.push(item);
    }
    return responsejson;
    }  
 }

//Recibir la solicitud del parametro
function doGet(request){
  //stringify-->encadenar
  //Comprobamos
  if(request.parameter.spreadsheetid !== undefined && request.parameter.sheet !== undefined){
    return ContentService.createTextOutput(JSON.stringify(getData(request.parameter.spreadsheetid, request.parameter.sheet)));
    //return ContentService.createTextOutput(JSON.stringify({error:"Establecimos con la base"}));
  }else{
    return ContentService.createTextOutput(JSON.stringify({error:"No se encuentra la base"}));
  }
}
