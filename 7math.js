const myDomain = '';

// Load CSS Files
const loadCSS = (url) => {
    var style = document.createElement("link");
    style.rel = 'stylesheet';
    style.href = url;
    document.head.appendChild(style);
}

loadCSS('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');

// Load JS Files
const loadScript = (url) => {
    var script = document.createElement("script");
    script.src = url;
    script.type = 'text/javascript';
    document.body.appendChild(script);
}

loadScript('https://code.jquery.com/jquery-3.5.1.js');
loadScript('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js');
loadScript('https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js');
loadScript('https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js');

/**
 * ADD ALL HTML ELEMENTS
 */
let htmlFormatTab, htmlFractionIconTab, htmlReadTextFromImage, htmlEditingArea;

// Format Tab
const formatTab = () => {
    htmlFormatTab = `<!----------- FORMAT TAB --------------------->
    <div class="col-sm-2 col-2 row text-center formatTab" style="max-width: 100px; padding: 0;">
        <!--------------------- Format Tab: Font Size --------------------->
        <div class="col-12 d-block p-0">
            <label class="mb-0">Font Size</label>
            <select onchange="document.getElementById('editorText').style.fontSize = this.value +'px';" class="form-control m-1" style="width: 100%;" name="fracFontSize" id="fracFontSize">
                <option value="12">12</option>
                <option value="20">20</option>
                <option selected value="24">24</option>
                <option value="28">28</option>
                <option value="36">36</option>
                <option value="48">48</option>
                <option value="72">72</option>
            </select>
        </div>

        <!--------------------- Format Tab: Text Transform --------------------->
        <button class="col-12 btn btn-outline-secondary m-1" id="bold-button" title="Bold"><b>B</b></button>
        <button class="col-12 btn btn-outline-secondary m-1" id="underline-button" title="Underline"><u>U</u></button>
        <button class="col-12 btn btn-outline-secondary m-1" id="italic-button" title="Italic"><i>I</i></button>
    </div>`;
}

