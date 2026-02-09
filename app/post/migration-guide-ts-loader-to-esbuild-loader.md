---
title: "Migration Guide: ts-loader to esbuild-loader"
slug: "getting-started-with-nextjs-static-export"
date: "2026-02-09"
excerpt: "This guide documents the migration from `ts-loader` to `esbuild-loader` for faster TypeScript compilation in webpack."
---
## Overview
This guide documents the migration from `ts-loader` to `esbuild-loader` for faster TypeScript compilation in webpack.

## Why Migrate?

### Performance Benefits
- **10-100x faster compilation**: esbuild is written in Go and optimized for speed
- **Faster minification**: esbuild's native minifier is significantly faster than Terser
- **Better development experience**: Dramatically reduced build times, especially for large codebases

### Key Differences
- ts-loader uses the TypeScript compiler (tsc) which is comprehensive but slower
- esbuild-loader uses esbuild which is extremely fast but has stricter parsing rules
- esbuild skips type checking by default (similar to ts-loader's `transpileOnly: true`)

---

## Migration Steps

### Step 1: Install esbuild-loader

```bash
npm install --save-dev esbuild-loader
```

**Why**: This package provides the webpack loader and minifier plugin needed for esbuild integration.

---

### Step 2: Update webpack.config.js - Replace TypeScript Loader

**Before:**
```javascript
{
    test: /\.tsx?$/,
    use: [
        {
            loader: "ts-loader",
            options: {
                transpileOnly: true,
                compilerOptions: { noEmit: false },
            },
        }
    ],
    exclude: /node_modules/,
}
```

**After:**
```javascript
{
    test: /\.tsx?$/,
    loader: "esbuild-loader",
    options: {
        loader: 'tsx',
        target: 'es2015'
    },
    exclude: /node_modules/,
}
```

**Why**: 
- `loader: 'tsx'` tells esbuild to handle TypeScript + JSX files
- `target: 'es2015'` specifies the JavaScript version to compile to
- Much simpler configuration than ts-loader
- No need for `transpileOnly` as esbuild doesn't do type checking by default

---

### Step 3: Update webpack.config.js - Add esbuild Minifier

**Add import at the top:**
```javascript
const { EsbuildPlugin } = require('esbuild-loader');
```

**Add to optimization section:**
```javascript
optimization: {
    splitChunks: false,
    minimizer: [
        new EsbuildPlugin({
            target: 'es2015',
            css: true  // Also minify CSS
        })
    ]
}
```

**Why**: 
- Replaces webpack's default Terser minifier with esbuild's faster minifier
- `css: true` enables CSS minification for better performance
- Ensures consistent ES target between compilation and minification

---

### Step 4: Fix TypeScript Syntax Compatibility Issues

**The Problem**: 
esbuild's parser is stricter than TypeScript's compiler. It cannot parse generic arrow functions with type parameters because the `<T>` syntax conflicts with JSX/TSX parsing.

**Before (doesn't work with esbuild):**
```typescript
const handleResponse = async <T>(
    response: ResponseModel<T>,
    resolve: (data: ResponseModel<T>) => void
) => {
    // function body
};
```

**After (works with esbuild):**
```typescript
async function handleResponse<T>(
    response: ResponseModel<T>,
    resolve: (data: ResponseModel<T>) => void
) {
    // function body
}
```

**FlowGuideRow.tsx**
line 94
```typescript
        // DND Setup - Call useSortable first
        const sortableState = useSortable({
            id: id,
            animateLayoutChanges: ({ isSorting: sortingState }) => sortingState,
        });
        // Safely destructure after the hook completes
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging,
            isSorting,
            over,
            active,
            index,
        } = sortableState;
```

**FolderCollapse.tsx**
line 85
```typescript
        // DND Setup - Call useSortable first
        const sortableState = useSortable({
            id: id,
            disabled: !isDragEnabled || isEditingTitle, // Disable drag during editing
            animateLayoutChanges: ({ isSorting: sortingState }) => sortingState,
        });

        // Safely destructure after the hook completes
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging,
            isSorting,
            over,
            index,
            active,
        } = sortableState;
```
**NoteRow.tsx**
line 94
```typescript
        // DND Setup - Call useSortable first
        const sortableState = useSortable({
            id: id,
            animateLayoutChanges: ({ isSorting: sortingState }) => sortingState,
        });

        // Safely destructure after the hook completes
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging,
            isSorting,
            over,
            active,
            index,
        } = sortableState;
```

**Why**: 
- In `.tsx` files, esbuild sees `<T>` as a JSX tag opening, not a generic type parameter
- Regular function declarations don't have this ambiguity
- This is a known limitation of esbuild when parsing TypeScript in TSX mode

**How to find these issues:**
1. Run your webpack build after migrating
2. Look for errors like: `Expected ")" but found ":"`
3. Search your codebase for patterns like: `const funcName = async <` or `const funcName = <T>`
4. Convert these arrow functions to regular function declarations

---

### Step 5: Clear Cache and Test Build

```bash
# Clear webpack cache (if using filesystem cache)
Remove-Item -Recurse -Force .\node_modules\.cache -ErrorAction SilentlyContinue

# Run build
npm run build
```

**Why**: 
- Ensures old cached ts-loader output doesn't interfere
- Verifies the migration is successful
- Confirms all TypeScript syntax is compatible with esbuild

---

## Complete webpack.config.js for snippet only Example

```javascript
/* eslint-disable @typescript-eslint/no-var-requires */
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const RemovePlugin = require("remove-files-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const os = require('os');
const { EsbuildPlugin } = require('esbuild-loader');

module.exports = [
    {
        entry: "./src/snippet.tsx",
        mode: "production",
        cache: {
            type: 'filesystem',
            buildDependencies: {
                config: [__filename]
            }
        },
        parallelism: os.cpus().length,
        optimization: {
            splitChunks: false,
            minimizer: [
                new EsbuildPlugin({
                    target: 'es2015',
                    css: true
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "esbuild-loader",
                    options: {
                        loader: 'tsx',
                        target: 'es2015'
                    },
                    exclude: /node_modules/,
                },
                // ... other loaders (css, sass, etc.)
            ]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            // ... aliases
        },
        output: {
            filename: "snippet.js",
            path: path.resolve(__dirname, "extension"),
            publicPath: path.resolve(__dirname, "extension"),
        },
        plugins: [
            new Dotenv(),
        ]
    },
];
```

## Complete webpack.config.js for extension only Example

```javascript
/* eslint-disable @typescript-eslint/no-var-requires */
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const RemovePlugin = require("remove-files-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const os = require('os');
const { EsbuildPlugin } = require('esbuild-loader');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
module.exports = [
    {
        entry: "./src/sidePanelIndex.tsx",
        mode: "production",
        stats: 'errors-only',
        cache: {
            type: 'filesystem',
            buildDependencies: {
                config: [__filename]
            }
        },
        parallelism: os.cpus().length,
        optimization: {
            splitChunks: false,
            minimizer: [
                new EsbuildPlugin({
                    target: 'es2015',
                    css: true
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "esbuild-loader",
                    options: {
                        loader: 'tsx',
                        target: 'es2015',
                        tsconfigRaw: require('./tsconfig.json')
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.(scss|css)$/i,
                    use: [{
                        loader: "style-loader",
                        options: {
                            attributes: {
                                "desk-compass-style": true
                            },
                        }
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]--[hash:base64:5]_sp",
                                auto: (resourcePath) => {
                                    return resourcePath.endsWith(".module.css");
                                }
                            },
                        },
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader"
                    }],
                },
                { test: /\.svg$/, loader: "svg-inline-loader" },
                {
                    test: /\.(svg|png|jpg|jpeg|gif)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]",
                        }
                    }
                }
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            alias: {
                components: path.resolve(__dirname, "src/components"),
                styles: path.resolve(__dirname, "src/styles"),
                pages: path.resolve(__dirname, "src/pages"),
                models: path.resolve(__dirname, "src/models"),
                configs: path.resolve(__dirname, "src/configs"),
                services: path.resolve(__dirname, "src/services"),
                utils: path.resolve(__dirname, "src/utils"),
                libraries: path.resolve(__dirname, "src/libraries"),
            }
        },
        output: {
            filename: "sidePanel.js",
            path: path.resolve(__dirname, "extension/sidePanel"),
            publicPath: path.resolve(__dirname, "extension/sidePanel"),
        },
        plugins: [
            new Dotenv(),
            new RemovePlugin({
                before: {
                    root: path.resolve(__dirname, "extension"),
                    test: [
                        {
                            folder: "./public",
                            method: () => true,
                            recursive: true
                        }
                    ],
                },
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: "./public/assets",
                        to: path.resolve(__dirname, "extension/public/assets"),
                        noErrorOnMissing: true,
                    },
                ],
            }),
            // new ForkTsCheckerWebpackPlugin({
            //     typescript: {
            //         configFile: path.resolve(__dirname, "tsconfig.json"),
            //     },
            //     async: false,
            //     logger: {
            //         infrastructure: 'silent',
            //         issues: 'console'
            //     }
            // }),
        ],
        
    },
    {
        entry: "./src/index.tsx",
        mode: "production",
        stats: 'errors-only',
        cache: {
            type: 'filesystem',
            buildDependencies: {
                config: [__filename]
            }
        },
        parallelism: os.cpus().length,
        optimization: {
            splitChunks: false,
            minimizer: [
                new EsbuildPlugin({
                    target: 'es2015',
                    css: true
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "esbuild-loader",
                    options: {
                        loader: 'tsx',
                        target: 'es2015',
                        tsconfigRaw: require('./tsconfig.json')
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.(scss|css)$/i,
                    use: [{
                        loader: "style-loader",
                        options: {
                            attributes: {
                                "s7-style": true
                            },
                            injectType: "singletonStyleTag",
                            insert: require.resolve("./insert-function.js"),
                        }
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]--[hash:base64:5]_id",
                                auto: (resourcePath) => {
                                    return resourcePath.endsWith(".module.css");
                                }
                            },
                        },
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader"
                    }],
                },
                { test: /\.svg$/, loader: "svg-inline-loader" },
                {
                    test: /\.(svg|png|jpg|jpeg|gif)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]",
                        }
                    }
                }
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            alias: {
                components: path.resolve(__dirname, "src/components"),
                styles: path.resolve(__dirname, "src/styles"),
                pages: path.resolve(__dirname, "src/pages"),
                models: path.resolve(__dirname, "src/models"),
                configs: path.resolve(__dirname, "src/configs"),
                services: path.resolve(__dirname, "src/services"),
                utils: path.resolve(__dirname, "src/utils"),
                libraries: path.resolve(__dirname, "src/libraries"),
            }
        },
        output: {
            filename: "content.js",
            path: path.resolve(__dirname, "extension"),
            publicPath: path.resolve(__dirname, "extension"),
        },
        plugins: [
            new Dotenv(),
        ]
    },
    {
        entry: "./src/extension/serviceWorker.ts",
        mode: "production",
        stats: 'errors-only',
        cache: {
            type: 'filesystem',
            buildDependencies: {
                config: [__filename]
            }
        },
        parallelism: os.cpus().length,
        optimization: {
            splitChunks: false,
            minimizer: [
                new EsbuildPlugin({
                    target: 'es2015',
                    css: true
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    loader: "esbuild-loader",
                    options: {
                        loader: 'ts',
                        target: 'es2015',
                        tsconfigRaw: require('./tsconfig.json')
                    },
                    exclude: /node_modules/,
                }
            ],
        },
        resolve: {
            extensions: [".ts", ".js"],
            alias: {
                components: path.resolve(__dirname, "src/components"),
                styles: path.resolve(__dirname, "src/styles"),
                pages: path.resolve(__dirname, "src/pages"),
                models: path.resolve(__dirname, "src/models"),
                configs: path.resolve(__dirname, "src/configs"),
                services: path.resolve(__dirname, "src/services"),
                utils: path.resolve(__dirname, "src/utils"),
                libraries: path.resolve(__dirname, "src/libraries"),
                extension: path.resolve(__dirname, "src/extension"),
            }
        },
        output: {
            filename: "service-worker.js",
            path: path.resolve(__dirname, "extension"),
            publicPath: path.resolve(__dirname, "extension"),
        },
        plugins: [
            new Dotenv(),
        ]
    },
];
```

---

## Verification Checklist

- [ ] esbuild-loader installed successfully
- [ ] webpack.config.js updated with esbuild-loader
- [ ] EsbuildPlugin added to optimization.minimizer
- [ ] All generic arrow functions converted to regular functions
- [ ] Cache cleared
- [ ] Build completes successfully
- [ ] Build time significantly reduced
- [ ] Application runs correctly in browser

---

## Common Issues and Solutions

### Issue: `Expected ")" but found ":"`
**Solution**: Convert generic arrow functions to regular function declarations (see Step 4)

### Issue: Type errors not caught during build
**Solution**: This is expected - esbuild doesn't perform type checking. Run `tsc --noEmit` separately or use your IDE for type checking.

### Issue: Different build output behavior
**Solution**: Check your `target` option. Ensure it matches your original TypeScript target or adjust based on your browser support needs.

---

## Performance Comparison

### Before (ts-loader):
- Initial build: ~7-8 seconds
- Type checking included but slow

### After (esbuild-loader):
- Initial build: ~2-2.5 seconds
- **~70% faster compilation**
- Type checking should be done separately with IDE or `tsc --noEmit`

---

## Optional: Uninstall ts-loader

After confirming everything works correctly:

```bash
npm uninstall ts-loader
```

**Note**: Only do this if ts-loader is not used anywhere else in your project.

---

## Additional Resources

- [esbuild-loader Documentation](https://github.com/esbuild-kit/esbuild-loader)
- [esbuild Documentation](https://esbuild.github.io/)
- [webpack Optimization Guide](https://webpack.js.org/guides/build-performance/)

---

## Notes

- esbuild is actively maintained and continuously improving
- Keep esbuild-loader updated for the latest performance improvements
- Consider using esbuild for development mode as well for even faster rebuilds
- For production builds, the speed improvement scales with codebase size
