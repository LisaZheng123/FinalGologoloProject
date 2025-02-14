import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    
                    // sorts by lastUpdate
                    data.logos.sort(function(a, b){return new Date(b.lastUpdate) - new Date(a.lastUpdate)});
                    
                    return (
                        <div className="container row">
                            <div className="col s1">
                            </div>
                            <div className="col s3">
                                <h3>Recent Work</h3>
                                <pre>
                                    {data.logos.map((logo, index) => (
                                        <div key={index} className='home_logo_link'
                                            style={{ cursor: "pointer" }}>
                                            <Link to={`/view/${logo._id}`}>{logo.text}</Link>
                                        </div>
                                    ))}
                                </pre>
                            </div>
                            
                            <div className="col s8">
                                <div id="home_banner_container">
                                    @todo<br />
                                    List Maker
                                </div>
                                <div>
                                    <button><Link id="add_logo_button" to="/create">Add Logo</Link></button>
                                </div>
                            </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
