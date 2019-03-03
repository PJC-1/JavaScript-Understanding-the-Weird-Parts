JavaScript: Understanding the Weird Parts
===================
>Following *Udemy Course* ["JavaScript: Understanding the Weird Parts"](https://www.udemy.com/understand-javascript).
>
>
>The following are notes from documentation, articles, and personal observations/opinions regarding concepts brought up in the course.
>

Objects
-------------
>
>**Object:**
>
>*A collection of name value pairs*
>
>The simplest definition when talking about **Javascript**
>

>
> **NAME/VALUE PAIR:**
>
>*A name which maps to a unique value*
>
>The name may be defined more than once, but only can have one value in any given **context**.
>That value may be more name/value pairs.
>
>
>

The Global Environment and The Global Object
-------------
>  
>**Execution Context (Global)**
>
>The *Execution Context* will provide 2 things to you:
>- **Global Object**
>- Special variable **'this'**
>
>The *javaScript Engine* creates these 2 things for you, whenever your code is run because the code is wrapped in **execution context** .
>
>**Global Object (window)** = **'this'**
>
>*Global* in *javaScript* basically means: **"Not inside a Function"** .
>
>So, any *global* variable or function will be accessible on the *window* object.
>```
>// example code
>var a = 'Hello World';
>```
>
>```
>// accessing the example code via chrome dev tools
>a
>"Hello World"
>window.a
>"Hello World"
>```
>

>
>**Execution Context** is Created (*CREATION PHASE*)
>In the creation phase we have:
>- Global Object
>- 'this'
>- Outer Environment
>
>As the parser is running through your code, it recognizes where you have created *variables* and where you have created *functions*.
>It sets up the Memory Space for Variables and Functions, which is sometimes called "*Hoisting*"
>
>So those *variables* and *functions* exist in memory, and when you execute line by line it can access them.
>But, variables are treated differently from functions.
>Functions will be placed into *memory space* in there entirety, while variables are set in the *Execution Phase*.
>In other words, the variable, though in memory space will not be set to a specific value until it is in the execution phase. Until that time, it will be set to a placeholder value of ```undefined```.
>
>You can see in the following example that logging ```a``` to the console outputs the value of ```undefined``` rather than an actual error.
>
> ```
>// example js code
>
> b();
>console.log(a);
>
>var a = 'Hello World';
>
>function b() {
>  console.log('Called b!');
>}
>
> ```
>
>
>
>```
>// output of example code
>Called b!
>undefined
>```
>  

>
>**JavaScript and Undefined**
>
>Attempting to console.log a *variable* that is not defined at all will produce an error:.
>See the following code snippet:
>```
>console.log(a);
>```
>```
>// output
>Uncaught ReferenceError: a is not defined
>```
>

>
>**Undefined VS Not Defined**
>There is a big difference between the two.
>The *error* "Uncaught ReferenceError: a is not defined" means that you are attempting to access a variable that does not exists, i.e. *is not in memory*.
>But ```undefined``` is actually a special value (*key word*) with a specific meaning in JavaScript, internally.
>Basically all variables are created with the initial/default value of undefined, which means that the variable has yet to be defined.
>In the following code snippet you can see that the value ```undefined``` in action:
>```
>// code example
>
>var a;
>console.log(a);
>
>if (a === undefined) {
> console.log('a is undefined!');
>} else {
>  console.log('a is defined!');
>}
>```
>```
>// output
>
>undefined
>a is undefined!
>```
>

>
>**The Execution Contex: CODE EXECUTION**
>
>The *Execution Context* runs the code you've written.
>Line by line.
>
>

Single Threaded, Synchronous Execution
-------------
>
>**Single Threaded**
>*One command at a time.*
>Under the hood of the browser, maybe not.
>

>
>**Synchronous**
>*One at a time*
>And in order...
>

>
>Javascript is Synchronous and Single Threaded, in its behavior.
>

Function Invocation And The Execution Stack
-------------
>
>**Invocation:**
>*Running/calling a function*
>In Javascript, by using parenthesis ().
>

>
>Take the following code example:
>```
>function b() {
>  
>}
>
>function a() {
>  b();
>}
>
>a();
>```
>
>Q:*What is created when this is first run?*
>A:Global Execution Context (created and code is executed). The parser will parse the code. The compiler that will interpret your code will start up and create the global execution context (to create the vairable 'this', global object, etc...) in the creation phase. So ```function a()``` and ```function b()``` will be saved in memory. Then in the execution phase, nothing will happen for ```function a()``` or ```function b()```, but when it hits ```a();``` , it will call ```function a()``` . This is when a **new** execution context is created and placed on what's called **the execution stack**
>
>*Execution Stack*
>Execution context will created and will be placed on top of each other. And which ever one is on top is the one that is currently running.
>Every time a function is run in javaScript a new execution context is created and put on the *execution stack*.
>The *Execution Context* is created similar to the *Global Execution Context* and will have it's own space for variables and functions.
>It will go through the create phase, and then it will execute the code in the function line by line.
>However, if there is another function invocation, it will stop on that line of code, and create another *execution context* and run that code.
>This is how *function invocation* happens in javaScript.
>
>In our example, when ```b();``` finishes because it's at the top of the stack. It will get *popped-off* the stack, then back to ```a()```, and finally back down to *global*.  
>Because the functions are in memory, it doesn't matter lexically where the function are in the code.
>

Functions, Context, and Variable Environments
-------------
>
>**Variable Environment:**
>*Where the variables live*
>And how they relate to each other in memory.
>

>
>Take the following code snippet:
>```
>function b() {
 > var myVar;
>}
>
>function a() {
>  var myVar = 2;
>  b();
>}
>
>var myVar = 1;
>a();
>```
>
>*The Global Execution Context (created and code is executed)*, variable ```myVar```  is equal to ```1``` and put into memory space.
>The Global Execution context's **Variable Environment** is the *Global Object*, or *Window Object* in the browser.
>
>Then a new *Execution Context* is created for ```a();```, and ```var myVar = 2;``` will be put into the execution context's variable environment.
>*Every Execution Context will have its own Variable Environment*
>
>When ```b();``` is invoked, a new *execution context* will be created and added to the top of the stack. In this *execution context* ```var myVar;``` will have the value of ```undefined```.
>
>This has to do with **Scope**
>
>

The Scope Chain
-------------
>
>*Take the following code-snippet:*
>```
>function b() {
>  console.log(myVar);
>}
>
>function a() {
>  var myVar = 2;
>  b();
>}
>
>var myVar = 1;
>a();
>```
>
>When we run this code in the browser and check the dev tools, we see ```console.log(myVar);``` output as:
>```
>1
>```
>
>Which is the value of ```myVar``` from the global level.
>In the Global Execution context ```myVar``` is ```1```, in ```a();```'s execution context ```myVar``` is ```2``` and in ```b();```'s execution context ```myVar``` simply does not exists in this variable environment.
>But when we request a variable, or do something with a variable, javascript will do more than just look in the current executing context's variable environment.
>Each execution context has a reference to it's outer environment. The outer environment for ```function b()``` is the *Global Execution Context*.
>Javascript cares about the *lexical environment* when it comes to the outer reference that every *execution context* gets.
>So, if it can't find a variable within an execution context, it will look at the outer reference for that variable there, somewhere down the execution stack.
>The *outer reference*, where that points, is going to depend on where the function sits lexically.
>Back to our snippet, because ```function b()``` sits lexically on the global execution context, its outer reference is global.
>
>**Scope** refers to where you can access a *variable*.
>
>The **Scope Chain** is the links of *outer environment references*.
>In our example with ```function b()```, it was looking for ```myVar``` in ```b();```, and continued down the *scope chain* to look for the variable.
>
>

>
>If we change the snippet to define ```function b()``` inside of ```function a()``` we see some changes to the *Scope Chain*:
>```
>function a() {
>
>  function b() {
>    console.log(myVar);
>  }
>
>  var myVar = 2;
>  b();
>
>}
>
>var myVar = 1;
>a();
>```
>
>Now, when the code is ran and ```function b()``` is invoked, it will log ```myVar``` as ```2``` because ```b()```'s *outer reference* is ```function a()```, since we moved it into ```function a()```.
>
>
>Where something sits *physically* in your code (**lexically**). Is an easy way to find how something will be found along the *scope chain*.
>
>When something cannot be found, it will move further and further down the scope chain.
>

SCOPE, ES6, and let
-------------
>  
>**Scope:**
>*Where a variable is available in your code*
>And if it's truly the same variable, or a new copy.
>
>**let**
>ES6 way of defining a variable. It uses **block scoping**, which will put the variable into memory during the create phase, but the javascript engine will not allow you use the variable until the line of code is run in the execution phase that actually declares the variable.
>
>Take the following code snippet:
>```
>if (a > b) {
>  let c = true;
>}
>
>```
>
>If you try to use the variable ```c``` before the line ```let c = true;``` it will throw an error, even through the variable ```c``` is in memory as ```undefined```.
>
>The other important thing, is that it is declared inside a block. A block is generally defined as curly braces ```{...}``` (e.g.: *if-statement*, *for-loop*, etc...). When that variable is defined inside that block, it is only available inside that block at that period of time for the running code.
>This is also true for *for-loops*, so if you have a *for-loop* with the same running code over and over, but you have a *let* statement. You will actually get a different variable in memory for every iteration the loop is running.
>


Asynchronous
-------------
>  
>  *More than one at a time*
>
> **The Javascript Engine**
> When we think of running javascript code in the *javascript engine*, we understand that it doesn't exist by itself. For example, in the internet browser.
> There are other elements, such as:
> - other engines
> - running pieces of code
>
> That are happening outside the *javascript engine* that runs javascript when you load it into the browser.
>
>Things like the **rendering engine**, that renders the web page you're looking at.
>
> Or other elements of the browser that deal with going out and getting data.
>
> The JavaScript engine has hooks where it can talk to the rendering engine and change what the web page looks like, or go out and request data. While it may be running **asynchronously** meaning that the rendering engine, javascript engine, and request are running asynchronously inside the browser, what's happening inside just the *javascript engine* is **synchronous**.
> So when we *asynchronously go out and make a request, or we say, let's run a function when someone clicks on a button, what happens? Because that is being handled **asynchronously**.
> Other parts of the browser are running and looking at that code while the javascript code is still running.
>
>**Event Queue**
> Like the **Global Execution Context** there is another *list* that sits inside the **javascript engine** called the **Event Queue**.
> The **Event Queue** is full of *events*, notifications of events that might be happening. So when the *browser* (which is somewhere *outside* the **javascript engine**) has an event that inside the **javascript engine** we want to be notified of, it gets placed on the **queue**. And whether or not we actually have a function that needs to respond to it, we can *listen* for that **event** and have that *function* handle that **event**, but either way the **event** gets placed on the **queue**.
> So a ```click``` event, for *example*, if someone **clicks** on the screen. Now what happens if I have a function that's supposed to respond to that click event or maybe another event happens while code is running, like I went out and got data and that code went out to the browser. The browser went and got the data while my code kept running and now it's finished. What happens is that *event queue* gets looked at by **javascript** when the **execution stack** is *empty*.  Let's say function ```b()``` in the **execution stack** finishes and then it will move onto function ```a()```, and then when that finishes, it keeps going and finishes whatever execution is at the global level.
> When the stack is *empty*, then **javascript** periodically looks at the **event queue**. It waits for something to be there. And if something is there, it looks to see if a particular function should be run when the event was triggered.
> So it sees a ```click``` event, it processes that ```click``` event and knows there's a function that needs to be run for that **event**, so it creates the **execution context** for whatever **function** when that **event** happened. That **event** is processed and the *next* item in the **queue** moves up, and so on and so forth.
> The **event queue** won't be processed until the **execution stack** is *empty*, until *javascript* is finished running all of that other code line by line.
> So it isn't really **asynchronous**. What's happening is the browser **asynchronously** is putting things into the **event queue**, but the code that is running is still running line by line and then when this is empty, when the **execution contexts** are all *gone*, then it processes the events. It waits for them and sees an event, and if an event causes a function to be created and executed. It will appear on the **execution stack** and run like normal.
>
> Since the **javascript engine** will not look at the **event queue** until the **stack** is empty, it means that *long-running* functions can actually interrupt **events** being handled. This is how **javascript** *synchronously* is dealing with the fact that *asynchronous* events are happening. That elsewhere simultaneously in the browser things are happening that then complete that **javascript** needs to know about. So all it does, it just keeps running its normal code, and when that's all done, it will then go and look at the **event queue**.
> And if it's already done, then it will just continue to watch that **event queue** in the **event loop** and then when it sees something, if there's supposed to be a function, if there's a **handler**/a **listener** that's supposed to run when that **event** appears in the **event queue**, it will run it.
> Any events that happen outside of the engine get placed into that queue, and if the execution stack is empty (if javascript isn't working on anything else currently) it will process those events. It will process those event in the order they happen.
>

Types and JavaScript
-------------
>  **Dynamic Typing**:
>  You don't tell the engine what type of data a variables holds, it figures it out while your code is running.
>  
>  Variables can hold different types of values because it's all figured out during *execution*.
>  
>  So a single *variable* can, at different times during the execution of your code hold different types of values because it's all figured out during execution.
>  
>  When dealing with other coding languages like *java* or *C#*, they use something called ```Static Typing```. That means you tell the *engine* (or *compiler*) ahead of time what kind of *data* you intend to hold inside a variable.
>  
>  So if you set a variable to a type of ```bool``` (*boolean*) and then try to set the variable to an *integer*, you would receive an *error*.
>  
> *JavaScript* is ```dynamically typed```, meaning that there is **no** *keyword* to tell the engine what kind of *data* you intend to put inside the variable. The *javascript engine* can figure it out on the fly.
>
> This turns out to be quite powerful, and can also cause you some *problems* if you don't understand how *javascript* is going to make *decisions* as a result of dynamic typing.
>
>**Primitive Types**
> There are **six primitive** types in *javascript*.
>
> **Primitive Type**: A type of *data* that represents a single value. In other words, something that isn't an ```object```. Because remember, an ```object``` is a collection of name value pairs.
>
> 1. ```undefined```: represents lack of existence (*you shouldn't set a variable to this*)
> It's what the *javascript* engine sets variables to initially and it will stay *undefined* unless you set the variable to have a value.
> It's better to let *undefined* be the thing that means the code has never set the value.
>
> 2. ```null```: represents lack of existence (*you can set a variable to this*)
> This one is better for you to use when you want to say that something doesn't exist, that the variable has *no value*.
>
> 3. ```boolean```: true or false.
>
> 4. ```number```: *floating point* number (there's always some decimals). Unlike other programming languages, there's only one 'number' type...and it can make math weird.
>
> 5. ```string```: A sequence of characters, both single quotes and double quotes can be used to specify a string.
>
> 6. ```symbol```: Is new, it's introduced in ```ES6``` (*ECMAScript 6*).
>  
> **Operators**
> An **operator** is a special function that is syntactically differently written than regular functions. Generally, operators take two parameters and return one result.
>
> The ```+``` (*plus symbol*) in javascript is actually a function. We are able to use the ```+``` symbol like we do with *addition* (i.e. ```3 + 4```) because of ```infix notation```.
>
> ```infix notation``` means that the function name, the *operator*, sits between the two parameters.
>
>  ```3 + 4``` => *infix notation*
> ```+3 4``` => *prefix notation*
> ```3 4+``` => *postfix notation*
>
> Some other *operators* include:
> ```-```: *minus*
> ```>```: *greater-than*
> ```<```: *less-than*
>
> The idea to get is that these *operators* are actually special types of functions. That parameters are being passed to those functions and a value is being returned.
> And inside those functions, there is pre-written code that the *javascript* language provides to run these functions.
>
>**Operator Precedence and Associativity**
>
>**Operator Precedence** refers to which *operator* function get called first when there's more than one operator on the same line of executable code.
>
>The *JavaScript* engine will *call* or invoke the operator with the higher precedence first, or the highest, and then down the line from there.
>
>**Operator Associativity** is what order operator functions get called in: *left-to-right* or *right-to-left* when functions have the same precedence.
>
>So if I have a bunch of operators on a line of code, the precedence tells me which one gets called first. If they all have the same precedence, then depending on the *associativity* of that operator, we're
>
> **Operator precedence**, in the following example:
> ```
> var a = 3 + 4 * 5;
> console.log(a);
> ```
>
> ```multiplication``` will be called first, which will give you ```20``` and then the ```addition``` would be called. Give a total of ```23```.
>
> Let's take a look at another example:
> ```
> var a = 2, b = 3, c = 4;
>
> a = b = c;
>
> console.log(a);
> console.log(b);
> console.log(c);
> ```
>
> Because of ```associative precedence```, the ```equal``` operator is ```right-associativity```, meaning it is evaluated *right-to-left*. This means that the ```console.log```s at the end of the example will all be equal to ```4```.
>
> **COERCION**
> Converting a value from one type to another. This happens quite often in *javascript* because it's dynamically typed.
>
> What *happens* when we use the ```+``` operator with two *different* types:
> ```
> var a = 1 + '2';
> console.log(a);
> ```
>
> The logging will output ```12```. What happened was the first *argument* ```1``` was **coerced** by *javascript engine* into a ```string```.
>
> Since *javascript* is **dynamically typed** it tends to try to convert things to the value that you want.
>
> Understanding that *coercion* is happening is very important because you can avoid some important bugs and debug things when things look a little strange.
>
> **Comparison Operators**
> See this example:
> ```
> console.log(3 < 2 < 1);
> ```
>
> Since the ```<``` operator has a ```left-to-right```  *associative precedence* it will evaluate ```3 < 2``` first, which is ```false```.
>
> Now the updated expression looks like this:
> ```
> console.log(false < 1);
> ```
>
> Now the ```<``` is getting *passed* the parameter ```1``` and ```false```.  Because the ```<``` operator receives a parameter it does not expect (```false```), it will try to *coerce* this *boolean* to a number.
>
> *What does false become when it is converted into a number?*
>By using the ```Number()``` built-in function, we can see what something will be when it is *coerced* into a number.
>```
>Number(false)
>=> 0
>
>Number(true)
>=> 1
>```
>
> So coming back to our example, what we see when the ```false``` is replaced by the coerced number:
> ```
> console.log(0 < 1);
> ```
>
> Which will ultimately log ```true```.
>
>**Existence and Booleans**
>There's a ```Boolean()``` *built-in* function to try to convert. It is *not* recommended to use these functions, but for demonstration purposes they can be useful.
>
> When I try to *convert* ```undefined``` to a ```Boolean```:
>
> ```
> Boolean(undefined);
>
> => false
> ```
>
> ```undefined``` becomes ```false``` when converted in the *JavaScript engine.*
>
> What about ```null```:
>
> ```
> Boolean(null);
>
>=> false
> ```
>
> ```null``` returns ```false```.
>
> How about an ```empty string```:
>
> ```
> Boolean("");
>
> => false
> ```
>
> ```empty string``` returns ```false```.
>
> What we see is that all of these things that *imply* the lack of existence, they convert to ```false```.
>
> *Can we use that to our advantage?*
>
>  Yes, we can use **coercion** to our own *advantage* and check to see if a variable has a value. Something *other* than ```undefined```, ```null```, or ```empty string```.
>
> There is a special scenario that you need to remember, when you attempt to coerce the number ```0```:
>
> ```
> Boolean(0);
>
> => false
> ```
>
> ```0``` also returns ```false```, so if there's any chance that the variable your checking could end up being zero, that's a problem. Because ```0``` is not necessarily lack of existence. It's possible that it maybe a valid value.
>
>*Example*:
>```
>var a;
>
>a = 0;
>
>if (a || a === 0) {
>  console.log('Something is there.');
>}
>```
>
> Based on the ```operator precedence table``` we can see that ```strict equality```  (```===```) has a higher precedence than the ```logical OR``` (```||```) , and so ```a === 0``` will be evaluated first, resulting in the ```if-statement``` satisfied because the expression would become ``` false || true```, which is evaluated as ```true``` and the ```console.log``` being ran.
>
> **Default Values**
>
> *Example*:
> ```
> function greet(name) {
>  console.log('Hello ' + name);
> }
>
> greet('Tony');
>
> ```
>Running the function will log the *string* ```Tony```
>
> *But what happens when we attempt to run the function ```greet();``` without any argument?*
>
> Unlike many programming languages, *JavaScript* does not care. It will not throw an *error*.
>
> It will simply pass nothing to name.
> When the function ```greet()'``` is ran, ```undefined``` is logged to the console.
>
> The reason why is because when the function is invoked, a *new* execution context is created and this variable ```name```, which is essentially created inside the function though the value is passed during it's *invocation*, is initially set when the memory space is set up to ```undefined```.
>
> *JavaScript* ignores the fact that the function was called without the expected *parameters* and simply says, that's OK, it's ```undefined``` it's already in *memory*. It has a value, and you simply didn't give me a new one.
>
> The ```||``` operator will return a *value* that can be coerced to ```true```.
> *Example*:
> ```
> undefined || "hello"
>
> => "hello"
> ```
>
> The expression returns "hello" because if we were to run ```Boolean("hello)``` itr would return ```true```, so it would be like evaluating ```undefined || true```.
>
> If you pass two values to the ```||``` operator that can be coerced to ```true```, it will return the first one that coerces to true.
>

OBJECTS AND FUNCTIONS
-------------
>**Objects and the Dot**
> Let's think about how an ```object``` lives or resides in your computer's *memory*.
>
> An ```object``` is a collection of *values* that are given names.
>
> *What kind of values?*: An ```object``` can have ```properties``` and ```methods```.
>
> An ```object``` can have either a *Primitive* property, *Object* property, or a *Function* method. Which sits in memory. The kind of *core* object will have some sort of *address* in your computer's *memory*. And it will have references to these different *properties* and *methods* which are also sitting in your computer's memory.
>
> ```new Object();``` is *NOT* the *prefered* way of creating a ```object```.
>
> When *accessing* properties or methods of an ```object```, the *prefered* way is using the ```dot operator``` rather than the ```bracket notation```.
>
>**Objects and Object Literals**
> We saw earlier that we can create an ```object``` with the code:
> ```
> var person = new Object();
> ```
>
> There is a *short-hand* way of creating an ```object```:
> ```
> var person = {};
> ```
>
> This is *NOT* an *operator*.
>
> What's happening, is the *JavaScript Engine* when it's parsing the syntax, and it comes across the curly brace, and it's not a part of an ```if-statement``` or a ```for-loop``` or something like that, it *assumes* that you are creating an ```object```.
>
>JavaScript is very liberal with *white space*, which can make writing objects with `object literal` syntax more *human readable*.
>
>You can do special things with `object literal` syntax, like creating an object any where you can create a variable on the fly.
>For example, we have a function that takes an object as a parameter and logs to the console the string `"Hi" + person.firstname`.
>```
>var Tony = {
>	fistname: 'Tony',
>	lastname: "Alicea',
>	address: {
>		street: '111 Main St.',
>		city: 'New York',
>		state: 'NY'
>	}
>};
>
>function greet(person) {
>	console.log('Hi ' + person.firstname);
>}
>
>greet(Tony);
>```
>
> Calling `greet(Tony)` in the example above will output to the console the string `Hi Tony`, but we could also create an object on the fly and pass that into the `greet()` function.
> ```
> greet({ firstname: 'Mary', lastname: 'Doe' });
> ```
>
>This would output the string `"Hi Mary"`.
>
>**NAMESPACE:**
>A container for variables and functions.
>*Typically to keep variables and functions with the same name separate*
>
>In the following code snippet, we have `2` `greet` variables set to `2` different values within the *same* javascript file:
>```
>var greet = 'Hello!';
>var greet = 'Hola!';
>
>console.log(greet);
>```
>
> When the file is ran we get the string `"Hola!"` returned, this is because the lines of code are *synchronously ran* and the `greet` variable is set to `"Hola!"`.
> By setting the `greet` variables on the *global object*, they are *overriding* each other. [`namespace`](http://www.answers.com/Q/What_is_namespace_in_programming)'s would help us with this because we would have a *container* for the *english greeting* and a separate *container* for the *spanish greeting* and related *methods* and *properties*. We **don't** have `namespace`'s in *javascript*, but we can do just that with `objects`.
> We could prevent this collision, *for example*, by creating an `object` that will be the *container* for our properties, methods, and things we want to use. By creating separate `english` and `spanish` *objects* using `object literal` syntax. Using the `object` only as a container, it will not really have any other functionality.
>```
>var english = {};
>var spanish = {};
>```
> Then we can set the property `greet` for the `english` object with a value of `'Hello!'` and set the property `greet` for the `spanish` object with the value of `'Hola!'`.
> ```
> var english = {};
>var spanish = {};
>
>english.greet = 'Hello!';
>spanish.greet = 'Holla!';
> ```
> The `2` `greet` variables, though they are both called `greet`, they **don't** collide/override with each other. So logging the `english` object, will output the value `Object {greet: "Hello!"}`.
> This is something you will see a lot inside *frameworks*/*libraries* as a method to make sure that when your writing a function that you don't have any *namespace collisions* (*two things that are named the same*).

>**JSON (JavaScript Object Notation)**
>JSON is inspired by JavaScript's *object literal* notation.
>
>In previous years, data was sent over the internet in various formats and the format that was landed upon for a while was `xml`.
>*example xml format*:
>```
><object>
>   <firstname>Mary</firstname>
>   <isAProgrammer>true</isAProgrammer>
></object>
>```
>
> You can see tags surround the data and then the server would get this information and be able to parse it out.
> This works fine, but when you're dealing with download times, how fast something is and how much data, how much bandwidth are you using. There ends up being a lot of unnecessary characters that make the amount of data that you're sending larger.
> Just to send one piece of data, you end up having to actually send the property name twice. `<firstname>Mary</firstname>`, which is a huge amount of wasted download bandwidth if you were dealing with a lot of data.
> This lead people to look at the JavaScript object notation and see that it would make a really great way to send data across the internet instead of sending it in a format such as `xml`.
> The idea being to make a string that looks somethig like a javascript object.
> Currently we pretty much send data via the JSON format. It's just a string of data, but it looks like object literal syntax. Except for some difference: Properties have to be wrapped in quotes. Which is also valid object literal syntax, where properties can be wrapped in quotes.
> JavaScript does come with some built in functionality to transfer between JSON and JavaScript.
> For any object, the built in feature `JSON.stringify()` can be called.
> *example*:
> ```
>var objectLiteral = {
>  firstname: 'Mary',
>  isAProgrammer: true
>};
>
>console.log(JSON.stringify(objectLiteral));
> // => {"firstname":"mary","isAProgrammer":true}
> ```
> This will convert the passed in *object* into a JSON string.
> And, if you have a string that's `JSON`, you can pass it to the method ```JSON.parse()``` and convert it to a JavaScript object.
> *example*:
> ```
> var jsonValue = JSON.parse('{ "firstname": "Mary", "isAProgrammer": true }');
>
>console.log(jsonValue);
>// => Object {firstname: "Mary", isAProgrammer: true}
> ```
>

>**FUNCTIONS ARE OBJECTS:**
>**First Class Functions**, in *JavaScript*, `functions` are `objects`.
>**First Class Functions**: Everything you can do with other types you can do with functions. *i.e.* Assign them to *variables*, pass them around, create them on the fly.
>*First Class Functions* change the way you can program, they can open up the horizons to completely different approaches to solving problems.
>So when we say that functions are objects in *JavaScript*, *what does the function object look like?* Just like any object in *JavaScript*, it resides in memory. It's a special type of object, though, because it has all the features of a normal object and has some other special properties.
>One thing that people are surprised about when they see *JavaScript* is that you can attache properties and methods to a function. Because it's just an `object`.
>For *example*:
>- You can attach a primitive, a `name value pair`.
>- You can attach an `object`.
>- You can attach other `functions`.
>
>In *JavaScript* the `function object` has some hidden special properties.
>Two important properties are:
>1)	`NAME` - a function in *JavaScript* doesn't have to have a name. A function can be what's called *anonymous*, meaning it doesn't have a name.
>2)	`CODE` - where the actual lines of code that you've written sit. So the code you write is *not* the function itself, but rather just one of the properties you're adding to the `function object`. What's special about that property is it's *invocable*, meaning that you can say, run this code and that's when the entire *execution context* creation and *execution* on all of that happens.
>
>It's **imperative** that you have this mental model of a function in your mind, you have to think of a `function` as an `object` whose *code* just happens to be one of the properties of that object. There are other things that it can have attached to it, there are other things the function can do. And it can be moved around, copied and given to other elements or other areas of your code, just like an object, value, string, or number.
>
>**example**:
>```
>function greet() {
>  console.log('hi');
>}
>
>greet.language = 'english';
>```
>
>We defined a *function* called `greet` and added the property `language` which is set to `'english'`. In other programming languages, this just isn't possible, but in *JavaScript*, functions are objects, and the code I wrote is just a property of that object.
>
>We have the greet function, and when it is created, this `function-object` was put in *memory*, in this case, onto the global object, and it has a `NAME` (`greet`).
>It has a `CODE` property that contains the code that I wrote (`console.log('hi')`)
>
>You have to think of a function as more than just this container of code.
>

>**FUNCTION STATEMENTS AND FUNCTION EXPRESSIONS**
>`EXPRESSION`: A unit of code that results in a value (It doesn't have to save to a variable).
>
>So when we say a *function statement*, statements just do work.
>But a function *expression* or any *expression* in *JavaScript* ends up creating a value and that value doesn't necessarily have to save inside a variable.
>
> *example*:
> ```
> var a;
> ```
> When the file is ran, the variable `a` will be sitting it memory.
> An *expression* returns a value.
> ```
> var a;
>a = 3;
> ```
> The `a=3;` is a unit of code, where `a` is set with the `=` operator to the number `3`.
> The `=` operator is a function that takes the two values, does some work and then returns a value.
> So this will return `3` because we passed `a` on the left side and `3` on the other (the second *parameter*). `3` will now be set in memory.
>
>```
>1 + 2;
>```
>This is also a valid expression. The plus sign as an operator, takes these two values, adds them, and returns the result. When the expression is ran, it will return `3`. Notice that it wasn't set equal to anything in memory.
>The expression evaluated. That is to say it ran and returned this value, `3`.
>
>Both cases are expressions because they both returned a value.
>That value could be a number or string or an object, etc.
>
>When we're talking about a statement, on the other hand, let's use an `if statement` for example:
>```
>if (a === 3) {
>  
>}
>```
> Inside the *parentheses* of an `if statement`, you put an *expression* because that results in a value.
> But the `if statement` itself is just a *statement*.
> It's called an `if statement` because it doesn't return a value.
> You would not be able to set a variable to an `if statement`:
> ```
> var b = if (a === 3) {
>  
>}
> ```
> This would not work because the `if` only does *work*, no value is returned.
> The `if` is a statement, and inside the `if statement` you have an expression, in our example `a === 3`, the triple equals operator returns a value - - ultimately *true* or *false*.
> In *JavaScript* because functions are objects, I have both function statements and function expressions, which are very powerful.
>
>*example*:
>```
>function greet() {
>   console.log('hi');
>}
>```
>This is a function statement.
>When it's run, it's evaluated, it doesn't result in a value. The function is placed into memory, but it's just a statement. It doesn't return a value until the function is executed. So when it sees the `greet` function it puts it in memory, but the unit of code doesn't result in a value. But it does do some special things.
>It gets `hoisted`, that is, during the creation phase of the *execution context*, the *global execution context* in this case, it's put into memory. And so it's available ahead of time.
>```
>greet();
>
>function greet() {
>   console.log('hi');
>}
>```
>I can call `greet` before I declare it, before I make that function's *statement*.
>It's still an `object`. It's `NAME` is `greet` and it's `CODE` property contains the code you wrote inside of it.
>
>No lets use a `function expression`.
>```
>var anonymousGreet = function() {
>  console.log('hi');
>}
>```
>Because functions in *JavaScript* are objects. So I'm creating an object on the fly and setting it equal to the variable `anonymousGreet`, which is it's spot in memory that it points to will contain a function object.
>The function object will not have a `NAME`, it will be *anonymous*. Because I didn't put anything before the *parenthesis*, which is *optional* because I have a variable that already knows where that object lives. This is an *anonymous function*
>An *anonymous function* is a function that doesn't have a name in it's `NAME` property.
>During the *execution phase* when it runs the line with the `anonymousGreet` variable,  the anonymous function statement will result in an object being created. It returns an object essentially. It's an *expression* it results in a value.
>*Function expressions* are not hoisted and that can be confusing for people.
>*example*:
>```
>greet();
>
>function greet() {
>  console.log('hi');
>}
>
>anonymousGreet();
>
>var anonymouseGreet = function() {
>  console.log('hi');
>}
>```
> In the above example calling `greet();` will work, but the `anonymousGreet();` will result in an error.
