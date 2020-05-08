import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import TextEditWorkspace from './TextEditWorkspace';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            lastUpdate
            borderRadius
            backgroundColor
            borderColor
            padding
            margin
            borderThickness
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container row">
                            <div className="col s1"></div>
                            <div className="col s3">
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                View Logo
                                            </h3>
                                        </div>
                                        <div id="viewBodydiv" className="panel-body">
                                            <dl>
                                                <dt>Text:</dt>
                                                <pre><dd>{data.logo.text}</dd></pre>
                                                <dt>Color:</dt>
                                                <dd>{data.logo.color}</dd>
                                                <dt>Font Size:</dt>
                                                <dd>{data.logo.fontSize}</dd>
                                                <dt>Border Radius:</dt>
                                                <dd>{data.logo.borderRadius}</dd>
                                                <dt>Background Color:</dt>
                                                <dd>{data.logo.backgroundColor}</dd>
                                                <dt>Border Color:</dt>
                                                <dd>{data.logo.borderColor}</dd>
                                                <dt>Padding:</dt>
                                                <dd>{data.logo.padding}</dd>
                                                <dt>Margin:</dt>
                                                <dd>{data.logo.margin}</dd>
                                                <dt>Border Thickness:</dt>
                                                <dd>{data.logo.borderThickness}</dd>
                                                <dt>Last Updated:</dt>
                                                <dd>{data.logo.lastUpdate}</dd>
                                            </dl>
                                            <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                                {(removeLogo, { loading, error }) => (
                                                    <div>
                                                        <form
                                                            onSubmit={e => {
                                                                e.preventDefault();
                                                                removeLogo({ variables: { id: data.logo._id } });
                                                            }}>
                                                            <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                        <button type="submit" className="btn btn-danger">Delete</button>
                                                        </form>
                                                        {loading && <p>Loading...</p>}
                                                        {error && <p>Error :( Please try again</p>}
                                                    </div>
                                                )}
                                            </Mutation>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className = "col s8">
                                <TextEditWorkspace logo={data.logo} />
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;