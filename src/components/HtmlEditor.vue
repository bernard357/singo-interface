<template>
  <v-container align-center class="pa-0">

    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, focused }">
      <div class="menubar" :class="{ 'is-focused': focused }">
        <div class="toolbar">

          <button class="menubar__button"
                  @click="commands.undo"><v-icon>mdi-undo</v-icon>
          </button>

          <button class="menubar__button"
                  @click="commands.redo"><v-icon>mdi-redo</v-icon>
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': isActive.bold() }"
                  @click="commands.bold"><v-icon>mdi-format-bold</v-icon>
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': isActive.italic() }"
                  @click="commands.italic"><v-icon>mdi-format-italic</v-icon>
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': isActive.strike() }"
                  @click="commands.strike"><v-icon>mdi-format-strikethrough-variant</v-icon>
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': isActive.underline() }"
                  @click="commands.underline"><v-icon>mdi-format-underline</v-icon>
          </button>

          <!-- <button class="menubar__button"
                  :class="{ 'is-active': isActive.paragraph() }"
                  @click="commands.paragraph"><v-icon>mdi-format-pilcrow</v-icon>
          </button> -->

          <button class="menubar__button"
                  :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                  @click="commands.heading({ level: 1 })"><v-icon>mdi-format-header-1</v-icon>
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                  @click="commands.heading({ level: 2 })"><v-icon>mdi-format-header-2</v-icon>
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                  @click="commands.heading({ level: 3 })"><v-icon>mdi-format-header-3</v-icon>
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': isActive.bullet_list() }"
                  @click="commands.bullet_list"><v-icon>mdi-format-list-bulleted</v-icon>
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': isActive.ordered_list() }"
                  @click="commands.ordered_list"><v-icon>mdi-format-list-numbered</v-icon>
          </button>

          <button class="menubar__button"
                  @click="showImagePrompt(commands.image)"><v-icon>mdi-image-multiple-outline</v-icon>
          </button>

          <button class="menubar__button"
                  :class="{ 'is-active': isActive.blockquote() }"
                  @click="commands.blockquote"><v-icon>mdi-format-quote-close</v-icon>
          </button>

     <!-- <button class="menubar__button"
                  :class="{ 'is-active': isActive.todo_list() }"
                  @click="commands.todo_list"><v-icon>mdi-calendar-check</v-icon>
          </button> -->

          <button class="menubar__button"
                  @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })">
            <v-icon>mdi-table-large</v-icon>
          </button>

          <span v-if="isActive.table()">

            <button class="menubar__button"
                    @click="commands.deleteTable"><v-icon>mdi-table-large-remove</v-icon>
            </button>

            <button class="menubar__button"
                    @click="commands.addColumnBefore"><v-icon>mdi-table-column-plus-before</v-icon>
            </button>

            <button class="menubar__button"
                    @click="commands.addColumnAfter"><v-icon>mdi-table-column-plus-after</v-icon>
            </button>

            <button class="menubar__button"
                    @click="commands.deleteColumn"><v-icon>mdi-table-column-remove</v-icon>
            </button>

            <button class="menubar__button"
                    @click="commands.addRowBefore"><v-icon>mdi-table-row-plus-before</v-icon>
            </button>

            <button class="menubar__button"
                    @click="commands.addRowAfter"><v-icon>mdi-table-row-plus-after</v-icon>
            </button>

            <button class="menubar__button"
                    @click="commands.deleteRow"><v-icon>mdi-table-row-remove</v-icon>
            </button>

          </span>
        </div>
      </div>
    </editor-menu-bar>

    <editor-content v-if="canUpdate()"
                    :editor="editor" />

    <v-container v-else class="mx-0 my-2 pa-0">
      <span v-html="item.content" />
    </v-container>

  </v-container>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
    Blockquote,
    Bold,
    BulletList,
    Code,
    CodeBlock,
    HardBreak,
    Heading,
    History,
    Image,
    Italic,
    Link,
    ListItem,
    OrderedList,
    Placeholder,
    Strike,
    Table,
    TableCell,
    TableHeader,
    TableRow,
    TodoItem,
    TodoList,
    Underline,
  } from 'tiptap-extensions'

import bus from '@/event-bus'
import { c11n } from '@/customization'
import identity from '@/identity'

