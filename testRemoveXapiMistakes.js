var removeXAPImistakes = require('./removeXapiMistakes');
var TinCan = require('tincanjs');

var lrs;
try
{
	lrs = new TinCan.LRS(
	{
		endpoint: "https://cloud.scorm.com/lrs/HEVZONZVZJ/",
        username: "4RWGOYwHgDj-twNlpGA",
        password: "fGbebginYhYhOc9K0bs",
        allowFail: false
	});
}
catch(exception)
{
	console.log("Failed to setup LRS object: ", exception);
	lrs = null;
}


// Test 1: null check
try
{
	var test_1 = {};
	var result_1 = removeXAPImistakes(test_1);
	console.log("Test 1: \n" + JSON.stringify(result_1) + "\n");
}
catch(error)
{
	console.log("Test 1 generated an error as expected: " + error +"\n");
}

// Test 2: standard use, nested
var test_2 = {
	"type": "xAPI",
	"data": {
		"statement": {
			"actor": {
				"account": {
					"name": "9678f235-4b77-478e-a536-d1e24655a61d"
				},
				"objectType": "Agent"
			},
			"verb": {
				"id": "http://adlnet.gov/expapi/verbs/attempted",
				"display": {
					"en-US": "attempted"
				}
			},
			"object": {
				"id": "undefined?subContentId=eafe7fc0-0463-4497-aa5e-a677f35779d0",
				"objectType": "Activity",
				"definition": {
					"extensions": {
						"http://h5p.org/x-api/h5p-local-content-id": "86fcpf7d9",
						"http://h5p.org/x-api/h5p-subContentId": "eafe7fc0-0463-4497-aa5e-a677f35779d0"
					}
				}
			},
			"context": {
				"contextActivities": {
					"parent": [{
						"objectType": "Activity"
					}],
					"category": [{
						"id": "http://h5p.org/libraries/H5P.CoursePresentation-1.22",
						"objectType": "Activity"
					}]
				}
			}
		}
	}
};
var result_2 = removeXAPImistakes(test_2);
console.log("Test 2: \n" + JSON.stringify(result_2) + "\n");
var statement = new TinCan.Statement(result_2);
lrs.saveStatement(
    statement,
    {
        callback: function (err, xhr) {
            if (err !== null) {
                if (xhr !== null) {
                    console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
                    // TODO: do something with error, didn't save statement
                    return;
                }

                console.log("Failed to save statement: " + err);
                // TODO: do something with error, didn't save statement
                return;
            }

            console.log("2: Statement saved");
            // TOOO: do something with success (possibly ignore)
        }
    }
);

// Test 3: standard use, not nested
var test_3 = {
	"actor": {
		"account": {
			"name": "9678f235-4b77-478e-a536-d1e24655a61d"
		},
		"objectType": "Agent"
	},
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/attempted",
		"display": {
			"en-US": "attempted"
		}
	},
	"object": {
		"id": "undefined?subContentId=eafe7fc0-0463-4497-aa5e-a677f35779d0",
		"objectType": "Activity",
		"definition": {
			"extensions": {
				"http://h5p.org/x-api/h5p-local-content-id": "86fcpf7d9",
				"http://h5p.org/x-api/h5p-subContentId": "eafe7fc0-0463-4497-aa5e-a677f35779d0"
			}
		}
	},
	"context": {
		"contextActivities": {
			"parent": [{
				"objectType": "Activity"
			}],
			"category": [{
				"id": "http://h5p.org/libraries/H5P.CoursePresentation-1.22",
				"objectType": "Activity"
			}]
		}
	}
};
var result_3 = removeXAPImistakes(test_3);
console.log("Test 3: \n" + JSON.stringify(result_3) + "\n");
var statement = new TinCan.Statement(result_3);
lrs.saveStatement(
    statement,
    {
        callback: function (err, xhr) {
            if (err !== null) {
                if (xhr !== null) {
                    console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
                    // TODO: do something with error, didn't save statement
                    return;
                }

                console.log("Failed to save statement: " + err);
                // TODO: do something with error, didn't save statement
                return;
            }

            console.log("3: Statement saved");
            // TOOO: do something with success (possibly ignore)
        }
    }
);

