const React = require('react')
const DefaultLayout = require('../Default')


class Index extends React.Component{
    render(){
        const { fruits } = this.props;
        return (
            <DefaultLayout>
                <div>
                    <a href="/fruits/New"><button>Create A New Fruit</button></a>
                    {fruits.map((fruit)=>{
                        return (<article>
                            <a href={`/fruits/${fruit._id}`}>
                                <h2>
                                    {fruit.name} - {fruit.readyToEat ? 'Ripe' : 'Not Ripe'}
                                </h2>
                            </a>
                        </article>)
                    })}
                </div>
            </DefaultLayout>
        )
    }
}

export default Index