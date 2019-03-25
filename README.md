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
> In the *above* example calling `greet();` will work, but the `anonymousGreet();` will result in an error.
>
>We have to first set equal, so that it's sitting in memory and then it can be invoked.
>*example*:
>```
>greet();
>
>function greet() {
>  console.log('hi');
>}
>
>
>var anonymousGreet = function() {
>  console.log('hi');
>}
>
>anonymousGreet();
>
>```
>
>The example above is *successful* because on the line where `anonymousGreet` is defined, the equals operator has been run and it's put the result of the statement, a new function object, into the variable. So that the `anonymousGreet` variable points to a spot in memory and inside that spot in your computer's memory, is sitting the *function object*.
>
>A function expression creates an object, a `function object` on the fly. So it's possible to do something really strange.
>*example*:
>```
>function log(a) {
>  console.log(a);
>}
>
>log(function() {
>  console.log('hi');
>});
>```
>
>In the example above we are passing `log` a function, that is created *on the fly*.
>
>This works an awful lot like an object literal. It creates a function on the fly:
>-	putting in some code
>-	 it creates that object
>-	puts that code into that `CODE` property of that function object
>
>It's just like a string, a number, or an object.
>Just creating a function on the fly because functions are objects. So that will get passed to the function. It's anonymous, but it's referenced with that `a` parameter. This is an example of *first class functions*, i.e. functions that can be passed around, created on the fly, and variables can be set equal to them.
>
>So, if I want to then invoke this function, the `a` parameter now points at a spot in memory, where this has been created, when the `log` function is called.
>In order to *invoke the passed in *function* you would use the parenthesis:
>```
>function log(a) {
>  a();
>}
>
>log(function() {
>  console.log('hi');
>});
>```
>
>That tells the *JavaScript* engine to invoke, or *run* the function.
>This concept of *first class functions*, where you can pass functions around, give function to other function, use them like you do variables, introduces an entirely new class of programming, called `functional programming`.
>

