angular.module('todo', [ 'ngSanitize','ui.bootstrap','ui.router'])

.config(function($stateProvider, $urlRouterProvider){
	
	$stateProvider
	
	.state('panel', {
		url: '/panel',
		controller: 'PanelCtrl',
		templateUrl: 'templates/panel.html'
	})
	
	.state('login', {
		url: '/login',
		controller: 'loginCtrl',
		templateUrl: 'templates/login.html'
	})

	.state('panel.asisusuarios', {
		url: '/asistenciasUsuarios/:usu_id',
		controller: 'AsisusuariosCtrl',
		templateUrl: 'templates/Usuasistencias.html',

		
	})
	.state('panel.usuarios', {
		url: '/usuarios',
		controller: 'UsuariosCtrl',
		templateUrl: 'templates/Usuarios.html'
	})

	.state('panel.calendar', {
		url: '/calendar',
		controller: 'CalendarCtrl',
		templateUrl: 'templates/calendar.html'
	})

	.state('panel.table', {
		url: '/table',
		controller: 'tablaCtrl',
		templateUrl: 'templates/data-table.html'
	})

	.state('panel.form', {
		url: '/formulario',
		controller: 'formularioCtrl',
		templateUrl: 'templates/form-elements.html'
	})

	.state('panel.inventario', {
		url: '/inventario',
		controller: 'inventarioCtrl',
		templateUrl: 'templates/inventario.html'
	})

	.state('panel.productos', {
		url: '/productos',
		controller: 'productosCtrl',
		templateUrl: 'templates/productos.html'
	})

	.state('panel.perfil', {
		url: '/perfil',
		controller: 'PanelCtrl',
		templateUrl: 'templates/profile-about.html'
	})

	.state('404', {
		url: '/404',
		controller: 'tablaCtrl',
		templateUrl: 'templates/404.html'
	})

	.state('panel.yolo', {
		url: '/yolo',
		controller: 'tablaCtrl',
		templateUrl: 'templates/yolo.html'
	})

	.state('panel.sincronizacion', {
		url: '/sincronizacion',
		controller: 'SincronizacionCtrl',
		templateUrl: 'templates/Sincronizacion.html'
		
	})
	

	.state('panel.asistencias', {
		url: '/asistencias',
		controller: 'UsuariosCtrl',
		templateUrl: 'templates/asistencias.html'
		
	})


	$urlRouterProvider.otherwise('/login')

})

