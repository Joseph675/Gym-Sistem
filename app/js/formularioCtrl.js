angular.module('todo')

.controller('formularioCtrl', function($scope, ConexionServ){
	ConexionServ.createTables();

	$scope.editar = false ;	
	$scope.modificando = false ;	

	
	

	$scope.editarusuarios = function(usuario){
		$scope.modificando = true ;
		$scope.usuarios_edit = usuario;
		console.log('vamos a editar');
	}





$scope.insertarusuarios = function(username){

	var usuario = document.getElementById("usuario");

	ConexionServ.query('SELECT *, rowid FROM usuarios WHERE username=? ', [username]).then(function(result){
		console.log(result)
			if(result.length > 0){
				
				toastr.info('Usuario existente')
		}else{
			if ( usuario.value =="" ) {
				toastr.warning('Completa todos los campos')
			} else {
				consulta = "INSERT INTO usuarios('nombres', 'apellidos', 'email', 'sexo', 'fecha', 'celular',  'imagen_id', 'username', 'password') VALUES( ?, ?, ?, ?, ?, ?, ?, ?,?)"
				ConexionServ.query(consulta, [$scope.nombres, $scope.apellidos, $scope.email, $scope.sexo, $scope.fecha, $scope.celular,  $scope.imagen_id, $scope.username, $scope.password]
			
				
				).then(function(){
			
			console.log('USUARIO insertado')
		}, function(tx){
			toastr.info('usuario no se pudo insertar')
			console.log('usuarios no se pudo insertar', tx)
		});
			
	}
			}
	})

	
		
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

			
		consulta = 'UPDATE usuarios SET modificado=1, nombres=?, apellidos=?, email=?, sexo=?, fecha=?, celular=?, activo=?, username=?, password=?, cita=? WHERE rowid=?'
		ConexionServ.query(consulta, [usu.nombres, usu.apellidos, usu.email, usu.sexo, usu.fecha, , usu.celular, usu.activo,  usu.username, usu.password, usu.cita, usu.rowid]).then(function(result){
			console.log('usuarios actualizado ', result);
		}, function(tx){
			console.log('usuarios no se pudo actualizar', tx);
		});

}

	$scope.eliminarusuarios = function(usuario){
		consulta = 'UPDATE usuarios SET eliminado=1 WHERE rowid=?'
		ConexionServ.query(consulta, [usuario.rowid.$index]).then(function(result){
			$scope.usuario = result;
			console.log('usuario eliminada')

		}, function(tx){
			console.log('usuario no se pudo eliminar', tx)
		});
}


})