BY VALUE AND BY REFERENCE
-------------
>In both cases, we're talking about variables.
>
>Let's say I have a primitive value, a primitive type (*i.e.* number, boolean, string...) and set a *variable* equal to it. So, now that *variable, let's say `a`, has an address location, where it knows where that primitive value sits in memory.
>
>Remember that the *reference* is really to a location in memory.
>
>Let suppose next is ran `b = a`, setup a new *variable* and it's equal to `a`.
>
>Or maybe pass `a` to a function, and the parameter name, and the function is `b`.
>
>If it's a primitive value in *JavaScript*, what happens is `b`, the new *variable*, points to a new address and a copy of the *primitive value* is placed into that spot in memory. This approach is called **by value**.
>
>Passing, referencing, or setting equal one value to another, by copying the value. These two variables become the same, by copying the value into two separate spots in memory.
>
>Now, if I have an *object* in *JavaScript*, and this goes for all objects, that includes functions which are special types of objects and others.
>
>When I set a variable equal to an object, I still get a location, an address in memory that it knows where that object lives and that how it gets referenced, but when `b` is set equal to `a`, it  is essentially trying to get those two to be the same value, or I pass `a` to a function, that new variable `b`, instead of getting a new location in memory, simply points to the same location in memory that `a` does.
>
>No new object is created, no copy of the object is created, instead, two names point to the same address. This is called `by reference`.
>
>*By reference* behaves quite differently from `by value`.
>
>It's important to understand that all objects interact by reference, when setting them equal to each other, or passing to a function.
>
>This can cause problems if you don't understand this.
>
>*example*:
>```
>// by value (primitives)
>var a = 3;
>var b;
>
>b = a;
>a = 2;
>
>console.log(a);
>console.log(b);
>```
>
>Because `a` and `b` from the example above are two separate copies in memory. While `a` is equal to `2`, `b` will be `3`. Which makes sense because `b` was just a copy of `a`, it has its own space in memory. So when `a` was changed, it didn't have any impact on `b` at all. This is `by value`.
>
>*example*:
>```
>var c = { greeting: 'hi' };
>var d;
>
>d = c;
>```
>
>At this line `d = c;`, the equals operator sees that these are *objects*.
>
>So rather than setting up `d` with a new memory space.
>
>It simply points `d` at the same location in memory that `c` points to.
>
>Logging these two variables would output the same value, but they aren't copies of each other. They're simply pointing to the same spot in memory.
>
>That means, if `c` is *mutated*, let stay changing `c.greeting = 'hello';`
>
>When logging the variables `c` and `d` to the console, the out put is `Object {greeting: "hello"}` for both.
>
>So, with *by reference*, objects, since they're set equal to each other by reference, once you change one, you change the other (or *all* of them).
>
>*example*:
>```
>var c = { greeting: 'hi' };
>var d;
>
>d = c;
>c.greeting = 'hello'; //mutate
>
>console.log(c);
>console.log(d);
>
>// by reference (even as parameter)
>function changeGreeting(obj) {
>  obj.greeting = 'Hola'; // mutate
>}
>
>changeGreeting(d);
>console.log(c);
>console.log(d);
>```
>In the above *code snippet* we create a function called `changeGreeting` that takes an `object` as a *parameter*.
>
>When we call the `changeGreet` function with the *variable* `d`, which points to the same spot in memory as the `c` *variable*, the `changeGreeting` function will *mutate* the object's `greeting` property and change it to `'Hola'`.
>
>In the output of the logging we should expect to see the same value `{greeting: "Hola"}` for both the `c` and `d` variables because the function mutated the value in that particular memory space.
>
>The `equals operator` sets up a brand new *memory space*.
>*example*:
>```
>// by reference (all objects (including functions))
>var c = { greeting: 'hi' };
>var d;
>
>d = c;
>c.greeting = 'hello'; //mutate
>
>console.log(c);
>console.log(d);
>
>// by reference (even as parameter)
>function changeGreeting(obj) {
>  obj.greeting = 'Hola'; // mutate
>}
>
>changeGreeting(d);
>console.log(c);
>console.log(d);
>
>// equals operator sets up new memory space (new address)
>c = { greeting: 'howdy' };
>console.log(c);
>console.log(d);
>```
>
>In the *code snippet* above the line `c = { greeting: 'howdy' };` sets a brand new memory space for `c`, and puts the value `{ greeting: 'howdy' };` in it.
>
>So, `d` and `c`, will no longer be pointing, to the same location in memory.
>
>The output of `c` will be `Object {greeting: "howdy"}`, and `d` is still pointing at the spot that has `Object {greeting: "Hola"}`.
>
>This is a special case, where by reference doesn't really apply because the `equals operator` saw that these aren't a preexisting location in memory.
>
>Instead, it is a brand new object being created on the fly with the object literal syntax.
>
>Since it saw that its second parameter wasn't an object that already existed in memory, it had to set up a spot in memory for this to live and then pointed `c` at it.
>
>In some programming languages you can actually decide whether something is passed by *value* or *reference*, with your code syntax, but in JavaScript you don't have that option.
>
>All *primitive* types are *by value*, and all *objects* are *by reference*.
>
>This can cause some errors and bugs that are hard to track down, if you don't understand this.
>

