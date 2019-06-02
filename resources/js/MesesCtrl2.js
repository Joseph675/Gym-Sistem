angular.module('todo')

.controller('MesesCtrl2', function($scope, ConexionServ, $filter){



	$scope.usuarios=[
	{ nombre:"felipe", asistencia:[]}, 

	{ nombre:"juan", asistencia:[]}, 

	{nombre:"marcela", asistencia:[
	{ fecha: new Date()}
	]}, 

	{ nombre:"heiner", asistencia:[
	{fecha: new Date()}]}

	];

	$scope.mas=function(usua){


		usua.asistencia.push(

			{fecha: new Date()}
			);

	}

	
	
})

