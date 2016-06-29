# inversify-chrome-devtools
A chrome extension that aims to help developers using InversifyJS

![](https://raw.githubusercontent.com/inversify/inversify-devtools/master/media/1.png)
![](https://raw.githubusercontent.com/inversify/inversify-devtools/master/media/2.png)
![](https://raw.githubusercontent.com/inversify/inversify-devtools/master/media/3.png)

### Installation
You can download and install the chrome extension by visiting the following link:

> TODO URL

### Setup
You can connect your InversifyJS `Kernel` instances to the DevTools using the `__inversifyDevtools__` global function: 

```ts
/// <reference path="node_modules/inversify-dts/inversify/inversify.d.ts"/>

import { Kernel } from "inversify";

let kernel = new Kernel();

let win: any = window;

if (win.__inversifyDevtools__) {
    win.__inversifyDevtools__(kernel);
}
```

The `__inversifyDevtools__` global function is only available if the chrome extension has been installed.

### License

License under the MIT License (MIT)

Copyright © 2015 [Remo H. Jansen](http://www.remojansen.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
and associated documentation files (the "Software"), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge, publish, distribute, 
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or 
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
PURPOSE AND NONINFRINGEMENT. 

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR 
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.