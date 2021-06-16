module.exports = function removeXAPImistakes(json)
{
	// var json = JSON.parse(json);

	if(hasNestedStatement(json))
		json = fixNestedStatement(json);
	
	if(hasNoHomepage(json))
		json = fixNoHomepage(json);

	if(hasInvalidMbox(json))
		json = fixInvalidMbox(json);	

	if(hasNoActorIdentifier(json))
		json = fixNoActorIdentifier(json);
	
	if(hasNonAbsoluteActivityURI(json))
		json = fixNonAbsoluteActivityURI(json);

	if(hasNullActivityURI(json))
		json = fixNullActivityURI(json);

	if(hasMissingContextID(json))
		json = fixMissingContextID(json);

	return json;
}

function hasNestedStatement(json)
{
	// ("data" in json && "statement" in json.data) || 
	return !("actor" in json && "verb" in json && "object" in json);
}

// Doesn't search for statement location, as no other formats have been observed
// Could provide more robustness in this manner if various other formats are expected
// Although that would come at runtime cost!
function fixNestedStatement(json)
{
	if("data" in json && "statement" in json.data)
		json = json.data.statement;
	else if("statement" in json)
		json = json.statement;
	else
	{
		// console.log("Unrecognized Statement Structure. Full Statement: " + JSON.stringify(json));
		throw new Error("Unrecognized Statement Structure. Should have json.data.statement, json.statement, or json containing actor, verb, and object. Full Statement: " + JSON.stringify(json));
	}

	return json;
}

function hasNoHomepage(json)
{
	return ("account" in json.actor) && !("homePage" in json.actor.account);
}

function fixNoHomepage(json)
{
	json.actor.account.homePage = "http://www.instructure.com/";

	return json
}

function hasInvalidMbox(json)
{
	return ("mbox" in json.actor) && !(isValidEmail(json.actor.mbox))
}

function isValidEmail(email)
{
	const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(String(email));
}

function fixInvalidMbox(json)
{
	json.actor.mbox = "mailto:invalidMbox@pls.fix";

	return json;
}

function hasNoActorIdentifier(json)
{
	return !("mbox" in json.actor) && !("mbox_sha1sum" in json.actor)
		&& !("openid" in json.actor) && !("account" in json.actor);
}

function fixNoActorIdentifier(json)
{
	json.actor.mbox = "mailto:noIdentifier@pls.fix";

	return json;
}

function hasNonAbsoluteActivityURI(json)
{
	return ("object" in json) && ("id" in json.object) && !(isCompleteURI(json.object.id));
}

function isCompleteURI(URI)
{
	var url;
	
	// Throws an error on malformed URL (same applies to URI)	
	try
	{
		url = new URL(URI);
	} 
	catch(error)
	{
		return false;
	}

	return (url.protocol === "http:") || (url.protocol === "https:");
}

function fixNonAbsoluteActivityURI(json)
{
	json.object.id = "http://fake-url-non-absolute-URI-provided.com/";

	return json;
}

function hasNullActivityURI(json)
{
	return ("object" in json) && !("id" in json.object);
}
 
function fixNullActivityURI(json)
{
	json.object.id = "http://fake-url-null-URI.com/";

	return json;
}

function hasMissingContextID(json)
{
	if(!(json.context) || !(json.context.contextActivities))
		return false;

	// console.log("Values: " + JSON.stringify(Object.values(json.context.contextActivities)));
	for(var activity of Object.values(json.context.contextActivities))
	{
		// console.log("Context: " + JSON.stringify(activity));
		// console.log("Context id?: " + activity[0]?.id);
		// console.log("1st cond: " + (!("id" in json.context.contextActivities[activity])) + " : "+ (JSON.stringify(json.context.contextActivities[activity])));
		// console.log("2nd cond: " + json.context.contextActivities[activity].id);
		// (!("id" in json.context.contextActivities[activity])) || 
		if(activity[0]?.id == null) 
			return true;
	}

	return false;
}

function fixMissingContextID(json)
{
	for(let [key, value] of Object.entries(json.context.contextActivities))
	{
		// console.log("Context2: " + activity);
		//(!("id" in json.context.contextActivities[activity])) || (json.context.contextActivities[activity].id == null)
		if(value[0]?.id == null)
		{
			// console.log("Replacing id for " + JSON.stringify(json.context.contextActivities[key]));
			json.context.contextActivities[key][0].id = "http://h5p.org/libraries/H5P.CoursePresentation-1.2";
		}

	}

	return json;
}
