import React, { Component } from 'react';
import Toc from "./components/Toc";
import Subject from "./components/Subject";
import Controll from "./components/Controll";
import ReadContent from "./components/ReadContent";
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 4;
    this.state = {
      mode: 'welcome',
      selected_content_id: 4,
      subject: {title:'web', sub:'webpage'},
      welcome: {title:'Welcome', desc:'Hello my world!!'},
      contents: [
        {id:1, title:'HTML', desc:'HTML is ...'},
        {id:2, title:'CSS', desc:'CSS is ...'},
        {id:3, title:'REACT', desc:'REACT is ...'},
        {id:4, title:'APOLLP', desc:'APOLLO is ...'}
      ]
    }
  }
  getReadContent(){
    var i = 0;
    while(i < this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){
      var _contents = this.getReadContent();
       // read 일경우에도 readContent
       _article = <ReadContent title={_contents.title} desc={_contents.desc}></ReadContent>
    } else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
          // add content to this.state.contents
          this.max_content_id = this.max_content_id + 1; 
          // var _contents = this.state.contents.concat(
          //   {id:this.max_content_id, title:_title, desc:_desc}
          // )
          // this.setState({
          //   contents: _contents
          // });
          //다른 방법 push 원본 복사해서 추가 _contents > newContents로 바꾸면 유지
          var _contents = Array.from(this.state.contents);
          _contents.push({id:this.max_content_id, title:_title, desc:_desc});
          this.setState({
            contents:_contents,
            // mode를 read로 바꿔주고 id도 생성한 아이디로 바꿔준다.(페이지 전환효과)
            mode: 'read',
            selected_content_id: this.max_content_id
          });
          console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === 'update'){
      _contents = this.getReadContent();
      _article = <UpdateContent data={_contents} onSubmit={function(_id, _title, _desc){
          // copy content to this.state.contents 원본을 바꾸지않는다.
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length){
            if(_contents[i].id === _id) {
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i = i + 1;
          }
          this.setState({
            contents: _contents,
            //update => read 로 바꿔줌 
            mode: 'read'
          });
          //다른 방법 push 원본 복사해서 추가
          // var newContents = Array.from(this.state.contents);
          // newContents.push({id:this.max_content_id, title:_title, desc:_desc});
          // this.state({
          //   contents:newContents
          // });
          console.log(_title, _desc);
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
    return (
    <div className="App">
      <Subject title={this.state.subject.title}
               sub={this.state.subject.sub}
               onChangePage={function(){
                 this.setState({mode:'welcome'});
               }.bind(this)}></Subject>
           
           {/* 어려움, 링크를 누르면 desc 맞게 출력  */}
           <Toc onChangePage={function(id){
              this.setState({mode:'read',
              selected_content_id: Number(id)
            });
           }.bind(this)}
           data={this.state.contents}></Toc>

           {/* create, update, delete 기능 삭제는 그자리에서 삭제 */}
           <Controll onChangeMode={function(_mode){
             if(_mode === 'delete'){
               if(window.confirm('really?')){
                 var _contents = Array.from(this.state.contents);
                 var i = 0;
                 while(i < _contents.length){
                   if(_contents[i].id === this.state.selected_content_id){
                     // 제거기능 splice(여기서, 한개)
                     _contents.splice(i, 1);
                     break;
                   }
                   i = i + 1;
                 }
                 this.setState({
                    mode: 'welcome',
                    contents: _contents
                 });
                 alert('deleted!')
               }
             } else {
              this.setState({
                mode: _mode
              });
             }
           }.bind(this)}></Controll>
           {/* mode값에 따라 ReadContent, createContent 등으로 바껴서 보여주기 */}
           {this.getContent()}
        
    </div>
   );
  }
}
export default App;
