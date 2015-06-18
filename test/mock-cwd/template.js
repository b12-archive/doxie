module.exports = ({data: {title, parameters}}) => (
`#  ${title}  #

##  Parameters  ##

${parameters.map(({name, type, description}) => (
`* \`{${type}} ${name}\` – ${description}
`)).join('') ||
`(none)
`}

`);
