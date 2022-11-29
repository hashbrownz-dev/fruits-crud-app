const React = require('react');
const DefaultLayout = require('../Default');

class Edit extends React.Component{
    render(){
        const fruit = this.props.fruit;
        return(
            <DefaultLayout>
                <form action={`/fruits/${fruit._id}/?_method=PUT`} method="post">
                    <fieldset>
                    <legend>Create a New Fruit</legend>
                    <label>
                        NAME:<input type="text" name="name" value={fruit.name} />
                    </label>
                    <label>
                        COLOR:<input type="text" name="color" value={fruit.color}/>
                    </label>
                    <label> READY TO EAT:<input type="checkbox" name="readyToEat" checked={ fruit.readyToEat } /> </label>
                    </fieldset>
                    <input type="submit" value="Update Fruit" />
                </form>
            </DefaultLayout>
        )
    }
}

module.exports = Edit;