import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";
import './index.css'
import Rants from "./components/Rants";
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isRantEmpty: false,
            posts: [],
            finishedMount: false,
        }
    }

    updatePosts() {
        axios.get('/posts/getAllPosts')
            .then(res => {
                const allPosts = res.data;
                // console.log(res.data);
                this.setState({
                    posts: allPosts
                })
                this.setState({
                    finishedMount: true
                })
            });
    }

    componentDidMount() {
        this.updatePosts();
    }

    submitPost = (event) => {
        event.preventDefault();
        if (this.state.value === '') {

            this.setState({
                isRantEmpty: true
            });
        } else {
            this.setState({
                isRantEmpty: false
            });

            axios.post('/posts/add', {
                text: this.state.value
            })
                .then(response =>  {
                    console.log(response);
                    this.updatePosts();
                })
                .catch(error => {
                    console.log(error);
                });
            console.log(this.state.value)
        }
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col xs={12}>
                        <Form>
                            <FormGroup>
                                <Form.Label className="prompt">What's your rants?</Form.Label>
                                <Form.Control onChange={this.handleChange}
                                              placeholder="Share your rants with everyone."
                                              as="textarea" rows="3" />
                            </FormGroup>
                            {this.state.isRantEmpty ?
                                <div className="warning-message">
                                    <p>Please write your rants before submit it.</p>
                                </div>
                                :
                                ""
                            }

                            <Button className="submitPostButton" onClick={this.submitPost} variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
                {this.state.finishedMount ? <Rants posts={this.state.posts}/> : ""}
            </Container>
        );
    }
}

export default App;