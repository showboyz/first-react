import React, { Component } from 'react';

class Toc extends Component {
    //속도 개선 : 글작성될때만 아래 랜더링하도록 (옵션사항)
    // shouldComponentUpdate(newProps, newState){
    //     console(newProps.data, this.props.data);
    //     if(this.props.data === newProps.data){
    //         return false;
    //     }
    //     return true;
    // }
    render(){
        console.log('Toc render');
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while(i < data.length){
          lists.push(<li key={data[i].id}>
              <a href={"/contents/"+data[i].id}
                onClick={function(id, e){
                    e.preventDefault();
                    this.props.onChangePage(id);
                }.bind(this, data[i].id)}
              >{data[i].title}</a>
              </li>);
          i = i + 1;
        }
        return(
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default Toc;