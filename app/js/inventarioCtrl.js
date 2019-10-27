angular.module('todo')

.controller('inventarioCtrl', function($scope, ConexionServ){
	ConexionServ.createTables();

	




$scope.insertarproducto = function(codigo_producto){

	var correo = document.getElementById("codigo_producto");

	ConexionServ.query('SELECT *, rowid FROM inventario WHEREcodigo_producto', [codigo_producto]).then(function(result){
		console.log(result)
			if(result.length > 0){
				
				toastr.info('Producto Existente')
		}else{
			if  (correo.value =="" ) {
				toastr.warning('Completa todos los campos')
			} else {
				consulta = "INSERT INTO inventario('nombre', 'descripcion', 'codigo_producto', 'estado', 'precio', 'cantidad') VALUES( ?, ?, ?, ?, ?, ?)"
				ConexionServ.query(consulta, [$scope.nombre, $scope.descripcion, $scope.codigo_producto, $scope.estado, $scope.precio, $scope.cantidad]
			
				
				).then(function(){
			
			toastr.success('Producto insertado')
			console.log('Producto insertado')
		}, function(tx){
			toastr.info('Producto no se pudo insertar')
			console.log('Producto no se pudo insertar', tx)
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