// Test 4: has homepage
var test_4 = {
	"actor": {
		"account": {
			"name": "9678f235-4b77-478e-a536-d1e24655a61d",
			"homePage":"http://www.IalreadyHaveAHomepage.com/"
		},
		"objectType": "Agent"
	},
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/attempted",
		"display": {
			"en-US": "attempted"
		}
	},
	"object": {
		"id": "undefined?subContentId=eafe7fc0-0463-4497-aa5e-a677f35779d0",
		"objectType": "Activity",
		"definition": {
			"extensions": {
				"http://h5p.org/x-api/h5p-local-content-id": "86fcpf7d9",
				"http://h5p.org/x-api/h5p-subContentId": "eafe7fc0-0463-4497-aa5e-a677f35779d0"
			}
		}
	},
	"context": {
		"contextActivities": {
			"parent": [{
				"objectType": "Activity"
			}],
			"category": [{
				"id": "http://h5p.org/libraries/H5P.CoursePresentation-1.22",
				"objectType": "Activity"
			}]
		}
	}
};
var result_4 = removeXAPImistakes(test_4);
console.log("Test 4: \n" + JSON.stringify(result_4) + "\n");
var statement = new TinCan.Statement(result_4);
lrs.saveStatement(
    statement,
    {
        callback: function (err, xhr) {
            if (err !== null) {
                if (xhr !== null) {
                    console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
                    // TODO: do something with error, didn't save statement
                    return;
                }

                console.log("Failed to save statement: " + err);
                // TODO: do something with error, didn't save statement
                return;
            }

            console.log("4: Statement saved");
            // TOOO: do something with success (possibly ignore)
        }
    }
);

// Test 5: all correct, uses mbox instead of account
var test_5 = {
	"actor": {
		"name": "admin",
		"mbox": "mailto:joseph.flaherty347@csuci.edu",
		"objectType": "Agent"
	},
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/progressed",
		"display": {
			"en-US": "progressed"
		}
	},
	"object": {
		"id": "http://cilearn.com/fsdkasffkasd/",
		"objectType": "Activity",
		"definition": {
			"extensions": {
				"http://h5p.org/x-api/h5p-local-content-id": 4
			},
			"name": {
				"en-US": "cool_new_test"
			}
		}
	},
	"context": {
		"contextActivities": {
			"category": [{
				"id": "http://h5p.org/libraries/H5P.BranchingScenario-1.2",
				"objectType": "Activity"
			}]
		}
	}
};
var result_5 = removeXAPImistakes(test_5);
console.log("Test 5: \n" + JSON.stringify(result_5) + "\n");


// var test_email = "abc@xyz.com";
// var result_email = isValidEmail(test_email);
// console.log("Test Email: \n" + result_email + "\n");

// test_email = "safdasdfdsaf";
// result_email = isValidEmail(test_email);
// console.log("Test Email 2: \n" + result_email + "\n");

// test_email = "hello123@me2.org";
// result_email = isValidEmail(test_email);
// console.log("Test Email 3: \n" + result_email + "\n");


// Test 6: uses invalid mbox
var test_6 = {
	"actor": {
		"name": "admin",
		"mbox": "mailto:joseph.flaherty347csuci.edu",
		"objectType": "Agent"
	},
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/progressed",
		"display": {
			"en-US": "progressed"
		}
	},
	"object": {
		"id": "http://cilearn.com/fsdkasffkasd/",
		"objectType": "Activity",
		"definition": {
			"extensions": {
				"http://h5p.org/x-api/h5p-local-content-id": 4
			},
			"name": {
				"en-US": "cool_new_test"
			}
		}
	},
	"context": {
		"contextActivities": {
			"category": [{
				"id": "http://h5p.org/libraries/H5P.BranchingScenario-1.2",
				"objectType": "Activity"
			}]
		}
	}
};
var result_6 = removeXAPImistakes(test_6);
console.log("Test 6: \n" + JSON.stringify(result_6) + "\n");

