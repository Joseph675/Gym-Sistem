angular.module('todo')

.controller('loginCtrl', function($scope, ConexionServ, $state){
	ConexionServ.createTables();

	ConexionServ.query('SELECT *, rowid FROM usuarios WHERE username="admin" and password="123" ').then(function(result){
		if(result.length == 0){
			
			consulta = "INSERT INTO usuarios(nombres, apellidos, email, sexo, celular, activo, username, password) VALUES(?, ?, ?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Joseth', 'Guerrero', 'davidguerrero777@gmail.com', 'M', 3203602610, 1, 'admin', '123']).then(function(){
				console.log('Admin creado');
			});
		}
			
	})

	
	
	

	$scope.mostrarusuarios = function Login(username, password){
		var done=0; 
		var usuario=$scope.username; 
		var password=$scope.password; 
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
		var usuario=$scope.username; 
		var password=$scope.password; 
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