OBJECTS, FUNCTIONS, AND 'this'
-------------
>
>When a `function` is invoked a *new* `execution context` is created.
>
>Remember **not** to confuse this with the *object* we've been discussing. The *object* sitting in memory that is a *function* has properties and methods.
>
>But when that code is **invoked** an **execution context** is created and put on the `execution stack`. And that determines how that code is **run** (*executed*).
>
>Think of the *execution context* as focusing on that `CODE` portion of that *function object*.
>
>Each *execution context* has this `variable environment`. Where the *variables* created inside that function live.
>
>It has a *reference* to its `outer environment`.
>
>Its outer `lexical environment`, where it sits *physically* in the code. Which tells it how to look down the `scope chain`.
>
>We also know that the *JavaScript engine*, every time an *execution context* is *created*, it gives us the `'this'` variable (*without us having to create it, declare it*). Which can be useful.
>
>`'this'` will be pointing at a different object, a different thing, depending on how the function is invoked. This can cause a lot of confusion.
>
>There are a few scenarios where `'this'` will be changed *depending* on how the function is called.
>
>Where the *JavaScript engine* will decide that `'this'` should point to something different. That the `'this'` **keyword** is a particular object or another, depending on *where* the function is and *how* it's called.
>
>We've already seen that the *keyword* `'this'` is immediately available at the *global execution context* level. If we log `console.log(this);` it will return the `Window` object.
>
>If we define a function `a`, where we `console.log(this);` inside the body of the function and then invoke `a`:
>
>```
>function a() {
>  console.log(this);
>}
>
>a();
>```
>
>Remember that invoking `a` means run that`CODE` property, which contains all the lines of code inside the *function*.
>
>The first thing it does is **create** that `execution context`, and one of the pieces of the puzzle is the *creation* of the *keyword* `'this'`.
>
>In the *code snippet*, when *ran*, the `'this'` *keyword* is still going to point to the *global object*.
>
>```
>console.log(this);
>
>function a() {
>  console.log(this);
>}
>
>var b = function() {
>  console.log(this);
>}
>
>a();
>b();
>
>```
>
>Even if we use a `function expression` like `b` in the above *snippet*, we still receive the `Window object`.
>
>Whenever a function is created that's simply a `function expression` or a `function statement`, then `'this'` will point to the `global object`.
>
>So, even in the above *snippet* where we have `3` separate *execution contexts* (*`Global`, `a()`, and `b()`*), and each of those cases they get their own `'this'` keyword, but in all those cases, the keyword points to the same address (*all point to the global object*).
>
>That means you could even do strange things like *creating* a new variable by attaching it to the `global object`:
>
>```
>function a() {
>  console.log(this);
>  this.newvariable = 'hello';
>}
>
>var b = function() {
>  console.log(this);
>}
>
>a();
>
>console.log(newvariable);
>
>b();
>
>```
>
>We see that any variables attached to the `global object` can be referenced by the property name only, without any need to use the dot operator.
>
>It just assumes I'm asking for a variable on the global object.
>
>If you don't understand what `this` keyword is pointing to and you think you're somehow attaching `this` to the `function`, you're **not**.
>
>You're actually crashing into the `global namespace` and you can cause yourself a lot of problems.
>
>**OBJECT METHODS**
>
>Remember, in an object if the *value* is a `primitive`, it's called a `property`. And if the *value* is a `function`, it's called a `method`.
>
>*example*:
>
>```
>var c = {
>  name: 'The c object',
>  log: function() {
>      console.log(this);
>  }
>}
>
>c.log();
>```
>
>In the *code snippet* above we *created* the `c` *variable* and set it to an *object literal*.
>
>The `log` property's value is an *anonymous function* that `console.log(this);`.
>
>So we can *call* the `log` method by using the *dot operator*, `c.log()`.
>
>What can we expect `this` to be when we invoke the `log` method?
>
>Remember every time a function is *invoked*, a new *execution context* is created and the *JavaScript* engine decides what that keyword `this` should be point to.
>
>In this case, it's a method on the object.
>*example ouput of `c.log();`*:
>
>```Object {name: "The c object", log: function}```
>
>When a `function` is actually a `method` attached to an object, the `'this'` *keyword* becomes the `object` that that method is sitting inside of (`c`).
>
>*example*:
>
>```
>var c = {
>  name: 'The c object',
>  log: function() {
>      this.name = 'Updated c object';
>      console.log(this);
>  }
>}
>
>c.log();
>```
>
> It's possible to mutate the `object` that contains a `method` of the `object` by using the `'this'` *keyword*.
>
> In the example *code snippet* above we see that the `log` function changes the `name` property to `'Upated c object';`, so when we invoke the `log` function and the `console.log(this);` is ran the output will now be:
>
>```Object {name: "Updated c object", log: function}```
>
>There is a *gotcha*, if we define a *function expression* inside a method and attempt to *mutate* a property using the `'this'` *keyword*.
>
>*example*:
>```
>var c = {
>  name: 'The c object',
>  log: function() {
>      this.name = 'Updated c object';
>      console.log(this);
>
>      var setname = function(newname) {
>        this.name = newname;
>      }
>      setname('Updated again! The c object');
>      console.log(this);
>  }
>}
>
>c.log();
>```
>
>We see that in the `log` *method* we set the `setname` *variable* to a `function expression` that takes a `newname` *argument* and sets the `this.name` *property* to the *passed-in* function argument.
>
>When we invoke `c.log()`, the line `setname('Updated again! The c object');` is ran followed by a log to the console `console.log(this);`.
>
>We might expect the log `console.log(this);` to output the new `name` property to be `'Updated again! The c object'` (*mutated* the `setname()` function), but the output from the `c.log()` is:
>
>```
>Object {name: "Updated c object", Log: function}
>Object {name: "Updated c object", Log: function}
>```
>
>At this point if we take a look at the `Window` object, you'll find:
>
>```
>name: "Updated again! The c object"
>```
>
>The `name` property was instead *created* and added by the `equals operator` on the `global object`.
>
>That means that the internal *function* (`setname`), when its *execution context* was created, the `'this'` *keyword* points to the `global object`, even though it's sitting kind of inside an *object* (`c`).
>
>*A lot* of people think this is *wrong*, but that's the way *JavaScript* works int his case and there's not a lot we can do about it at this point.
>
>*What can I do to make sure that I'm using the right object?*
> There is a very common pattern that we can use in this case.
>
>Because we understand that objects are set by reference.
>
>*example*:
>```
>var c = {
>  name: 'The c object',
>  log: function() {
>      var self  = this;
>
>      self.name = 'Updated c object';
>      console.log(self);
>
>      var setname = function(newname) {
>        self.name = newname;
>      }
>      setname('Updated again! The c object');
>      console.log(self);
>  }
>}
>
>c.log();
>```
>
>Inside the `log` method we can set a variable called `self` and set that *equal* to `this`. It is the first line of the `object method`.
>
>Now we have a new variable called `self`, and since they are `objects`, it's going to be set equal to `by reference`.
>
>So `self` will be pointing at the same location in memory as the `this` keyword. Which means `self` is pointing to the `c` object.
>
>Then we use `self` everywhere we would have used `this, even inside *sub-functions*. That way I don't have to think about: "*am I pointing to the right object?*"
>
>For *example* the line `self.name = 'Updated c object';`.
>The `self` variable is pointing to the same location in memory as `this` (`c` object).
>
>So when I *mutate* it, it's going to update the appropriate thing, in this case the `c` object.
>
>In the `setname` function, there is no `self` declared inside this function so the *JavaScript* engine will look down the `scope chain`.
>
>*Where is this function sitting physically in the code?*
>
>It will go to the next area *outside*, the outer *lexical reference*, and look for a variable called `self`.  So the `self` variable inside the `setname` function will be pointing to the `c` object.
>
>Now the output of the `c.log();` method will be :
>```
>Object {name: "Updated c object", Log: function}
>Object {name: "Updated again! The c object", Log: function}
>```
>
>We learned that no programming language is perfect.
>
>They all have their quirks, and *JavaScript* certainly isn't an exception.
But there are patterns we can use to get around any problems the programming language might have.
>
>The `let` *keyword*, which will be an alternative to the `var` keyword, is meant to clear some of these problems up.

ARRAYS: COLLECTIONS OF ANYTHING
-------------
>
>An `Array` is a **collection** that *holds* many things inside of it.
>
>Just like the `Object`, the `Array` can be *created* by either:
>
>1)	Use the `new` *keyword* to create a new instance of the `Array class` `var arr = new Array();`
>
>2)	Use the `Array` *literal syntax* ` var arr = [];`, with *brackets* instead of *curly braces*.
>
>Then *values* can be put inside the `array` separated by *commas*.
>
>*JavaScript* `arrays` are *zero based* meaning that `0th` position is the first *element* in the `array`.
>
>*JavaScript* `arrays` are a bit different. Because *JavaScript* is `dynamically typed`.
>
>In *most* programming languages, an `array` can hold a *list* or *collection* of things of a *particular* type. So an `array` of `numbers`, or an `array` of `strings`, or an `array` of `objects`.
>
>But *JavaScript* isn't like that. It figures out what types of things are *on the fly*.
>
>So I can put *whatever* I want into an `array`. And I can *mix* and *match* each individual item in an `array`, can be a different *type*.
>
>*example*:
>```
>var arr = [
>    1,
>    false,
>    {
>        name: 'John',
>        address: '123 Main Street
>    },
>    function(name) {
>       var greeting = 'Hello';
>       console.log(greeting + name);
>    },
>    "hello"
>];
>```
>
>From the `array` *example* above, we can see that a *JavaScript* `array` can hold collections of anything.
>
>*example*:
>```
>var arr = [
>  1,
>  false,
>  {
>    name: 'John',
>    address: '123 Main St.'
>  },
>  function(name) {
>    var greeting = 'Hello ';
>    console.log(greeting + name);
>  },
>  "Hello"
>];
>
>console.log(arr);
>arr[3](arr[2].name);
>```
>
>When we `run` the line `arr[3](arr[2].name);` the *output* will be:
>```Hello John```.
>

'arguments' AND SPREAD
-------------
>
>There is another *special* **keyword** called `arguments` that the *JavaScript engine* sets up for you *automatically* when you *execute* a *function*.
>
>In the *new* version of *JavaScript* has a new approach to do what `arguments` does, which is called `spread`.
>
>When the `execution context` is **created** it sets up a *special keyword* called `arguments`.
>
>`arguments` contains a list of all the values, of all the *parameters* that you pass to a `function`.
>
>*example*:
>```
>function greet(firstname, lastname, language) {
>  console.log(firstname);
>  console.log(lastname);
>  console.log(language);
>}
>
>greet();
>
>```
>
>In the *above* code snippet, when the `greet();` function is called. There are no `parameters` passed to it.
>
>In other programming languages it would result in an **error**. I would say it expects values, but *JavaScript* doesn't care. If the snippet is ran in a browser, the output would be:
>```
>undefined
>undefined
>undefined
>```
>
>**Hoisting**, which happens when the `function` is *executed and it sets up the values, takes care of the parameters even though I haven't given them values.
>
>It executed the `greet()` function and the first thing it did was set up *memory space* for `firstname`, `lastname`, and `language` and set them *equal* to `undefined`.
>
>If I start to pass *arguments*, they'll be processed *left to right*.
>
>*example*:
>```
>function greet(firstname, lastname, language) {
>  console.log(firstname);
>  console.log(lastname);
>  console.log(language);
>}
>
>greet();
>greet('John');
>
>```
>When I pass `'John'`, it will assume that this one is the `firstname` and that I've passed nothing to the `lastname` and `language`.
>When the snippet is ran, the output would be:
>```
>undefined
>undefined
>undefined
>----------------
>John
>undefined
>undefined
>----------------
>```
>
>You see that the first *output* is `John` and the other two are still `undefined` because of hoisting.
>
>This means that you can skip the passing of parameters or you can pass only part of this list of parameters  and *JavaScript's* okay with that.
>
>While this feels a little *weird*, it actually introduces some powerful concepts to the language under certain circumstances.
>
>For *example*, in the more recent versions of *JavaScript* you can set a **default** parameter.
>
>*example*:
>```
>function greet(firstname, lastname, language = 'en') {
>  console.log(firstname);
>  console.log(lastname);
>  console.log(language);
>  console.log('----------------');
>}
>```
>
>So if you don't give a value to the *function*, it will set that parameter to a specified value by default (in the *above* example `language` will be set to `en` by *default*).
>
>
>*However*, as that's not available in all modern browsers yet, and older ones as well, you can use the *default parameter concept*,
>
>*example*:
>```
>function greet(firstname, lastname, language) {
>
>  language = language || 'en';
>
>  console.log(firstname);
>  console.log(lastname);
>  console.log(language);
>  console.log('----------------');
>  
>}
>```
>
>In the *above* example, the line `language = language || 'en';` the `language` variable is `equal` to `language` **OR** `'en'` (*english*).
>
>If `language` is `undefined`, it gets *passed* to the `||` (*OR*) operator, gets *coerced* to *false*.  
>
>Then you end up with `'en'` (*english*) getting passed to the `=` (*equals*) operator, so `language` will end up *equaling* `'en'` (*english*).
>
>The *JavaScript engine* sets up a special *keyword* called `arguments`.
>
>It doesn't need to be *declared*, it is automatically available to us. The *execution context* makes sure that this is set up.
>
> It contains a list of all the values of the *parameters* that I've passed into the function.
>
> *example*:
> ```
> function greet(firstname, lastname, language) {
>  console.log(arguments);
>
>}
>
>greet('John', 'Doe', 'es');
> ```
>
> The *output* of the above *snippet* will be:
> ```
> ["John", "Doe", "es"]
> ```
>
> You might notice that this kind of looks like an `array`, but we generally declare an `array` with brackets, while the brackets in the output will be *slightly italicized brackets* (*from the developer console*).
>
> That's because the `argument`'s special thing that *JavaScript engine* sets up is what we would call *array-like*.
>
> That means that it acts like an `array`, it looks like an `array`, but it isn't *exactly* a *JavaScript* `array`.
>
> Only in the sense that it doesn't have all the features of a *JavaScript* `array`.
>
> It's *sufficed* to say that it acts enough like an `array` that we can use it in the same way under most circumstances.
>
> So for example if I don't want my *function* to try to do anything, if no *parameters* are passed, I could check the `arguments.length`, and if it's zero, meaning that since it contains the list of all the values.
>
> A length of zero, just like any `array` would mean it's empty.
>
> *example*:
> ```
> function greet(firstname, lastname, language) {
>
>  language = language || 'en';
>
>  if(arguments.length === 0) {
>    console.log('Missing parameters!');
>    console.log('----------------');
>    return;
>  }
>
>  console.log(firstname);
>  console.log(lastname);
>  console.log(language);
>  console.log(arguments);
>  console.log('----------------');
>
>}
> ```
>
> It's worth saying that as time goes on, `arguments` will become *deprecated*.
>
> The *new* thing is called a `spread parameter`.
>
> Which means that if I have parameters being passed to a function, a parameter can be added with a `...`  and then a *name*.
>  
> And if I add on other *parameters* in the cal.
>
> The extra parameters that aren't defined *explicitly* all get wrapped up into a *JavaScript* `array`.
>
>So the `...` means * take everything else and wrap it up into an array of this name*.
>
> This isn't completely available yet either, but once it becomes available, then it will be the preffered approach to dealing with various sequences and various numbers of arguments of parameters.
>
>*example*:
>```
>function greet(firstname, lastname, language, ...other) {
>
>  language = language || 'en';
>
>  if(arguments.length === 0) {
>    console.log('Missing parameters!');
>    console.log('----------------');
>    return;
>  }
>
>  console.log(firstname);
>  console.log(lastname);
>  console.log(language);
>  console.log(arguments);
>  console.log('arg 0: ' + arguments[0]);
>  console.log('----------------');
>
>}
>
>greet('John', 'Doe', 'es', '111 main st', 'new york');
>
>```
>

FUNCTION OVERLOADING
-------------
>
>In other programming languages like `C#`, `C++`, or `Java`, there's the idea of `function overloading`.
>
>What that means is I can have a `function` of the same name that has different numbers of parameters.
>
>This doesn't really work in *JavaScript* because functions are `objects`, so that *functionality* isn't available in the way that *JavaScript* deals with `functions`.
>
>Which is OK because having *first class functions* introduces a lot more options.
>
>*example*:
>```
>function greet(firstname, lastname, language) {
>  
>}
>```
>
>But, what if you did want to somehow have some alternatives for how you call the greet *method*?
>
>For example, what if I wanted to not always have to pass the language parameter?
>
>In an earlier example, we seen that we can *default* the `language` and then have all our logic inside this `function` to decide what to do when the `language` is under *different circumstances*.
>
>*example*:
>```
>function greet(firstname, lastname, language) {
>  language = language || 'en';
>
>  if(language == 'en') {
>    console.log('Hello ' + firstname + ' ' + lastname);
>  }
>
>  if(language == 'es') {
>    console.log('Holla ' + firstname + ' ' + lastname);
>  }
>}
>
>greet('John', 'Doe', 'en');
>greet('John', 'Doe', 'es');
>```
>
>The *output* of running the above *snippet* would be:
>```
>Hello John Doe
>Hola John Doe
>```
>
>But I might want a different version of this function where I don't have to pass as much information.
>
>We can do that very easily by simply creating a different `function` with certain default *parameters* that will be passed to this `greet` *function*.
>
>*example*:
>```
>function greet(firstname, lastname, language) {
>  language = language || 'en';
>
>  if(language == 'en') {
>    console.log('Hello ' + firstname + ' ' + lastname);
>  }
>
>  if(language == 'es') {
>    console.log('Holla ' + firstname + ' ' + lastname);
>  }
>}
>
>function greetEnglish(firstname, lastname) {
>  greet(firstname, lastname, 'en');
>}
>
>function greetSpanish(firstname, lastname) {
>  greet(firstname, lastname, 'es');
>}
>
>greetEnglish('John', 'Doe');
>greetSpanish('John', 'Doe');
>```
>
>In the *above* *snippet* the *function* `greetEnglish`, only takes a `firstname` and a `lastname` as *parameters*.
>
>And then the `greet` *function* is called with the `firstname`, `lastname`, and `en` (*English*) *parameters*.
>
>When calling these *functions*, instead of always having to think about which language I'm passing, I can just call a different function, which then passes for me an intended *parameter* value.
>
>This is one approach to dealing with having simpler function calls.
>


