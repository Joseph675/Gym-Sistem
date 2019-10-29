angular.module('todo')

.controller('AsisusuariosCtrl', function ($scope, $state, ConexionServ, $uibModal) {
	
	  
    console.log($state.params.usu_id)

    usu_id=$state.params.usu_id;

      
    mes = new Date().getMonth() + 1;

    if (mes < 9) {
        mes = '0' + mes;
    }else{
        mes = '' + mes;
    }



    $scope.dato = { select_year: '' + (new Date().getFullYear()), select_month: mes }

   
    $scope.traerDatos=function(){
        cuadro = $scope.dato.select_year + '/' + $scope.dato.select_month; 
        console.log(cuadro)
        consulta = 'SELECT *,rowid FROM asistencias WHERE usuario_id=? and eliminado = "0" and cita like "' + cuadro + '%" ' 
        ConexionServ.query(consulta, [usu_id]).then(function(asis){
            console.log(asis)
            $scope.usu.asistencias = asis;
        },function(tx){
                console.log('noo')
        })
     
    }



	$scope.traerUsuarios=function(){


        ConexionServ.query('SELECT *,rowid FROM usuarios WHERE rowid=?', [usu_id]).then(function(usuarios){
    
            if (usuarios.length>0){
    
                $scope.usu=usuarios[0]

                consulta = 'SELECT *, rowid  FROM asistencias WHERE usuario_id=?'
                ConexionServ.query(consulta, [$state.params.usu_id]).then(function(asistencias){
                    for (let l = 0; l < asistencias.length; l++) {
                        asistencias[l].cita = new Date(asistencias[l].cita) ;
                        
                    }
                    $scope.usu.asistencias=asistencias;
    
                },function(tx){
                    console.log('noo')
                })
            
            }
        })
    
        }
    
    
        $scope.traerUsuarios();
        
        
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
	

});

