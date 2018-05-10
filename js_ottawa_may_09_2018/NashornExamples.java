
// Create the Nashorn ScriptEngine
ScriptEngine nashornEngine = new ScriptEngineManager().getEngineByName("nashorn");

// Get your script from a file
String jsScript = inputStreamAsString(resource);

// Expose/Bind Java variables/objects into the Javascript:
Bindings bindings = nashornEngine.createBindings();
bindings.put("someVariable", someVariable);
bindings.put("someVariabel2", someClass.getSomeObject());

// eval the script and get the specific result/what was returned by the engine
Object scriptResult = nashornEngine.eval(jsScript, bindings);

// Or just eval and not worry about the return
nashornEngine.eval(jsScript, bindings);

// Or can can call specific functions:
String functionName = 'someFunctionName'
CompiledScript nashornCompiled = ((Compilable) nashornEngine).compile(jsScript);
((Invocable) nashornEngine).invokeFunction(functionName);