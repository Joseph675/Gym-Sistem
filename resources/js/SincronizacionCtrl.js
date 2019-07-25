angular.module('todo')

.controller('SincronizacionCtrl', function($scope, ConexionServ, $filter){
	ConexionServ.createTables();
	
	

	

	$scope.mostrarusuarios = function(result){
		consulta = "SELECT *, rowid FROM usuarios"
		ConexionServ.query(consulta, []).then(function(result){
			$scope.usuarios = result;
			console.log('usuario mostrado')

		}, function(tx){
			console.log('usuarios no mostrado', tx)
		});
	}


	$scope.mostrarusuarios();

	


})

