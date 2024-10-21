import  { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/AuthForm.css'

const AuthForm = () => {
  const [formType, setFormType] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '', 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = formType === 'login' ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/register';
      const response = await axios.post(url, formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 mt-5">
          <div className="card mt-5">
            <div className="card-body">
              <h4 className="card-title text-center">{formType === 'login' ? 'Login' : 'Register'}</h4>
              <form onSubmit={handleSubmit}>
                {formType === 'register' && (
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  {formType === 'login' ? 'Login' : 'Register'}
                </button>
                <div className="text-center mt-3">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => setFormType(formType === 'login' ? 'register' : 'login')}
                  >
                    {formType === 'login' ? 'Create an account' : 'Already have an account? Login'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