SYNTAX PARSERS
-------------
>
>Remember that the code you write isn't directly run on the computer, but there's that intermediate program between your code and the computer that translates your code into something the computer can understand.
>
>The *JavaScript engine* on your browser for example does this. It has different aspects and elements to it, one of them being a *syntax parser*, which reads your code and determines if it's valid, and what it is you're trying to do.
>
> For example, if it sees in your code as it's going character by character an `r` by itself, it assumes that you're probably going to write a `return` *statement*, so it's expecting an `e`.
>
>And it will go *character by character*, and if it sees something unexpected, it will *throw* an *error*.
>
>But if it sees what it *anticipates* as *valid syntax*, then it keeps on going.
>
>It may come across an ending or terminating character like a `semicolon` (`;`).
>
>So, *imagine* in your mind that the *JavaScript engine*, the *syntax parser* that's part of that *JavaScript engine*, is going through your code *character by character*, making assumptions, stating certain rules, and can even make changes to your code before it's executed.
>
>That's *exactly* what happens in certain circumstances in JavaScript, and it's important to think this way about how the *JavaScript* engine is reading your code.
>
>Character by character, using a set of rules for what's valid syntax and deciding what it is that you intend.
>
>That's all happening before your code is even executed, so it can make changes if it wants to the code that you've actually written.
>


