// @ts-nocheck
/* eslint-disable no-unused-vars */
const vscode = require('vscode')
const clipboardy = require('clipboardy')

//Set error view
const showError = message =>
    vscode.window.showErrorMessage(`Copy filename: ${message}`)
const showWarning = message =>
    vscode.window.setStatusBarMessage(`${message}`, 3000)

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log(
        'Congratulations, your extension "Type Check This Javascript" is now active!'
    )

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        'extension.typeCheckThisJavascript',
        // 'typecheckthisjavascript.helloWorld',
        function (uri, files) {
            let accumulator = ''
			// let str = ''

            if (typeof files !== 'undefined' && files.length > 0) {
                files.forEach((el, index) => {
                    //get the relative url, parse it and take the last part
                    let url = vscode.workspace.asRelativePath(el.path)
					// str = url
                    let urlFormatted = url.replace(/\\/g, '/')
                    accumulator += urlFormatted.split('/').pop()
                    accumulator += index == files.length - 1 ? '' : '\n'
                })
            } else if (uri) {
                let url = vscode.workspace.asRelativePath(uri)
				// str = url
                let urlFormatted = url.replace(/\\/g, '/')
                accumulator += urlFormatted.split('/').pop()
            }

            //Copy the last part to clipboard
            clipboardy
                .write(accumulator)
                .then(showWarning('Filename/s has been copied to clipboard'))

            // Display a message box to the user
            vscode.window.showInformationMessage(`Result: ${accumulator}`)
        }
    )

    context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate,
}
