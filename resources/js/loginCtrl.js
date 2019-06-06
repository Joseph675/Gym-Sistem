angular.module('todo')

.controller('loginCtrl', function($scope, ConexionServ, $state){
	ConexionServ.createTables();

	$scope.editar = false ;	
	$scope.modificando = false ;	


	

	$scope.insertarusuarios = function (){
		
			 $scope.nombres
			 $scope.username
			 $scope.password	
	
			if($scope.nombres ==""  ||  $scope.username =="" || $scope.password =="" ){
				toastr.warning('Completa todos los campos')
			}else{
			
			consulta = "INSERT INTO usuarios('nombres', 'apellidos', 'email', 'sexo', 'fecha', 'celular', 'modificado', 'username', 'password') VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)"
		ConexionServ.query(consulta, [$scope.nombres, $scope.apellidos, $scope.email, $scope.sexo, $scope.fecha, $scope.celular, $scope.modificado, $scope.username, $scope.password]).then(function(result){
			toastr.info('Usuario insertado')
			console.log('USUARIO insertado')
		}, function(tx){
			toastr.info('usuario no se pudo insertar')
			console.log('usuarios no se pudo insertar', tx)
		});
	}
		

}
	

	$scope.mostrarusuarios = function(username, password){
		ConexionServ.query('SELECT *, rowid FROM usuarios WHERE username=? and password=?', [username, password]).then(function(result){
			console.log(result)
				if(result.length > 0){
					$state.go("panel");
					toastr.info('Bienvenido ' + username)
			}else{
					toastr.warning('Usuario incorrecto')
				}
		})
			
			
	}


	

	$scope.Actualizarusuarios = function(usu){

			
		consulta = 'UPDATE usuarios SET nombres=?, apellidos=?, email=?, sexo=?, fecha=?, celular=?, modificado=?, username=?, password=?, cita=? WHERE rowid=?'
		ConexionServ.query(consulta, [usu.nombres, usu.apellidos, usu.email, usu.sexo, usu.fecha, , usu.celular, usu.modificado,  usu.username, usu.password, usu.cita, usu.rowid]).then(function(result){
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