// Test 7: mbox without "mailto:
var test_7 = {
	"actor": {
		"name": "admin",
		"mbox": "joseph.flaherty347@csuci.edu",
		"objectType": "Agent"
	},
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/progressed",
		"display": {
			"en-US": "progressed"
		}
	},
	"object": {
		"id": "http://cilearn.com/fsdkasffkasd/",
		"objectType": "Activity",
		"definition": {
			"extensions": {
				"http://h5p.org/x-api/h5p-local-content-id": 4
			},
			"name": {
				"en-US": "cool_new_test"
			}
		}
	},
	"context": {
		"contextActivities": {
			"category": [{
				"id": "http://h5p.org/libraries/H5P.BranchingScenario-1.2",
				"objectType": "Activity"
			}]
		}
	}
};
var result_7 = removeXAPImistakes(test_7);
console.log("Test 7: \n" + JSON.stringify(result_7) + "\n");

// Test 8: no actor IRI
var test_8 = {
	"actor": {
		"name": "admin",
		"objectType": "Agent"
	},
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/progressed",
		"display": {
			"en-US": "progressed"
		}
	},
	"object": {
		"id": "http://cilearn.com/fsdkasffkasd/",
		"objectType": "Activity",
		"definition": {
			"extensions": {
				"http://h5p.org/x-api/h5p-local-content-id": 4
			},
			"name": {
				"en-US": "cool_new_test"
			}
		}
	},
	"context": {
		"contextActivities": {
			"category": [{
				"id": "http://h5p.org/libraries/H5P.BranchingScenario-1.2",
				"objectType": "Activity"
			}]
		}
	}
};
var result_8 = removeXAPImistakes(test_8);
console.log("Test 8: \n" + JSON.stringify(result_8) + "\n");

// Test 9: no object ID
var test_9 = {
	"actor": {
		"account": {
			"name": "9678f235-4b77-478e-a536-d1e24655a61d"
		},
		"objectType": "Agent"
	},
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/attempted",
		"display": {
			"en-US": "attempted"
		}
	},
	"object": {
		"objectType": "Activity",
		"definition": {
			"extensions": {
				"http://h5p.org/x-api/h5p-local-content-id": "86fcpf7d9",
				"http://h5p.org/x-api/h5p-subContentId": "eafe7fc0-0463-4497-aa5e-a677f35779d0"
			}
		}
	},
	"context": {
		"contextActivities": {
			"parent": [{
				"objectType": "Activity"
			}],
			"category": [{
				"id": "http://h5p.org/libraries/H5P.CoursePresentation-1.22",
				"objectType": "Activity"
			}]
		}
	}
};
var result_9 = removeXAPImistakes(test_9);
console.log("Test 9: \n" + JSON.stringify(result_9) + "\n");

// Test 10: no context ID
var test_10 = {
	"actor": {
		"account": {
			"name": "9678f235-4b77-478e-a536-d1e24655a61d"
		},
		"objectType": "Agent"
	},
	"verb": {
		"id": "http://adlnet.gov/expapi/verbs/attempted",
		"display": {
			"en-US": "attempted"
		}
	},
	"object": {
		"id": "http://cilearn.com/fsdkasffkasd/",
		"objectType": "Activity",
		"definition": {
			"extensions": {
				"http://h5p.org/x-api/h5p-local-content-id": "86fcpf7d9",
				"http://h5p.org/x-api/h5p-subContentId": "eafe7fc0-0463-4497-aa5e-a677f35779d0"
			}
		}
	},
	"context": {
		"contextActivities": {
			"parent": [{
				"objectType": "Activity"
			}],
			"category": [{
				"id": "http://h5p.org/libraries/H5P.CoursePresentation-1.22",
				"objectType": "Activity"
			}]
		}
	}
};
var result_10 = removeXAPImistakes(test_10);
console.log("Test 10: \n" + JSON.stringify(result_10) + "\n");
