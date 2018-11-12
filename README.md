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
>
>