const fractionIconTab = () => {
    htmlFractionIconTab =  `<!----------- FRACTION TAB --------------------->
    <div class="col-7 p-3">
        <div id="representEquation">
            <div class="equationTab">
                <span id="templateEquation" class="tabItem btn active border" onclick="loadFraction('templateEquation')">Template Equation</span>
                <div class="dropdown dropright d-inline-block">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Select List Icon
                    </button>
                    <div class="dropdown-menu bg-secondary" aria-labelledby="dropdownMenuButton">
                        <span id="arrowTab" class="dropdown-item tabItem" onclick="loadFraction('arrowTab')">Arrow</span>
                        <span id="basicMathTab" class="dropdown-item tabItem" onclick="loadFraction('basicMathTab')">Basic Math</span>
                        <span id="geomertryTab" class="dropdown-item tabItem" onclick="loadFraction('geomertryTab')">Geomertry</span>
                        <span id="greekLetterTab" class="dropdown-item tabItem" onclick="loadFraction('greekLetterTab')">Greek Letter</span>
                        <span id="operatorTab" class="dropdown-item tabItem" onclick="loadFraction('operatorTab')">Operator</span>
                    </div>
                </div>
            </div>
            <!----------- STRUCTURE TAB (TEMPLATE EQUATION) --------------------->
            <div class="structureTab row text-center" style="display: none;">
                <!--------------------- STRUCTURE TAB: Fraction ---------->
                <div class="dropdown d-inline">
                    <button class="dropdown-toggle" data-toggle="dropdown" title="Fraction"><img src="./assets/images/Structures/fraction.png" alt="fraction"></button>
                    <ul class="dropdown-menu dropdown-menu-right">
                        <li class="dropdown-header"><span>Common Fraction</span></li>
                        <li>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="dy over dx">
                                <math><mfrac><mrow><mi>d</mi><mi>y</mi></mrow><mrow><mi>d</mi><mi>x</mi></mrow></mfrac></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="cap delta y over cap delta x">
                                <math><mfrac><mrow><mi>&#x394;</mi><mi>y</mi></mrow><mrow><mi>&#x394;</mi><mi>x</mi></mrow></mfrac></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="partial y over partial x">
                                <math><mfrac><mrow><mo>&#x2202;</mo><mi>y</mi></mrow><mrow><mo>&#x2202;</mo><mi>x</mi></mrow></mfrac></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="delta y over delta x">
                                <math><mfrac><mrow><mi>&#x3B4;</mi><mi>y</mi></mrow><mrow><mi>&#x3B4;</mi><mi>x</mi></mrow></mfrac></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="pi Over 2">
                                <math><mfrac><mi>&#x3C0;</mi><mn>2</mn></mfrac></math>
                            </button>
                        </li>
                    </ul>
                </div>
                
                <!--------------------- STRUCTURE TAB: Scripts ---------->
                <div class="dropdown d-inline">
                    <button class="dropdown-toggle" data-toggle="dropdown" title="Script"><img src="${myDomain}/assets/images/Structures/script.png" alt="script"></button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-header"><span>Common Subscripts and Superscripts</span></li>
                        <li>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="x subscript y squared">
                                <math><msub><mi>x</mi><msup><mi>y</mi><mn>2</mn></msup></msub></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="e to the minus i omega t">
                                <math><msup><mi>e</mi><mrow><mo>-</mo><mi>i</mi><mi>&#x3C9;</mi><mi>t</mi></mrow></msup></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="x squared">
                                <math><msup><mi>x</mi><mn>2</mn></msup></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Y left subscript n left subscript 1">
                                <math><mmultiscripts><mtext>Y</mtext><mprescripts/><mn>1</mn><mi>n</mi></mmultiscripts></math>
                            </button>
                        </li>
                    </ul>
                </div>
                
                <!--------------------- STRUCTURE TAB: Radicals ---------->
                <div class="dropdown d-inline">
                    <button class="dropdown-toggle" data-toggle="dropdown" title="Radical"><img src="./assets/images/Structures/radical.png" alt="radical"></button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-header"><span>Common Radicals</span></li>
                        <li>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Right hand side of Quadratic Formula">
                                <math><mfrac><mrow><mo>-</mo><mi>b</mi><mo>&#xB1;</mo><msqrt><msup><mi>b</mi><mn>2</mn></msup><mo>-</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Squared root of a squared plus b squared">
                                <math><msqrt><msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2</mn></msup></msqrt></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Cubic root of sin x squared plus cos x squared">
                                <math><mroot><mrow><mi>s</mi><mi>i</mi><msup><mi>n</mi><mn>2</mn></msup><mi>x</mi><mo>+</mo><mi>c</mi><mi>o</mi><msup><mi>s</mi><mn>2</mn></msup><mi>x</mi></mrow><mn>3</mn></mroot></math>
                            </button>
                        </li>
                    </ul>
                </div>
                
                <!--------------------- STRUCTURE TAB: Integrals ---------->
                <div class="dropdown d-inline">
                    <button class="dropdown-toggle" data-toggle="dropdown" title="Integral"><img src="./assets/images/Structures/integral.png" alt="integral"></button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-header"><span>Integrals</span></li>
                        <li>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Integral">
                                <math><mo>&#x222B;</mo></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Integral with Limits">
                                <math><msubsup><mo>&#x222B;</mo><mi>a</mi><mi>b</mi></msubsup></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Double Integral">
                                <math><mo>&#x222C;</mo></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Double Integral with Limits">
                                <math><msubsup><mo>&#x222C;</mo><mi>a</mi><mi>b</mi></msubsup></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Trible Integral">
                                <math><mo>&#x222D;</mo></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Trible Integral with Limits">
                                <math><msubsup><mo>&#x222D;</mo><mi>a</mi><mi>b</mi></msubsup></math>
                            </button>
                        </li>
                        <li class="dropdown-header"><span>Contour Integrals</span></li>
                        <li>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Contour Integral">
                                <math><mo>&#x222E;</mo></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Contour Integral with Limits">
                                <math><msubsup><mo>&#x222E;</mo><mi>a</mi><mi>b</mi></msubsup></math>
                            </button>
                        </li>
                        <li class="dropdown-header"><span>Differencials</span></li>
                        <li>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Differencial x">
                                <math><mi>d</mi><mi>x</mi></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Differencial y">
                                <math><mi>d</mi><mi>y</mi></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Differencial θ">
                                <math><mi>d</mi><mi>&#x3B8;</mi></math>
                            </button>
                        </li>
                    </ul>
                </div>
                <!--------------------- STRUCTURE TAB: Large Operator ---------->
                <div class="dropdown d-inline">
                    <button class="dropdown-toggle" data-toggle="dropdown" title="Large Operator"><img src="./assets/images/Structures/largeOperator.png" alt="largeOperator"></button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-header"><span>Summations</span></li>
                        <li>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Summation">
                                <math><mo>&#x2211;</mo></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Summation with Limits">
                                <math><munderover><mo>&#x2211;</mo><mi>a</mi><mi>b</mi></munderover></math>
                            </button>
                        </li>
                        <li class="dropdown-header"><span>Products and Co-Products</span></li>
                        <li>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Product">
                                <math><mo>&#x220F;</mo></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Product with Limits">
                                <math><munderover><mo>&#x220F;</mo><mi>a</mi><mi>b</mi></munderover></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="CoProduct">
                                <math><mo>&#x2210;</mo></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="CoProduct with Limits">
                                <math><munderover><mo>&#x2210;</mo><mi>a</mi><mi>b</mi></munderover></math>
                            </button>
                        </li>
                        <li class="dropdown-header"><span>Unions and Intersections</span></li>
                        <li>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Union">
                                <math><mo largeop="true">&#x222A;</mo></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Union with Limits">
                                <math><munderover><mo largeop="true">&#x222A;</mo><mi>a</mi><mi>b</mi></munderover></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Intersection">
                                <math><mo largeop="true">&#x2229;</mo></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Intersection with Limits">
                                <math><munderover><mo largeop="true">&#x2229;</mo><mi>a</mi><mi>b</mi></munderover></math>
                            </button>
                        </li>
                
                        <li class="dropdown-header"><span>Common Large Operators</span></li>
                        <li>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Summation over k of n choose k">
                                <math><munderover><mo>&#x2211;</mo><mi>a</mi><mi>b</mi></munderover><mfenced><mtable><mtr><mtd><mi>n</mi></mtd></mtr><mtr><mtd><mi>k</mi></mtd></mtr></mtable></mfenced></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Summation from i equal zero to n">
                                <math><munderover><mo>&#x2211;</mo><mrow><mi>i</mi><mo>=</mo><mn>0</mn></mrow><mi>n</mi></munderover></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Product Example">
                                <math><munderover><mo>&#x220F;</mo><mi>a</mi><mi>b</mi></munderover><msub><mi>A</mi><mi>k</mi></msub></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="Union Example">
                                <math><munderover><mo largeop="true">&#x222A;</mo><mi>a</mi><mi>b</mi></munderover><mo>(</mo><msub><mi>X</mi><mi>n</mi></msub><mo>&#x2229;</mo><msub><mi>Y</mi><mi>n</mi></msub><mo>)</mo></math>
                            </button>
                        </li>
                    </ul>
                </div>
                <!--------------------- STRUCTURE TAB: Functions ---------->
                <div class="dropdown d-inline">
                    <button class="dropdown-toggle" data-toggle="dropdown" title="Function"><img src="./assets/images/Structures/function.png" alt="function"></button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-header"><span>Trigonometric Functions</span></li>
                        <li>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><mi>sin</mi><mi>x</mi></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><mi>cos</mi><mi>x</mi></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><mi>tan</mi><mi>x</mi></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><mi>csc</mi><mi>x</mi></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><mi>sec</mi><mi>x</mi></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><mi>cot</mi><mi>x</mi></math>
                            </button>
                        </li>
                
                        <li class="dropdown-header"><span>Inverse Functions</span></li>
                        <li>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><msup><mi>sin</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup><mi>x</mi></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><msup><mi>cos</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup><mi>x</mi></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><msup><mi>tan</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup><mi>x</mi></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><msup><mi>csc</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup><mi>x</mi></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><msup><mi>sec</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup><mi>x</mi></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><msup><mi>cot</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup><mi>x</mi></math>
                            </button>
                        </li>
                    </ul>
                </div>
            
                <!--------------------- STRUCTURE TAB: Limit & Log ---------->
                <div class="dropdown d-inline">
                    <button class="dropdown-toggle" data-toggle="dropdown" title="Limit And Log"><img src="./assets/images/Structures/limitAndLog.png" alt="limitAndLog"></button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-header"><span>Functions</span></li>
                        <li>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><msub><mi>log</mi><mi>a</mi></msub><mi>b</mi></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><mi>log</mi><mi>a</mi></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><mi>ln</mi><mi>a</mi></math>
                            </button>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><munder><mi>lim</mi><mrow><mi>x</mi><mo>&#x2192;</mo><mn>0</mn></mrow></munder><mi>a</mi><msup><mi>x</mi><mn>2</mn></msup></math>
                            </button>
                        </li>
                
                    </ul>
                </div>
            
                <!--------------------- STRUCTURE TAB: Matrix ---------->
                <div class="dropdown d-inline">
                    <button class="dropdown-toggle" data-toggle="dropdown" title="Matrix"><img src="./assets/images/Structures/matrix.png" alt="matrix"></button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-header"><span>Sparse Matrices</span></li>
                        <li>
                            <button class="p-1" onclick="execCmd(this.innerHTML)" title="">
                                <math><mfenced open="[" close="]"><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr><mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr></mtable></mfenced></math>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`;
}

