angular.module('todo')

.controller('loginCtrl', function($scope, ConexionServ, $state){
	ConexionServ.createTables();

	

	$scope.insertarusuarios = function(username, password){

		
	
		ConexionServ.query('SELECT *, rowid FROM usuarios WHERE username=? and password=?', [username, password]).then(function(result){
			console.log(result)
				if(result.length > 0){
					toastr.warning('No se pudo insertar')

			}else{
				
				consulta = "INSERT INTO usuarios('nombres', 'apellidos', 'email', 'sexo', 'fecha', 'celular', 'activo', 'imagen_id', 'username', 'password') VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?,?)"
				ConexionServ.query(consulta, [$scope.nombres, $scope.apellidos, $scope.email, $scope.sexo, $scope.fecha, $scope.celular, $scope.activo, $scope.imagen_id, $scope.username, $scope.password]
				
					
					).then(function(){
				
				toastr.success('Usuario insertado')
				console.log('USUARIO insertado')

			}, function(tx){
				toastr.info('usuario no se pudo insertar')
				console.log('usuarios no se pudo insertar', tx)
			});
				}
				
				
		})
	
		
			
	}
	

	$scope.mostrarusuarios = function Login(username, password){
		var done=0; 
		var usuario=document.login.usuario.value; 
		var password=document.login.password.value; 
		if (usuario=="USUARIO1" && password=="CONTRASEÑA1") { 
		window.location="http://192.168.100.31/feryz_server/public/taxis/"; 
		} 
		if (usuario=="USUARIO2" && password=="CONTRASEÑA2") { 
		window.location="http://192.168.100.31/feryz_server/public/taxis/"; 
		} 
		if (usuario=="" && password=="") { 
		window.location="errorpopup.html"; 
		}
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


	
	function Login(){ 
		var done=0; 
		var usuario=document.login.usuario.value; 
		var password=document.login.password.value; 
		if (usuario=="USUARIO1" && password=="CONTRASEÑA1") { 
		window.location="http://192.168.100.31/feryz_server/public/taxis/"; 
		} 
		if (usuario=="USUARIO2" && password=="CONTRASEÑA2") { 
		window.location="http://192.168.100.31/feryz_server/public/taxis/"; 
		} 
		if (usuario=="" && password=="") { 
		window.location="errorpopup.html"; 
		} 
		} 

})

