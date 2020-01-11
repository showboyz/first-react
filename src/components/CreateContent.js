import React, { Component } from 'react';

class CreateContent extends Component {
    render(){
        return(
            <article>
                <h2>Create</h2>
                   {/* submit 하면 /create_process 로 보냄, debugger를 이용해서 찾아야함*/}
                <form action="/create_process" method="post"
                    onSubmit={function(e){
                        e.preventDefault();
                        this.props.onSubmit(
                            e.target.title.value,
                            e.target.desc.value
                        );
                        //alert('submit!!!');
                    }.bind(this)}
                >
                    <p><input type="text" name="title" placeholder="title"></input></p>
                    <p><textarea name="desc" placeholder="description"></textarea></p>
                    <p><input type="submit"></input></p>
                </form>
            </article>
        );
    }
}
export default CreateContent;
