var React = require('react');
var linkState = require('react-link-state');
var myFormData;

var MyForm = React.createClass({
    getInitialState: function() {
        if(myFormData){
            return {user: myFormData};
        }else{
            return {
                user:{
                    name: '',
                    email: '',
                    phone: ''
                }
            };
	    }
	},
    render: function() {
        myFormData = this.state.user;
        return (
                <form>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="fullname">Name</label>
                            <input type="text" className="form-control" id="fullname" placeholder="Enter name" valueLink={linkState(this, 'user.name')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" id="email" placeholder="Enter email" valueLink={linkState(this, 'user.email')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" className="form-control" id="phone" placeholder="Enter phone" valueLink={linkState(this, 'user.phone')}/>
                        </div>
                    </fieldset>
                    <button className="btn btn-success">Submit</button>
                </form>
        );
    }
});

module.exports = MyForm;