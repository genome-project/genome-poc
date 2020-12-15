const GenomeComponent = require( './src/GenomeComponent' )

const sample_component = GenomeComponent`
<div>
    <h1 style="#sample_id .sample_class .sample_class2">Hello, <{ world }>!</h1>
    <p style=".sample_class"><{ paragraph }></p>
</div>
`

sample_component.styles = {
    '.sample_class': {
        "color": "#ff0000"
    }
}

console.log( sample_component )
console.log( sample_component.render( { world: 'World', paragraph: 'This is an example of a component in Genome!' } ) )