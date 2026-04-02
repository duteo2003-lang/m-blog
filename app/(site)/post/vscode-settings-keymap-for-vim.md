---
title: "My vscode settings keymap for vim"
slug: "vscode-settings-keymap-for-vim"
date: "2026-02-11"
excerpt: "This blog I'll share my vscode settings and key mapping for daily code as a vim user"
---

### 1. Vscode settings ###

This is vs code settings focus on some basic settings like font, teminal and keymap
```json
{
  "editor.fontFamily": "JetBrains Mono, Fira Code, Iosevka, monospace",
  "editor.fontLigatures": true,
  "editor.fontSize": 15,
  "terminal.integrated.fontFamily": "JetBrains Mono, monospace",
  "terminal.integrated.fontSize": 13,
  "window.commandCenter": true,
  "vim.vimrc.enable": true,
  "vim.useSystemClipboard": true,
  "vim.vimrc.path": "c:\\mlogin\\.vscodevimrc",
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": [
        "<space>",
        "e",
        "w"
      ],
      "commands": [
        "workbench.action.toggleSidebarVisibility",
      ]
    },
    {
      "before": [
        "<space>",
        "e",
        "q"
      ],
      "commands": [
        "workbench.view.explorer"
      ]
    },
    {
      "before": [
        "<space>",
        "w",
        "w"
      ],
      "commands": [
        "workbench.action.closeActiveEditor"
      ]
    },
    {
      "before": [
        "<space>",
        "b",
        "b"
      ],
      "commands": [
        "workbench.action.quickOpenPreviousRecentlyUsedEditorInGroup",
        "workbench.action.acceptSelectedQuickOpenItem"
      ]
    },
    {
      "before": [
        "<C-d>"
      ],
      "after": [
        "<C-d>",
        "z",
        "z"
      ]
    },
    {
      "before": [
        "<C-u>"
      ],
      "after": [
        "<C-u>",
        "z",
        "z"
      ]
    },
    {
      "before": [
        "]",
        "d"
      ],
      "commands": [
        "editor.action.marker.next"
      ]
    },
    {
      "before": [
        "[",
        "d"
      ],
      "commands": [
        "editor.action.marker.prev"
      ]
    },
    {
      "before": [
        "]",
        "c"
      ],
      "commands": [
        "editor.action.dirtydiff.next"
      ]
    },
    {
      "before": [
        "[",
        "c"
      ],
      "commands": [
        "editor.action.dirtydiff.previous"
      ]
    },
    {
      "before": [
        "<space>",
        "t",
        "o"
      ],
      "commands": [
        "workbench.action.terminal.toggleTerminal"
      ]
    },
    {
      "before": [
        "<space>",
        "o",
        "i"
      ],
      "commands": [
        "editor.action.organizeImports"
      ]
    },
    {
      "before": [
        "<space>",
        "s",
      ],
      "commands": [
        "jump-extension.jump-to-the-end-of-a-word"
      ]
    },
  ],
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "files.autoSave": "afterDelay",
  "workbench.colorTheme": "Potpourri Contrast (rainglow)",
  "zenMode.centerLayout": false,
  "editor.find.autoFindInSelection": "always",
  "editor.lineNumbers": "relative",
  "zenMode.hideLineNumbers": false,
  "zenMode.hideStatusBar": false,
  "workbench.colorCustomizations": {
    "statusBar.background": "#303030",
    "statusBar.noFolderBackground": "#222225",
    "statusBar.debuggingBackground": "#511f1f",
    "tab.activeBackground": "#3a3a3a",
    "tab.activeForeground": "#ffffff",
    "tab.activeBorderTop": "#ff9800",
    "tab.activeBorder": "#ff9800",
    "editorCursor.foreground": "#ff9800"
  },
  "vim.foldfix": true,
  "git.confirmSync": false,
  "files.associations": {
    "*.java": "java"
  },
  "cssModules.pathAlias": {
    "styles": "${workspaceFolder}/src/styles"
  },
  "editor.multiCursorModifier": "ctrlCmd",
  "git.blame.editorDecoration.enabled": false,
  "diffEditor.ignoreTrimWhitespace": true,
  "workbench.editor.enablePreview": false,
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.cursorBlinking": "smooth",

  "workbench.editorAssociations": {
  "git-rebase-todo": "default"
    },
    "typescript.updateImportsOnFileMove.enabled": "always",
    "window.customTitleBarVisibility": "windowed",
    "vim.normalModeKeyBindings": [
      {
        "before": [
          "-"
        ],
        "commands": [
          {
            "command": "oil-code.open"
          }
        ]
      },
      {
        "before": [
          "<cr>"
        ],
        "commands": [
          {
            "command": "oil-code.select"
          }
        ]
      },
      {
        "before": [
          "<c-l>"
        ],
        "commands": [
          {
            "command": "oil-code.refresh"
          }
        ]
      },
      {
        "before": [
          "`"
        ],
        "commands": [
          {
            "command": "oil-code.cd"
          }
        ]
      }
    ]
}

