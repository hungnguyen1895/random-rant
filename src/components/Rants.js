import React, {Component} from 'react';

class Rants extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const allPosts = this.props.posts;

        return (
            <div>
                {allPosts.map(function(post, i){
                    return <div className="rant" key={i}>{post.text}</div>
                })}
            </div>
        )
    }
}

export default Rants;