AUTOMATIC SEMICOLON INSERTION
-------------
>
>Syntax parsers in *JavaScript*, and its *automatic semicolon insertion* is an important topic to cover.
>
>The *syntax parser* in *JavaScript* does something that tries to be helpful.
>
>You may have noticed that semicolons are optional in core *JavaScript*.
>
>You don't have to put a *semicolon*.
>
>If the *JavaScript engine* see's one character at a time, a certain statement, it knows what the language expects.
>
>It knows what the syntax should look like.
>
>If it sees that you're finishing a line, that is, a `carriage return`.
>
>The `carriage return` is an invisible character, but it is a character.
>
>The *syntax parser* sees it, knows what it is, and it says, "*Hey you're not allowed to go to the next line with this particular type of syntax, so I'm going to go ahead and insert automatically a semicolon for you.*"
>
>Anywhere the *syntax parser* expects that a *`semicolon` would be, it will put one for you.
>
>That's why it's *optional* when you're typing it.
>
>Not because it's *truly* optional, but because the *JavaScript engine* is putting them where it thinks they should be, if they're missing.
>
>**Rule one**: You should always put your own `semicolons` because you don't want the *JavaScript engine* to make that decision for you.
>
>You want to be certain that you are writing the code as it should be, but more than that, especially int he case of `return` *automatic semicolon insertion* can cause a **big problem** in your code.
>
>*example*:
>```
>function getPerson() {
>  return
>  {
>    firstname: 'Tony'
>  }
>}
>
>console.log(getPerson());
>
>```
>
>If we *run* the above *snippet* we receive the output `undefined`.
>
>Because of *automatic semicolon insertion*.
>
>The *JavaScript engine*, if it sees a carriage return after the keyword `return` it will automatically insert a **semicolon**.
>
>So, the last *example*, essentially ran the following code:
>```
>function getPerson() {
>  return;
>  {
>    firstname: 'Tony'
>  }
>}
>
>console.log(getPerson());
>
>```
>
>Even though the code was something else, the *syntax parser* chose to change the code
>
>In the above *snippet* you can see that the `object literal syntax` is on a new line, it caused the *JavaScript engine* to decide to put in a **semicolon**, so it simply *quit* out of the *function*.
>
>All that is received is an `undefined` result.
>
>To fix this, we have to tell the *syntax parser* what we're doing.
>
>We have to prevent it from doing automatic semicolon insertion. See the following *example*:
>
>function getPerson() {
>  return {
>    firstname: 'Tony'
>  }
>}
>
>console.log(getPerson());
>
>
>Because as it goes character by character.
>
>Instead of seeing the carriage return after the `return` it sees a `space` and then a `curly brace` and it knows that we've started an *object literal syntax*.
>And then it sees a carriage return and that's okay.
>
>You will notice that the *curly braces* are on the same line as the `functions`, `for loops`, and `if statements`. It's not always necessary.
>*example of an alternative curly brace convention which is also valid*:
>
>function getPerson()
>{
>  return {
>    firstname: 'Tony'
>  }
>}
>
>The above *syntax* is perfectly valid, but putting the *curly brace* on the same line as the function is sometime preferred so a mistake is never made.
>
>*example*:
>function getPerson() {
>  return {
>    firstname: 'Tony'
>  }
>}
>
>Getting in the habit of writing `functions` out this way will help avoiding this problem.
>

