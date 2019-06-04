
angular.module('todo')


.controller('UsuariosCtrl', function($scope, ConexionServ, $filter, $uibModal){
	ConexionServ.createTables();
	
	
	$scope.status = {
		isCustomHeaderOpen: false,
		isFirstOpen: true,
		isFirstDisabled: false
	  }

	$scope.modificando = false ;
	$scope.mostrar = false ;

	$scope.editarusuarios = function(usuario){
		
		$scope.modificando = true ;
		$scope.usuarios_edit = usuario;
		console.log('vamos a editar');
	}

	$scope.editarasistencias = function(asis){
		$scope.mostrar = true ;
		$scope.asistencias_edit = asis;
		console.log('vamossss a editar')
	},function(tx){
		console.log('no vamossss a editar')
	}


	$scope.insertarasistencia = function(usu){
		
		consulta = "INSERT INTO asistencias('cita', 'usuarios_id') VALUES(?,?)"
		
			$scope.cita= new Date(startDate)
		ConexionServ.query(consulta, [$scope.cita, usu.rowid ]).then(function(result){
			
			 toastr.sadasd('Asistencia insertata') 
			console.log('asistencias insertado')
			$scope.traerusuarios();
		}, function(tx){
			console.log('asistencias no se pudo insertar', tx)
		});
	}

	$scope.insertarasistencia = function(usu){
		
		consulta = "INSERT INTO asistencias('cita', 'usuarios_id') VALUES(?,?)"
		
		

			$scope.cita= new Date();
		ConexionServ.query(consulta, [$scope.cita, usu.rowid ]).then(function(result){
			$scope.traerusuarios();
			
			console.log('asistencias insertado')
		}, function(tx){
			console.log('asistencias no se pudo insertar', tx)
		});
	}

	

	$scope.traerusuarios=function(){
		ConexionServ.query('SELECT *, rowid FROM usuarios').then(function(usuarios){
			for (let i = 0; i < usuarios.length; i++) {
				const usu = usuarios[i];
				console.log('holas')
				consulta = 'SELECT *, rowid  FROM asistencias WHERE usuarios_id=?'
				ConexionServ.query(consulta, [usuarios[i].rowid]).then(function(asistencias){
					usuarios[i].asistencias=asistencias;
					console.log('siii')
					
				}, function(tx){
					console.log('nooo')
				})
			}
			
			$scope.usuarios=usuarios;
			
		})
	}
	
	$scope.traerusuarios();

	


	$scope.Actualizarusuarios = function(usu){

			
		consulta = 'UPDATE usuarios SET nombres=?, apellidos=?, email=?, sexo=?, fecha=?, celular=?, modificado=?, username=?, password=? WHERE rowid=?'
		ConexionServ.query(consulta, [usu.nombres, usu.apellidos, usu.email, usu.sexo, usu.fecha, usu.celular, usu.modificado, usu.username, usu.password, usu.rowid]).then(function(result){
			console.log('usuarios actualizado ', result);
		}, function(tx){
			console.log('usuarios no se pudo actualizar', tx);
		});

}

	

$scope.eliminarusuarios = function(usuario){
	consulta = 'DELETE FROM usuarios WHERE rowid=?'
	ConexionServ.query(consulta, [usuario.rowid]).then(function(result){
		$scope.usuario = result;
		$scope.traerusuarios();
		console.log('usuario eliminada')

	}, function(tx){
		console.log('usuario no se pudo eliminar', tx)
	});
}


$scope.editarAsistencia = function (asis) {
	var modalInstance = $uibModal.open({
		templateUrl: 'templates/editarAsistenciaModal.html',
		controller: 'EditarAsistenciaCtrl',
		size: 'lg',
		resolve: {
			asis: function () {
				return asis;
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