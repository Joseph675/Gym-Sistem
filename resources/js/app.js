angular.module('todo', ['ngAnimate', 'ngSanitize','ui.bootstrap','ui.router'])

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

	.state('usuarios', {
		url: '/usuarios',
		controller: 'UsuariosCtrl',
		templateUrl: 'templates/Usuarios.html'
	})

	.state('calendar', {
		url: '/calendar',
		controller: 'CalendarCtrl',
		templateUrl: 'templates/calendar.html'
	})

	.state('table', {
		url: '/table',
		controller: 'tablaCtrl',
		templateUrl: 'templates/data-table.html'
	})

	.state('form', {
		url: '/formulario',
		controller: 'formularioCtrl',
		templateUrl: 'templates/form-elements.html'
	})

	.state('perfil', {
		url: '/perfil',
		controller: 'PanelCtrl',
		templateUrl: 'templates/profile-about.html'
	})

	.state('404', {
		url: '/404',
		controller: 'tablaCtrl',
		templateUrl: 'templates/404.html'
	})

	.state('yolo', {
		url: '/yolo',
		controller: 'tablaCtrl',
		templateUrl: 'templates/yolo.html'
	})

	.state('meses', {
		url: '/meses',
		controller: 'MesesCtrl',
		templateUrl: 'templates/meses.html'
		
	})
	
	.state('meses2', {
		url: '/meses2',
		controller: 'MesesCtrl2',
		templateUrl: 'templates/meses2.html'
		
	})

	.state('asistencias', {
		url: '/asistencias',
		controller: 'UsuariosCtrl',
		templateUrl: 'templates/asistencias.html'
		
	})


	$urlRouterProvider.otherwise('/login')

})