WHITESPACE
-------------
>
>**Whitespace**: Invisible characters that create literal "space" in your written code (*i.e. carriage returns, tabs, and spaces*).
>
>*Whitespaces* make your code more *readable*, but is not what is actually *executed* on the computer system.
>
>*JavaScript's* syntax parser is *very* liberal about what it allows when it comes to *whitespace*, and we can take advantage of it to help ourselves out in our written code.
>
>*example*:
>```
>var
>    // first name of the person
>    firstname,
>
>    // last name of the person
>    lastname,
>
>    // the language
>    // can be 'en' or 'es'
>    language;
>
>var person = {
>    // the first name
>    firstname: 'John',
>
>    // the last name
>    // (always required)
>    lastname: 'Doe'
>}
>
>console.log(person);
>
>```
>
>In the above *snippet* you can see that *JavaScript* will allow you to *add* a `comment` even between the `var` and the `firstname`.
>
>```
>var
>    // first name of the person
>    firstname,
>```
>
>You can use *whitespace* very liberally to *clarify* the code.
>
>In the *example snippet* we see that you can even use `comments` in an *object literal syntax*.
>
>```
>var person = {
>    // the first name
>    firstname: 'John',
>
>    // the last name
>    // (always required)
>    lastname: 'Doe'
>}
>```
>
>Sometimes *frameworks* will use lots of comments, which can be intimidating, but they comments will help provide important information describing the code.
>
>Adding *comments* is a good habit that you won't regret!
>


