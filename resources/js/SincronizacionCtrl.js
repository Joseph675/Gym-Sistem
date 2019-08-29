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

	$http.put("").then(
		function(result){
			console.log('Datos traidos')
		},
		function(result){
			console.log("Error")
		}
	)
})