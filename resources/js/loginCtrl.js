angular.module('todo')

.controller('loginCtrl', function($scope, ConexionServ){
	ConexionServ.createTables();

	console.log('asdsad')

	
hola = function hola(hola){
	
	var username =  document.getElementById("nombres");
	var password = document.getElementById("contraseña");


	if(username.value ==""   || password.value =="" ){
		toastr.warning('Ingresa tus datos')
	}else{

	}
}
		
		
		
	

		

})

