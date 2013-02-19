angular.module('geppeto', ['CornerCouch','$strap.directives']).
    config(function($routeProvider,$locationProvider) {
	$locationProvider.html5Mode(false);
	$locationProvider.hashPrefix = '!';
	$routeProvider.
	    when('/view',
		 {controller:geppetoView, 
		  templateUrl:'/geppeto/_design/geppeto/view.html',
		  reloadOnSearch:false}).
	    when('/source/:sourceId',
		 {controller:geppetoSource, 
		  templateUrl:'/geppeto/_design/geppeto/source.html',
		  reloadOnSearch:false}).
    	    otherwise({redirectTo:'/view'});
    });

function geppetoView($scope,cornercouch) {
    var server = cornercouch('http://localhost:5984','GET');
//    server.session();
    $scope.db = server.getDB('geppeto');
    $scope.s = {
	type:'source',
	status:'Unknown',
	text:'',
	link:'',
	pname:'',
    };

    $scope.pinnochio = "";

    function getPinnochios() {
	$scope.pinnochios = [];
	$scope.db.query('geppeto','pinnochios').success(function(items) {
	    for (var i=0,len=items.rows.length; i<len; i++) { 
		$scope.pinnochios.push(items.rows[i].key);
	    };
	});
    }

    function calcStats(stats) {
	r = stats.rows[0].value;
	r.total = r.Facts + r.Lies + r.Unknown;
	r.Facts = 100*r.Facts/r.total;
	r.Lies = 100*r.Lies/r.total;
	r.Unknown = 100*r.Unknown/r.total;
	$scope.stats = r;
    };
    
    $scope.searchstatus = "All";
    $scope.getSourceForPinnochio = function() {
	if ($scope.pinnochio && $scope.searchstatus!="All") {
	    var qparams = {
		key:[$scope.pinnochio,$scope.searchstatus],
	    };
	    $scope.pinnochiosources = $scope.db.query('geppeto','sourcesps',qparams);
	}
	else if ($scope.pinnochio && $scope.searchstatus=="All") {
	    var qparams = {
		key:$scope.pinnochio,
		reduce:"true"
	    };
	    $scope.db.query('geppeto','sourcesp',qparams).success(calcStats);
	    var qparams = {
		key:$scope.pinnochio,
		reduce:"false"
	    };
	    $scope.pinnochiosources = $scope.db.query('geppeto','sourcesp',qparams);
	}
	else if ($scope.pinnochio=="" && $scope.searchstatus=="All") {
	    var qparams = {
		reduce:"true"
	    };
	    $scope.db.query('geppeto','sourcesp',qparams).success(calcStats);
	    var qparams = {
		reduce:"false"
	    };
	    $scope.pinnochiosources = $scope.db.query('geppeto','sourcesp',qparams);
	}
	else if ($scope.pinnochio=="" && $scope.searchstatus!="All") {
	    var qparams = {
		key:$scope.searchstatus
	    };
	    $scope.pinnochiosources = $scope.db.query('geppeto','sourcess',qparams);
	}
	else {
	    $scope.pinnochiosources = {};
	}
    };

    $scope.addSource = function() {
	var doc = $scope.db.newDoc($scope.s);
	doc.save();
	$scope.getSourceForPinnochio();
    }

    getPinnochios();
    $scope.getSourceForPinnochio();
}    

function geppetoSource($scope,$routeParams,cornercouch) {
    var server = cornercouch('http://localhost:5984','GET');
    $scope.db = server.getDB('geppeto');
    var source = $scope.db.newDoc();
    source.load($routeParams.sourceId);
    $scope.source = source;
//    $scope.checkstatus = [
//	{name:'Αλήθεια'},
//	{name:'Ψέμα'}
//    ];
    $scope.check = {
	type:'check',
	status:'',
	text:'',
	link:'',
	source:$routeParams.sourceId
    };

    function getChecks() {
	var qparams = {
	    key:$routeParams.sourceId,
	};
	$scope.db.query('geppeto','checks',qparams);
    }

    $scope.addCheck = function() {
	var doc = $scope.db.newDoc($scope.check);
	doc.save();
	getChecks();
    }
    getChecks();
}
