
// import lodash from CDN
load('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.10/lodash.min.js')

// Print to stdout
var System  = Java.type("java.lang.System")
System.out.println('this prints to stdout')

// or
print('this prints to stdout')

// Working with JSON and returning something Java can deal with:
// myJson, if returned to the Java side would be available as a Java Map
var myJson = Java.asJSONCompatible({ 
  x: 343, 
  y: 'hello', 
  z: [ 2, 4, 5] 
  });

// Java Objects and Arrays, Maps and Collections 
// are traversable as regular JSON in JS
var myValue = someJavaMap['someKey']

// Pre es6 support, there was extra loop helpers:
// for each (i in someArray) {
//    print(i);
// }

function someFunctionName(){

}


/**
 * Evaluate/Render a FreeMarker template
 *
 * @param string content The string content of a FreeMarker template.
 * @param string object The KeyValue object/JSON object for placeholder bindings.
 * @return string The rendered FreeMarker template.
 */
function renderFreeMarkerTemplate(content, placeholderValues)
{
  // 'use strict' cannot be used at a global script level because JavaImporter's with(){} does not support it.

  var ScriptEngine = new JavaImporter(javax.script);

  with (ScriptEngine) {
    var manager = new ScriptEngineManager();
    var engine = manager.getEngineByName('freemarker');

    var bindings = engine.createBindings();
    bindings.put('placeholders', placeholderValues);

    var rendered = engine.eval(content, bindings);

    return rendered;
  }
}

var placeholderValues = {
   "firstName": "John",
   "lastName": "Smith"
}

var renderedTemplate = renderFreeMarkerTemplate(content, placeholderValues);
renderedTemplate.toString();




// Vertx Node
// get a reference from Java to the JavaScript runtime
const DroolsHelper = Java.type('drools.DroolsHelper');
// get a drools engine instance
const engine = DroolsHelper.load(vertx.fileSystem().readFileBlocking("drools/rules.drl"));

app.get('/greetings').handler(function (ctx) {
  // create a greetings message
  var greeting = DroolsHelper.createGreeting('Hello World!', function () {
    // when a match happens you should see this message
    console.log('Greetings from Drools!');
  });

  // run the engine
  engine.insert(greeting);
  engine.fireAllRules();

  // complete the HTTP response
  ctx.response().end();
});


// terminal:
mkdir my-app
cd my-app
npm init -y
npm add vertx-scripts --save-dev
npm add @vertx/unit --save-dev
npm add @vertx/core --save-prod


// package.json:

{
  ...
  "scripts": {
    "postinstall": "vertx-scripts init",
    "test": "vertx-scripts launcher test -v",
    "start": "vertx-scripts launcher run",
    "package": "vertx-scripts package"
  },
  ...
}

// index.js:

/// <reference types="@vertx/core/runtime" />
// @ts-check

vertx
  .createHttpServer()
  .requestHandler(function (req) {
    req.response().end("Hello!");
  })
  .listen(8080);

console.log('Server listening at: http://localhost:8080/');


// index.test.js:

import { TestSuite } from '@vertx/unit';

const suite = TestSuite.create("the_test_suite");

suite.test("my_test_case", function (context) {
  var s = "value";
  context.assertEquals("value", s);
});

suite.run();