const readTextFromImage = () => {
    htmlReadTextFromImage = `<!----------- READ TEXT FROM IMAGE -------------->
    <div class="col-lg-3 col-md-12 jumbotron m-0 text-center p-0 bg-light">
        <div class="mt-2 form-group">
            <h5 class="bg-info text-light p-1">Read text from image</h5>
            <p id="progressOCR" onclick="this.style.display = 'none';" title="Click to hide it!"></p>
            <progress class="p-1" value="0" max="100" id="uploader">0%</progress> <br>
            <input class="btn btn-light p-1" style="width: 100px;" type="file" id="myFile" accept=".jpg, .png, .bmp, .pbm" title="Choose a text image file">
            <input type="text" id="linkMyFile" disabled style="display: none;" />
            <input class="btn btn-success" id="btnReadFile" type="button" onclick="execFileUpload()" value="Read file">
        </div>
    </div>`
}

const editingArea = () => {
    htmlEditingArea = `<!----------- EDITING AREA -------------->
    <ul class="nav nav-tabs changeEditorView">
        <li id="toEditorView1" class="active"><a href="#editorText" data-toggle="tab" class="btn active">Editor Text</a></li>
        <li id="toEditorView2"><a href="#editorHTML" data-toggle="tab" class="btn">Editor HTML</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane active" id="editorText" autofocus contenteditable="true" placeholder="Start writing ..." spellcheck="false" style="background: #fff;"></div>
        <pre class="prettyprint tab-pane fade" id="editorHTML" autofocus contenteditable="true" placeholder="Your HTML here..." spellcheck="false"
        style="background: #eee; color:#000; font-family: Consolas; font-size: 14px; line-height: unset;"><span></span></pre>
    </div>`
}

