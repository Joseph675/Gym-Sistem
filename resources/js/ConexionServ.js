angular.module('todo')

.factory('ConexionServ', function($q, $http, $timeout) {

    var db;


    db = window.openDatabase("Proyecto", '1', 'Proyecto', 1024 * 1024 * 49);


    sqlusuarios = "CREATE TABLE IF NOT EXISTS usuarios (id integer," +
                "nombres varchar(100)  NOT NULL collate nocase," +
                "apellidos varchar(100)  DEFAULT NULL collate nocase," +
                "edad varchar(100)  DEFAULT NULL collate nocase," +
                "email varchar(200)  DEFAULT NULL collate nocase," +
                "sexo varchar(100)  NOT NULL," +
                "fecha varchar(100)  DEFAULT NULL collate nocase," +
                "celular integer  NULL," +
                "activo integer  DEFAULT  '1' NOT NULL," +
                "imagen_id integer  NOT NULL,"+
                "modificado integer DEFAULT '0' NOT NULL ," +
                "eliminado integer DEFAULT '0' NOT NULL ," +
                "username varchar(100)  NOT NULL , " +
                "password varchar(100)  NOT NULL)" ;

     sqlasistencias = "CREATE TABLE IF NOT EXISTS asistencias (id integer," +
                "cita varchar(100)  DEFAULT NULL collate nocase, " +
                "usuarios_id integer  NOT NULL)" ;

     sqltareas = "CREATE TABLE IF NOT EXISTS tareas (id integer," +
                "tarea varchar(100)  DEFAULT NULL collate nocase)" ;

   

    
                
    result = {
          
        createTables: function(){
            var defered = $q.defer();
            
            promesas = [];
            
            
            prom = this.query(sqlusuarios).then(function(){
                console.log('Usuarios Tabla creada');
            })
            promesas.push(prom);

            prom = this.query(sqlasistencias).then(function(){
              console.log('asistencias Tabla creada');
          })

          prom = this.query(sqltareas).then(function(){
            console.log('tarea Tabla creada');
        })

          promesas.push(prom);

            
          promesas.push(prom);

           

           
            
            return defered.promise;
        
        },
        
        query: function(sql, datos, datos_callback){ // datos_callback para los alumnos en for, porque el i cambia
            var defered = $q.defer();
      
            if(typeof datos === "undefined") {
              datos = [];
            }
      
            db.transaction(function (tx) {
              tx.executeSql(sql, datos, function (tx, result) {

                if (sql.substring(0,6).toLowerCase() == 'insert' || sql.substring(0,6).toLowerCase() == 'update') {
                    defered.resolve(result);
                };
 

                var items = [];
                for (i = 0, l = result.rows.length; i < l; i++) {
                  items.push(result.rows.item(i));
                }
                if (datos_callback) {
                  defered.resolve({items: items, callback: datos_callback});
                }else{
                  defered.resolve(items);
                }
      
                
      
              }, function(tx,error){
                console.log(error.message, sql, datos);
                defered.reject(error.message, datos_callback)
              }) // db.executeSql
            }); // db.transaction
            return defered.promise;
          },
    }
    
    
    return result;

});