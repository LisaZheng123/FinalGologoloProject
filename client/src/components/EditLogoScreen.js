import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import TextEditWorkspace from './TextEditWorkspace';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            borderRadius
            backgroundColor
            borderColor
            padding
            margin
            borderThickness
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $borderRadius: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $padding: Int!,
        $margin: Int!,
        $borderThickness: Int!
        ) 
        {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                borderRadius: $borderRadius,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                padding: $padding,
                margin: $margin,
                borderThickness: $borderThickness
            )   
                {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

    constructor() {
        super();
        this.state = {
            flag: true,                  // does the init_value have to be loaded?
            text: "",
            color: "",
            fontSize: "",
            borderRadius: "",
            backgroundColor: "",
            borderColor: "",
            padding: "",
            margin: "",
            borderThickness: ""
        };
    }

    handleTextChange = (event) => {
        console.log("handleTextChange to " + event.target.value);
        this.setState({ text: event.target.value });
    }

    handleTextColorChange = (event) => {
        console.log("handleTextColorChange to " + event.target.value);
        this.setState({ color: event.target.value });
    }
    
    handleBackgroundColorChange = (event) => {
        console.log("handleBackgroundColorChange to " + event.target.value);
        this.setState({ backgroundColor: event.target.value });
    }

    handleBorderColorChange = (event) => {
        console.log("handleBorderColorChange to " + event.target.value);
        this.setState({ borderColor: event.target.value });
    }

    handleFontSizeChange = (event) => {
        console.log("handleTextColorChangeComplete to " + event.target.value);
        this.setState({ fontSize: event.target.value });
    }

    handlePaddingSizeChange = (event) => {
        console.log("handlePaddingSizeChange to " + event.target.value);
        this.setState({ padding: event.target.value });       
    }
    
    handleMarginSizeChange = (event) => {
        console.log("handleMarginSizeChange to " + event.target.value);
        this.setState({ margin: event.target.value });       
    }

    handleBorderRadiusChange = (event) => {
        console.log("handleBorderRadiusChange to " + event.target.value);
        this.setState({ borderRadius: event.target.value });       
    }

    handleBorderThicknessChange = (event) => {
        console.log("handleBorderThicknessChange to " + event.target.value);
        this.setState({ borderThickness: event.target.value });       
    }

    render() {
        let newLogo, text, color, fontSize, borderRadius, backgroundColor, borderColor, padding, margin, borderThickness;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if (this.state.flag){
                        console.log("set flag false")
                        this.setState({...data.logo, flag: false})   // initializes states
                    }
                    newLogo = {text: this.state.text, color: this.state.color, fontSize: this.state.fontSize, borderRadius: this.state.borderRadius, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, padding: this.state.padding, margin: this.state.margin, borderThickness: this.state.borderThickness};
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                            </h3>
                                        </div>
                                        <div className = "row">
                                            <div id="viewBodydiv" className = "container col">
                                                <div className="panel-body">                                            
                                                    <form onSubmit={e => {
                                                        e.preventDefault();
                                                        updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value), borderRadius: parseInt(borderRadius.value), backgroundColor: backgroundColor.value, borderColor: borderColor.value, padding: parseInt(padding.value), margin: parseInt(margin.value), borderThickness: parseInt(borderThickness.value) } });
                                                    }}>
                                                        <div className="form-group">
                                                            <label htmlFor="text">Text:</label>
                                                            <input type="text" required pattern=".*\S+.*" title="This field is required and can't be all whitespaces." className="form-control" name="text" onChange={this.handleTextChange} ref={node => {
                                                                text = node;
                                                            }} placeholder="Text" defaultValue={this.state.flag ? data.logo.text : this.state.text} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="color">Color:</label>
                                                            <input type="color" className="form-control" name="color" onChange={this.handleTextColorChange} ref={node => {
                                                                color = node;
                                                            }} placeholder="Color" defaultValue={this.state.flag ? data.logo.color : this.state.color} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="fontSize">Font Size:</label>
                                                            <input type="number" min="2" max="144" oninput="validity.valid||(value='');" className="form-control" name="fontSize" onChange={this.handleFontSizeChange} ref={node => {
                                                                fontSize = node;
                                                            }} placeholder="Font Size" defaultValue={this.state.flag ? data.logo.fontSize : this.state.fontSize} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderRadius">Border Radius:</label>
                                                            <input type="number" min="2" max="144" oninput="validity.valid||(value='');" className="form-control" name="borderRadius" onChange={this.handleBorderRadiusChange} ref={node => {
                                                                borderRadius = node;
                                                            }} placeholder="Border Radius" defaultValue={this.state.flag ? data.logo.borderRadius : this.state.borderRadius} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="backgroundColor">Background Color:</label>
                                                            <input type="color" className="form-control" name="backgroundColor" onChange={this.handleBackgroundColorChange} ref={node => {
                                                                backgroundColor = node;
                                                            }} placeholder="Background Color" defaultValue={this.state.flag ? data.logo.backgroundColor : this.state.backgroundColor} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderColor">Border Color:</label>
                                                            <input type="color" className="form-control" name="borderColor" onChange={this.handleBorderColorChange} ref={node => {
                                                                borderColor = node;
                                                            }} placeholder="Border Color" defaultValue={this.state.flag ? data.logo.borderColor : this.state.borderColor} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderThickness">Border Thickness:</label>
                                                            <input type="number" min="2" max="144" oninput="validity.valid||(value='');" className="form-control" name="borderThickness" onChange={this.handleBorderThicknessChange} ref={node => {
                                                                borderThickness = node;
                                                            }} placeholder="Border Thickness" defaultValue={this.state.flag ? data.logo.borderThickness : this.state.borderThickness} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="padding">Padding:</label>
                                                            <input type="number" min="2" max="144" oninput="validity.valid||(value='');" className="form-control" name="padding" onChange={this.handlePaddingSizeChange} ref={node => {
                                                                padding = node;
                                                            }} placeholder="Padding" defaultValue={this.state.flag ? data.logo.padding : this.state.padding} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="margin">Margin:</label>
                                                            <input type="number" min="2" max="144" oninput="validity.valid||(value='');" className="form-control" name="margin" onChange={this.handleMarginSizeChange} ref={node => {
                                                                margin = node;
                                                            }} placeholder="Margin" defaultValue={this.state.flag ? data.logo.margin : this.state.margin} />
                                                        </div>
                                                        <button type="submit" className="btn btn-success">Submit</button>
                                                    </form>
                                                    {loading && <p>Loading...</p>}
                                                    {error && <p>Error :( Please try again</p>}
                                                </div>
                                            </div>
                                        <div className = "container col">
                                            <TextEditWorkspace logo={newLogo}/>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;