const Index = () => {
    formatTab();
    fractionIconTab();
    readTextFromImage();
    editingArea();
    return `<div class="container">
    <div class="row bg-light" style="border-bottom: 3.5px solid #0009; animation: fadeAnimate 0.5s backwards;">
        <div class="col-12 row">
            ${htmlFormatTab}
            ${htmlFractionIconTab}
            ${htmlReadTextFromImage}
        </div>
        <div style="animation: fadeAnimate 0.1s backwards 0.5s;" id="editor-container" style="background: #eee">
            ${htmlEditingArea}
        </div>
    </div>
    </div>
    `;
}

document.body.onload = () => {
    document.querySelector('#editorContainer').innerHTML = Index();
}

/**
 * ---------------- MAIN JS FOR EDITOR --------------------
 */

// check Browser if FireFox or Safari : all browser enable MathML
let isFireFox = (typeof InstallTrigger !== 'undefined');
let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

if (isFireFox == true || isSafari == true) {
    document.querySelector('.checkingBrowser').classList.remove('active');
} else
{
    console.log('Not FireFox or Safari Browser! Then not support MathML to render this page!');
    document.querySelector('#editorContainer').innerHTML = '';
}

 var myHeaders = new Headers();
 myHeaders.append('Access-Control-Allow-Origin', '*');

 // Display all Fraction in the 1st page load event
