angular.module('todo')

.controller('PanelCtrl', function($scope, ConexionServ){
	ConexionServ.createTables();

	$scope.editar = false ;	
	$scope.modificando = false ;	

	$scope.editarusuarios = function(usuario){
		$scope.modificando = true ;
		$scope.usuarios_edit = usuario;
		console.log('vamos a editar');
	}

	$scope.insertarusuarios = function(){
		consulta = "INSERT INTO usuarios('nombres', 'apellidos', 'email', 'sexo', 'fecha', 'celular', 'modificado', 'username', 'password') VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)"
		ConexionServ.query(consulta, [$scope.nombres, $scope.apellidos, $scope.email, $scope.sexo, $scope.fecha, $scope.celular, $scope.modificado, $scope.username, $scope.password]).then(function(result){
			console.log('USUARIO insertado')
		}, function(tx){
			console.log('usuarios no se pudo insertar', tx)
		});
	}

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

	$scope.Actualizarusuarios = function(usu){

			
			consulta = 'UPDATE usuarios SET nombres=?, apellidos=?, email=?, sexo=?, fecha=?, celular=?, modificado=?, username=?, password=? WHERE rowid=?'
			ConexionServ.query(consulta, [usu.nombres, usu.apellidos, usu.email, usu.sexo, usu.fecha, usu.celular, usu.modificado,  usu.username, usu.password, usu.rowid]).then(function(result){
				console.log('usuarios actualizado ', result);
			}, function(tx){
				console.log('usuarios no se pudo actualizar', tx);
			});

	}

	$scope.eliminarusuarios = function(usuario){
		consulta = 'DELETE FROM usuarios WHERE rowid=?'
		ConexionServ.query(consulta, [usuario.rowid.$index]).then(function(result){
			$scope.usuario = result;
			console.log('usuario eliminada')

		}, function(tx){
			console.log('usuario no se pudo eliminar', tx)
		});
}


})

