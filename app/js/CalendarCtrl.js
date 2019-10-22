angular.module('todo')

.controller('CalendarCtrl', function($scope, ConexionServ){
	ConexionServ.createTables();

	$scope.editar = false ;	
	$scope.modificando = false ;	

	$scope.editarusuarios = function(usuario){
		$scope.modificando = true ;
		$scope.usuarios_edit = usuario;
		console.log('vamos a editar');
	}

	$scope.insertarusuarios = function(){
		consulta = "INSERT INTO usuarios('nombres', 'apellidos', 'email', 'sexo', 'fecha',  'celular', 'modificado', 'username', 'password') VALUES(?, ?, ?, ?, ?, ?, ?,  ?, ?, ?)"
		ConexionServ.query(consulta, [$scope.nombres, $scope.apellidos, $scope.email, $scope.sexo, $scope.fecha, $scope.celular, $scope.modificado, $scope.username, $scope.password]).then(function(result){
			console.log('usuarios insertado')
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

			
		consulta = 'UPDATE usuarios SET nombres=?, apellidos=?, email=?, sexo=?, fecha=?, celular=?, modificado=?, username=?, password=?, cita=? WHERE rowid=?'
		ConexionServ.query(consulta, [usu.nombres, usu.apellidos, usu.email, usu.sexo, usu.fecha, , usu.celular, usu.modificado,  usu.username, usu.password, usu.cita, usu.rowid]).then(function(result){
			console.log('usuarios actualizado ', result);
		}, function(tx){
			console.log('usuarios no se pudo actualizar', tx);
		});

}

	$scope.eliminarusuarios = function(usuario){
		consulta = 'DELETE FROM usuarios WHERE rowid=?'
		ConexionServ.query(consulta, [usuario.rowid]).then(function(result){
			$scope.usuario = result;
			console.log('usuario eliminada')

		}, function(tx){
			console.log('usuario no se pudo eliminar', tx)
		});
}


})



.controller('EditarAsistenciaCtrl', function (ConexionServ,$scope, $uibModalInstance, asis) {
	$scope.asis = asis;
	


	$scope.eliminarasistencias = function(usu){
		consulta = 'DELETE FROM asistencias WHERE rowid=?'
		ConexionServ.query(consulta, [usu.rowid]).then(function(result){
			
			$scope.usu = result;
			$scope.traerusuarios();
		console.log('si elimino')
	
		}, function(tx){
			console.log('asistencias no se pudo eliminar', tx)
		});
		 $uibModalInstance.close();
	}

	
	
	

	$scope.ok = function (asis) {
		consulta = 'UPDATE asistencias SET cita=? WHERE rowid=?'
		ConexionServ.query(consulta, [asis.cita, asis.rowid]).then(function(result){
			console.log('asistencias actualizado ', result);
		}, function(tx){
			console.log('asistencias no se pudo actualizar', tx);
		});
	  $uibModalInstance.close();

	};
  
	$scope.cancel = function () {
	  $uibModalInstance.dismiss('cancel');
	};
});