const loadFraction = (tabName) => {

    // Remove current Equation Tab, then change to another
    try {
        document.querySelector('.structureTab').style.display = 'none';
        document.querySelector('#representEquation .fractionToShow').remove();
        
        let arrElm = document.querySelectorAll('.equationTab .tabItem');
        arrElm.forEach(elm => {
            elm.classList.remove('active')
        });
    }
    catch (err) {
        console.log(err);
    }

    document.querySelector(`#${tabName}`).classList.add('active');

    let tabStorage = '';

    switch(tabName) {
        case 'geomertryTab':
            tabStorage = 'Geomertry';
            break;
        case 'greekLetterTab':
            tabStorage = 'Greek Letter';
            break;
        case 'operatorTab':
            tabStorage = 'Operator';
            break;
        case 'arrowTab':
            tabStorage = 'Arrow';
            break;
        case 'templateEquation': {
            document.querySelector('.structureTab').style.display = 'inline-block';
            return;
        }
        default:
            tabStorage = 'Basic Math';
            break;
    }

    $.getJSON(`./assets/eqs/${tabStorage}/staticList.json`, function( data ) {
        var items = [];
        data.forEach(frac => {
           items.push(`<button class='fraction-item'
            title='${frac.name}'
            onclick="execCmd(this.innerHTML)" >${frac.symbol}</button>`);
        });

        $( "<div/>", {
          "class": "fractionToShow",
          html: items.join( "" )
        }).appendTo( "#representEquation" );
      });
}

loadFraction('templateEquation');

// exec command when hit any button on menu (not on keyboard)
const execCmd = ( key ) => {
    let htmlCode = `${key}&nbsp;`;
    document.execCommand(`insertHTML`, false, htmlCode);
}

/* ================= TEMPLATE ================= */
document.querySelector('#editorText').onkeyup = function(e){
    if(e.keyCode === 32 || e.key === ' ') {
        //this.textContent = this.textContent.substring(0, this.textContent.length - 1);
        document.execCommand(`insertHTML`, false, '&nbsp;');
    }
}

// Bold menu
document.querySelector('#bold-button').addEventListener('click', function() {
    document.execCommand('bold');
});

// Underline menu
document.querySelector('#underline-button').addEventListener('click', function() {
    document.execCommand('underline');
});

// Italic menu
document.querySelector('#italic-button').addEventListener('click', function() {
    document.execCommand('italic');
});

// Check menu options to be highlighted on keyup and click event 
document.querySelector('#editorText').addEventListener('keyup', FindCurrentTags);

convertMathMLToText = () => {
    htmlTmp = document.querySelector('#editorHTML').textContent;
    document.querySelector('#editorText').innerHTML = htmlTmp;
}

convertTextToHTML = () => {
    let strToFormat = document.querySelector("#editorText").innerHTML;
    document.querySelector('#editorHTML').textContent = formatHTML(`${strToFormat.replace(/\s/g, '')}`); //.replace(/\s/g, '')
}

// onclick change editor view to Text
$('.changeEditorView #toEditorView1').click(()=> {
    elms =  $('.structureTab button');
    for (var i = 0; i < elms.length; i++) {
        elms[i].disabled = false;
        elms[i].classList.remove('disabled');
    }
    convertMathMLToText();
})

// onclick change editor view to HTML
$('.changeEditorView #toEditorView2').click(()=> {
    elms =  $('.structureTab button');
    for (var i = 0; i < elms.length; i++) {
        elms[i].disabled = true;
        elms[i].classList.add('disabled');
    }

    convertTextToHTML();
})

document.querySelector('#editorText').addEventListener('click', FindCurrentTags);

function FindCurrentTags() {
    // Editor container 
    var editor_element = document.querySelector('#editorText');
    
    // No of ranges
    var num_ranges = window.getSelection().rangeCount;

    // Will hold parent tags of a range
    var range_parent_tags;

    // Will hold parent tags of all ranges
    var all_ranges_parent_tags = [];
        
    // Current menu tags
    var menu_tags = [ 'B', 'I', 'U' ];
        
    // Will hold common tags from all ranges
    var menu_tags_common = [];

    var start_element,
        end_element,
        cur_element;

    // For all ranges
    for(var i = 0; i < num_ranges; i++) {
        // Start container of range
        start_element = window.getSelection().getRangeAt(i).startContainer;
        
        // End container of range
        end_element = window.getSelection().getRangeAt(i).endContainer;
        
        // Will hold parent tags of a range
        range_parent_tags = [];

        // If starting node and final node are the same
        if(start_element.isEqualNode(end_element)) {
            // If the current element lies inside the editor container then don't consider the range
            // This happens when editor container is clicked
            if(editor_element.isEqualNode(start_element)) {
                all_ranges_parent_tags.push([]);
                continue;
            }

            cur_element = start_element.parentNode;
            
            // Get all parent tags till editor container    
            while(!editor_element.isEqualNode(cur_element)) {
                range_parent_tags.push(cur_element.nodeName);
                cur_element = cur_element.parentNode;
            }
        }

        // Push tags of current range 
        all_ranges_parent_tags.push(range_parent_tags);
    }

    // Find common parent tags for all ranges
    for(i = 0; i < menu_tags.length; i++) {
        var common_tag = 1;
        for(var j = 0; j < all_ranges_parent_tags.length; j++) {
            if(all_ranges_parent_tags[j].indexOf(menu_tags[i]) == -1) {
                common_tag = -1;
                break;
            }
        }

        if(common_tag == 1)
            menu_tags_common.push(menu_tags[i]);
    }

    // Highlight menu for common tags
    if(menu_tags_common.indexOf('B') != -1)
        document.querySelector("#bold-button").classList.add("highight-menu");
    else
        document.querySelector("#bold-button").classList.remove("highight-menu");

    if(menu_tags_common.indexOf('U') != -1)
        document.querySelector("#underline-button").classList.add("highight-menu");
    else
        document.querySelector("#underline-button").classList.remove("highight-menu");

    if(menu_tags_common.indexOf('I') != -1)
        document.querySelector("#italic-button").classList.add("highight-menu");
    else
        document.querySelector("#italic-button").classList.remove("highight-menu");
}

