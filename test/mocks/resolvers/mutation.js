const LIST = require('./../data').LIST;

// FUnciuones para dar la solución al resolver
const add = (_, { value }) => {
    LIST.push(value);
    return LIST;
}

// Añadir constante del resolver mutation
const resolversMutation = {
    Mutation: {
        add
    }
}

// Exportarlo para su uso

module.exports = {
    resolversMutation
}