```
---
### 2. Vscode keymapping ###
This is keymaping for mostly code navigation including go to definition, view references, peek code, go to implementation
one important key map is to map Ctrl+n and Ctrl+p to select next and previous when to popup show 

```json
[
    {
        "key": "ctrl+b",
        "command": "editor.action.revealDefinition",
        "when": "editorHasDefinitionProvider && editorTextFocus"
    },
    {
        "key": "alt+enter",
        "command": "editor.action.quickFix",
        "when": "editorHasCodeActionsProvider && textInputFocus && !editorReadonly"
    },
    {
        "key": "ctrl+alt+l",
        "command": "editor.action.formatDocument",
        "when": "editorHasDocumentFormattingProvider && editorTextFocus && !editorReadonly && !inCompositeEditor"
    },
    {
        "key": "ctrl+w",
        "command": "-extension.vim_ctrl+w",
        "when": "editorTextFocus && vim.active && vim.use<C-w> && !inDebugRepl"
    },
    {
        "key": "shift+k",
        "command": "editor.action.showDefinitionPreviewHover"
    },
    {
        "key": "alt+l",
        "command": "workbench.action.nextEditor"
    },
    {
        "key": "alt+h",
        "command": "workbench.action.previousEditor"
    },
    {
        "key": "ctrl+z",
        "command": "workbench.action.toggleZenMode",
        "when": "!isAuxiliaryWindowFocusedContext"
    },
    {
        "key": "ctrl+shift+k",
        "command": "editor.action.goToReferences",
        "when": "editorHasReferenceProvider && editorTextFocus && !inReferenceSearchEditor && !isInEmbeddedEditor"
    },
    {
        "key": "ctrl+n",
        "command": "list.focusDown",
        "when": "listFocus && !inputFocus"
    },
    {
        "key": "ctrl+p",
        "command": "list.focusUp",
        "when": "listFocus && !inputFocus"
    },
    {
        "key": "ctrl+n",
        "command": "workbench.action.quickOpenSelectNext",
        "when": "inQuickOpen"
    },
    {
        "key": "ctrl+p",
        "command": "workbench.action.quickOpenSelectPrevious",
        "when": "inQuickOpen"
    },
    {
        "key": "ctrl+n",
        "command": "workbench.action.findInFilesSelectNext",
        "when": "inSearchEditor"
    },
    {
        "key": "ctrl+n",
        "command": "list.focusDown",
        "when": "codeActionMenuVisible"
    },
    {
        "key": "ctrl+p",
        "command": "list.focusUp",
        "when": "codeActionMenuVisible"
    },
    {
        "key": "ctrl+n",
        "command": "-workbench.action.files.newUntitledFile"
    },
    {
        "key": "alt+t",
        "command": "workbench.action.terminal.toggleTerminal",
        "when": "terminal.active"
    },
    {
        "key": "ctrl+p",
        "command": "workbench.action.findInFilesSelectPrevious",
        "when": "inSearchEditor"
    },
    {
        "key": "ctrl+b",
        "command": "-workbench.action.toggleSidebarVisibility"
    },
    {
        "key": "ctrl+b",
        "command": "-extension.vim_ctrl+b",
        "when": "editorTextFocus && vim.active && vim.use<C-b> && !inDebugRepl && vim.mode != 'Insert'"
    },
    {
        "key": "ctrl+e",
        "command": "-extension.vim_ctrl+e",
        "when": "editorTextFocus && vim.active && vim.use<C-e> && !inDebugRepl"
    },
    {
        "key": "ctrl+e",
        "command": "-editor.action.toggleScreenReaderAccessibilityMode",
        "when": "accessibilityHelpIsShown"
    },
    {
        "key": "escape escape",
        "command": "workbench.action.focusActiveEditorGroup",
        "when": "!editorTextFocus"
    },
    {
        "key": "ctrl+p",
        "command": "-workbench.action.quickOpen"
    },
    {
        "key": "ctrl+e",
        "command": "-cursor.composer.openAgentWindow",
        "when": "cursor.appLayoutEnabled && cursor.appLayout != 'agent'"
    },
    {
        "key": "alt+q",
        "command": "type",
        "args": {
            "text": "`"
        },
        "when": "editorTextFocus && vim.mode == 'Normal'"
    },
    {
        "key": "shift+alt+o",
        "command": "-editor.action.organizeImports",
        "when": "textInputFocus && !editorReadonly && supportedCodeAction =~ /(\\s|^)source\\.organizeImports\\b/"
    },
    {
        "key": "ctrl+e",
        "command": "-cursor.toggleAgentWindowIDEUnification",
        "when": "cursor.agentIdeUnification.featureGate && workbenchState != 'empty'"
    },
    {
        "key": "ctrl+n",
        "command": "search.action.focusNextSearchResult",
        "when": "searchViewletVisible && hasSearchResult && !inSearchEditor"
    },
    {
        "key": "f4",
        "command": "-search.action.focusNextSearchResult",
        "when": "hasSearchResult || inSearchEditor"
    },
    {
        "key": "ctrl+p",
        "command": "search.action.focusPreviousSearchResult",
        "when": "searchViewletVisible && hasSearchResult && !inSearchEditor"
    },
    {
        "key": "shift+f4",
        "command": "-search.action.focusPreviousSearchResult",
        "when": "hasSearchResult || inSearchEditor"
    },
    {
        "key": "ctrl+n",
        "command": "selectNextCodeAction",
        "when": "codeActionMenuVisible"
    },
    {
        "key": "down",
        "command": "-selectNextCodeAction",
        "when": "codeActionMenuVisible"
    },
    {
        "key": "ctrl+p",
        "command": "selectPrevCodeAction",
        "when": "codeActionMenuVisible"
    },
    {
        "key": "up",
        "command": "-selectPrevCodeAction",
        "when": "codeActionMenuVisible"
    },
    {
        "key": "ctrl+i",
        "command": "-workbench.action.chat.startVoiceChat",
        "when": "chatIsEnabled && hasSpeechProvider && inChatInput && !chatSessionRequestInProgress && !editorFocus && !notebookEditorFocused && !scopedVoiceChatGettingReady && !speechToTextInProgress || chatIsEnabled && hasSpeechProvider && inlineChatFocused && !chatSessionRequestInProgress && !editorFocus && !notebookEditorFocused && !scopedVoiceChatGettingReady && !speechToTextInProgress"
    },
    {
        "key": "ctrl+i",
        "command": "-workbench.action.chat.stopListeningAndSubmit",
        "when": "inChatInput && voiceChatInProgress && scopedVoiceChatInProgress == 'editor' || inChatInput && voiceChatInProgress && scopedVoiceChatInProgress == 'inline' || inChatInput && voiceChatInProgress && scopedVoiceChatInProgress == 'quick' || inChatInput && voiceChatInProgress && scopedVoiceChatInProgress == 'view' || inlineChatFocused && voiceChatInProgress && scopedVoiceChatInProgress == 'editor' || inlineChatFocused && voiceChatInProgress && scopedVoiceChatInProgress == 'inline' || inlineChatFocused && voiceChatInProgress && scopedVoiceChatInProgress == 'quick' || inlineChatFocused && voiceChatInProgress && scopedVoiceChatInProgress == 'view'"
    },
    {
        "key": "ctrl+i",
        "command": "-workbench.action.terminal.chat.start",
        "when": "chatIsEnabled && terminalChatAgentRegistered && terminalFocusInAny && terminalHasBeenCreated || chatIsEnabled && terminalChatAgentRegistered && terminalFocusInAny && terminalProcessSupported"
    },
    {
        "key": "ctrl+i",
        "command": "-composer.startComposerPrompt"
    },
    {
        "key": "ctrl+i",
        "command": "-inlineChat2.stop",
        "when": "inlineChatHasEditsAgent && inlineChatVisible && chatEdits.requestCount == '0'"
    },
    {
        "key": "ctrl+i",
        "command": "-inlineChat2.reveal",
        "when": "inlineChatHasEditsAgent && !chatEdits.isGlobalEditingSession && chatEdits.requestCount >= 1"
    },
    {
        "key": "ctrl+i",
        "command": "-search.action.searchWithAI",
        "when": "hasAIResultProviderKey && searchViewletFocus"
    },
    {
        "key": "ctrl+q",
        "command": "workbench.action.closeActiveEditor"
    },
    {
        "key": "ctrl+w",
        "command": "-workbench.action.closeActiveEditor"
    },
    {
        "key": "ctrl+o",
        "command": "-extension.vim_ctrl+o",
        "when": "editorTextFocus && vim.active && vim.use<C-o> && !inDebugRepl"
    },
    {
        "key": "ctrl+i",
        "command": "-extension.vim_ctrl+i",
        "when": "editorTextFocus && vim.active && vim.use<C-i> && !inDebugRepl"
    },
    {
        "key": "ctrl+i",
        "command": "workbench.action.navigateForward",
        "when": "canNavigateForward"
    },
    {
        "key": "alt+right",
        "command": "-workbench.action.navigateForward",
        "when": "canNavigateForward"
    },
    {
        "key": "ctrl+o",
        "command": "workbench.action.navigateBack",
        "when": "canNavigateBack"
    },
    {
        "key": "alt+left",
        "command": "-workbench.action.navigateBack",
        "when": "canNavigateBack"
    },
    {
        "key": "ctrl+d",
        "command": "-editor.action.addSelectionToNextFindMatch",
        "when": "editorFocus"
    }
]
```