IMMEDIATELY INVOKED FUNCTIONS EXPRESSIONS (IIFEs)
-------------
>
>We've already seen the difference between *function statements* and *function expressions*.
>
>A *function statement* happens as a *new statement*, where `function` is the *first word* either on a *new line*, or maybe after a semi-colon.
>
>*example*:
>```
>function greet(name) {
>    console.log(name);
>}
>```
>
>When *JavaScript8 sees this, it puts it into *memory*, but when program/script begins to *execute*, it doesn't really *execute* anything.
>
>You actually have to *invoke* it for it to *execute*.
>
>```
>function greet(name) {
>    console.log('Hello ' + name);
>}
>greet();
>
>```
>
>Then we have a *function expression*.
>
>```
>var greetFunc = function(name) {
>    console.log('Hello ' + name);
>};
>greetFunc();
>```
>
>The *snippet* above uses a *function expression* to *set* a *variable* *equal* to it and has an *anonymous function*.
>
>The *anonymous function* portion is an *expression*.
>
>It isn't put into *memory* initially, but rather during *execution* and when it his the *anonymous function* the *JavaScript engine* creates the *function object* on the *fly*.
>
>Then we can *invoke* it using a *variable* that's pointing to that *memory location*.
>
>We could also *create* a *variable* and set it to the same *function expression*, but *immediately* invoke it by adding the parenthesis.
>*example*:
>```
>var greeting = function(name) {
>    return 'Hello ' + name;
>}('John');
>console.log(greeting);
>```
>
>In the above *snippet*, the *function object* is created using the *function expression*.
>
>Then it will be *invoked* and that *value* will be `returned`, which will be set *equal* to `greeting`.
>
>When the `console.log(greeting);` is ran the output will be `Hello John`.
>
