import { Level, resetEditor } from "./level";

import { Chapter } from "./chapter";
import {nextTick} from "vue";
import { addBoardElementsTooltips } from "../tooltip";


export interface Chapter2Level extends Level {
  doThis: string;
  selector: string;
  syntax?: string;
  help?: string;
  helpTitle?: string;
  examples?: string[];
}

export const chapter2Levels: Chapter2Level[] = [
  {
    name: "Type Selector",
    helpTitle: "Select elements by their type",
    doThis: "Select the plates",
    selector: "plate",
    syntax: "tagname",
    help: "Selects all elements of a type. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",
    examples: [
      "<strong>div</strong> selects all <tag>div</tag> elements.",
      "<strong>p</strong> selects all <tag>p</tag> elements.",
    ],
    markup: `
<plate></plate>
<plate></plate>
<bento></bento>
<plate></plate>
    `,
  },
  {
    name: "Type Selector",
    doThis: "Select the plates",
    selector: "plate",
    syntax: "tagname",
    helpTitle: "Select elements by their type",
    help: "Selects all elements of a type. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",
    examples: [
      "<strong>div</strong> selects all <tag>div</tag> elements.",
      "<strong>p</strong> selects all <tag>p</tag> elements.",
    ],
    markup: `
    <plate></plate>
    <bento><plate></plate></bento>
    <bento><sushi/></bento>
    <bento>
    <plate><sushi /></plate>
    </bento>
    `,
  },
  {
    name: "ID Selector",
    doThis: "Select the fancy plate",
    selector: "#fancy",
    helpTitle: "Select elements with an ID",
    syntax: "#id",
    help: "Selects the element with a specific <strong>id</strong>. You can also combine the ID selector with the type selector.",
    examples: [
      '<strong>#cool</strong> selects any element with <strong>id="cool"</strong>',
      '<strong>ul#long</strong> selects <tag>ul id="long"</tag>',
    ],
    markup: `
    <plate></plate>
    <plate id="fancy"></plate>
    <plate></plate>
    <bento></bento>
    `,
  },
  {
    name: "Class Selector",
    doThis: "Select the small apples",
    selector: ".small",
    helpTitle: "Select elements by their class",
    syntax: ".classname",
    help: "The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.",
    examples: [
      '<strong>.neato</strong> selects all elements with <strong>class="neato"</strong>',
    ],
    markup: `
    <apple></apple>
    <apple class="small"></apple>
    <plate>
      <apple class="small" />
    </plate>
    <plate />
    `,
  },
  {
    name: "Class Selector #2",
    doThis: "Select the small oranges",
    selector: "orange.small",
    helpTitle: "Combine the Class Selector",
    syntax: "tag.classname",
    help: "You can combine the class selector with other selectors, like the type selector.",
    examples: [
      '<strong>ul.important</strong> selects all <tag>ul</tag> elements that have <strong>class="important"</strong>',
      '<strong>#big.wide</strong> selects all elements with <strong>id="big"</strong> that also have <strong>class="wide"</strong>',
    ],
    markup: `
    <apple></apple>
    <apple class="small"></apple>
    <bento>
      <orange class="small"/>
    </bento>
    <plate>
      <orange/>
    </plate>
    <plate>
      <orange class="small"/>
    </plate>`,
  },
  {
    name: "Descendant Selector",
    helpTitle: "Select an element inside another element",
    doThis: "Select the sushi on the plate",
    selector: "plate sushi",
    syntax: "A B",
    help: "Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.",
    examples: [
      "<strong>p  strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>",
      '<strong>#fancy  span</strong> selects any <tag>span</tag> elements that are inside of the element with <strong>id="fancy"</strong>',
    ],
    markup: `
    <bento></bento>
    <plate>
      <sushi />
    </plate>
    <sushi></sushi>
    `,
  },
  {
    name: "Descendant & ID",
    doThis: "Select the sushi on the fancy plate",
    selector: "#fancy sushi",
    helpTitle: "Combine the Descendant & ID Selectors",
    syntax: "#id A",
    help: "You can combine any selector with the descendent selector.",
    examples: [
      '<strong>#cool span</strong> selects all <tag>span</tag> elements that are inside of elements with <strong>id="cool"</strong>',
    ],
    markup: `
    <bento>
    <sushi/>
    </bento>
    <plate id="fancy">
      <sushi/>
    </plate>
    <plate>
      <sushi/>
    </plate>
    `,
  },
  {
    name: "Challenge #1",
    doThis: "Select the small oranges in the bentos",
    selector: "bento orange.small",
    helpTitle: "You can do it...",
    help: "Combine what you learned in the last few levels to solve this one!",
    markup: `
    <bento>
      <orange/>
    </bento>
    <orange class="small"></orange>
    <bento>
      <orange class="small"/>
    </bento>
    <bento>
      <apple class="small"/>
    </bento>
    <bento>
      <orange class="small"/>
    </bento>
    `,
  },
  {
    doThis: "Select all the plates and bentos",
    selector: "plate,bento",
    name: "Comma Combinator",
    helpTitle: "Combine, selectors, with... commas!",
    syntax: "A, B, C",
    help: "Commas can be used to combine several selectors. You can combine any number of selectors this way.",
    examples: [
      '<strong>p, .fun</strong> selects all <tag>p</tag> elements as well as all elements with <strong>class="fun"</strong>',
      "<strong>a, p, div</strong> selects all <tag>a</tag>, <tag>p</tag> and <tag>div</tag> elements",
    ],
    markup: `
    <pickle class="small"></pickle>
    <orange></orange>
    <plate>
      <sushi />
    </plate>
    <bento>
      <sushi />
    </bento>
    <plate>
      <apple></apple>
    </plate>
    `,
  },
  {
    doThis: "Select all the things!",
    selector: "*",
    name: "The Universal Selector",
    helpTitle: "You can select everything!",
    syntax: "*",
    help: "You can select all elements with the universal selector! ",
    examples: [
      "<strong>p *</strong> selects any element inside all <tag>p</tag> elements.",
    ],
    markup: `
    <apple></apple>
    <plate>
      <orange class="small" />
    </plate>
    <bento></bento>
    <bento>
      <sushi />
    </bento>
    <plate id="fancy">
        <toast></toast>
    </plate>
    `,
  },
  {
    name: "Universal Selector #2",
    doThis: "Select everything on a plate",
    selector: "plate *",
    syntax: "A  *",
    helpTitle: "Combine the Universal Selector",
    help: "This selects all elements inside of <strong>A</strong>.",
    examples: [
      "<strong>p *</strong> selects every element inside all <tag>p</tag> elements.",
      '<strong>ul.fancy *</strong> selects every element inside all <tag>ul class="fancy"</tag> elements.',
    ],
    markup: `
    <plate id="fancy">
      <orange class="small"/>
    </plate>
    <plate>
      <sushi />
    </plate>
    <apple class="small"></apple>
    <plate>
      <apple></apple>
    </plate>
    <bento>
      <sushi />
    </bento>`,
  },
  {
    doThis: "Select every apple that are just to the right of a plate",
    selector: "plate + apple",
    helpTitle: "Select an element that directly follows another element",
    name: "Adjacent Sibling Selector",
    syntax: "A + B",
    help: "This selects all <strong>B</strong> elements that directly follow <strong>A</strong>. Elements that follow one another are called siblings. They're on the same level, or depth. <br/><br/>In the HTML markup for this level, elements that have the same indentation are siblings.",
    examples: [
      '<strong>p + .intro</strong> selects every element with <strong>class="intro"</strong> that directly follows a <tag>p</tag>',
      "<strong>div + a</strong> selects every <tag>a</tag> element that directly follows a <tag>div</tag>",
    ],
    markup: `
    <bento>
      <apple class="small"></apple>
    </bento>
    <plate></plate>
    <apple class="small"></apple>
    <plate><toast /></plate>
    <apple></apple>
    <apple class="small"></apple>
    <apple class="small"></apple>
    `,
  },
  {
    name: "General Sibling Selector",
    helpTitle: "Select elements that follows another element",
    syntax: "A ~ B",
    doThis: "Select all the pickles to the right of the bento, not on a plate",
    selector: "bento ~ pickle",
    help: "You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.",
    examples: [
      "<strong>A ~ B</strong> selects all <strong>B</strong> that follow a <strong>A</strong>",
    ],
    markup: `
    <pickle></pickle>
    <bento>
      <sushi />
    </bento>
    <pickle class="small"></pickle>
    <pickle></pickle>
    <plate>
      <pickle></pickle>
    </plate>
    <plate>
      <pickle class="small"></pickle>
    </plate>
    `,
  },
  {
    name: "Child Selector",
    syntax: "A > B ",
    doThis: "Select the apple directly on a plate",
    selector: "plate > apple",
    helpTitle: "Select direct children of an element",
    help: "You can select elements that are direct children of other elements. A child element is any element that is nested directly in another element. <br><br>Elements that are nested deeper than that are called descendant elements.",
    examples: [
      "<strong>A > B</strong> selects all <strong>B</strong> that are a direct children <strong>A</strong>",
    ],
    markup: `
    <plate>
      <bento>
        <apple class="small"></apple>
      </bento>
    </plate>
    <plate>
      <apple></apple>
    </plate>
    <plate></plate>
    <apple></apple>
    <apple class="small"></apple>
    `,
  },
  {
    name: "First Child Pseudo-selector",
    helpTitle: "Select a first child element inside of another element",
    doThis: "Select the top orange",
    selector: "plate :first-child",
    syntax: ":first-child",

    help: "You can select the first child element. A child element is any element that is directly nested in another element. You can combine this pseudo-selector with other selectors.",
    examples: [
      "<strong>:first-child</strong> selects all first child elements.",
      "<strong>p:first-child</strong> selects all first child <tag>p</tag> elements.",
      "<strong>div p:first-child</strong> selects all first child <tag>p</tag> elements that are in a <tag>div</tag>.",
    ],
    markup: `
    <bento></bento>
    <plate></plate>
    <plate>
      <orange></orange>
      <orange></orange>
      <orange></orange>
    </plate>
    <pickle class="small"></pickle>
    `,
  },
  {
    name: "Only Child Pseudo-selector",
    helpTitle:
      "Select an element that are the only element inside of another one.",
    doThis: "Select the items alone on a plate",
    selector: "plate :only-child",
    syntax: ":only-child",
    help: "You can select any element that is the only element inside of another one.",
    examples: [
      "<strong>span:only-child</strong> selects the <tag>span</tag> elements that are the only child of some other element.",
      "<strong>ul li:only-child</strong> selects the only <tag>li</tag> element that are in a <tag>ul</tag>.",
    ],
    markup: `
    <plate>
      <toast></toast>
    </plate>
    <plate>
      <sushi></sushi>
    </plate>
    <bento>
      <pickle></pickle>
    </bento>
    <plate>
      <orange class="small"></orange>
      <orange></orange>
    </plate>
    <pickle class="small"></pickle>
    `,
  },
  {
    name: "Last Child Pseudo-selector",
    helpTitle: "Select the last element inside of another element",
    doThis: "Select the last pickle",
    selector: "pickle:last-child",
    syntax: ":last-child",
    help: "You can use this selector to select an element that is the last child element inside of another element. <br><br>Pro Tip &rarr; In cases where there is only one element, that element counts as the first-child, only-child and last-child!",
    examples: [
      "<strong>:last-child</strong> selects all last-child elements.",
      "<strong>span:last-child</strong> selects all last-child <tag>span</tag> elements.",
      "<strong>ul li:last-child</strong> selects the last <tag>li</tag> elements inside of any <tag>ul</tag>.",
    ],
    markup: `
    <plate id="fancy">
      <pickle></pickle>
      <apple class="small"></apple>
    </plate>
    <pickle class="small"></pickle>
    <plate>
      <orange></orange>
    </plate>
    <pickle class="small"></pickle>`,
  },
  {
    name: "Nth Child Pseudo-selector",
    helpTitle: "Select an element by its order in another element",
    doThis: "Select the third plate, starting from the left",
    selector: ":nth-child(3)",
    syntax: ":nth-child(A)",
    help: "Selects the <strong>nth</strong> (Ex: 1st, 3rd, 12th etc.) child element in another element.",
    examples: [
      "<strong>:nth-child(8)</strong> selects every element that is the 8th child of another element.",
      "<strong>div p:nth-child(2)</strong> selects the second <strong>p</strong> in every <strong>div</strong>",
    ],
    markup: `
    <plate><toast /></plate>
    <plate><toast /></plate>
    <plate><toast /></plate>
    <plate><toast /></plate>
    `,
  },
  {
    name: "Nth Last Child Selector",
    helpTitle:
      "Select an element by its order in another element, counting from the back",
    doThis: "Select the third bento, starting from the right",
    selector: "bento:nth-last-child(3)",
    syntax: ":nth-last-child(A)",
    help: "Selects the children from the bottom of the parent. This is like nth-child, but counting from the back!",
    examples: [
      "<strong>:nth-last-child(2)</strong> selects all second-to-last child elements.",
    ],
    markup: `
    <bento></bento>
    <bento><sushi /></bento>
    <bento>
      <orange></orange>      
    </bento>
    <bento><sushi /></bento>
    `,
  },
  {
    name: "First of Type Selector",
    helpTitle: "Select the first element of a specific type",
    doThis: "Select the first apple on the left",
    selector: "apple:first-of-type",
    syntax: ":first-of-type",
    help: "Selects the first element of that type within another element.",
    examples: [
      "<strong>span:first-of-type</strong> selects the first <tag>span</tag> in any element.",
    ],
    markup: `
    <orange class="small"></orange>
    <apple></apple>
    <apple class="small"></apple>
    <apple></apple>
    `,
  },
  {
    name: "Nth of Type Selector",
    doThis: "Select all even plates",
    selector: "plate:nth-of-type(even)",
    syntax: ":nth-of-type(A)",
    help: "Selects a specific element based on its type and order in another element - or even or odd instances of that element.",
    examples: [
      "<strong>div:nth-of-type(2)</strong> selects the second instance of a div.",
      "<strong>.example:nth-of-type(odd)</strong> selects all odd instances of a the example class.",
    ],
    markup: `
    <plate></plate>
    <plate></plate>
    <plate></plate>
    <plate></plate>
    <plate></plate>
    <plate></plate>
    `,
  },
  {
    name: "Nth-of-type Selector with Formula",
    doThis: "Select every 2nd plate, starting from the 3rd",
    selector: "plate:nth-of-type(2n+3)",
    syntax: ":nth-of-type(An+B)",
    help: "The nth-of-type formula selects every nth element, starting the count at a specific instance of that element.",
    examples: [
      "<strong>span:nth-of-type(6n+2)</strong> selects every 6th instance of a <tag>span</tag>, starting from (and including) the second instance.",
    ],
    markup: `
    <plate></plate>
    <plate>
      <sushi />
    </plate>
    <plate>
      <apple class="small" />
    </plate>
    <plate></plate>
    <plate>
      <apple />
    </plate>
    <plate></plate>
    <plate>
        <orange class="small"></orange>
    </plate>
    `,
  },
  {
    name: "Only of Type Selector",
    helpTitle:
      "Select elements that are the only ones of their type within their parent element",
    selector: "plate *:only-of-type",
    syntax: ":only-of-type",
    doThis: "Select one-of-a-kind items in a plate",
    help: "Selects the only element of its type within another element.",
    examples: [
      "<strong>p span:only-of-type</strong> selects a <tag>span</tag> within any <tag>p</tag> if it is the only <tag>span</tag> in there.",
    ],
    markup: `
    <plate>
      <sushi />
    </plate>
    <plate>
      <apple class="small"></apple>
      <apple></apple>
    </plate>
    <plate>
      <apple class="small"></apple>
    </plate>
    <plate>
      <apple class="small"></apple>
      <orange></orange>
    </plate>
    <pickle />
    `,
  },
  {
    name: "Last of Type Selector",
    helpTitle: "Select the last element of a specific type",
    doThis: "Select the last pickle",
    selector: "pickle:last-of-type",
    syntax: ":last-of-type",
    help: "Selects each last element of that type within another element. Remember type refers the kind of tag, so <tag>p</tag> and <tag>span</tag> are different types. <br><br> I wonder if this is how the last dinosaur was selected before it went extinct.",
    examples: [
      "<strong>div:last-of-type</strong> selects the last <tag>div</tag> in every element.",
      "<strong>p span:last-of-type</strong> selects the last <tag>span</tag> in every <tag>p</tag>.",
    ],
    markup: `
    <orange class="small"></orange>
    <pickle></pickle>
    <apple class="small"></apple>
    <pickle></pickle>
    <orange class="small"></orange>
    <pickle></pickle>
    <apple class="small"></apple>
    `,
  },
  {
    name: "Empty Selector",
    helpTitle: "Select elements that don't have children",
    doThis: "Select the empty bentos",
    selector: "bento:empty",
    syntax: ":empty",
    help: "Selects elements that don't have any other elements inside of them.",
    examples: [
      "<strong>div:empty</strong> selects all empty <tag>div</tag> elements.",
    ],
    markup: `
    <bento></bento>
    <bento>
      <sushi></sushi>
    </bento>
    <plate></plate>
    <bento></bento>`,
  },
  {
    name: "Negation Pseudo-class",
    helpTitle: "Select all elements that don't match the negation selector",
    doThis: "Select the big apples",
    selector: "apple:not(.small)",
    syntax: ":not(X)",
    help: 'You can use this to select all elements that do not match selector <strong>"X"</strong>.',
    examples: [
      '<strong>:not(#fancy)</strong> selects all elements that do not have <strong>id="fancy"</strong>.',
      "<strong>div:not(:first-child)</strong> selects every <tag>div</tag> that is not a first child.",
      '<strong>:not(.big, .medium)</strong> selects all elements that do not have <strong>class="big"</strong> or <strong>class="medium"</strong>.',
    ],
    markup: `
    <plate id="fancy">
      <apple class="small"></apple>
    </plate>
    <plate>
      <apple></apple>
    </plate>
    <apple></apple>
    <plate>
      <orange class="small"></orange>
    </plate>
    <pickle class="small"></pickle>
    `,
  },
  /* :has is currently experimental, waiting for broader browser support */
  /*{
    name: "Has Pseudo-class",
    helpTitle: "Select all elements that have a child matching the :has selector",
    doThis: "Select the plates that contain pickles",
    selector: "plate:has(pickle)",
    syntax: ":has(X)",
    help: 'You can use this to style some elements based on their content.',
    examples: [
      '<strong>p:has(img)</strong> selects every <tag>p</tag> that contains an image.',
      "<strong>form:has(input:invalid)</strong> selects forms that have some inputs in invalid state.",
    ],
    markup: `
    <plate>
      <orange></orange>
    </plate>
    <plate>
      <pickle></pickle>
    </plate>
    <plate>
      <apple class="small"></apple>
    </plate>
    <plate>
      <pickle class="small"></pickle>
      <apple></apple>
    </plate>
    `,
  },*/
  {
    name: "Attribute Selector",
    helpTitle: "Select all elements that have a specific attribute",
    doThis: "Select the items for someone",
    selector: "[for]",
    syntax: "[attribute]",
    help: 'Attributes appear inside the opening tag of an element, like this: <tag>span attribute="value"</tag>. An attribute does not always have a value, it can be blank!',
    examples: [
      '<strong>[value]</strong> selects all elements that have a <strong>value="anything"</strong> attribute.',
      '<strong>[type]</strong> selects all elements that have a <strong>type="anything"</strong> attribute.',
    ],
    markup: `
    <bento><apple class="small"/></bento>
    <apple for="Ethan"></apple>
    <plate for="Alice"><toast /></plate>
    <bento for="Clara"><sushi /></bento>
    <pickle></pickle>`,
  },
  {
    name: "Attribute Selector",
    helpTitle: "Select all elements that have a specific attribute",
    doThis: "Select the plates for someone",
    selector: "plate[for]",
    syntax: "A[attribute]",
    help: "Combine the attribute selector with another selector (like the tag name selector) by adding it to the end.",
    examples: [
      '<strong>a[href]</strong> selects all <tag>a</tag> elements that have a <strong>href="anything"</strong> attribute.',
      "<strong>input[disabled]</strong> selects all <tag>input</tag> elements with the <strong>disabled</strong> attribute",
    ],
    markup: `
    <plate for="Sarah"><sushi/></plate>
    <plate for="Luke"><apple/></plate>
    <plate></plate>
    <bento for="Steve"><orange/></bento>
    `,
  },
  {
    name: "Attribute Value Selector",
    helpTitle: "Select all elements that have a specific attribute value",
    doThis: "Select Vitaly's meal",
    selector: "[for=Vitaly]",
    syntax: '[attribute="value"]',
    help: "Attribute selectors are case sensitive, each character must match exactly.",
    examples: [
      '<strong>input[type="checkbox"]</strong> selects all checkbox input elements.',
    ],
    markup: `
    <apple for="Alexei"></apple>
    <bento for="Albina"><orange /></bento>
    <bento for="Vitaly"><sushi /></bento>
    <pickle></pickle>
    `,
  },
  {
    name: "Attribute Starts With Selector",
    helpTitle:
      "Select all elements with an attribute value that starts with specific characters",
    doThis: "Select the items for names that start with 'Sa'",
    selector: '[for^="Sa"]',
    syntax: '[attribute^="value"]',
    // help : "You can use quotes around the value in the selector, or not&mdash;it's optional!",
    examples: [
      '<strong>.toy[category^="Swim"]</strong> selects elements with class <strong>toy</strong> and either <strong>category="Swimwear"</strong> or <strong>category="Swimming"</strong>.',
    ],
    markup: `
    <plate for="Sam"><sushi /></plate>
    <bento for="Sarah"><apple class="small"/></bento>
    <bento for="Mary"><sushi/></bento>
    `,
  },
  {
    name: "Attribute Ends With Selector",
    helpTitle:
      "Select all elements with an attribute value that ends with specific characters",
    doThis: "Select the items for names that end with 'ato'",
    selector: '[for$="ato"]',
    syntax: '[attribute$="value"]',
    help: "",
    examples: [
      '<strong>img[src$=".jpg"]</strong> selects all images display a <strong>.jpg</strong> image.',
    ],
    markup: `
    <apple class="small"></apple>
    <bento for="Hayato"><sushi /></bento>
    <apple for="Ryota"></apple>
    <plate for="Minato"><orange/></plate>
    <pickle class="small"></pickle>
    `,
  },
  {
    name: "Attribute Wildcard Selector",
    helpTitle:
      "Select all elements with an attribute value that contains specific characters anywhere",
    syntax: '[attribute*="value"]',
    doThis: "Select the meals for names that contain 'obb'",
    selector: '[for*="obb"]',
    help: "A useful selector if you can identify a common pattern in things like <strong>class</strong>, <strong>href</strong> or <strong>src</strong> attributes.",
    examples: [
      '<strong>img[src*="/thumbnails/"]</strong> selects all image elements that show images from the "thumbnails" folder.',
      '<strong>[class*="heading"]</strong> selects all elements with "heading" in their class, like <strong>class="main-heading"</strong> and <strong>class="sub-heading"</strong>',
    ],
    markup: `
    <bento for="Robbie"><apple /></bento>
    <bento for="Timmy"><sushi /></bento>
    <bento for="Bobby"><orange /></bento>
    `,
  },
  {
    name: "Final Challenge",
    helpTitle: "You can do it...",
    help: "Combine all what you learned to solve this one!",
    doThis: "Select the empty plates except the one for Timmy",
    selector: 'plate:empty:not([for="Timmy"])',
    markup: `
    <bento></bento>
    <plate><apple /></plate>
    <plate for="Timmy"></plate>
    <plate></plate>
    <plate></plate>
    `,
  },
];

export const chapter2: Chapter = {
  name: "CSS Selectors",
  levels: chapter2Levels,
  credits: `Credits: <a href="http://www.twitter.com/flukeout">@flukeout</a> for his work on <a href="https://flukeout.github.io/" target="_blank">CSS diner</a> that served as the foundation for this website`,
  intro: `
    <p>To apply CSS to an element you need to select this element with a <b>selector</b>.</p>
    <p>CSS provides you with a number of different ways to do this, and you can explore them in this chapter.</p>`,
  onLevelStart(){
    resetEditor()
    nextTick(() => addBoardElementsTooltips())
  }
}