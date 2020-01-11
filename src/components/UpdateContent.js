import React, { Component } from 'react';

class UpdateContent extends Component {
    constructor(props){
        super(props);
        this.state= {
            id:this.props.data.id,
            title: this.props.data.title,
            desc: this.props.data.desc
            }
         }
    inputFormHandler(e){
        //title인지 desc인지 설정하는 방법 e.target.name
        this.setState({[e.target.name]:e.target.value});
    }    
    render(){
        console.log(this.props.data);
        return(
            <article>
                <h2>Update</h2>
                   {/* submit 하면 /create_process 로 보냄, debugger를 이용해서 찾아야함*/}
                <form action="/create_process" method="post"
                    onSubmit={function(e){
                        e.preventDefault();
                        this.props.onSubmit(
                            this.state.id,
                            this.state.title,
                            this.state.desc
                        );
                        //alert('submit!!!');
                    }.bind(this)}
                >
                    {/* 눈에 보이지않음 */}
                    <input type="hidden" name="id" value={this.state.id}></input>
                    <p><input 
                        type="text" 
                        name="title" 
                        placeholder="title"
                        //value = title 내용 가져와서 보여줌
                        value={this.state.title}
                        onChange={this.inputFormHandler.bind(this)}
                        ></input></p>
                    <p><textarea 
                        name="desc" 
                        placeholder="description" 
                        value={this.state.desc}
                        onChange={this.inputFormHandler.bind(this)}
                        ></textarea></p>
                    <p><input type="submit"></input></p>
                </form>
            </article>
        );
    }
}
export default UpdateContent;
