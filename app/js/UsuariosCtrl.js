
angular.module('todo')


.controller('UsuariosCtrl', function($scope, ConexionServ, $uibModal, $state ){
	ConexionServ.createTables();

 
    console.log($state.params.usu_id)

    usu_id=$state.params.usu_id;

      
    mes = new Date().getMonth() + 1;

    if (mes < 9) {
        mes = '0' + mes;
    }else{
        mes = '' + mes;
    }



    $scope.dato = { select_year: '' + (new Date().getFullYear()), select_month: mes }

    $scope.traerdatos=function(dato){
        cuadro = dato.select_year + '/' + dato.select_month; 
        
        consulta = ' SELECT *, rowid FROM asistencias WHERE usuario_id=? and eliminado = "0" and  cita like "' + cuadro + '%" '
        ConexionServ.query(consulta, [usu_id]).then(function(asis){
			$scope.asis=usu
			console.log(asis)        
    })
}


$scope.Usuasistencias = function(usuario){
	$state.go('panel.asisusuarios', {usu_id: usuario.rowid})
}
	
$scope.Swal = function(){
	Swal.fire({
		background: '#000',
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!'
	  }).then((result) => {
		if (result.value) {
			
		  Swal.fire({
			background: '#000',
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			type: 'success',
		  })
		}
	  })
}
	
	
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
		console.log("aqui")
		
		
		$scope.cita= new Date()
		console.log($scope.cita)
		cita=window.fixDate($scope.cita)

		consulta = "INSERT INTO asistencias('cita', 'usuario_id') VALUES(?,?)"
		ConexionServ.query(consulta, [cita, usu.rowid ]).then(function(result){
			$scope.traerusuarios();
			
			console.log('asistencias insertado')
		}, function(tx){
			console.log('asistencias no se pudo insertar', tx)
		});
	}

	

	$scope.traerusuarios=function(){
		ConexionServ.query('SELECT *,rowid FROM usuarios WHERE activo==1 and eliminado==0').then(function(usuarios){
			for (let i = 0; i < usuarios.length; i++) {
				const usu = usuarios[i];
				console.log('holas')
				cuadro = $scope.dato.select_year + '/' + $scope.dato.select_month; 
				consulta = 'SELECT *,rowid FROM asistencias WHERE usuario_id=? and eliminado = "0" and cita like "' + cuadro + '%" ' 
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
		console.log('usuario eliminada')
		$scope.traerusuarios();

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

	console.log(asis);

	$scope.dato = {};

	$scope.dateOptions = {
		formatYear: 'yy',
		maxDate: new Date(2025, 12, 31),
		minDate: new Date(2019, 01, 01)
	};


	$scope.open1 = function () {
		$scope.dato.opened = !$scope.dato.opened;
	}
	
	
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

		cita = asis.cita.replace('-', '/');
		// toca repetirlo quién sabe por qué.
		cita = asis.cita.replace('-', '/');

		ConexionServ.query(consulta, [cita, asis.rowid]).then(function(result){
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

