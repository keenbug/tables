# Motivation

Something like Notion, but local (not cloud) and more flexible (customizable through/in code).


# Ideas

- There are blocks, describing a "unit" of data (corresponding to cells in excel or lines/whatever in notion)
    - every block can be switched between 3 different states:
        - view: display the user data (e.g. a paragraph of text)
        - edit: change user data (e.g. a paragraph of text in a small text editor)
        - code: change the underlying code
    - a block consists of
        - data: the user (editable) data
        - code: determining the cells behaviour and view in the view and edit state
        - (interactive state: volatile state that is not persisted and can be lost because of user actions. Only used for the UI. Does not contain data the user explicitly wants to persist)
    - blocks can be nested in blocks
- At first, there is a "built-in" "Command Block", which selects which Block to use
    - Blocks:
        - Compute Block (JS, former REPL)
        - Sheet Block (List of Blocks, Layouting possibilities like in Notion)
        - Text Block (Parses Content as JSX)


# Next Steps

* Work on UX?
* Add completion?
* Work on Tables/Spreadsheets again
    * Use REPL to change available columns
        * Step-by-step: Improve columns Definition
            * Simpler columns definition
            * Add focus (edit -> focus + isEditing)
            * Add "global" edit line (like excel)
* Work on Notion-Features?
    * Add "JSXBlock" again?
    * Add columns?
    * Pages, Hierarchy of Pages?
        * Sub-Pages not weirdly inlined in between "text"
        * "text" only contains links to Sub-Pages
        * Sub-Pages just another type of property of a Page?
        * 


# Future

* Rename tables to Jotter? JotterSheets? Then also rename Blocks to Jots?
* Use TypeScript typechecking in browser? - has an API: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
* Style-/Theme-Editor?
    * Customizable CSS, always under a specific new class, divisible into sections and with live example html preview
* Change (Context) Menus to "Commander Prompts"
    * Mixture of Sublime's/Atom's/VSCode's "Command Palette", Notion's Context Menus/Commands and iOS's long press "Context Menu"s/Previews
* PWA
* REPL
    * Add completion: Special input (rather search), searches env and can select properties
    * console-feed?
    * Addable dependencies?
        * Transpile with Babel?
        * Bundle? Every Lib needs to be specially bundled?
            * Can npm/yarn be executed in the browser?
* Collaboration?
    * yJS
    * Messaging via Matrix?

* Other Code Editor?
    - monaco? (~VSCode) https://github.com/Microsoft/monaco-editor
    - CodeMirror? https://github.com/codemirror/CodeMirror


# Used Technologies

Babel
https://babeljs.io/docs/en/babel-core
https://babeljs.io/docs/en/babel-parser
https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md

Fontawesome
https://fontawesome.com/v5.15/icons?d=gallery
https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react

Tailwindcss
https://tailwindcss.com/docs/utility-first
https://tailwindcomponents.com/cheatsheet/

headlessui
https://headlessui.dev

react-inspector
https://www.npmjs.com/package/react-inspector

react-simple-code-editor
https://github.com/react-simple-code-editor/react-simple-code-editor

PrismJS
ReactJS


# Interesting Technologies

puck - WYSIWYG React Editor
https://measured.co/blog/building-a-react-page-builder-an-introduction-to-puck
https://github.com/measuredco/puck

skypack.dev - alternative to unpkg that bundles for a browser

snowpack.dev - fast(er) simpler(?) bundler
https://www.snowpack.dev/tutorials/react

deno - JS/TS Runtime with Security built-in
https://deno.land/

immer - immutability in JS with "mutable" API
https://immerjs.github.io/immer/

Haskell Retrie - Refactor haskell code by stating simple rules
https://hackage.haskell.org/package/retrie


# Maybe useful libs

Virtual List/Grid Component
https://github.com/inokawa/virtua

File System Access in Chrome
https://developer.chrome.com/docs/capabilities/web-apis/file-system-access?hl=en

Rich Text Editors
https://github.com/brillout/awesome-react-components#rich-text-editor

kbar - Command Palette similar to macOS's Spotlight
https://github.com/timc1/kbar

source-map - Source-map library in js
https://www.npmjs.com/package/source-map

Draft.js - Rich Text Editor Framework for React (uses contenteditable)
https://draftjs.org/

Promise Hooks
https://github.com/aiven715/promise-hook


# Interesting Fun Stuff

Kaboom - fast & fun JS game programming library
https://kaboomjs.com/

rough-notation - add hand-drawn annotations
https://rough-notation.com/



# Various Docs

Stacktraces in JS - https://code-maven.com/stack-trace-in-javascript
Babel stuff - https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#babel-traverse
HTML multiple sticky header levels - https://stackoverflow.com/questions/55941019/how-can-i-create-different-levels-of-sticky-headers