angular.module('todo')

.controller('tablaCtrl', function($scope, ConexionServ, $uibModal){
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
			title: '¿Estás seguro?',
			text: "No te será permitido revertir esto",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#17a2b8',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Confirmar'
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
				title: 'Eliminado',
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

	$scope.Actualizactivo = function(usuario){

			
		consulta = 'UPDATE usuarios SET activo=?  WHERE rowid=?'
		ConexionServ.query(consulta, [ usuario.activo, usuario.rowid]).then(function(result){
			console.log('activo actualizado ', result);
			$scope.mostrarusuarios()
		}, function(tx){
			console.log('activo no se pudo actualizar', tx);
		});

}

$scope.traeractivos=function(activo){
	consulta = "SELECT *, rowid FROM usuarios WHERE activo=?"
	ConexionServ.query(consulta, [activo]).then(function(result){
		
		$scope.usuarios = result;
		console.log('activo mostrado')

	}, function(tx){
		console.log('activo no mostrado', tx)
	});
}
$scope.traeractivos();


	$scope.mostrarusuarios = function(result){
		consulta = "SELECT *, rowid FROM usuarios WHERE activo==1"
		ConexionServ.query(consulta, []).then(function(result){
			$scope.usuarios = result;
			console.log('usuario mostrado')

		}, function(tx){
			console.log('usuarios no mostrado', tx)
		});
	}


	$scope.mostrarusuarios();

	


$scope.Actualizarusuarios = function (usuario) {
	var modalInstance = $uibModal.open({
		templateUrl: 'templates/editarusuario.html',
		controller: 'EditarUsuraioCtrl',
		size: 'lg',
		resolve: {
			usuario: function () {
				return usuario;
			}
		}
	  });
  
	  modalInstance.result.then(function () {
		console.log('Cerrado');
	  }, function () {
		console.log('Modal dismissed at: ' + new Date());
	  });
}


})


.controller('EditarUsuraioCtrl', function (ConexionServ,$scope, $uibModalInstance, usuario) {
	
	$scope.usuarios_edit = usuario;


	
	
	

	$scope.Actualizarusuarios  = function(usuario){

console.log(usuario)
			
		consulta = 'UPDATE usuarios SET nombres=?, apellidos=?, email=?, sexo=?, fecha=?, celular=?, activo=?, username=?, password=? WHERE rowid=?'
		ConexionServ.query(consulta, [usuario.nombres, usuario.apellidos, usuario.email, usuario.sexo, usuario.fecha, usuario.celular, usuario.activo,  usuario.username, usuario.password, usuario.rowid]).then(function(result){
			toastr.info('Usuario Actualizado')
			console.log('usuarios actualizado ', result);
		}, function(tx){
			console.log('usuarios no se pudo actualizar', tx);
		});


	  $uibModalInstance.close();

	};
  
	$scope.cancel = function () {
	  $uibModalInstance.dismiss('cancel');
	};
});

