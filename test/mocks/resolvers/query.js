const hello = () => {
    return 'Hello world!!';
}
const helloWithName = (_, args) => {
    return `Hello ${args.name}!!`;
}

const helloToGraphQLCourse = () => {
    return 'Hello to GraphQL Course!!';
}

const resolverQueries = {
    Query: {
        hello,
        helloWithName,
        helloToGraphQLCourse
    }
}

module.exports = {
    resolverQueries
}