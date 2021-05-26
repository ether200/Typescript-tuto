let userInput: unknown; // similar to any, but better because it doesn't let you asign unless you do a check

// This FN will never to return anything
function generateError(message: string, code: number): never {
    throw { message: message, errorCode: code }
}