export default {

  name: 'HtmlEditor',

  props: {
    item: Object,
    placeholder: String,
  },

  components: {
    EditorContent,
    EditorMenuBar,
  },

  data() {
    return {

      editor: new Editor({

        extensions: [
          new Blockquote(),
          new Bold(),
          new BulletList(),
          new Code(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new History(),
          new Image(),
          new Italic(),
          new Link(),
          new ListItem(),
          new OrderedList(),
          new Placeholder({
            emptyNodeClass: 'is-empty',
            showOnlyWhenEditable: true,
          }),
          new Strike(),
          new Table({
            resizable: true,
          }),
          new TableCell(),
          new TableHeader(),
          new TableRow(),
          new TodoItem(),
          new TodoList(),
          new Underline(),
        ],

        onUpdate: ({ getHTML }) => {
          this.item.content = getHTML()
          bus.$emit('change', {from: 'HtmlEditor'})
        },

      }),

      c11n: c11n,
    }
  },

  computed: {

    placeholderMessage: function() {
      return this.placeholder || c11n.htmlEditorPlaceholder
    },

  },

  methods: {

    showImagePrompt(command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    },

    canUpdate() {
      return ['leader', 'support'].includes(identity.surfer_persona)
    },

  },

  watch: {
    item: function () {

      this.editor.setContent(this.item.content || '')
    }
  },

  mounted(){
    this.editor.extensions.options.placeholder.emptyNodeText = this.placeholderMessage
    this.editor.setContent(this.item.content || '')
  },

  beforeDestroy() {
    this.editor.destroy()
  },

}
</script>

<style>

div.ProseMirror {
  margin-bottom: 2em;
}

div.ProseMirror-focused {
  border-style: solid;
  border-width: 1px;
  border-color: silver;
  padding: 3px;
}

div.menubar {
  margin-top: 8px;
  margin-bottom: 8px;
}

button.menubar__button {
  margin-right: 7px;
}

.ProseMirror p.is-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}

.ProseMirror table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;
}

.ProseMirror table td {
  min-width: 1em;
  border: 2px solid #dddddd;
  padding: 3px 5px;
  vertical-align: top;
  box-sizing: border-box;
  position: relative;
  > * {
    margin-bottom: 0;
  }
}

.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

.ProseMirror li {
  position: relative;
}

.ProseMirror-hideselection *::selection { background: transparent; }
.ProseMirror-hideselection *::-moz-selection { background: transparent; }
.ProseMirror-hideselection { caret-color: transparent; }

.ProseMirror-selectednode {
  outline: 2px solid #8cf;
}

/* Make sure li selections wrap around markers */

li.ProseMirror-selectednode {
  outline: none;
}

li.ProseMirror-selectednode:after {
  content: "";
  position: absolute;
  left: -32px;
  right: -2px; top: -2px; bottom: -2px;
  border: 2px solid #8cf;
  pointer-events: none;
}
.ProseMirror-textblock-dropdown {
  min-width: 3em;
}

.ProseMirror-menu {
  margin: 0 -4px;
  line-height: 1;
}

.ProseMirror-tooltip .ProseMirror-menu {
  width: -webkit-fit-content;
  width: fit-content;
  white-space: pre;
}

.ProseMirror-menuitem {
  margin-right: 3px;
  display: inline-block;
}

.ProseMirror-menuseparator {
  border-right: 1px solid #ddd;
  margin-right: 3px;
}

.ProseMirror-menu-dropdown, .ProseMirror-menu-dropdown-menu {
  font-size: 90%;
  white-space: nowrap;
}

.ProseMirror-menu-dropdown {
  vertical-align: 1px;
  cursor: pointer;
  position: relative;
  padding-right: 15px;
}

.ProseMirror-menu-dropdown-wrap {
  padding: 1px 0 1px 4px;
  display: inline-block;
  position: relative;
}

.ProseMirror-menu-dropdown:after {
  content: "";
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid currentColor;
  opacity: .6;
  position: absolute;
  right: 4px;
  top: calc(50% - 2px);
}

.ProseMirror-menu-dropdown-menu, .ProseMirror-menu-submenu {
  position: absolute;
  background: white;
  color: #666;
  border: 1px solid #aaa;
  padding: 2px;
}

.ProseMirror-menu-dropdown-menu {
  z-index: 15;
  min-width: 6em;
}

.ProseMirror-menu-dropdown-item {
  cursor: pointer;
  padding: 2px 8px 2px 4px;
}

