angular.module('todo')

.controller('tablaCtrl', function($scope, ConexionServ, $filter){
	ConexionServ.createTables();

	$scope.mostrarTablaInsertar=true;
	$scope.editar = false ;	
	$scope.modificando = false ;	

	$scope.editarusuarios = function(usuario){
		$scope.mostrarTablaInsertar=false;
		$scope.editar=true;
		$scope.modificando = true ;
		$scope.usuarios_edit = usuario;
		
		console.log('vamos a editar');
	}

	$scope.Swal = function(usuario){

		
		Swal.fire({
			background: '#000',
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#17a2b8',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		  }).then((result) => {
			if (result.value) {
				consulta = 'DELETE FROM usuarios WHERE rowid=?'
				ConexionServ.query(consulta, [usuario.rowid]).then(function(result){
				$scope.usuario = result;
				console.log('usuario eliminada')
				$scope.mostrarusuarios();
			}, function(tx){
				console.log('usuario no se pudo eliminar', tx)
			});
				
			  Swal.fire({
				background: '#000',
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				type: 'success',
			  })
			}
		  })
	}

	$scope.insertarusuarios = function(){
		consulta = "INSERT INTO usuarios('nombres', 'apellidos', 'email', 'sexo', 'fecha',  'celular', 'activo', 'username', 'password') VALUES(?, ?, ?, ?, ?, ?, ?,  ?, ?, ?)"
		ConexionServ.query(consulta, [$scope.nombres, $scope.apellidos, $scope.email, $scope.sexo, $scope.fecha, $scope.celular, $scope.activo, $scope.username, $scope.password]).then(function(result){
			$scope.mostrarusuarios();
			console.log('usuarios insertado')
		}, function(tx){
			console.log('usuarios no se pudo insertar', tx)
		});
	}

	$scope.activo = function(){
		consulta = "SELECT *, activo=1 FROM usuarios"
		ConexionServ.query(consulta, []).then(function(result){
			$scope.usuarios = result;
			console.log('activo mostrado')

		}, function(tx){
			console.log('activo no mostrado', tx)
		});
	}

	$scope.activo();

	$scope.Actualizactivo = function(usuario){

			
		consulta = 'UPDATE usuarios SET activo=?  WHERE rowid=?'
		ConexionServ.query(consulta, [ usuario.activo, usuario.rowid]).then(function(result){
			console.log('activo actualizado ', result);
		}, function(tx){
			console.log('activo no se pudo actualizar', tx);
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

			
		consulta = 'UPDATE usuarios SET nombres=?, apellidos=?, email=?, sexo=?, fecha=?, celular=?, activo=?, username=?, password=? WHERE rowid=?'
		ConexionServ.query(consulta, [usu.nombres, usu.apellidos, usu.email, usu.sexo, usu.fecha, usu.celular, usu.activo,  usu.username, usu.password, usu.rowid]).then(function(result){
			toastr.info('Usuario Actualizado')
			console.log('usuarios actualizado ', result);
		}, function(tx){
			console.log('usuarios no se pudo actualizar', tx);
		});

}

	$scope.eliminarusuarios = function(usuario){
		consulta = 'DELETE FROM usuarios WHERE rowid=?'
		ConexionServ.query(consulta, [usuario.rowid]).then(function(result){
			$scope.usuario = result;
			$scope.mostrarusuarios();
			console.log('usuario eliminado')
			toastr.error('Usuario eliminada')
		}, function(tx){
			console.log('usuario no se pudo eliminar', tx)
		});
}

	$scope.traer= function(){
		
	}

})

