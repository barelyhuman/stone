import { compile, prefixer, middleware, serialize, stringify } from "stylis";
import fs from "fs";
import { relative, dirname, resolve, join } from "path";
import { NodePath } from "@babel/traverse";
import * as t from "@babel/types";
import { hash } from "../lib/hash";

const allStyles = new Map();
let theme: any = null;

const createCSSImport = (path: string) =>
  t.importDeclaration([], t.stringLiteral(path));

module.exports = function ({ types: bTypes }: any) {
  let rootProgramNode: NodePath<t.Program>;
  const fileData = {
    root: "",
    filename: "",
  };

  let isCSSMod = false;

  return {
    post() {
      if (!isCSSMod) {
        return;
      }

      let curatedStyles = "";
      let outputPath = "";

      [...allStyles.entries()].forEach((entry, index) => {
        const [_, styleMap] = entry;
        curatedStyles += `${styleMap.css}\n\n`;

        if (outputPath.length <= 0) {
          outputPath =
            styleMap.outputPath ||
            join(process.cwd(), `css-stone-${index}.stone.css`);
        }
      });

      const relativePath = getRelativePath(fileData.filename, outputPath);
      const importDeclaration = createCSSImport(relativePath);
      rootProgramNode.unshiftContainer("body", importDeclaration);

      fs.writeFileSync(outputPath, curatedStyles);

      allStyles.clear();
      isCSSMod = false;
    },
    visitor: {
      Program: {
        enter(path: NodePath<t.Program>, state: any) {
          {
            rootProgramNode = path;

            if (!theme) {
              if (state.opts.themeFile) {
                const themePath = join(process.cwd(), state.opts.themeFile);
                const { theme: _themeFromFile } =
                  resolve(themePath) && require(themePath);
                theme = _themeFromFile;
              } else {
                theme = {};
              }
            }

            if (!fileData.root) {
              fileData.root = state.file.opts.root;
            }

            if (!fileData.filename) {
              fileData.filename = state.file.opts.filename;
            }
          }
        },
      },
      TaggedTemplateExpression(
        path: NodePath<t.TaggedTemplateExpression>,
        state: any
      ) {
        // Add handling to css being the variable doing the calling

        if (
          path.node.tag.type === "Identifier" &&
          path.node.tag.name === "css"
        ) {
          isCSSMod = true;
        } else {
          isCSSMod = false;
        }
        let cssText = "";
        const quasi = path.get("quasi");
        const expressions = quasi.get("expressions");

        quasi.node.quasis.forEach((elem, index) => {
          const _expression = expressions[index];
          cssText += elem.value.raw;
          if (!_expression) {
            return;
          }

          if (_expression.isArrowFunctionExpression()) {
            const params = _expression.get("params");

            const identifier = params[0];
            const identName = identifier.isIdentifier() && identifier.node.name;

            if (!identName) {
              throw _expression.buildCodeFrameError(`Arrow function has no parameters, cannot interpolate without a parameter
              eg: \${theme=>theme.colors.red.value()}
              `);
            }

            const _functionBody = _expression.get("body");

            let calleeData;

            if (
              _functionBody.isCallExpression() ||
              _functionBody.isMemberExpression()
            ) {
              calleeData = _functionBody.getSource();
            }

            let calleeExpressionAsString = String(calleeData)
              // replace identity name and the `.` after the identity
              .replace(identName + ".", "");

            // get out all function calls
            // TODO: add fail case of this being an object notation
            const ObjectNotationsToEval = calleeExpressionAsString.split(".");
            let currentObjPointer = theme;
            ObjectNotationsToEval.forEach((evalItem) => {
              let val = new Function(
                "pointer",
                `return pointer.${evalItem}`
              ).call(null, currentObjPointer);
              if (val) {
                currentObjPointer = val;
              }
            });

            if (typeof currentObjPointer === "string") {
              cssText += currentObjPointer;
            } else {
              return;
            }
          }

          // If not an arrow expression, and a string constant, evaluate directly
          const evaluatedValue = _expression.evaluate();
          if (!evaluatedValue.confident) {
            return;
          }
          cssText += evaluatedValue.value;
        });

        const hashedName = hash(`{${cssText}}`);

        const _cssString = `.${hashedName}{${cssText}}`;

        const compiledCSS = serialize(
          compile(_cssString),
          middleware([prefixer, stringify])
        );

        const outputPath = getAbsolutePath(state.file.opts.filename);

        allStyles.set(hashedName, {
          css: compiledCSS,
          outputPath,
        });

        path.replaceWith(bTypes.stringLiteral(hashedName));
      },
    },
  };
};

function getRelativePath(sourceFile: string, destFile: string) {
  const path = relative(dirname(sourceFile), destFile);

  if (!path.startsWith(".")) {
    return `./${path}`;
  } else {
    return path;
  }
}

// HACK: extensions are hardcoded
function getAbsolutePath(path: string) {
  const filesRegex = /\.(js|ts|tsx)$/;
  if (!filesRegex.test(String(path))) {
    return "";
  }
  return String(path).replace(filesRegex, ".stone.css");
}