.ProseMirror-menu-dropdown-item:hover {
  background: #f2f2f2;
}

.ProseMirror-menu-submenu-wrap {
  position: relative;
  margin-right: -4px;
}

.ProseMirror-menu-submenu-label:after {
  content: "";
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 4px solid currentColor;
  opacity: .6;
  position: absolute;
  right: 4px;
  top: calc(50% - 4px);
}

.ProseMirror-menu-submenu {
  display: none;
  min-width: 4em;
  left: 100%;
  top: -3px;
}

.ProseMirror-menu-active {
  background: #eee;
  border-bottom: 4px solid silver;
  border-radius: 4px;
}

.ProseMirror-menu-active {
  background: #eee;
  border-radius: 4px;
}

.ProseMirror-menu-disabled {
  opacity: .3;
}

.ProseMirror-menu-submenu-wrap:hover .ProseMirror-menu-submenu, .ProseMirror-menu-submenu-wrap-active .ProseMirror-menu-submenu {
  display: block;
}

.ProseMirror-menubar {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  position: relative;
  min-height: 1em;
  color: #666;
  padding: 1px 6px;
  top: 0; left: 0; right: 0;
  border-bottom: 1px solid silver;
  background: white;
  z-index: 10;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  overflow: visible;
}

.ProseMirror-icon {
  display: inline-block;
  line-height: .8;
  vertical-align: -2px; /* Compensate for padding */
  padding: 2px 8px;
  cursor: pointer;
}

.ProseMirror-menu-disabled.ProseMirror-icon {
  cursor: default;
}

.ProseMirror-icon svg {
  fill: currentColor;
  height: 1em;
}

.ProseMirror-icon span {
  vertical-align: text-top;
}
.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}
/* Add space around the hr to make clicking it easier */

.ProseMirror-example-setup-style hr {
  padding: 2px 10px;
  border: none;
  margin: 1em 0;
}

.ProseMirror-example-setup-style hr:after {
  content: "";
  display: block;
  height: 1px;
  background-color: silver;
  line-height: 2px;
}

.ProseMirror ul, .ProseMirror ol {
  padding-left: 30px;
}

.ProseMirror blockquote {
  padding-left: 1em;
  border-left: 3px solid silver;
  margin-left: 0; margin-right: 0;
}

.ProseMirror-example-setup-style img {
  cursor: default;
}

.ProseMirror-prompt {
  background: white;
  padding: 5px 10px 5px 15px;
  border: 1px solid silver;
  position: fixed;
  border-radius: 3px;
  z-index: 11;
  box-shadow: -.5px 2px 5px rgba(0, 0, 0, .2);
}

.ProseMirror-prompt h5 {
  margin: 0;
  font-weight: normal;
  font-size: 100%;
  color: #444;
}

.ProseMirror-prompt input[type="text"],
.ProseMirror-prompt textarea {
  background: #eee;
  border: 1px solid silver;
  outline: none;
}

.ProseMirror-prompt input[type="text"] {
  padding: 0 4px;
}

.ProseMirror-prompt-close {
  position: absolute;
  left: 2px; top: 1px;
  color: #666;
  border: none; background: transparent; padding: 0;
}

.ProseMirror-prompt-close:after {
  content: "âœ•";
  font-size: 12px;
}

.ProseMirror-invalid {
  background: #ffc;
  border: 1px solid #cc7;
  border-radius: 4px;
  padding: 5px 10px;
  position: absolute;
  min-width: 10em;
}

.ProseMirror-prompt-buttons {
  margin-top: 5px;
  display: none;
}
#editor, .editor {
  background: white;
  color: black;
  background-clip: padding-box;
  border-radius: 4px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  padding: 5px 0;
  margin-bottom: 23px;
}

.ProseMirror p:first-child,
.ProseMirror h1:first-child,
.ProseMirror h2:first-child,
.ProseMirror h3:first-child,
.ProseMirror h4:first-child,
.ProseMirror h5:first-child,
.ProseMirror h6:first-child {
  margin-top: 10px;
}

.ProseMirror {
  padding: 4px 0px 4px 0px;
  line-height: 1.2;
  outline: none;
}

.ProseMirror p { margin-bottom: 1em }

.ProseMirror ul li p { margin-bottom: 0px }

div.menubar {
   display: none;
}

div.menubar.is-focused {
   display: block;
}

</style>