// Handle File Upload
execFileUpload = () => {
    let linkFile = document.querySelector('#linkMyFile').value;
    let btnReadFile = document.querySelector('#btnReadFile');
    let progressOCR = document.querySelector('#progressOCR');

    console.log(linkFile);
    if (linkFile == null || linkFile == '')
       alert('Please upload a file!');
    else {
        btnReadFile.disabled = 'true';
        btnReadFile.value = 'Reading';
    
        Tesseract.recognize(
            `${linkFile}`,
            'vie',
            { logger: m => {
                progressOCR.innerHTML = 'Progress: ' + (m.progress * 100).toFixed(2).toString() + '%';
            } }
            ).then(({ data: { text } }) => {
            console.log('Completed! Check data in your output box!');
            execCmd(text);
        })
        .catch((err) => {
            console.error('Something went wrong: ' + err);
            alertTxt = 'Something went wrong!';

            if (err.toString().includes('NetworkError when attempting to fetch resource')) {
                alert(alertTxt + ` Check if CORS Header Addon is enabled in your Browser!\n Access this link to install: https://addons.mozilla.org/vi/firefox/addon/cors-everywhere/`);
            } else {
                alert(alertTxt + ' Please contact your Administrator!');
            }
        })
        // Update button status
        uploader.style.display = 'none';
        btnReadFile.disabled = !btnReadFile.disabled;
        btnReadFile.value = 'Read File';
    }
}

// Handle submit
const sendData = () => {
    let htmlCode = document.querySelector('#editorText').innerHTML;
    console.log(htmlCode);
}

// Other code

function formatHTML(html) {
    var indent = '\n';
    var tab = '\t';
    var i = 0;
    var pre = [];

    html = html
        .replace(new RegExp('<pre>((.|\\t|\\n|\\r)+)?</pre>'), function (x) {
            pre.push({ indent: '', tag: x });
            return '<--TEMPPRE' + i++ + '/-->'
        })
        .replace(new RegExp('<[^<>]+>[^<]?', 'g'), function (x) {
            var ret;
            var tag = /<\/?([^\s/>]+)/.exec(x)[1];
            var p = new RegExp('<--TEMPPRE(\\d+)/-->').exec(x);

            if (p) 
                pre[p[1]].indent = indent;

            if (['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'].indexOf(tag) >= 0) // self closing tag
                ret = indent + x;
            else {
                if (x.indexOf('</') < 0) { //open tag
                    if (x.charAt(x.length - 1) !== '>')
                        ret = indent + x.substr(0, x.length - 1) + indent + tab + x.substr(x.length - 1, x.length);
                    else 
                        ret = indent + x;
                    !p && (indent += tab);
                }
                else {//close tag
                    indent = indent.substr(0, indent.length - 1);
                    if (x.charAt(x.length - 1) !== '>')
                        ret =  indent + x.substr(0, x.length - 1) + indent + x.substr(x.length - 1, x.length);
                    else
                        ret = indent + x;
                }
            }
            return ret;
        });

    for (i = pre.length; i--;) {
        html = html.replace('<--TEMPPRE' + i + '/-->', pre[i].tag.replace('<pre>', '<pre>\n').replace('</pre>', pre[i].indent + '</pre>'));
    }

    return html.charAt(0) === '\n' ? html.substr(1, html.length - 1) : html;
}
// --------------------------------------------------------//