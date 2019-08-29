angular.module('todo')

.controller('SincronizacionCtrl', function($scope, ConexionServ, $http){
	ConexionServ.createTables();

	$scope.mostrarusuarios = function(result){
		consulta = "SELECT *, rowid FROM usuarios WHERE id is NULL or eliminado=1 or modificado=1"
		ConexionServ.query(consulta, []).then(function(result){
			console.log('usuario mostrado')
			console.log(result)
			$scope.usuarios = result;
		}, function(tx){
			console.log('usuarios no mostrado', tx)
		});
	}

	$scope.mostrarusuarios();

$scope.descargarusuarios = function(result){
	console.log("si")
	datos = {};

    	if (elemento) {
				datos = elemento;
    	}else{
    		datos = {
    			usuarios: 				$scope.usuarios,
    			recomendaciones: 		$scope.recomendaciones
    		};
    	}

			$http.put("http://192.168.100.31/feryz_server/public/taxis/all", datos).then (function(r){

				r = r.data;
				SincronizarServ.usuarios(r.usuarios);
				SincronizarServ.recomendaciones(r.recomendaciones);

				toastr.success('Datos subidos');
			}, function(){
				toastr.error('No se pudo subir datos');
			})
		}








})