function(keys, values, rereduce) { 
    var stats = {Lies:0,Facts:0,Unknown:0};
    if (rereduce) {
	stats = {Lies:0,Facts:0,Unknown:0};
    } else {
	values.forEach(function(v) {
	    if (v.status == "Lie") {
		stats.Lies = stats.Lies + 1;
	    }
	    else if (v.status == "Fact") {
		stats.Facts = stats.Facts + 1;
	    }
	    else {
		stats.Unknown = stats.Unknown + 1;
	    }
	});
    }
    return stats
}