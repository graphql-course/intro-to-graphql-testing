const LIST = require('./../data').LIST;
const hello = () => {
    return 'Hello world!!';
}
const helloWithName = (_, args) => {
    return `Hello ${args.name}!!`;
}

const helloToGraphQLCourse = () => {
    return 'Hello to GraphQL Course!!';
}

const list = () => {
    return LIST;
}

const resolverQueries = {
    Query: {
        hello,
        helloWithName,
        helloToGraphQLCourse,
        list
    }
}

module.exports = {
    resolverQueries
}