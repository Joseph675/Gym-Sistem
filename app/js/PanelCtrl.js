angular.module('todo')

.controller('PanelCtrl', function($scope, ConexionServ){
	ConexionServ.createTables();

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
		
			$scope.cita= new Date()
		ConexionServ.query(consulta, [$scope.cita, usu.rowid ]).then(function(result){
			
			
			console.log('asistencias insertado')
			$scope.traerusuarios();
		}, function(tx){
			console.log('asistencias no se pudo insertar', tx)
		});
	}

	$scope.insertartareas = function(){
		
		consulta = "INSERT INTO tareas('tarea') VALUES(?)"
		
		ConexionServ.query(consulta, [$scope.tarea]).then(function(result){
			
			console.log('tarea insertado')
		}, function(tx){
			console.log('tarea no se pudo insertar', tx)
		});
	}

	

	$scope.traertareas=function(){
		consulta = "SELECT *, rowid FROM tareas "
		ConexionServ.query(consulta, []).then(function(result){
			
			$scope.usuarios = result;
			console.log('tarea mostrado')
	
		}, function(tx){
			console.log('tarea no mostrado', tx)
		});
	}
	$scope.traertareas();
	


	$scope.Actualizarusuarios = function(usu){

			
		consulta = 'UPDATE usuarios SET nombres=?, apellidos=?, email=?, sexo=?, fecha=?, celular=?, modificado=?, username=?, password=? WHERE rowid=?'
		ConexionServ.query(consulta, [usu.nombres, usu.apellidos, usu.email, usu.sexo, usu.fecha, usu.celular, usu.modificado, usu.username, usu.password, usu.rowid]).then(function(result){
			console.log('usuarios actualizado ', result);
		}, function(tx){
			console.log('usuarios no se pudo actualizar', tx);
		});

}

	$scope.actualizarasistencias = function(asis){

			
		consulta = 'UPDATE asistencias SET cita=? WHERE rowid=?'
		ConexionServ.query(consulta, [asis.cita, asis.rowid]).then(function(result){
			console.log('asistencias actualizado ', result);
		}, function(tx){
			console.log('asistencias no se pudo actualizar', tx);
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

$scope.eliminarasistencias = function(usu){
	consulta = 'DELETE FROM asistencias WHERE rowid=?'
	ConexionServ.query(consulta, [usu.rowid]).then(function(result){
		$scope.traerusuarios();
		$scope.usu = result;
		
	console.log('si elimino')

	}, function(tx){
		console.log('asistencias no se pudo eliminar', tx)
	});
}


})

